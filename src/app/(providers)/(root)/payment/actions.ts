'use server';

import supabase from '../../../../supabase/supabaseClient';


export const getUserDate = async () => {
  await supabase.from('User').select('user_id');
};

