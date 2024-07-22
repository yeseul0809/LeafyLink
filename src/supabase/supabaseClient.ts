import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

const supabase = createClient();
export default supabase;

// import { createClient } from '@supabase/supabase-js';

// const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

// const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

// export default supabase;
