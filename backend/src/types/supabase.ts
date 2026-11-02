import type { createServerClient } from "@supabase/ssr";
import type { Database } from "./database.types.js";

export type AppSupabaseClient = ReturnType<typeof createServerClient<Database>>;