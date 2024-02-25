import { Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import PokemonGrid from "src/components/pokemon-grid";

export const Route = createFileRoute("/captured")({
  component: Captured,
});

function Captured() {
  return (
    <>
      <Typography variant="h3" textAlign="center" component="h1">
        Capturados:
      </Typography>
      <PokemonGrid filtered={true} />
    </>
  );
}
