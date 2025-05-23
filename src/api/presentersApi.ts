import { Presenter, PresenterType } from "@/types";

import { mockPresenters } from "./mockData";

// Get all available presenters
export const getPresenters = async (type?: PresenterType) => {
  return new Promise<Presenter[]>((resolve) => {
    setTimeout(() => {
      if (type) {
        resolve(mockPresenters.filter((p) => p.type === type));
      } else {
        resolve([...mockPresenters]);
      }
    }, 700);
  });
};

// Get a specific presenter by ID
export const getPresenter = async (id: string) => {
  return new Promise<Presenter>((resolve, reject) => {
    setTimeout(() => {
      const presenter = mockPresenters.find((p) => p.id === id);
      if (presenter) {
        resolve({ ...presenter });
      } else {
        reject(new Error("Presenter not found"));
      }
    }, 500);
  });
};

// Get featured presenters
export const getFeaturedPresenters = async () => {
  return new Promise<Presenter[]>((resolve) => {
    setTimeout(() => {
      // For mock purposes, we'll return the first presenter of each type
      const aiPresenter = mockPresenters.find((p) => p.type === "ai");
      const humanPresenter = mockPresenters.find((p) => p.type === "human");
      const featured = [aiPresenter, humanPresenter].filter(
        Boolean,
      ) as Presenter[];
      resolve(featured);
    }, 600);
  });
};
