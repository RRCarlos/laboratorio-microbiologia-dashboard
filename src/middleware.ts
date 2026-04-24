import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xahpjrfypxzeaspjnyuq.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_4kdEZJzkVu5Pdmi19X-r_Q_7zov6nY-";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Refresh session if expired
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Session error:", error);
  }

  // Routes that need protection
  const protectedRoutes = ["/", "/proyecto", "/operativo", "/chatbot"];
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname === route);
  const isLoginPage = request.nextUrl.pathname === "/login";

  // If no session and trying to access protected route, redirect to login
  if (!session?.user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If has session and trying to access login page, redirect to dashboard
  if (session?.user && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/proyecto",
    "/operativo",
    "/chatbot",
    "/login",
  ],
};