"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  label: string | null;
  items: NavItem[];
}

/** Struktur navigasi §4.1 — flat list, tanpa perspektif Sekolah, tanpa "periode". */
const NAV_GROUPS: NavGroup[] = [
  {
    label: null,
    items: [{ label: "Beranda", href: "/" }],
  },
  {
    label: "Data",
    items: [
      { label: "Guru", href: "/data/guru" },
      { label: "Mapel", href: "/data/mapel" },
      { label: "Kelas", href: "/data/kelas" },
      { label: "Ruang", href: "/data/ruang" },
      { label: "Beban Mengajar", href: "/data/beban-mengajar" },
    ],
  },
  {
    label: null,
    items: [
      { label: "Struktur Waktu", href: "/struktur-waktu" },
      { label: "Jadwal", href: "/jadwal" },
      { label: "Absensi", href: "/absensi" },
      { label: "Laporan", href: "/laporan" },
      { label: "Riwayat", href: "/riwayat" },
    ],
  },
  {
    label: null,
    items: [{ label: "Pengaturan", href: "/pengaturan" }],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col gap-6 border-r border-border bg-card px-3 py-6 transition-[width] duration-(--motion-normal) ease-(--motion-ease-out)",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between px-1">
        {!collapsed && (
          <span className="font-serif text-2xl italic font-medium text-foreground">
            Sakala
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Perlebar sidebar" : "Ciutkan sidebar"}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-5">
        {NAV_GROUPS.map((group, i) => (
          <div key={i} className="flex flex-col gap-1">
            {group.label && !collapsed && (
              <span className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
              </span>
            )}
            {group.items.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-(--motion-fast)",
                    collapsed && "text-center",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {collapsed ? item.label.charAt(0) : item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
