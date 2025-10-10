import { envClient } from "@/config/env";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = envClient.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envClient.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
