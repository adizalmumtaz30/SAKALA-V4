import "server-only";
import { createServerSupabaseClient } from "@/data/supabase-server";
import type { Teacher } from "@/domain/academic";
import type { TeacherFormInput } from "@/validators/teacher.schema";

function toDomain(row: Record<string, unknown>): Teacher {
  return {
    id: row.id as string,
    schoolId: row.school_id as string,
    code: (row.code as string | null) ?? null,
    name: row.name as string,
    shortName: (row.short_name as string | null) ?? null,
    email: (row.email as string | null) ?? null,
    phone: (row.phone as string | null) ?? null,
    photoUrl: (row.photo_url as string | null) ?? null,
    isActive: row.is_active as boolean,
  };
}

export const teacherRepository = {
  async list(): Promise<Teacher[]> {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map(toDomain);
  },

  async create(schoolId: string, input: TeacherFormInput): Promise<Teacher> {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("teachers")
      .insert({
        school_id: schoolId,
        name: input.name,
        code: input.code || null,
        short_name: input.shortName || null,
        email: input.email || null,
        phone: input.phone || null,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return toDomain(data);
  },

  async deactivate(id: string): Promise<void> {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase
      .from("teachers")
      .update({ is_active: false })
      .eq("id", id);
    if (error) throw new Error(error.message);
  },
};
