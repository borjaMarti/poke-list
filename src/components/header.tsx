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
        >
          <Link to="/" component={RouterLink}>
            <img src="logo.png" />
          </Link>
          <CapturedLink />
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
