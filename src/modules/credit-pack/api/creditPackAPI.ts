import { axiosInstance } from "@/api";

import { CreditPack } from "../types/CreditPack";

export const creditPackAPI = {
  getCreditPacks: () =>
    axiosInstance
      .get<{ data: CreditPack[] }>("credit-packs")
      .then((res) => res.data.data),
  getPurchaseCreditPackLink: (id: string) =>
    axiosInstance
      .post<{ data: string }>(`credit-packs/${id}/checkout`)
      .then((res) => res.data.data),
};
