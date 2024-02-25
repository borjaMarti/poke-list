import { create } from "zustand";
import { persist } from "zustand/middleware";

// Borja: We're using a Set to store "captured" Pokémon because it will provide a faster lookup time when using the state to set up the application.
interface CapturedState {
  captured: Set<number>;
}

const capturedStore = create<CapturedState>()(
  persist(
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
        // Borja: I just spent the past hour debugging why the storage wasn't working as intended... Turns out that when I followed the Zustand's docs example on how to use Sets and Maps with localStorage, which was done using a Map, I also went with the .entries() method instead of .values(), resulting in strange behavior...
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