
import { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Security header values as constants for maintainability
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Content-Security-Policy': "default-src 'self'; connect-src 'self' *.supabase.co; script-src 'self' 'unsafe-inline'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-site',
  'X-XSS-Protection': '1; mode=block',
};

// CORS header values (adjust for production as needed)
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // Consider restricting in production
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Expose-Headers': 'Content-Length, X-Kuma-Revision',
};

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Set security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Set CORS headers
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    // Exclude static assets and auth pages from middleware
    '/((?!_next/static|_next/image|favicon.ico|login|register|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
