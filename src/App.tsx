import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/Sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Router } from "@/routes";

import "./i18n";
import "./App.css";

import { AuthProvider } from "./auth/context";
import { TooltipProvider } from "./components/Tooltip";
import { queryClient } from "./services/react-query";

const App = () => {
  return (
    <AuthProvider>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Router />
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
