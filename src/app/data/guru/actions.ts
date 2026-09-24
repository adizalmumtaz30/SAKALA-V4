"use server";

import { revalidatePath } from "next/cache";
import { teacherFormSchema } from "@/validators/teacher.schema";
import { teacherRepository } from "@/data/teacher.repository";
import { getDefaultSchoolId } from "@/data/school.repository";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export async function createTeacherAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = teacherFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    shortName: formData.get("shortName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid" };
  }

  try {
    const schoolId = await getDefaultSchoolId();
    await teacherRepository.create(schoolId, parsed.data);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Gagal menyimpan" };
  }

  revalidatePath("/data/guru");
  return { ok: true };
}
