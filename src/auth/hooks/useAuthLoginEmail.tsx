import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Types } from "@/auth/types";
import http, { endpoints } from "@/services/api";
import { useAuthContext } from "./useAuthContext";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { STORAGE_KEY } from "../context/authProvider";

interface SignInEmailResponse {
  data: {
    access_token: string;
  };
}

export const useLoginWithEmail = (): UseMutationResult<
  SignInEmailResponse,
  Error,
  {
    email: string;
    password: string;
  },
  unknown
> => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  return useMutation({
    onSuccess: (res) => {
      localStorage.setItem(STORAGE_KEY, res.data.access_token);

      dispatch({
        type: Types.INITIAL,
        payload: {
          user: {
            accessToken: res.data.access_token,
          },
        },
      });

      toast.success("Successfully signed in!");

      navigate("/");
    },

    mutationFn: ({ email, password }: { email: string; password: string }) =>
      http
        .post<{
          data: {
            access_token: string;
          };
        }>(endpoints.auth.login_with_email, { email, password })
        .then((res) => res.data),
  });
};
