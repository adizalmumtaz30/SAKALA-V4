import "server-only";
import { createServerSupabaseClient } from "@/data/supabase-server";

export async function getDefaultSchoolId(): Promise<string> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("schools")
    .select("id")
    .limit(1)
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}
