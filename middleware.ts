import { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Security headers configuration
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  // Enhanced security configuration
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; connect-src 'self' *.supabase.co; script-src 'self' 'unsafe-inline'"
  );
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|register|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// Add these headers
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
'Cross-Origin-Resource-Policy': 'same-site',
'X-Content-Type-Options': 'nosniff';
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('Referrer-Policy', 'no-referrer');
response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
response.headers.set('X-XSS-Protection', '1; mode=block');
response.headers.set('Feature-Policy', 'geolocation "self"; microphone "self"; camera "self"');
response.headers.set('Access-Control-Allow-Origin', '*');
response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
response.headers.set('Access-Control-Expose-Headers', 'Content-Length, X-Kuma-Revision');
