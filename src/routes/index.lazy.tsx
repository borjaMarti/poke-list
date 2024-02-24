import { createLazyFileRoute } from "@tanstack/react-router";
import usePokemonList from "../hooks/use-pokemon-list";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { pokemonList } = usePokemonList();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {pokemonList && (
        <ul>
          {pokemonList.pokemon_v2_pokemon.map((pokemon) => (
            <li key={pokemon.id}>
              {
                pokemon.pokemon_v2_pokemonspecy
                  ?.pokemon_v2_pokemonspeciesnames[0].name
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
