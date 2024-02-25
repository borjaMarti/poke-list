import { IconButton, Tooltip } from "@mui/material";
import useCapturedStore from "src/stores/use-captured-store";
import { PokemonItem } from "src/types/types";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

interface CatchButtonProps {
  pokemon: PokemonItem;
}

const CatchButton = ({ pokemon }: CatchButtonProps) => {
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();

  const isCaptured = (pokemon: PokemonItem) => {
    return capturedPokemon.has(pokemon.id);
  };

  const handleCapture = (pokemon: PokemonItem) => {
    if (capturedPokemon.has(pokemon.id)) {
      releasePokemon(pokemon.id);
    } else {
      capturePokemon(pokemon.id);
    }
  };

  return (
    <Tooltip
      title={isCaptured(pokemon) ? "Soltar Pokémon" : "Capturar Pokémon"}
    >
      <IconButton
        onClick={() => handleCapture(pokemon)}
        color={isCaptured(pokemon) ? "error" : "inherit"}
        aria-label={isCaptured(pokemon) ? "Soltar Pokémon" : "Capturar Pokémon"}
      >
        <CatchingPokemonIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CatchButton;
