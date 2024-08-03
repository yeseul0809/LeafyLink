import { createClient } from '@/supabase/supabaseClient';
// import supabase from "@/supabase/supabaseClient";
import { useEffect, useState } from 'react';

function useUser() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();

      setUser(userData?.user);
    };
    fetchUser();
  }, [supabase.auth]);

  return { user };
}

export default useUser;
