export function Topbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Konteks tahun ajaran:</span>
        <span className="font-semibold text-foreground">Belum dipilih</span>
      </div>
    </header>
  );
}
