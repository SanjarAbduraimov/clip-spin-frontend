import { Toaster as Sonner } from "sonner";

import { useTheme } from "@/providers/ThemeProvider";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast text-white group-[.toaster]:bg-background group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!bg-bg-success-solid border-transparent",
          error: "!bg-bg-error-solid border-transparent",
          warning: "!bg-bg-warning-solid border-transparent",
          info: "!bg-[#36BFFA] border-transparent",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
