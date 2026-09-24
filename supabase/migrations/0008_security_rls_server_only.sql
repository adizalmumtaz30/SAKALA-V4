do $$
declare t record;
begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t.tablename);
    execute format('revoke all on public.%I from anon, authenticated', t.tablename);
  end loop;
end $$;

revoke execute on function public.apply_schedule_version(uuid,uuid,text) from public, anon, authenticated;
revoke execute on function public.create_preview_version(uuid,uuid,text,text) from public, anon, authenticated;
revoke execute on function public.renumber_jam_ke(uuid,smallint) from public, anon, authenticated;
