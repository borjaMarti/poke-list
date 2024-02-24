/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query PokemonList {\n    pokemon_v2_pokemon(where: { id: { _lte: 151 } }) {\n      id\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {\n          name\n        }\n      }\n      pokemon_v2_pokemonsprites {\n        front_default: sprites(path: \"front_default\")\n        front_shiny: sprites(path: \"front_shiny\")\n      }\n    }\n  }\n": types.PokemonListDocument,
    "\n  query Pokemon($id: Int!) {\n    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n      height\n      weight\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {\n          genus\n          name\n        }\n        pokemon_v2_pokemonspeciesflavortexts(\n          where: {\n            pokemon_v2_version: { id: { _eq: 23 } }\n            language_id: { _eq: 7 }\n          }\n        ) {\n          flavor_text\n        }\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          pokemon_v2_typenames(where: { language_id: { _eq: 7 } }) {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.PokemonDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PokemonList {\n    pokemon_v2_pokemon(where: { id: { _lte: 151 } }) {\n      id\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {\n          name\n        }\n      }\n      pokemon_v2_pokemonsprites {\n        front_default: sprites(path: \"front_default\")\n        front_shiny: sprites(path: \"front_shiny\")\n      }\n    }\n  }\n"): (typeof documents)["\n  query PokemonList {\n    pokemon_v2_pokemon(where: { id: { _lte: 151 } }) {\n      id\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {\n          name\n        }\n      }\n      pokemon_v2_pokemonsprites {\n        front_default: sprites(path: \"front_default\")\n        front_shiny: sprites(path: \"front_shiny\")\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Pokemon($id: Int!) {\n    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n      height\n      weight\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {\n          genus\n          name\n        }\n        pokemon_v2_pokemonspeciesflavortexts(\n          where: {\n            pokemon_v2_version: { id: { _eq: 23 } }\n            language_id: { _eq: 7 }\n          }\n        ) {\n          flavor_text\n        }\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          pokemon_v2_typenames(where: { language_id: { _eq: 7 } }) {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Pokemon($id: Int!) {\n    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n      height\n      weight\n      pokemon_v2_pokemonspecy {\n        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {\n          genus\n          name\n        }\n        pokemon_v2_pokemonspeciesflavortexts(\n          where: {\n            pokemon_v2_version: { id: { _eq: 23 } }\n            language_id: { _eq: 7 }\n          }\n        ) {\n          flavor_text\n        }\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          pokemon_v2_typenames(where: { language_id: { _eq: 7 } }) {\n            name\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;