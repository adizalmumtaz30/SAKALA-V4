import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Satu-satunya pintu ke Supabase. HANYA dipanggil dari server
 * (Server Components, Server Actions, Route Handlers) — lihat §3.3/§6.13.
 * Key ini tidak pernah punya prefix NEXT_PUBLIC_ dan tidak pernah sampai ke browser.
 */
export function createServerSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SECRET_KEY belum diatur di environment server.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
