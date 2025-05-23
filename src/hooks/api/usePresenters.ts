import { useQuery } from "@tanstack/react-query";

import { getPresenters, getPresenter, getFeaturedPresenters } from "@/api";
import { PresenterType } from "@/types";

// Hook to fetch all presenters
export const usePresenters = (type?: PresenterType) => {
  return useQuery({
    queryKey: ["presenters", type],
    queryFn: () => getPresenters(type),
  });
};

// Hook to fetch a single presenter by ID
export const usePresenter = (id: string) => {
  return useQuery({
    queryKey: ["presenter", id],
    queryFn: () => getPresenter(id),
    enabled: !!id,
  });
};

// Hook to fetch featured presenters
export const useFeaturedPresenters = () => {
  return useQuery({
    queryKey: ["presenters", "featured"],
    queryFn: getFeaturedPresenters,
  });
};
