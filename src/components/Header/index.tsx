import { CreditCard, LogOut, Menu, Plus, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={cn("w-full bg-white py-4 shadow-sm", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="no-underline" onClick={closeMobileMenu}>
            <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              ClipSpin
            </h1>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
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
                  <div className="flex items-center rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-2 dark:border-purple-700 dark:from-purple-900/20 dark:to-blue-900/20 lg:px-4">
                    <CreditCard className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold text-purple-800 dark:text-purple-300 lg:text-sm">
                      <span className="hidden sm:inline">
                        {user.subscription?.total_credits} Credits
                      </span>
                      <span className="sm:hidden">
                        {user.subscription?.total_credits}
                      </span>
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

          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <div className="flex items-center gap-2 md:hidden">
                {!user.subscription ? (
                  <Link
                    to="/pricing"
                    className="flex transform items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 text-white transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="mr-1.5 h-3 w-3" />
                    <span className="text-xs font-semibold">Credits</span>
                  </Link>
                ) : (
                  <div className="flex items-center rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-2.5 py-1.5 dark:border-purple-700 dark:from-purple-900/20 dark:to-blue-900/20">
                    <CreditCard className="mr-1.5 h-3 w-3 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs font-semibold text-purple-800 dark:text-purple-300">
                      {user.subscription?.total_credits}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPurchaseCredsOpen(true)}
                      className="ml-1.5 rounded-full p-0.5 transition-colors hover:bg-purple-200 dark:hover:bg-purple-800"
                    >
                      <Plus className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="md:hidden">
              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="sm"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </IconButton>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 border-t border-gray-200 pt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Navigation />
              {user ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Button size="sm" asChild className="w-full">
                  <Link to="/auth/sign-in" onClick={closeMobileMenu}>
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <PurchaseCredits
        open={purchaseCredsOpen}
        onOpenChange={setPurchaseCredsOpen}
      />
    </header>
  );
};

export default Header;
