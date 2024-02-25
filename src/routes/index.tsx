import { createFileRoute } from "@tanstack/react-router";
import useCapturedStore from "src/hooks/use-captured-store";
import usePokemonListQuery from "src/hooks/use-pokemon-list-query";
import { Link } from "@tanstack/react-router";
import { PokemonItem } from "src/types/types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: pokemonList, isSuccess } = usePokemonListQuery();
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();

  const isCaptured = (pokemon: PokemonItem) => {
    return capturedPokemon.has(pokemon.id)
      ? pokemon.pokemon_v2_pokemonsprites[0].front_shiny
      : pokemon.pokemon_v2_pokemonsprites[0].front_default;
  };

  const handleCapture = (pokemon: PokemonItem) => {
    if (capturedPokemon.has(pokemon.id)) {
      releasePokemon(pokemon.id);
    } else {
      capturePokemon(pokemon.id);
    }
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {isSuccess && (
        <ul>
          {pokemonList.pokemon_v2_pokemon.map((pokemon) => (
            <li key={pokemon.id}>
              <img src={isCaptured(pokemon)} />
              <Link
                to="/pokemon/$pokemonId"
                params={{ pokemonId: pokemon.id.toString() }}
              >
                {
                  pokemon.pokemon_v2_pokemonspecy
                    ?.pokemon_v2_pokemonspeciesnames[0].name
                }
              </Link>
              <button onClick={() => handleCapture(pokemon)}>CAPTURAR</button>
              {capturedPokemon.has(pokemon.id) ? "Capturado" : "Libre"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
