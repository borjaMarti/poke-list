import { graphql } from "src/gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

// Borja: This query is type safe thanks to graphql-codegen, which when executed through the CLI automatically creates the necessary types for a given query from the schema provided in the codegen.ts config and stores them in the gql folder.
const pokemonListQuery = graphql(/* GraphQL */ `
  query PokemonList {
    pokemon_v2_pokemon(where: { id: { _lte: 151 } }) {
      id
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
        front_shiny: sprites(path: "front_shiny")
      }
    }
  }
`);

export default function usePokemonListQuery() {
  return useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () =>
      request("https://beta.pokeapi.co/graphql/v1beta", pokemonListQuery),
  });
}
