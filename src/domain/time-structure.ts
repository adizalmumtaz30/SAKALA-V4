/**
 * Domain: Struktur Waktu dan "Jam ke-".
 * WAJIB: jangan pernah memakai kata "periode"/"period"/"P4" di simbol atau UI.
 * Sumber: PROJECT_KNOWLEDGE §4, §9, §13 (ADR-004) | MASTER_BUILD_SPEC §6.3
 */

export type TimeSlotType = "TEACHING" | "BREAK" | "ACTIVITY" | "INACTIVE";

export interface TimeStructure {
  id: string;
  academicYearId: string;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  timeStructureId: string;
  /** 1 = Senin ... 7 = Minggu */
  dayOfWeek: number;
  /** Urutan fisik di hari itu, termasuk istirahat/kegiatan/non-aktif. */
  sequenceNo: number;
  /** Nomor "Jam ke-" — hanya terisi untuk slot TEACHING yang aktif. Otomatis. */
  jamKe: number | null;
  label: string;
  slotType: TimeSlotType;
  startsAt: string | null;
  endsAt: string | null;
  durationMinutes: number;
  jpValue: number;
  isActive: boolean;
}

/**
 * Menomori ulang "Jam ke-" untuk satu hari di satu struktur waktu.
 * Hanya slot TEACHING aktif yang mendapat nomor, diurutkan menurut sequence_no.
 * Cermin dari fungsi Postgres renumber_jam_ke() (§6.3) — dipakai untuk pratinjau
 * di klien sebelum konfirmasi ke server, bukan sebagai sumber kebenaran.
 */
export function renumberJamKe(slots: TimeSlot[], dayOfWeek: number): TimeSlot[] {
  const daySlots = slots
    .filter((s) => s.dayOfWeek === dayOfWeek)
    .sort((a, b) => a.sequenceNo - b.sequenceNo);

  let counter = 0;
  const numbered = new Map<string, number | null>();
  for (const slot of daySlots) {
    if (slot.slotType === "TEACHING" && slot.isActive) {
      counter += 1;
      numbered.set(slot.id, counter);
    } else {
      numbered.set(slot.id, null);
    }
  }

  return slots.map((s) =>
    s.dayOfWeek === dayOfWeek ? { ...s, jamKe: numbered.get(s.id) ?? null } : s,
  );
}
