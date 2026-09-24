create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id),
  attendance_date date not null,
  status text not null check (status in ('HADIR','IZIN','SAKIT','ALPA','TUGAS_LUAR')),
  note text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (teacher_id, attendance_date)
);
create index on public.attendance(teacher_id, attendance_date);

create table public.history_events (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  academic_year_id uuid references public.academic_years(id),
  event_type text not null, entity_type text not null, entity_id uuid,
  summary text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index on public.history_events(academic_year_id, created_at);

create table public.import_jobs (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  entity_type text not null, file_name text, status text not null,
  total_rows integer not null default 0, valid_rows integer not null default 0, invalid_rows integer not null default 0,
  errors jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(), completed_at timestamptz
);

create trigger trg_attendance_updated_at before update on public.attendance
  for each row execute function public.set_updated_at();
