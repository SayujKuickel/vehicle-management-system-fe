import { isPrivateRoute, SITE_ROUTES } from "@/config/site-routes";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Auth Guard Proxy
 * Checks if user is authenticated and redirects accordingly
 * - Private routes: redirect to home if not authenticated
 * - Public routes: allow access
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // uncomment this to skip auth check - return NextResponse.next();

  // Get authentication token from cookies or headers
  const token =
    request.cookies.get("authToken")?.value ||
    request.headers.get("x-auth-token");

  // Check if route is private
  if (isPrivateRoute(pathname)) {
    // If no token and trying to access private route, redirect to home
    if (!token) {
      return NextResponse.redirect(new URL(SITE_ROUTES.HOME, request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

/**
 * Configuration for which routes should trigger the proxy
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
