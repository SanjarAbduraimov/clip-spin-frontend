import { ProjectType } from "@/types";

export interface SubscriptionRes {
  _id: string;
  name: string;
  price: number;
  credits: number;
  project_type_prices: [
    {
      project_type: ProjectType.slide_show;
      credit_cost: number;
    },
    {
      project_type: ProjectType.text_audiogram;
      credit_cost: number;
    },
    {
      project_type: ProjectType.talking_head;
      credit_cost: number;
    },
  ];
  stripe_price_id: string;
}
