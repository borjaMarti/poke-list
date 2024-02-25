import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import useCapturedStore from "src/hooks/use-captured-store";
import { PokemonItem } from "src/types/types";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

interface Props {
  pokemon: PokemonItem;
  filtered: boolean;
}

const PokemonCard = ({ pokemon, filtered }: Props) => {
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();
  const pokemonName =
    pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0].name;

  const trueIsCaptured = (pokemon: PokemonItem) => {
    return capturedPokemon.has(pokemon.id);
  };

  const isCaptured = (pokemon: PokemonItem) => {
    return filtered
      ? pokemon.pokemon_v2_pokemonsprites[0].front_shiny
      : pokemon.pokemon_v2_pokemonsprites[0].front_default;
  };

  const handleCapture = (pokemon: PokemonItem) => {
    if (capturedPokemon.has(pokemon.id)) {
      releasePokemon(pokemon.id);
    } else {
      capturePokemon(pokemon.id);
    }
  };

  return (
    <Card sx={{ width: 120 }}>
      <Link
        to="/pokemon/$pokemonId"
        params={{ pokemonId: pokemon.id.toString() }}
        component={RouterLink}
        underline="none"
      >
        <CardMedia
          component="img"
          image={isCaptured(pokemon)}
          title={`Sprite de ${pokemonName}`}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography className="text-slate-900">{pokemonName}</Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: "center" }}>
        <Tooltip
          title={
            trueIsCaptured(pokemon) ? "Soltar Pokémon" : "Capturar Pokémon"
          }
        >
          <IconButton
            onClick={() => handleCapture(pokemon)}
            color={trueIsCaptured(pokemon) ? "error" : "inherit"}
            aria-label={
              trueIsCaptured(pokemon) ? "Soltar Pokémon" : "Capturar Pokémon"
            }
          >
            <CatchingPokemonIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
