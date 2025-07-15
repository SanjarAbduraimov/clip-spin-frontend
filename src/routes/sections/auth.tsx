import { RouteObject } from "react-router-dom";

import { GoogleCallback } from "@/auth/google/googleCallback";
import { ForgotPassword } from "@/pages/Auth/AuthPassword/ForgotPassword/ForgotPassword";
import { ResetEmailSent } from "@/pages/Auth/AuthPassword/ResetEmailSent/ResetEmailSent";
import { ResetPassword } from "@/pages/Auth/AuthPassword/ResetPassword/ResetPassword";
import { LoginWithEmail } from "@/pages/Auth/AuthWithEmail/LoginWithEmail/LoginWithEmail";
import { SignInWithEmail } from "@/pages/Auth/AuthWithEmail/SignInWithEmail/SignInWithEmail";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "register",
        element: <SignInWithEmail />,
      },
      {
        path: "sign-in",
        element: <LoginWithEmail />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "reset-email-sent",
        element: <ResetEmailSent />,
      },
    ],
  },
];
