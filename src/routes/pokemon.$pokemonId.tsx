import { createFileRoute, notFound } from "@tanstack/react-router";
import useCapturedStore from "src/stores/use-captured-store";
import usePokemonQuery from "src/hooks/use-pokemon-query";

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: Pokemon,
  loader: ({ params: { pokemonId } }) => {
    if (+pokemonId < 1 || +pokemonId > 151) {
      throw notFound();
    }
  },
  notFoundComponent: () => {
    return <p>¡Pokémon no encontrado!</p>;
  },
});

function Pokemon() {
  const { pokemonId } = Route.useParams();
  const { data: pokemon, isSuccess } = usePokemonQuery(+pokemonId);
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();

  return (
    <div className="p-2">
      {isSuccess && (
        <>
          <img
            src={
              pokemon.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites
            }
          />
          <h3>
            {
              pokemon.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
                ?.pokemon_v2_pokemonspeciesnames[0].name
            }
          </h3>
          <button
            onClick={() => {
              if (capturedPokemon.has(+pokemonId)) releasePokemon(+pokemonId);
              else capturePokemon(+pokemonId);
            }}
          >
            CAPTURAR
          </button>
          {capturedPokemon.has(+pokemonId) ? "Capturado" : "Libre"}
        </>
      )}
    </div>
  );
}
