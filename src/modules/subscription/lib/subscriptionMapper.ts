import { ProjectType } from "@/types";

import { SubscriptionRes } from "../api/types/Subscription";
import { Subscription } from "../types/Subscription";

export const subscriptionMapper = (res: SubscriptionRes): Subscription => {
  return {
    _id: res._id,
    name: res.name,
    price: res.price,
    credits: res.credits,
    prices: res.project_type_prices.reduce(
      (acc, price) => {
        acc[price.project_type] = price.credit_cost;
        return acc;
      },
      {} as Record<ProjectType, number>,
    ),
  };
};
