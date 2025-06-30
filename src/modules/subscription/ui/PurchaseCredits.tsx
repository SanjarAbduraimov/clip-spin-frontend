import { CreditCard, PackageIcon } from "lucide-react";
import { useState } from "react";

import { useGetCreditPacks } from "@/modules/credit-pack/services/getCreditPacks";
import { useRedirectToCheckoutCreditPack } from "@/modules/credit-pack/services/redirectToCheckoutCreditPack";
import { CreditPack } from "@/modules/credit-pack/types/CreditPack";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { formatPrice } from "@/lib/formatPrice";

export const PurchaseCredits = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [selectedCreditPack, setSelectedCreditPack] =
    useState<CreditPack | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: creditPacks } = useGetCreditPacks();

  const { mutateAsync } = useRedirectToCheckoutCreditPack();

  const handleBuy = () => {
    if (!selectedCreditPack) return;
    setLoading(true);
    mutateAsync(selectedCreditPack._id).catch(() => {
      setLoading(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {creditPacks?.map((creditPack) => (
            <CreditPackCard
              key={creditPack._id}
              creditPack={creditPack}
              selected={selectedCreditPack === creditPack}
              onSelect={(cp) => setSelectedCreditPack(cp)}
            />
          ))}
        </div>
        <Button
          iconRight={<CreditCard size={18} />}
          disabled={loading || !selectedCreditPack}
          onClick={handleBuy}
        >
          Buy
        </Button>
      </DialogContent>
    </Dialog>
  );
};

function CreditPackCard({
  creditPack,
  selected,
  onSelect,
}: {
  creditPack: CreditPack;
  selected: boolean;
  onSelect: (creditPack: CreditPack) => void;
}) {
  return (
    <div
      onClick={() => {
        onSelect(creditPack);
      }}
      role="button"
      tabIndex={0}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-lg ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect(creditPack);
        }
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            <PackageIcon className="h-5 w-5" />
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              {creditPack.credits} Credits
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-800">
            {formatPrice(creditPack.price)}
          </div>
          <div className="text-xs text-gray-500">
            ${(creditPack.price / 100 / creditPack.credits).toFixed(3)}/credit
          </div>
        </div>
      </div>
    </div>
  );
}
