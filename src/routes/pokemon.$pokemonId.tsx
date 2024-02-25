import { createFileRoute, notFound } from "@tanstack/react-router";
import { Typography } from "@mui/material";
import PokemonDetails from "src/components/pokemon-details";

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: Pokemon,
  loader: ({ params: { pokemonId } }) => {
    if (+pokemonId < 1 || +pokemonId > 151) {
      throw notFound();
    }
  },
  notFoundComponent: () => {
    return (
      <Typography variant="h4" component="p">
        ¡Pokémon no encontrado!
      </Typography>
    );
  },
});

function Pokemon() {
  const { pokemonId } = Route.useParams();

  return <PokemonDetails pokemonId={+pokemonId} />;
}
