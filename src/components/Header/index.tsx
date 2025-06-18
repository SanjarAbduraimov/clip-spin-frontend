import { CreditCard, LogOut, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PurchaseCredits } from "@/modules/subscription/ui/PurchaseCredits";

import { useAuthContext } from "@/auth/hooks/useAuthContext";

import { cn } from "../../lib/utils";
import { Button, IconButton } from "../Button";

import { Navigation } from "./Navigation";
import { HeaderProps } from "./types";

const Header = ({ className }: HeaderProps) => {
  const [purchaseCredsOpen, setPurchaseCredsOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
  };

  return (
    <header className={cn("w-full bg-white py-4 shadow-sm", className)}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="no-underline">
          <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent">
            ClipSpin
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Navigation />
          {user ? (
            <>
              {!user.subscription ? (
                // Unsubscribed state - encouraging CTA
                <Link
                  to="/pricing"
                  className="flex transform items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="text-sm font-semibold">Get Credits</span>
                </Link>
              ) : (
                // Has credits - normal display
                <div className="flex items-center rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 dark:border-purple-700 dark:from-purple-900/20 dark:to-blue-900/20">
                  <CreditCard className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                    {user.subscription?.total_credits} Credits
                  </span>
                  <button
                    type="button"
                    onClick={() => setPurchaseCredsOpen(true)}
                    className="ml-2 rounded-full p-1 transition-colors hover:bg-purple-200 dark:hover:bg-purple-800"
                  >
                    <Plus className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                  </button>
                </div>
              )}
              <IconButton onClick={handleSignOut} variant="ghost" size="sm">
                <LogOut size={18} />
              </IconButton>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>

      <PurchaseCredits
        open={purchaseCredsOpen}
        onOpenChange={setPurchaseCredsOpen}
      />
    </header>
  );
};

export default Header;
