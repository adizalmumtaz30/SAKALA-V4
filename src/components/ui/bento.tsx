import * as React from "react";
import { cn } from "@/lib/utils";

type BentoSpan = "1x1" | "2x1" | "2x2";

const SPAN_CLASS: Record<BentoSpan, string> = {
  "1x1": "col-span-1 row-span-1 p-5",
  "2x1": "col-span-2 row-span-1 p-6",
  "2x2": "col-span-2 row-span-2 p-8",
};

/**
 * Kartu bento untuk Beranda & Laporan (§5.1 Design Spec v2).
 * HANYA untuk halaman ringkasan — jangan pakai di Schedule Canvas/tabel data.
 */
export function BentoTile({
  span = "1x1",
  className,
  children,
}: {
  span?: BentoSpan;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-border bg-card shadow-(--shadow-sm) transition-shadow duration-(--motion-normal) ease-(--motion-ease-out) hover:shadow-(--shadow-md)",
        SPAN_CLASS[span],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid auto-rows-[minmax(96px,auto)] grid-cols-4 gap-4">
      {children}
    </div>
  );
}
