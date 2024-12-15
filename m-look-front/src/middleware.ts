import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Faqat production muhitida ishlash
  if (process.env.NODE_ENV === "production") {
    const url = request.nextUrl.clone();

    // URLda '/m-look' prefiksi bo'lmasa, uni qo'shish
    if (!url.pathname.startsWith("/m-look")) {
      // Prefiksni qo'shish
      url.pathname = `/m-look${url.pathname}`;

      // Yangi URLga yo'naltirish
      return NextResponse.redirect(url);
    }
  }

  // Hech narsa qilmaslik, agar URL allaqachon '/m-look' prefiksiga ega bo'lsa
  return NextResponse.next();
}

// Barcha so'rovlar uchun middleware ishga tushishi
export const config = {
  matcher: "/:path*",
};
