import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/capturados")({
  component: Captured,
});

function Captured() {
  return <div className="p-2">Pokémon Capturados</div>;
}
