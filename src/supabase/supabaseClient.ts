'use client'

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';
// import { createClient } from '@supabase/supabase-js';

const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!
  );

const supabase = createClient();
export default supabase;


// const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_KEY!
// )
// export default supabase