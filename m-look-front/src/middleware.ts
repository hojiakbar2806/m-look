import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;

  const refresh_token = cookies.get("refresh_token");
  const currentPath = nextUrl.pathname;

  if (protectedRoutes.includes(currentPath)) {
    if (!refresh_token) {
      const loginUrl = new URL(
        `/login?next=${currentPath}`,
        nextUrl.origin
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
