import { IconButton, Tooltip } from "@mui/material";
import useCapturedStore from "src/stores/use-captured-store";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

interface CatchButtonProps {
  pokemonId: number;
  fontSize: "small" | "large";
}

const CatchButton = ({ pokemonId, fontSize }: CatchButtonProps) => {
  const { capturedPokemon, capturePokemon, releasePokemon } =
    useCapturedStore();

  const isCaptured = (pokemonId: number) => {
    return capturedPokemon.has(pokemonId);
  };

  const handleCapture = (pokemonId: number) => {
    if (capturedPokemon.has(pokemonId)) {
      releasePokemon(pokemonId);
    } else {
      capturePokemon(pokemonId);
    }
  };

  return (
    <Tooltip
      title={isCaptured(pokemonId) ? "Soltar Pokémon" : "Capturar Pokémon"}
    >
      <IconButton
        onClick={() => handleCapture(pokemonId)}
        color={isCaptured(pokemonId) ? "error" : "inherit"}
        aria-label={
          isCaptured(pokemonId) ? "Soltar Pokémon" : "Capturar Pokémon"
        }
      >
        <CatchingPokemonIcon fontSize={fontSize} />
      </IconButton>
    </Tooltip>
  );
};

export default CatchButton;
