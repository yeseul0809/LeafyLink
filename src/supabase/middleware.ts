import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { Database } from '@/types/supabase';

interface Routes {
  [key: string]: boolean;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const publicOnlyUrls: Routes = {
    '/': true,
    '/login': true,
    '/auth/callback': true,
    '/products': true,
    '/search': true,
    '/livestreaming': true,
    '/login/needlogin': true
  };

  const isPublicPage = publicOnlyUrls[request.nextUrl.pathname] || false;

  if (!user && !isPublicPage) {
    return NextResponse.redirect(new URL('/login/needlogin', request.url));
  }

  return supabaseResponse;
}
