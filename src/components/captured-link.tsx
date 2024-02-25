import { Button } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const CapturedLink = () => {
  return (
    <Button
      variant="contained"
      color="secondary"
      to="/captured"
      component={RouterLink}
      startIcon={<CatchingPokemonIcon />}
    >
      Capturados
    </Button>
  );
};

export default CapturedLink;
