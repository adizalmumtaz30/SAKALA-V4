create type public.schedule_version_status as enum ('DRAFT','PREVIEW','ACTIVE','ARCHIVED');

create table public.schedule_versions (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references public.academic_years(id) on delete cascade,
  version_no integer not null,
  status public.schedule_version_status not null default 'DRAFT',
  source_version_id uuid references public.schedule_versions(id),
  base_version_id uuid references public.schedule_versions(id),
  engine_version text, engine_seed bigint,
  operation text, feasibility text,
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  activated_at timestamptz,
  unique (academic_year_id, version_no)
);
create unique index schedule_versions_one_active
  on public.schedule_versions(academic_year_id) where status = 'ACTIVE';
create index on public.schedule_versions(academic_year_id);

create type public.schedule_entry_origin as enum ('AUTO','MANUAL');

create table public.schedule_entries (
  id uuid primary key default gen_random_uuid(),
  schedule_version_id uuid not null references public.schedule_versions(id) on delete cascade,
  teaching_assignment_id uuid not null references public.teaching_assignments(id),
  class_id uuid not null references public.classes(id),
  teacher_id uuid not null references public.teachers(id),
  subject_id uuid not null references public.subjects(id),
  room_id uuid references public.rooms(id),
  time_slot_id uuid not null references public.time_slots(id),
  origin public.schedule_entry_origin not null default 'AUTO',
  is_locked boolean not null default false,
  is_protected boolean not null default false,
  session_key text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create unique index se_no_teacher_clash on public.schedule_entries(schedule_version_id, teacher_id, time_slot_id);
create unique index se_no_class_clash   on public.schedule_entries(schedule_version_id, class_id, time_slot_id);
create unique index se_no_room_clash    on public.schedule_entries(schedule_version_id, room_id, time_slot_id) where room_id is not null;
create index on public.schedule_entries(schedule_version_id);
create index on public.schedule_entries(teacher_id);
create index on public.schedule_entries(class_id);
create index on public.schedule_entries(room_id);
create index on public.schedule_entries(time_slot_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger trg_schedule_entries_updated_at before update on public.schedule_entries
  for each row execute function public.set_updated_at();
create trigger trg_teachers_updated_at before update on public.teachers
  for each row execute function public.set_updated_at();
create trigger trg_subjects_updated_at before update on public.subjects
  for each row execute function public.set_updated_at();
create trigger trg_classes_updated_at before update on public.classes
  for each row execute function public.set_updated_at();
create trigger trg_rooms_updated_at before update on public.rooms
  for each row execute function public.set_updated_at();
create trigger trg_time_slots_updated_at before update on public.time_slots
  for each row execute function public.set_updated_at();
