create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null, code text, address text, phone text, email text, logo_url text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create type public.academic_year_status as enum ('DRAFT','ACTIVE','ARCHIVED');

create table public.academic_years (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  name text not null,
  status public.academic_year_status not null default 'DRAFT',
  starts_on date, ends_on date,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  code text, name text not null, short_name text, email text, phone text, photo_url text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  code text, name text not null, short_name text,
  color_token text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  academic_year_id uuid not null references public.academic_years(id) on delete cascade,
  name text not null, grade text, code text, capacity integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  name text not null, code text, capacity integer, room_type text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.teaching_assignments (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references public.academic_years(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id),
  subject_id uuid not null references public.subjects(id),
  status text not null default 'ACTIVE' check (status in ('ACTIVE','INACTIVE')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.teaching_assignment_classes (
  id uuid primary key default gen_random_uuid(),
  teaching_assignment_id uuid not null references public.teaching_assignments(id) on delete cascade,
  class_id uuid not null references public.classes(id),
  jp_per_week integer not null check (jp_per_week > 0),
  created_at timestamptz not null default now(),
  unique (teaching_assignment_id, class_id)
);

create index on public.classes(academic_year_id);
create index on public.teaching_assignments(academic_year_id);
create index on public.teaching_assignments(teacher_id);
create index on public.teaching_assignment_classes(class_id);
