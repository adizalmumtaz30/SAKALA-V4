/**
 * Domain: entitas akademik inti.
 * Tipe murni, tanpa I/O, tanpa dependensi ke React atau klien DB.
 * Sumber: PROJECT_KNOWLEDGE §7–8, MASTER_BUILD_SPEC §3.4, §6.2
 */

export type AcademicYearStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface School {
  id: string;
  name: string;
  code: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  logoUrl: string | null;
}

export interface AcademicYear {
  id: string;
  schoolId: string;
  name: string;
  status: AcademicYearStatus;
  startsOn: string | null;
  endsOn: string | null;
}

export interface Teacher {
  id: string;
  schoolId: string;
  code: string | null;
  name: string;
  shortName: string | null;
  email: string | null;
  phone: string | null;
  photoUrl: string | null;
  isActive: boolean;
}

export interface Subject {
  id: string;
  schoolId: string;
  code: string | null;
  name: string;
  shortName: string | null;
  /** subject-01 .. subject-24 — ADR-001: warna melekat pada Mapel, bukan Guru */
  colorToken: string | null;
  isActive: boolean;
}

export interface Class {
  id: string;
  schoolId: string;
  academicYearId: string;
  name: string;
  grade: string | null;
  code: string | null;
  capacity: number | null;
  isActive: boolean;
}

export interface Room {
  id: string;
  schoolId: string;
  name: string;
  code: string | null;
  capacity: number | null;
  roomType: string | null;
  isActive: boolean;
}

export type TeachingAssignmentStatus = "ACTIVE" | "INACTIVE";

/**
 * ADR-005: Target JP diberikan per kelas, bukan per assignment.
 * Total JP guru = jumlah jp_per_week di semua TeachingAssignmentClass miliknya.
 */
export interface TeachingAssignmentClass {
  id: string;
  teachingAssignmentId: string;
  classId: string;
  jpPerWeek: number;
}

export interface TeachingAssignment {
  id: string;
  academicYearId: string;
  teacherId: string;
  subjectId: string;
  status: TeachingAssignmentStatus;
  classes: TeachingAssignmentClass[];
}

/** Total Target JP guru untuk satu assignment — dihitung, bukan disimpan. */
export function totalJpForAssignment(assignment: TeachingAssignment): number {
  return assignment.classes.reduce((sum, c) => sum + c.jpPerWeek, 0);
}
