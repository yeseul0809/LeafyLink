import { createClient } from '@/supabase/supabaseServer';
import { redirect } from 'next/navigation';
import EventTable from '../_components/EventTable';
import Events from '../_components/Events';

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
    <>
      <div className="mb-4">
        <EventTable sellerId={userId} />
      </div>
      <div>
        <Events sellerId={userId} />
      </div>
    </>
  );
}
