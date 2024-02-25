import { createFileRoute } from "@tanstack/react-router";
import useCapturedStore from "src/hooks/use-captured-store";
import usePokemonListQuery from "src/hooks/use-pokemon-list-query";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { pokemonList } = usePokemonListQuery();
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {pokemonList && (
        <ul>
          {pokemonList.pokemon_v2_pokemon.map((pokemon) => (
            <li key={pokemon.id}>
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
          ))}
        </ul>
      )}
    </div>
  );
}
