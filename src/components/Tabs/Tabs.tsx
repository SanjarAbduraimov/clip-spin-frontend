import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "flex gap-1 data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center relative",
  {
    compoundVariants: [
      {
        class: "rounded-lg p-1",
        color: "border",
        size: "sm",
      },
      {
        class: "rounded-xl p-1.5",
        color: "border",
        size: "md",
      },
    ],
    defaultVariants: {
      color: "brand",
      fullWidth: false,
      size: "sm",
    },
    variants: {
      color: {
        border:
          "bg-bg-secondary-alt border border-solid border-border-secondary",
        brand: "",
        gray: "",
        underline:
          "before:absolute before:bg-border-secondary data-[orientation=horizontal]:before:bottom-0 data-[orientation=horizontal]before:right-0 data-[orientation=horizontal]before:left-0 data-[orientation=horizontal]before:w-full data-[orientation=horizontal]before:h-[1px] data-[orientation=vertical]:before:top-0 data-[orientation=vertical]:before:left-0 data-[orientation=vertical]:before:bottom-0 data-[orientation=vertical]:before:h-full data-[orientation=vertical]:before:w-[1px]",
      },
      fullWidth: {
        false: "",
        true: "[&>*]:grow",
      },
      size: {
        md: "",
        sm: "",
      },
    },
  },
);

interface TabsListProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
      "color"
    >,
    VariantProps<typeof tabsListVariants> {}
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, color, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ color, fullWidth, size }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;
// Colors/Text/text-brand-secondary (700)
const tabsTriggerVariants = cva(
  "relative whitespace-nowrap text-sm text-center text-text-quaternary data-[orientation=vertical]:text-left font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    compoundVariants: [
      {
        class:
          "pt-0 pb-2.5 px-1 data-[orientation=vertical]:py-2 data-[orientation=vertical]:px-3",
        color: "underline",
        size: "sm",
      },
      {
        class:
          "pt-0 pb-2.5 px-1 data-[orientation=vertical]:py-2.5 data-[orientation=vertical]:px-3.5",
        color: "underline",
        size: "md",
      },
    ],
    defaultVariants: {
      color: "brand",
      size: "sm",
    },
    variants: {
      color: {
        border:
          "rounded-sm data-[state=active]:bg-bg-primary-alt data-[state=active]:shadow-sm data-[state=active]:text-text-secondary hover:bg-bg-primary-alt hover:shadow-sm hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        brand:
          "rounded-sm data-[state=active]:bg-bg-brand-primary-alt data-[state=active]:text-text-brand-secondary hover:bg-bg-brand-primary-alt hover:text-text-brand-secondary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        gray: "rounded-sm data-[state=active]:bg-bg-active data-[state=active]:text-text-secondary hover:bg-bg-active hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        underline:
          "border-b-2 border-solid border-transparent data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l-2 data-[state=active]:border-fg-brand-primary-alt data-[state=active]:text-text-brand-secondary hover:border-fg-brand-primary-alt hover:text-text-brand-secondary",
      },
      size: {
        md: "py-2.5 px-3",
        sm: "py-2 px-3",
      },
    },
  },
);
interface TabsTriggerProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
      "color" | "size"
    >,
    VariantProps<typeof tabsTriggerVariants> {}
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, color, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ color, size }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
