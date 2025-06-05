import { RouteObject } from "react-router-dom";

import { GoogleCallback } from "@/auth/google/googleCallback";
import { EmailOtp } from "@/pages/Auth/AuthOtp/EmailOtp/EmailOtp";
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
        path: "email-otp",
        element: <EmailOtp />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
    ],
  },
];
