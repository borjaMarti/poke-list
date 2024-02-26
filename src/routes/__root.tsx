import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import {
  Box,
  Container,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import Header from "src/components/header";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

// Borja: We create a theme with responsive fonts for MaterialUI components, passed in the ThemeProvider component.
let theme = createTheme();
theme = responsiveFontSizes(theme);

function RootComponent() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Container>
          <Box
            my={6}
            display="flex"
            alignItems="center"
            gap={6}
            sx={{ flexDirection: "column" }}
          >
            <Outlet />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
