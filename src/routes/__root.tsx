import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

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
          PokéList
        </Link>{" "}
        <Link to="/captured" className="[&.active]:font-bold">
          Capturados
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
