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

  const exactMatchUrls: Routes = {
    '/': true,
    '/login': true,
    '/auth/callback': true,
    '/login/needlogin': true
  };

  const prefixMatchUrls: Routes = {
    '/products': true,
    '/search': true,
    '/livestreaming': true
  };

  const isExactMatchPage = exactMatchUrls[request.nextUrl.pathname] || false;
  const isPrefixMatchPage = Object.keys(prefixMatchUrls).some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!user && !(isExactMatchPage || isPrefixMatchPage)) {
    return NextResponse.redirect(new URL('/login/needlogin', request.url));
  }

  return supabaseResponse;
}
