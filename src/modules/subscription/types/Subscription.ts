import { ProjectType } from "@/types";

export interface Subscription {
  _id: string;
  name: string;
  price: number;
  credits: number;
  prices: Record<ProjectType, number>;
}
