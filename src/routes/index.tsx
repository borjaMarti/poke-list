import { createFileRoute } from "@tanstack/react-router";
import PokemonGrid from "src/components/pokemon-grid";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <h3>Welcome Home!</h3>
      <PokemonGrid filtered={false} />
    </>
  );
}
