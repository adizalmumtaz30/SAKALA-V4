import { getReadinessCounts } from "@/application/readiness.usecases";
import { BentoGrid, BentoTile } from "@/components/ui/bento";
import { ReadinessBadge } from "@/components/ui/readiness-badge";

// Data berubah tiap ada input operator — jangan di-prerender statis saat build.
export const dynamic = "force-dynamic";

interface ReadinessItem {
  label: string;
  count: number;
}

export default async function BerandaPage() {
  const counts = await getReadinessCounts();

  const items: ReadinessItem[] = [
    { label: "Guru", count: counts.teachers },
    { label: "Mapel", count: counts.subjects },
    { label: "Kelas", count: counts.classes },
    { label: "Ruang", count: counts.rooms },
  ];

  const readyCount = items.filter((i) => i.count > 0).length + 2; // + Beban Mengajar + Jam ke- di bawah
  const totalSteps = 6;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          Konteks tahun ajaran belum dipilih
        </p>
        <h1 className="font-serif text-3xl italic font-medium text-foreground">
          Beranda
        </h1>
      </header>

      {/* Bento grid — hanya untuk ringkasan (§5.1), Schedule Canvas tetap grid fungsional */}
      <BentoGrid>
        <BentoTile span="2x2" className="justify-center">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-muted-foreground">
              Kesiapan Penjadwalan
            </span>
            <span className="font-serif text-5xl italic font-medium text-foreground">
              {readyCount}
              <span className="text-2xl text-muted-foreground not-italic">
                {" "}
                / {totalSteps}
              </span>
            </span>
            <ReadinessBadge
              state={readyCount === totalSteps ? "done" : "empty"}
              label={
                readyCount === totalSteps
                  ? "Siap menjadwalkan"
                  : "Belum siap menjadwalkan"
              }
            />
          </div>
        </BentoTile>

        {items.map((item) => (
          <BentoTile key={item.label}>
            <span className="text-sm font-medium text-muted-foreground">
              {item.label}
            </span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-semibold text-foreground">
                {item.count}
              </span>
              <ReadinessBadge
                state={item.count > 0 ? "done" : "empty"}
                label={item.count > 0 ? "Ada data" : "Kosong"}
              />
            </div>
          </BentoTile>
        ))}

        <BentoTile span="2x1">
          <span className="text-sm font-medium text-muted-foreground">
            Beban Mengajar
          </span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-foreground">
              {counts.teachingAssignments}
            </span>
            <ReadinessBadge
              state={counts.teachingAssignments > 0 ? "done" : "empty"}
              label={counts.teachingAssignments > 0 ? "Ada data" : "Kosong"}
            />
          </div>
        </BentoTile>

        <BentoTile span="2x1">
          <span className="text-sm font-medium text-muted-foreground">
            Jam ke- Aktif
          </span>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold text-foreground">
              {counts.timeSlotsTeaching}
            </span>
            <ReadinessBadge
              state={counts.timeSlotsTeaching > 0 ? "done" : "empty"}
              label={counts.timeSlotsTeaching > 0 ? "Ada slot" : "Kosong"}
            />
          </div>
        </BentoTile>
      </BentoGrid>

      <p className="text-xs text-muted-foreground">
        Progres ditampilkan sebagai daftar periksa, bukan langkah paksa. Halaman
        pengisian data menyusul di tahap berikutnya.
      </p>
    </main>
  );
}
