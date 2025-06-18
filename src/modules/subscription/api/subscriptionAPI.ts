import { AxiosResponse } from "axios";

import { axiosInstance } from "@/api";

import { SubscriptionRes } from "./types/Subscription";

const BASE_PATH = "subscription-plans";

type SubscriptionAPI = {
  getPlans: () => Promise<SubscriptionRes[]>;
  getCheckoutLink: (id: string) => Promise<AxiosResponse<{ data: string }>>;
  getPurchaseCreditsLink: (amount: number) => Promise<string>;
};

export const subscriptionAPI: SubscriptionAPI = {
  getPlans: () =>
    axiosInstance
      .get<{ data: SubscriptionRes[] }>(BASE_PATH)
      .then((res) => res.data.data),
  getCheckoutLink: (id: string) =>
    axiosInstance.post<{ data: string }>(`${BASE_PATH}/${id}/checkout`),
  getPurchaseCreditsLink: (amount: number) =>
    axiosInstance
      .post<{
        data: string;
      }>(`${BASE_PATH}/purchase-credits`, { quantity: amount })
      .then((res) => res.data.data),
};
