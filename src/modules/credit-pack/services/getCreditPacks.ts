import { useQuery } from "@tanstack/react-query";

import { creditPackAPI } from "../api/creditPackAPI";

export const useGetCreditPacks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["credit-packs"],
    queryFn: () => creditPackAPI.getCreditPacks(),
  });

  return {
    data,
    isLoading,
  };
};
