import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


  const protectedRoutes = ["/profile/as"];



export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token"); 
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute&&!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], 
};
