import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

import http, { endpoints } from "@/services/api";

interface ForgetPasswordResponse {
  success: boolean;
  message: string;
}

export const useForgetPassword = (): UseMutationResult<
  ForgetPasswordResponse,
  Error,
  {
    email: string;
  },
  unknown
> => {
  return useMutation({
    onSuccess: () => {
      toast.success("Password reset link has been sent to your email!");
    },

    mutationFn: ({ email }: { email: string }) =>
      http
        .post<ForgetPasswordResponse>(endpoints.auth.forget_password, { email })
        .then((res) => res.data),
  });
};
