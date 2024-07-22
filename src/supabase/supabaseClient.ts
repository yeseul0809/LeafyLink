import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

const supabase = createClient();
export default supabase;