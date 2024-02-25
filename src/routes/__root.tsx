import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { Box, Container } from "@mui/material";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          <img src="logo.png" />
        </Link>{" "}
        <Link to="/captured" className="[&.active]:font-bold">
          Capturados
        </Link>
      </div>
      <hr />
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
  );
}
