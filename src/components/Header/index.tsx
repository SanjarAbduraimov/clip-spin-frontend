import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";

import { cn } from "../../lib/utils";
import { Button, IconButton } from "../Button";

import { Navigation } from "./Navigation";
import { HeaderProps } from "./types";

const Header = ({ className }: HeaderProps) => {
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
            <IconButton onClick={handleSignOut} variant="ghost" size="sm">
              <LogOut size={18} />
            </IconButton>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
