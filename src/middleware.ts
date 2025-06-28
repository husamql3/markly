// import { betterAuth } from "better-auth";
import { NextResponse, type NextRequest } from "next/server";
import { log } from "./utils/logger";

// const authMiddleware = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
//   secret: process.env.BETTER_AUTH_SECRET!,
// });

export function middleware(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    log.debug(pathname);

    // Check for session cookie (better-auth typically uses 'better-auth.session_token')
    const sessionToken = request.cookies.get("better-auth.session_token");
    const isAuthenticated = !!sessionToken;

    log.debug("IS_AUTHENTICATED", isAuthenticated);

    if (pathname.startsWith("/login") && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    log.error("MIDDLEWARE_ERROR", error);
    return NextResponse.error();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
