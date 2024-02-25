import Grid from "@mui/material/Unstable_Grid2";
import usePokemonListQuery from "src/hooks/use-pokemon-list-query";
import useCapturedStore from "src/stores/use-captured-store";
import PokemonCard from "./pokemon-card";

interface PokemonGridProps {
  filtered: boolean;
}

const PokemonGrid = ({ filtered }: PokemonGridProps) => {
  const { data: pokemonList, isSuccess } = usePokemonListQuery();
  const { capturedPokemon } = useCapturedStore();

  return isSuccess ? (
    <Grid container spacing={3} justifyContent="center">
      {pokemonList.pokemon_v2_pokemon.map((pokemon) => {
        if (filtered && !capturedPokemon.has(pokemon.id)) {
          return;
        } else
          return (
            <Grid key={pokemon.id}>
              <PokemonCard pokemon={pokemon} filtered={filtered} />
            </Grid>
          );
      })}
    </Grid>
  ) : (
    <div>Cargando...</div>
  );
};

export default PokemonGrid;
