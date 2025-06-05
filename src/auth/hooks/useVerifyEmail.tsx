import { useMutation } from "@tanstack/react-query";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import http, { endpoints } from "@/services/api";

import { STORAGE_KEY } from "../context/authProvider";
import { Types } from "../types";

import { useAuthContext } from "./useAuthContext";

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  return useMutation({
    onSuccess: (res) => {
      localStorage.setItem(STORAGE_KEY, res.data.data.access_token);

      dispatch({
        type: Types.INITIAL,
        payload: {
          user: {
            accessToken: res.data.data.access_token,
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
    }: {
      email: string;
      code: number;
      code_hash: string;
    }) =>
      http.post<{
        data: {
          access_token: string;
        };
      }>(endpoints.auth.verify_email, { email, code, code_hash }),
  });
};
