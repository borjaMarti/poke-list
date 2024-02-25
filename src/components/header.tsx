import { AppBar, Box, Container, Link } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";
import CapturedLink from "./captured-link";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#282828", padding: "16px 0" }}
    >
      <Container>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
          gap={2}
          component="nav"
        >
          <Link to="/" component={RouterLink} aria-label="Enlace a Inicio">
            <img src="logo.png" alt="Logo de PokéList" />
          </Link>
          <CapturedLink />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
