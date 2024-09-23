import { createClient } from '@/supabase/supabaseServer';
import { redirect } from 'next/navigation';
import EventTable from '../_components/EventTable';

export default async function Eventpage() {
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
    <div className="mb-20">
      <EventTable sellerId={userId} />
    </div>
  );
}
