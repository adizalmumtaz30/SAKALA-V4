import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-sm">
      {/* Command bar — entry point utama, bukan lagi shortcut tersembunyi (§5.2 Design Spec v2) */}
      <button
        type="button"
        className="flex flex-1 max-w-md items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-(--shadow-xs) transition-colors hover:border-violet-300"
      >
        <span aria-hidden="true">⌘</span>
        <span>Cari guru, mapel, kelas, ruang…</span>
        <kbd className="ml-auto rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Tahun ajaran:</span>
        <span className="font-semibold text-foreground">Belum dipilih</span>
      </div>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
