import { getReadinessCounts } from "@/application/readiness.usecases";

// Data berubah tiap ada input operator — jangan di-prerender statis saat build.
export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReadinessBadge } from "@/components/ui/readiness-badge";

interface ReadinessItem {
  label: string;
  count: number;
  hint: string;
}

export default async function BerandaPage() {
  const counts = await getReadinessCounts();

  const items: ReadinessItem[] = [
    { label: "Guru", count: counts.teachers, hint: "Data guru sekolah" },
    { label: "Mapel", count: counts.subjects, hint: "Mata pelajaran & warna identitas" },
    { label: "Kelas", count: counts.classes, hint: "Kelas tahun ajaran berjalan" },
    { label: "Ruang", count: counts.rooms, hint: "Ruang kelas & ruang khusus" },
    {
      label: "Beban Mengajar",
      count: counts.teachingAssignments,
      hint: "Guru + Mapel + Kelas + JP",
    },
    {
      label: "Jam ke-",
      count: counts.timeSlotsTeaching,
      hint: "Struktur waktu mengajar aktif",
    },
  ];

  const readyCount = items.filter((i) => i.count > 0).length;

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          Konteks tahun ajaran belum dipilih
        </p>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Beranda SAKALA
        </h1>
        <p className="text-sm text-muted-foreground">
          Workspace akademik sekolah — data master, Jam ke-, dan jadwal.
        </p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Kesiapan Penjadwalan</CardTitle>
              <CardDescription>
                {readyCount} dari {items.length} langkah sudah ada isinya.
              </CardDescription>
            </div>
            <ReadinessBadge
              state={readyCount === items.length ? "done" : "empty"}
              label={
                readyCount === items.length
                  ? "Siap menjadwalkan"
                  : "Belum siap menjadwalkan"
              }
            />
          </div>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y divide-border">
            {items.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.hint}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ReadinessBadge
                    state={item.count > 0 ? "done" : "empty"}
                    label={item.count > 0 ? `${item.count} data` : "Belum diisi"}
                  />
                  <Button variant="secondary" size="sm" type="button" disabled>
                    Isi sekarang
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Progres ditampilkan sebagai daftar periksa, bukan langkah paksa. Halaman
        pengisian data (Guru, Mapel, Kelas, Ruang, Beban Mengajar, Struktur Waktu)
        menyusul di tahap berikutnya — tombol di atas sengaja dinonaktifkan dulu.
      </p>
    </main>
  );
}
