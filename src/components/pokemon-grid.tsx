import Grid from "@mui/material/Unstable_Grid2";
import usePokemonListQuery from "src/hooks/use-pokemon-list-query";
import useCapturedStore from "src/stores/use-captured-store";
import PokemonCard from "./pokemon-card";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";

interface PokemonGridProps {
  filtered: boolean;
}

const PokemonGrid = ({ filtered }: PokemonGridProps) => {
  const {
    data: pokemonList,
    isSuccess,
    isError,
    isLoading,
  } = usePokemonListQuery();
  const { capturedPokemon } = useCapturedStore();

  if (isLoading) return <CircularProgress color="secondary" />;
  if (isSuccess)
    return (
      <Grid container spacing={3} justifyContent="center">
        {pokemonList.pokemon_v2_pokemon.map((pokemon) => {
          // Borja: If we are in the /captured page, only show pokemons that have been captured.
          if (filtered && !capturedPokemon.has(pokemon.id)) {
            return;
          } else {
            return (
              <Grid key={pokemon.id}>
                <PokemonCard pokemon={pokemon} filtered={filtered} />
              </Grid>
            );
          }
        })}
      </Grid>
    );
  if (isError)
    return (
      <Typography variant="h4" component="p">
        Parece que la Pokédex está saturada...
      </Typography>
    );
};

export default PokemonGrid;
