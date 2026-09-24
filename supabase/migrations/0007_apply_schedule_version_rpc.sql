create or replace function public.apply_schedule_version(
  p_version_id uuid, p_base_version_id uuid, p_summary text
) returns uuid language plpgsql set search_path = public as $$
declare v public.schedule_versions; act uuid;
begin
  select * into v from public.schedule_versions where id = p_version_id for update;
  if v.id is null or v.status <> 'PREVIEW' then raise exception 'VERSI_BUKAN_PREVIEW'; end if;

  perform 1 from public.academic_years where id = v.academic_year_id for update;

  select id into act from public.schedule_versions
   where academic_year_id = v.academic_year_id and status = 'ACTIVE';
  if act is distinct from p_base_version_id then raise exception 'JADWAL_SUDAH_BERUBAH'; end if;

  if act is not null and exists (
    select 1 from public.schedule_entries o
     where o.schedule_version_id = act and (o.is_locked or o.is_protected)
       and not exists (select 1 from public.schedule_entries n
                        where n.schedule_version_id = p_version_id
                          and n.teaching_assignment_id = o.teaching_assignment_id
                          and n.class_id = o.class_id and n.time_slot_id = o.time_slot_id
                          and n.is_locked = o.is_locked and n.is_protected = o.is_protected)
  ) then raise exception 'LOCK_ATAU_TERLINDUNGI_BERUBAH'; end if;

  if act is not null then
    update public.schedule_versions set status = 'ARCHIVED' where id = act;
  end if;
  update public.schedule_versions set status = 'ACTIVE', activated_at = now() where id = p_version_id;

  insert into public.history_events(school_id, academic_year_id, event_type, entity_type, entity_id, summary)
  select ay.school_id, ay.id, 'SCHEDULE_APPLIED', 'schedule_version', p_version_id, p_summary
    from public.academic_years ay where ay.id = v.academic_year_id;

  return p_version_id;
end $$;

create or replace function public.create_preview_version(
  p_academic_year_id uuid, p_source_version_id uuid, p_operation text, p_feasibility text
) returns uuid language plpgsql set search_path = public as $$
declare v_id uuid; v_no integer;
begin
  select coalesce(max(version_no), 0) + 1 into v_no
    from public.schedule_versions where academic_year_id = p_academic_year_id;

  insert into public.schedule_versions(academic_year_id, version_no, status, source_version_id, operation, feasibility)
  values (p_academic_year_id, v_no, 'PREVIEW', p_source_version_id, p_operation, p_feasibility)
  returning id into v_id;

  return v_id;
end $$;
