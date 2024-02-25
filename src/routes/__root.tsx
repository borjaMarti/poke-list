import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";
import Header from "src/components/header";

// Borja: Dark theme by default.
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    // <ThemeProvider theme={darkTheme}>
    <>
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
    </>
    // <ThemeProvider/>
  );
}
