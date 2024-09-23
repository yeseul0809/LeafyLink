import Events from '../_components/Events';
import { createClient } from '@/supabase/supabaseServer';
import { redirect } from 'next/navigation';

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (userError || !user) {
    redirect('/login');
  }

  if (!userId) {
    redirect('/login');
  }
  return (
    <div>
      <Events sellerId={userId} />
    </div>
  );
}
