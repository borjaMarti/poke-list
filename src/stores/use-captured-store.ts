import { create } from "zustand";
import { persist } from "zustand/middleware";

// Borja: We're using a Set to store "captured" Pokémon because it will provide a faster lookup time when using the state to set up the application.
interface CapturedState {
  captured: Set<number>;
}

const capturedStore = create<CapturedState>()(
  persist(
    // Borja: Per zustand's documentation, mutations of a Set state are done through the store's setState method, instead of being created at the store.
    () => ({
      captured: new Set(),
    }),
    {
      name: "captured-pokemon",
      // Borja: Because we're using a Set, we need a custom storage engine to transform into an array before storing, because it'll be saved as a string.
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              captured: new Set(state.captured),
            },
          };
        },
        setItem: (name, newValue) => {
          const str = JSON.stringify({
            state: {
              captured: Array.from(newValue.state.captured.values()),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

// Borja: We export the store as a hook that returns the Set in state and two methods to mutate it, so we can ensure the mutations are done without modyfing the previous state.
export default function useCapturedStore() {
  const capturedPokemon = capturedStore((state) => state.captured);

  const capturePokemon = (id: number) => {
    capturedStore.setState((prev) => ({
      captured: new Set(prev.captured).add(id),
    }));
  };

  // Borja: While for capturePokemon the .add method returns the updated Set, .delete just returns a boolean, so the update requires another step.
  const releasePokemon = (id: number) => {
    capturedStore.setState((prev) => {
      const prevCaptured = new Set(prev.captured);
      prevCaptured.delete(id);
      return {
        captured: prevCaptured,
      };
    });
  };

  return {
    capturedPokemon,
    capturePokemon,
    releasePokemon,
  };
}
