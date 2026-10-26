import type { createServerClient } from "@supabase/ssr";

// "den typ som createServerClient returnerar"
export type AppSupabaseClient = ReturnType<typeof createServerClient>;