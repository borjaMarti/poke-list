import { createFileRoute } from "@tanstack/react-router";

import PokemonGrid from "src/components/pokemon-grid";

export const Route = createFileRoute("/captured")({
  component: Captured,
});

function Captured() {
  return <PokemonGrid filtered={true} />;
}
