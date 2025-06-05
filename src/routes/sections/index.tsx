import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageLoading } from "@/components/PageLoading";

import { authRoutes } from "./auth";
import { dashboard } from "./dashboard";

export const Router = () => {
  const routes = [...dashboard, ...authRoutes];

  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback={<PageLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
