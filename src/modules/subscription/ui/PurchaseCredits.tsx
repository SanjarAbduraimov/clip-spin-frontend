import { CreditCard01 } from "@untitled-ui/icons-react";
import { CreditCard } from "lucide-react";
import { useState } from "react";

import { Label } from "@/components/_form/Label";
import { NumberInput } from "@/components/_form/NumberInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/Alert";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";

import { useGetPurchaseCreditsLink } from "../hooks/useSubscription";

export const PurchaseCredits = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = useGetPurchaseCreditsLink();

  const handleBuy = () => {
    setLoading(true);
    mutateAsync(amount).catch(() => {
      setLoading(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
        </DialogHeader>
        <div>
          <Label className="mb-2">Credits</Label>
          <NumberInput
            value={amount}
            onChange={setAmount}
            iconLeft={<CreditCard01 />}
          />
          <Alert className="mt-4 flex flex-row items-baseline justify-between">
            <AlertTitle>Credits to purchase:</AlertTitle>
            <AlertDescription>
              <p>{amount}</p>
            </AlertDescription>
          </Alert>
        </div>
        <Button
          iconRight={<CreditCard size={18} />}
          disabled={loading}
          onClick={handleBuy}
        >
          Buy
        </Button>
      </DialogContent>
    </Dialog>
  );
};
