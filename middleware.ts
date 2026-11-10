import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/login/manage-login';

export const config = {
  matcher: '/admin/:path*',
};

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isGet = request.method === 'GET';
  const loginRequired = isAdminPage && !isLoginPage;
  const shouldRedirect = loginRequired && isGet;
  if (!shouldRedirect) {
    return NextResponse.next();
  }
  const jwt = request.cookies.get(process.env.LOGIN_COOKIE_NAME || 'loginSession')?.value;
  const isAuthenticated = await verifyJWT(jwt);
  if (!isAuthenticated) {
    const loginURL = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginURL);
  }
  return NextResponse.next();
}
