import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAKALA — Workspace Akademik Sekolah",
  description:
    "Workspace digital akademik sekolah: data master, struktur waktu (Jam ke-), dan penjadwalan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${GeistSans.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Dark-first: set tema sebelum paint, hindari flash (§3.6 Design Spec v2) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Aksen serif editorial — dipakai tipis-tipis di angka/judul hero saja */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
