import { AppBar, Link } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

const Header = () => {
  return (
    <AppBar position="static">
      <Link to="/" component={RouterLink}>
        <img src="logo.png" />
      </Link>{" "}
      <Link to="/captured" component={RouterLink}>
        Capturados
      </Link>
    </AppBar>
  );
};

export default Header;
