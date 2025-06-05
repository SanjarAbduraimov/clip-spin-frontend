import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { config } from "@/constants/config";

export const useAuthGoogle = () => {
  const [searchParams] = useSearchParams();

  return useCallback(async () => {
    try {
      const redirect = searchParams.get("redirect");

      window.location.href = `${config.apiBaseUrl}/auth/google/callback?redirect_url=${redirect}`;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error initiating Google sign-in",
      );
    }
  }, []);
};
