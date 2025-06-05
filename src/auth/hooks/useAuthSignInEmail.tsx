import { useMutation, UseMutationResult } from "@tanstack/react-query";

import http, { endpoints } from "@/services/api";

interface SignInEmailResponse {
  data: {
    code: number;
    code_hash: string;
  };
}

export const useAuthSignInEmail = (): UseMutationResult<
  SignInEmailResponse,
  Error,
  string,
  unknown
> => {
  return useMutation<SignInEmailResponse, Error, string>({
    mutationFn: (email: string) =>
      http
        .post<SignInEmailResponse>(endpoints.auth.sign_in_with_email, { email })
        .then((res) => res.data),
  });
};
