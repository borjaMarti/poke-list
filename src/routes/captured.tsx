import { createFileRoute } from "@tanstack/react-router";
import useCapturedStore from "src/hooks/use-captured-store";
import usePokemonListQuery from "src/hooks/use-pokemon-list-query";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/captured")({
  component: Captured,
});

function Captured() {
  const { data: pokemonList, isSuccess } = usePokemonListQuery();
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();

  return (
    <div className="p-2">
      {isSuccess && (
        <ul>
          {pokemonList.pokemon_v2_pokemon.map((pokemon) => {
            if (capturedPokemon.has(pokemon.id)) {
              return (
                <li key={pokemon.id}>
                  <img
                    src={pokemon.pokemon_v2_pokemonsprites[0].front_default}
                  />
                  <Link
                    to="/pokemon/$pokemonId"
                    params={{ pokemonId: pokemon.id.toString() }}
                  >
                    {
                      pokemon.pokemon_v2_pokemonspecy
                        ?.pokemon_v2_pokemonspeciesnames[0].name
                    }
                  </Link>
                  <button
                    onClick={() => {
                      if (capturedPokemon.has(pokemon.id))
                        releasePokemon(pokemon.id);
                      else capturePokemon(pokemon.id);
                    }}
                  >
                    CAPTURAR
                  </button>
                  {capturedPokemon.has(pokemon.id) ? "Capturado" : "Libre"}
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}
