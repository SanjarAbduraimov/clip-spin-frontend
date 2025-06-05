import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { STORAGE_KEY } from "../context/authProvider";

export const useAuthGoogleCallback = () => {
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken: string | null = urlParams.get("token");
      if (!accessToken) {
        toast.error("Missing tokens in the URL");
      }

      if (typeof accessToken === "string") {
        localStorage.setItem(STORAGE_KEY, accessToken);
      }

      toast.success("Successfully signed in!");

      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error handling Google callback");
    }
  }, []);
};
