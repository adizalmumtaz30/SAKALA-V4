import "server-only";
import { createServerSupabaseClient } from "@/data/supabase-server";

export interface ReadinessCounts {
  teachers: number;
  subjects: number;
  classes: number;
  rooms: number;
  teachingAssignments: number;
  timeSlotsTeaching: number;
}

/**
 * Kesiapan Penjadwalan (§4.2): 6 langkah dengan status.
 * Hitung sederhana lintas sekolah — belum terikat konteks tahun ajaran
 * (cookie konteks tahun ajaran per browser masih Fase 4 lanjutan).
 */
export async function getReadinessCounts(): Promise<ReadinessCounts> {
  const supabase = createServerSupabaseClient();

  const [teachers, subjects, classes, rooms, teachingAssignments, timeSlots] =
    await Promise.all([
      supabase.from("teachers").select("id", { count: "exact", head: true }),
      supabase.from("subjects").select("id", { count: "exact", head: true }),
      supabase.from("classes").select("id", { count: "exact", head: true }),
      supabase.from("rooms").select("id", { count: "exact", head: true }),
      supabase
        .from("teaching_assignments")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("time_slots")
        .select("id", { count: "exact", head: true })
        .eq("slot_type", "TEACHING"),
    ]);

  return {
    teachers: teachers.count ?? 0,
    subjects: subjects.count ?? 0,
    classes: classes.count ?? 0,
    rooms: rooms.count ?? 0,
    teachingAssignments: teachingAssignments.count ?? 0,
    timeSlotsTeaching: timeSlots.count ?? 0,
  };
}
