import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { dashboard } from "./dashboard";

export const Router = () => {
  const routes = dashboard;

  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  );
};
