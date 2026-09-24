create table public.schedule_variants (
  id uuid primary key default gen_random_uuid(),
  schedule_version_id uuid not null references public.schedule_versions(id) on delete cascade,
  variant_no smallint not null check (variant_no between 1 and 3),
  title text not null,
  description text,
  feasibility text not null,
  changes jsonb not null default '[]'::jsonb,
  metrics jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (schedule_version_id, variant_no)
);

create table public.schedule_impacts (
  id uuid primary key default gen_random_uuid(),
  schedule_version_id uuid not null references public.schedule_versions(id) on delete cascade,
  impact_level text not null check (impact_level in ('LOW','MEDIUM','HIGH')),
  changes jsonb not null default '[]'::jsonb,
  preserved jsonb not null default '[]'::jsonb,
  explanation text,
  created_at timestamptz not null default now()
);
