import { z } from "zod";

export const teacherFormSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi"),
  code: z.string().trim().optional().or(z.literal("")),
  shortName: z.string().trim().optional().or(z.literal("")),
  email: z.email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
});

export type TeacherFormInput = z.infer<typeof teacherFormSchema>;
