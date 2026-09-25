import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Tombol "Signal": flat-elevated modern, aksen violet hemat, motion expo-out.
 * Tiga varian: utama (violet solid + glow), sekunder (mist, border tipis), hantu (teks).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium " +
    "transition-all duration-(--motion-fast) ease-(--motion-ease-out) " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "focus-visible:outline-none focus-visible:shadow-(--shadow-focus) " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-(--shadow-sm) hover:shadow-(--shadow-glow) hover:-translate-y-0.5 active:translate-y-0 active:shadow-(--shadow-xs)",
        secondary:
          "bg-card text-card-foreground border border-border shadow-(--shadow-xs) hover:border-violet-300 hover:-translate-y-0.5 hover:shadow-(--shadow-sm) active:translate-y-0",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-status-conflict text-white shadow-(--shadow-sm) hover:-translate-y-0.5 hover:shadow-(--shadow-md) active:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
