import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import http, { endpoints } from "@/services/api";

import { STORAGE_KEY } from "../context/authProvider";
import { Types } from "../types";

import { useAuthContext } from "./useAuthContext";

interface SignInEmailResponse {
  data: {
    access_token: string;
  };
}

export const useVerifyEmail = (): UseMutationResult<
  SignInEmailResponse,
  Error,
  {
    email: string;
    code: number;
    code_hash: string;
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
    mutationFn: ({
      email,
      code,
      code_hash,
      ...values
    }: {
      email: string;
      code: number;
      code_hash: string;
    }) =>
      http
        .post<{
          data: {
            access_token: string;
          };
        }>(endpoints.auth.verify_email, { email, code, code_hash, ...values })
        .then((res) => res.data),
  });
};
