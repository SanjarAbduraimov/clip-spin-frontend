import { FC } from "react";

import { useSubscriptionPlans } from "@/modules/subscription/hooks/useSubscription";
import PricingCard from "@/modules/subscription/ui/PricingCard";

import { PageLoading } from "@/components/PageLoading";

export const Pricing: FC = () => {
  const { data: plans, isLoading } = useSubscriptionPlans();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-4 py-8 md:flex-row">
      {plans && plans.map((plan) => <PricingCard key={plan._id} plan={plan} />)}
    </div>
  );
};
