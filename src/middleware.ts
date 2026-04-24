import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// ============================================
// RATE LIMITING
// ============================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// ============================================
// MAIN MIDDLEWARE
// ============================================

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // === RATE LIMITING (solo en producción para login) ===
  if (process.env.NODE_ENV === "production" && request.nextUrl.pathname === "/login") {
    const identifier = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intenta de nuevo en 1 minuto." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }
  
  // === AUTHENTICATION ===
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
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

    const { data: { session } } = await supabase.auth.getSession();

    const protectedRoutes = ["/", "/proyecto", "/operativo", "/chatbot"];
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname === route);
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!session?.user && isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (session?.user && isLoginPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // === SECURITY HEADERS ===
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  
  // CSP
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.vercel.app; frame-ancestors 'none';"
  );

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