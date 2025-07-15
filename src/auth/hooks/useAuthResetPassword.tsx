import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import http, { endpoints } from "@/services/api";

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const useResetPassword = (): UseMutationResult<
  ResetPasswordResponse,
  Error,
  {
    token: string;
    password: string;
  },
  unknown
> => {
  const navigate = useNavigate();

  return useMutation({
    onSuccess: () => {
      toast.success("Password has been reset successfully!");
      navigate("/auth/sign-in");
    },

    mutationFn: ({ token, password }: { token: string; password: string }) =>
      http
        .post<ResetPasswordResponse>(endpoints.auth.reset_password, {
          token,
          password,
        })
        .then((res) => res.data),
  });
};
