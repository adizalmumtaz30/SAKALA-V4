import { teacherRepository } from "@/data/teacher.repository";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReadinessBadge } from "@/components/ui/readiness-badge";
import { GuruForm } from "./guru-form";

export default async function GuruPage() {
  const teachers = await teacherRepository.list();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <header>
        <h1 className="font-serif text-2xl font-semibold text-foreground">Guru</h1>
        <p className="text-sm text-muted-foreground">
          {teachers.length} guru terdaftar.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Tambah Guru</CardTitle>
        </CardHeader>
        <CardContent>
          <GuruForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Guru</CardTitle>
        </CardHeader>
        <CardContent>
          {teachers.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada guru.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {teachers.map((t) => (
                <li key={t.id} className="flex items-center justify-between py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {t.name}
                    </span>
                    {t.email && (
                      <span className="text-xs text-muted-foreground">{t.email}</span>
                    )}
                  </div>
                  <ReadinessBadge
                    state={t.isActive ? "done" : "empty"}
                    label={t.isActive ? "Aktif" : "Nonaktif"}
                  />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
