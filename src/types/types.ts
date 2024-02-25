export interface PokemonItem {
  __typename?: "pokemon_v2_pokemon";
  id: number;
  pokemon_v2_pokemonspecy?: {
    __typename?: "pokemon_v2_pokemonspecies";
    pokemon_v2_pokemonspeciesnames: Array<{
      __typename?: "pokemon_v2_pokemonspeciesname";
      name: string;
    }>;
  } | null;
  pokemon_v2_pokemonsprites: Array<{
    __typename?: "pokemon_v2_pokemonsprites";
    front_default: string;
    front_shiny: string;
  }>;
}
