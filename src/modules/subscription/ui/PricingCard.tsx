import { Check, CreditCard, Zap } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { toast } from "@/hooks/useToast";
import { formatPrice } from "@/lib/formatPrice";
import { ProjectType } from "@/types";

import { useGetCheckoutLink } from "../hooks/useSubscription";
import { Subscription } from "../types/Subscription";

interface PricingCardProps {
  plan: Subscription;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const { mutateAsync } = useGetCheckoutLink();

  const [creatingPurchaseLink, setCreatingPurchaseLink] = useState(false);

  const slideShowCreditsCost = plan.prices[ProjectType.slide_show];

  const textAudiogramCreditsCost = plan.prices[ProjectType.text_audiogram];

  const talkingHeadCreditsCost = plan.prices[ProjectType.talking_head];

  const professionalCreditsCost = plan.prices[ProjectType.professional];

  const handleGetStarted = () => {
    setCreatingPurchaseLink(true);
    mutateAsync(plan._id)
      .then((url) => {
        window.location.href = url;
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to create purchase link",
          variant: "destructive",
        });
        setCreatingPurchaseLink(false);
      });
  };

  return (
    <div className="max-w-sm">
      <div className="relative rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
        {/* Popular Badge */}
        {/* <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </div>
        </div> */}

        <div className="p-6 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {plan.name}
          </h3>
        </div>

        <div className="px-6 pb-6 text-center">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">
              {formatPrice(plan.price)}
            </span>
            <span className="ml-1 text-xl text-gray-600 dark:text-gray-400">
              /month
            </span>
          </div>

          {/* Credits Badge */}
          <Badge className="mt-4 inline-flex items-center rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 dark:border-purple-700 dark:from-purple-900/20 dark:to-blue-900/20">
            <CreditCard className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="font-semibold text-purple-800 dark:text-purple-300">
              {plan.credits} Credits Included
            </span>
          </Badge>
        </div>

        <div className="px-6 pb-6">
          <ul className="space-y-3">
            <li className="flex items-center">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {Math.floor(plan.credits / (slideShowCreditsCost || 0))} Slide
                Shows ({slideShowCreditsCost} credits each)
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {Math.floor(plan.credits / (textAudiogramCreditsCost || 0))}{" "}
                Text Audiograms ({textAudiogramCreditsCost} credits each)
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {Math.floor(plan.credits / (talkingHeadCreditsCost || 0))}{" "}
                Talking Heads ({talkingHeadCreditsCost} credits each)
              </span>
            </li>
            {professionalCreditsCost &&
              plan.credits >= professionalCreditsCost && (
                <li className="flex items-center">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {Math.floor(plan.credits / (professionalCreditsCost || 0)) *
                      3}{" "}
                    Professional Editor ({professionalCreditsCost} credits each)
                  </span>
                </li>
              )}
            <li className="flex items-center">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                AI Script Generation
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                HD Video Export
              </span>
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Priority Support
              </span>
            </li>
          </ul>
        </div>

        <div className="px-6 pb-6">
          <Button
            disabled={creatingPurchaseLink}
            onClick={handleGetStarted}
            className="w-full"
          >
            {creatingPurchaseLink ? "Redirecting..." : "Get Started"}
          </Button>
        </div>

        {/* <div className="border-t border-gray-200 px-6 pb-6 pt-4 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need more credits?
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
              Buy additional credits at{" "}
              <span className="text-purple-600 dark:text-purple-400">
                $1 per credit
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PricingCard;
