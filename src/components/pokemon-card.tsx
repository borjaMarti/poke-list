import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import { PokemonItem } from "src/types/types";
import CatchButton from "./catch-button";

interface PokemonCardProps {
  pokemon: PokemonItem;
  filtered: boolean;
}

const PokemonCard = ({ pokemon, filtered }: PokemonCardProps) => {
  const pokemonName =
    pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0].name;

  const isCaptured = (pokemon: PokemonItem) => {
    return filtered
      ? pokemon.pokemon_v2_pokemonsprites[0].front_shiny
      : pokemon.pokemon_v2_pokemonsprites[0].front_default;
  };

  return (
    <Card sx={{ width: 120 }}>
      <Link
        to="/pokemon/$pokemonId"
        params={{ pokemonId: pokemon.id.toString() }}
        component={RouterLink}
        underline="none"
        sx={{
          transition: "color ease-in-out 0.3s",
          "&:hover": {
            color: "red",
          },
        }}
      >
        <CardMedia
          component="img"
          image={isCaptured(pokemon)}
          title={`Sprite de ${pokemonName}`}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>{pokemonName}</Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: "center" }}>
        <CatchButton pokemon={pokemon} />
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
