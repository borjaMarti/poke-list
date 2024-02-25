import { Button } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

const CapturedLink = () => {
  return (
    <Button
      variant="contained"
      color="secondary"
      to="/captured"
      component={RouterLink}
    >
      Capturados
    </Button>
  );
};

export default CapturedLink;
