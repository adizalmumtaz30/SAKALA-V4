create table public.scheduling_rules (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references public.academic_years(id) on delete cascade,
  rule_code text not null, name text not null,
  severity text not null check (severity in ('HARD','SOFT')),
  weight numeric(8,3),
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.teacher_availability (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  time_slot_id uuid not null references public.time_slots(id) on delete cascade,
  level text not null check (level in ('BLOCKED','AVOID','PREFER')),
  created_at timestamptz not null default now(),
  unique (teacher_id, time_slot_id)
);

create table public.room_availability (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  time_slot_id uuid not null references public.time_slots(id) on delete cascade,
  level text not null check (level in ('BLOCKED','AVOID')),
  created_at timestamptz not null default now(),
  unique (room_id, time_slot_id)
);

create table public.schedule_protected_contexts (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references public.academic_years(id) on delete cascade,
  schedule_version_id uuid not null references public.schedule_versions(id) on delete cascade,
  scope_type text not null check (scope_type in ('CLASS','TEACHER','ROOM','SLOT','ENTRY')),
  scope_id uuid,
  reason text,
  created_at timestamptz not null default now()
);

create index on public.teacher_availability(teacher_id);
create index on public.room_availability(room_id);
create index on public.schedule_protected_contexts(schedule_version_id);
