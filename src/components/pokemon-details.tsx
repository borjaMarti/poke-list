import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import usePokemonQuery from "src/hooks/use-pokemon-query";
import { parsePokemonId, parsePokemonDescription } from "src/utils/utils";
import CatchButton from "./catch-button";
import { Fragment } from "react";

interface PokemonDetailsProps {
  pokemonId: number;
}

const PokemonDetails = ({ pokemonId }: PokemonDetailsProps) => {
  const {
    data: pokemon,
    isSuccess,
    isError,
    isLoading,
  } = usePokemonQuery(pokemonId);

  // Borja: This might be the ugliest part of all the codebase... GraphQL I guess.
  const sprite =
    pokemon?.pokemon_v2_pokemon[0].pokemon_v2_pokemonsprites[0].sprites;
  const name =
    pokemon?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
      ?.pokemon_v2_pokemonspeciesnames[0].name;
  const type = pokemon?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes;
  const weight = pokemon?.pokemon_v2_pokemon[0].weight;
  const height = pokemon?.pokemon_v2_pokemon[0].height;
  const genus =
    pokemon?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
      ?.pokemon_v2_pokemonspeciesnames[0].genus;
  const description =
    pokemon?.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy
      ?.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text;

  if (isLoading) return <CircularProgress color="secondary" />;
  if (isSuccess)
    return (
      <Paper elevation={20}>
        <Box display="flex" flexDirection="column" gap={1} maxWidth={500} p={5}>
          <Box alignSelf="center">
            <img src={sprite} width="auto" height={250} />
          </Box>
          <Stack direction="row" alignItems="center" marginBottom={2}>
            <CatchButton pokemonId={pokemonId} fontSize="large" />
            <Typography variant="h4" component="h1">
              {`${parsePokemonId(pokemonId)} ${name}`.toUpperCase()}
            </Typography>
          </Stack>
          <Typography>{`Peso: ${typeof weight === "number" && weight === weight ? weight / 10 : "??"}kg | Altura: ${typeof height === "number" && height === height ? height / 10 : "??"}m`}</Typography>
          <Typography>
            Tipo:{" "}
            {type?.map((type, i) => {
              return (
                <Fragment
                  key={i}
                >{`${i > 0 ? " | " : ""} ${type.pokemon_v2_type?.pokemon_v2_typenames[0].name}`}</Fragment>
              );
            })}
          </Typography>
          <Typography variant="h6" component="h2">
            {genus}
          </Typography>
          <Typography>{parsePokemonDescription(description)}</Typography>
        </Box>
      </Paper>
    );
  if (isError)
    return (
      <Typography variant="h4" component="p">
        Parece que la Pokédex está saturada...
      </Typography>
    );
};

export default PokemonDetails;
