import { FC } from "react";

import { useSubscriptionPlans } from "@/modules/subscription/hooks/useSubscription";
import PricingCard from "@/modules/subscription/ui/PricingCard";

import { PageLoading } from "@/components/PageLoading";

export const Pricing: FC = () => {
  const { data, isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return <PageLoading />;
  }

  return <div className="py-8">{data && <PricingCard plan={data} />}</div>;
};
