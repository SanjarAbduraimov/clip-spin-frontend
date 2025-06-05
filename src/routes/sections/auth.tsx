import { RouteObject } from "react-router-dom";

import { GoogleCallback } from "@/auth/google/googleCallback";
import { SignInWithEmail } from "@/pages/Auth/AuthWithEmail/SignInWithEmail/SignInWithEmail";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "sign-in",
        element: <SignInWithEmail />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
    ],
  },
];
