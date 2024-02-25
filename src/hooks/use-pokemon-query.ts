import { graphql } from "src/gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

// Borja: This query is type safe thanks to graphql-codegen, which when executed through the CLI automatically creates the necessary types for a given query from the schema provided in the codegen.ts config and stores them in the gql folder.
const pokemonQuery = graphql(/* GraphQL */ `
  query Pokemon($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      pokemon_v2_pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      height
      weight
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {
          genus
          name
        }
        pokemon_v2_pokemonspeciesflavortexts(
          where: {
            pokemon_v2_version: { id: { _eq: 23 } }
            language_id: { _eq: 7 }
          }
        ) {
          flavor_text
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          pokemon_v2_typenames(where: { language_id: { _eq: 7 } }) {
            name
          }
        }
      }
    }
  }
`);

export default function usePokemonQuery(pokemonId: number) {
  return useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: async () =>
      request("https://beta.pokeapi.co/graphql/v1beta", pokemonQuery, {
        id: pokemonId,
      }),
  });
}
