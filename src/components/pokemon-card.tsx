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
import { parsePokemonId } from "src/utils/utils";

interface PokemonCardProps {
  pokemon: PokemonItem;
  filtered: boolean;
}

const PokemonCard = ({ pokemon, filtered }: PokemonCardProps) => {
  const pokemonName =
    pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0].name;

  // Borja: When we are on the /captured route, show shiny sprite.
  const selectSprite = (pokemon: PokemonItem) => {
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
          "&:focus": {
            color: "red",
          },
        }}
        aria-label={`Más detalles sobre ${pokemonName}`}
      >
        <CardMedia
          component="img"
          image={selectSprite(pokemon)}
          title={`Sprite de ${pokemonName}`}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>{parsePokemonId(pokemon.id)}</Typography>
          <Typography>{pokemonName}</Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: "center" }}>
        <CatchButton pokemonId={pokemon.id} fontSize="small" />
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
