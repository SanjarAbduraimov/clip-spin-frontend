import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PurchaseCredits } from "@/modules/subscription/ui/PurchaseCredits";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/Progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";

export const Usage = () => {
  const [open, setOpen] = useState(false);

  const { user } = useAuthContext();

  // const { data: plan } = useSubscriptionPlans();

  const planPurchasedCredits = user?.subscription?.monthly_credits;
  const usedPlanPurchasedCredits =
    (planPurchasedCredits?.total || 0) - (planPurchasedCredits?.remaining || 0);
  const boughtCredits = user?.subscription?.purchased_credits;
  const usedBoughtCredits =
    (boughtCredits?.total || 0) - (boughtCredits?.remaining || 0);

  return (
    <div className="container mx-auto max-w-[960px] px-4 py-8">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex-row items-center gap-4 space-y-0">
            <CardTitle asChild>
              <h1>Usage</h1>
            </CardTitle>
            {!user?.subscription && (
              <Link
                to="/pricing"
                className="flex transform items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
              >
                <span className="text-sm font-semibold">Get Credits</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium leading-none text-text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    User Monthly Credits
                  </p>
                  <p className="text-sm font-medium text-text-secondary">
                    {usedPlanPurchasedCredits}/
                    {planPurchasedCredits?.total || 0}
                  </p>
                </div>
                <Progress
                  value={
                    (usedPlanPurchasedCredits /
                      (planPurchasedCredits?.total || 0)) *
                    100
                  }
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium leading-none text-text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Add-on Credits
                  </p>
                  <p className="text-sm font-medium text-text-secondary">
                    {usedBoughtCredits}/{boughtCredits?.total || 0}
                  </p>
                </div>
                <Progress
                  value={
                    (usedBoughtCredits / (boughtCredits?.total || 0)) * 100
                  }
                />
              </div>

              <div className="flex items-baseline justify-between">
                <p className="text-sm text-text-secondary">
                  Once you run out of credits, you will not be able to generate
                  videos until you purchase more credits.
                </p>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setOpen(true);
                      }}
                      disabled={!user?.subscription}
                    >
                      Get Credits
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {!user?.subscription ? (
                      <p>
                        You can only purchase credits when you have a
                        subscription plan.
                      </p>
                    ) : null}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PurchaseCredits open={open} onOpenChange={setOpen} />
    </div>
  );
};
