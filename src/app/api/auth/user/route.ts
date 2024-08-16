import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/supabaseServer';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log('error message:', error.message);
    return Response.json({ errorMsg: error.message }, { status: 400 });
  }

  if (data.user?.id) {
    const { data: userInfo, error } = await supabase
      .from('User')
      .select('*')
      .eq('user_id', data.user?.id)
      .single();
    return NextResponse.json({ userInfo }, { status: 200 });
  }
}
