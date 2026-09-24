import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Tombol "Papan Jadwal": timbul saat diam, tenggelam (--shadow-press-1) saat ditekan.
 * Tiga varian sesuai §5.8: utama (kuningan), sekunder (kertas), hantu (teks).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold " +
    "transition-[transform,box-shadow] duration-(--motion-fast) ease-(--motion-ease-out) " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-(--shadow-elev-1) hover:-translate-y-px hover:shadow-(--shadow-elev-2) active:shadow-(--shadow-press-1)",
        secondary:
          "bg-card text-card-foreground border border-border shadow-(--shadow-elev-1) hover:-translate-y-px active:shadow-(--shadow-press-1)",
        ghost: "text-foreground hover:bg-accent/60",
        destructive:
          "bg-status-conflict text-white shadow-(--shadow-elev-1) hover:-translate-y-px active:shadow-(--shadow-press-1)",
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
