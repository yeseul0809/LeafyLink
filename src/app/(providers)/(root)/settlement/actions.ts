'use server';

import { createClient } from '@/supabase/supabaseServer';

export const getUserData = async () => {
  const supabaseServer = createClient();
  const userSession = await supabaseServer.auth.getUser();

  const { data, error } = await supabaseServer
    .from('User')
    .select()
    .eq('user_id', userSession.data.user?.id);

  return data;
};
