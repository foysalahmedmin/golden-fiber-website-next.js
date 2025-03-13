import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("access-token");

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = pathname.startsWith("/sign-in");

  const response = NextResponse.next();

  if (isProtectedRoute) {
    response.cookies.set("last-route", pathname, { path: "/" });
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && token) {
    const lastPage = request.cookies.get("last-route")?.value || "/dashboard";
    return NextResponse.redirect(new URL(lastPage, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/sign-in",
  ],
};
