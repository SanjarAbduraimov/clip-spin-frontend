import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "@/hooks/useToast";

import { subscriptionAPI } from "../api/subscriptionAPI";
import { subscriptionMapper } from "../lib/subscriptionMapper";

export const useSubscriptionPlans = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => subscriptionAPI.getPlans(),
    select: (res) =>
      res.map(subscriptionMapper).sort((a, b) => a.price - b.price),
  });

  return {
    data,
    isLoading,
  };
};

export const useGetCheckoutLink = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) =>
      subscriptionAPI.getCheckoutLink(id).then((res) => res.data.data),
  });

  return {
    mutateAsync,
  };
};

export const useGetPurchaseCreditsLink = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (amount: number) =>
      subscriptionAPI.getPurchaseCreditsLink(amount),
    onSuccess: (link) => {
      toast({
        title: "Success",
        description: "Redirecting to payment page",
      });
      window.location.href = link;
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to get purchase credits link",
        variant: "destructive",
      });
    },
  });

  return {
    mutateAsync,
  };
};
