create table public.time_structures (
  id uuid primary key default gen_random_uuid(),
  academic_year_id uuid not null references public.academic_years(id) on delete cascade,
  name text not null, description text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index time_structures_one_active
  on public.time_structures(academic_year_id) where is_active;

create type public.time_slot_type as enum ('TEACHING','BREAK','ACTIVITY','INACTIVE');

create table public.time_slots (
  id uuid primary key default gen_random_uuid(),
  time_structure_id uuid not null references public.time_structures(id) on delete cascade,
  day_of_week smallint not null check (day_of_week between 1 and 7),
  sequence_no integer not null,
  jam_ke integer,
  label text not null,
  slot_type public.time_slot_type not null,
  starts_at time, ends_at time,
  duration_minutes integer not null check (duration_minutes > 0),
  jp_value numeric(5,2) not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique (time_structure_id, day_of_week, sequence_no),
  check (jam_ke is null or (slot_type = 'TEACHING' and is_active))
);
create unique index time_slots_jam_ke_unique
  on public.time_slots(time_structure_id, day_of_week, jam_ke) where jam_ke is not null;
create index on public.time_slots(time_structure_id);

create or replace function public.renumber_jam_ke(p_structure uuid, p_day smallint)
returns void language plpgsql set search_path = public as $$
begin
  update public.time_slots set jam_ke = null
   where time_structure_id = p_structure and day_of_week = p_day;
  update public.time_slots t set jam_ke = r.n
    from (select id, row_number() over (order by sequence_no) as n
            from public.time_slots
           where time_structure_id = p_structure and day_of_week = p_day
             and slot_type = 'TEACHING' and is_active) r
   where t.id = r.id;
end $$;
