import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { creditPackAPI } from "../api/creditPackAPI";

export const useRedirectToCheckoutCreditPack = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => creditPackAPI.getPurchaseCreditPackLink(id),
    onSuccess: (link: string) => {
      toast.success("Redirecting to payment page");
      window.location.href = link;
    },
    onError: () => {
      toast.error("Failed to get purchase credit pack link");
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
