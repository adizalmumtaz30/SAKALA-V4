"use client";

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

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-6 border-r border-border bg-card px-4 py-6">
      <div className="px-2">
        <span className="font-serif text-2xl italic font-medium text-foreground">
          Sakala
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-5">
        {NAV_GROUPS.map((group, i) => (
          <div key={i} className="flex flex-col gap-1">
            {group.label && (
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
                  className={cn(
                    "rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-(--motion-fast)",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
