import * as React from "react";
import { cn } from "@/lib/utils";

export type ReadinessState = "done" | "empty";

const READINESS_STYLE: Record<ReadinessState, string> = {
  done: "bg-violet-100 text-violet-700",
  empty: "bg-muted text-muted-foreground",
};

/**
 * Badge kesiapan untuk daftar periksa Beranda (§4.2).
 * Selalu ikon + label — tidak pernah warna saja (§33 Aksesibilitas).
 */
export function ReadinessBadge({
  state,
  label,
  className,
}: {
  state: ReadinessState;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        READINESS_STYLE[state],
        className,
      )}
    >
      <span aria-hidden="true">{state === "done" ? "✓" : "○"}</span>
      {label}
    </span>
  );
}
