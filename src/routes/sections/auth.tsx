import { RouteObject } from "react-router-dom";

import { GoogleCallback } from "@/auth/google/googleCallback";
import { SignInWithEmail } from "@/pages/Auth/AuthWithEmail/SignInWithEmail/SignInWithEmail";
import { LoginWithEmail } from "@/pages/Auth/AuthWithEmail/LoginWithEmail/LoginWithEmail";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "sign-in",
        element: <SignInWithEmail />,
      },
      {
        path: "login",
        element: <LoginWithEmail />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
    ],
  },
];
