import { graphql } from "../gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

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

export default function usePokemonList() {
  const { data } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () =>
      request("https://beta.pokeapi.co/graphql/v1beta", pokemonListQuery),
  });

  return { pokemonList: data };
}
