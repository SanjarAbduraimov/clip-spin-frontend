import { useMutation } from "@tanstack/react-query";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from "axios";

import http, { endpoints } from "@/services/api";

export const useAuthSignInEmail = () => {
  return useMutation({
    mutationFn: (email: string) =>
      http.post<{
        data: {
          code: number;
          code_hash: string;
        };
      }>(endpoints.auth.sign_in_with_email, { email }),
  });
};
