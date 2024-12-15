import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    const url = request.nextUrl.clone();

    if (!url.pathname.startsWith("/m-look")) {
      url.pathname = `/m-look${url.pathname}`;
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: "/:path*",
};
