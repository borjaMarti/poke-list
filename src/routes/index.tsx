import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import PokemonGrid from "src/components/pokemon-grid";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Typography variant="h3" textAlign="center" component="h1">
        ¡Hazte con Todos!
      </Typography>
      <PokemonGrid filtered={false} />
    </>
  );
}
