import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectTenantDB } from "./lib/db";

export const runtime = "nodejs";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip locale processing for admin routes—they have their own layout
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  try {
    const db = await connectTenantDB();
    const branding = await db
      .collection("tenant_registry")
      .findOne({ type: "branding" });

    const locales = branding?.languages?.available?.map((d: any) => d.code) || ["en"];
    const defaultLocale = branding?.languages?.default || "en";

    const hasLocalePrefix = locales.some(
      (locale: string) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (hasLocalePrefix) {
      // If it's the default locale, strip it (301 redirect to clean URL)
      if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
        const cleanPath = pathname.replace(`/${defaultLocale}`, "") || "/";
        const url = new URL(cleanPath, req.url);
        return NextResponse.redirect(url, 301);
      }
      // Non-default locale: pass through
      return NextResponse.next();
    }

    // No locale in URL → rewrite to default locale (URL stays clean)
    const url = new URL(`/${defaultLocale}${pathname}`, req.url);
    return NextResponse.rewrite(url);
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
