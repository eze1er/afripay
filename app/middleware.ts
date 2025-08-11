import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Routes publiques
  const publicRoutes = ['/login', '/register', '/api/auth'];
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Vérifier le token JWT
  const token = request.cookies.get('token')?.value;
  const verified = token ? await verifyToken(token) : false;

  if (!verified) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protection des routes admin
  if (path.startsWith('/admin') && verified.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};