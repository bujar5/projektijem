// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server"; // Import NextResponse for custom responses

export default withAuth(
  // `withAuth` augments the Next.js `Request` object with user (through `req.nextUrl.pathname`)
  function middleware(req) {
    // Get the user's role from the token, which is passed by `withAuth`
    const role = req.nextauth.token?.role;
    const pathname = req.nextUrl.pathname;

    // --- Admin Routes Protection ---
    // Define an array of paths that only admins should access
    const adminPaths = [
      "/admin/dashboard",
      // If you create separate admin-only creation/edit pages:
      "/admin/blogs/create",
      "/admin/blogs/edit", // You might use /admin/blogs/edit/[id]
      "/admin/news/create",
      "/admin/news/edit", // You might use /admin/news/edit/[id]
      "/api/admin/stats" // Protect your stats API
      // Add any other paths that are strictly for admins
    ];

    // Check if the current path is an admin-only path
    if (adminPaths.some(path => pathname.startsWith(path))) {
      if (role !== "admin") {
        // If the user is not an admin, redirect them to an unauthorized page
        // or to the home page, or return a 403 response.
        // For API routes, it's better to return a 403 JSON response.
        if (pathname.startsWith("/api")) {
          return new NextResponse(JSON.stringify({ message: 'Forbidden: Admin access required' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        // For page routes, redirect
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // You can add other role-based logic here if needed for other roles.
    // For example, if you have a 'moderator' role with specific access.

    // If none of the specific conditions are met, allow the request to proceed.
    return NextResponse.next();
  },
  {
    // These are the pages that NextAuth.js will automatically redirect to
    // if the user is not authenticated for a protected route.
    pages: {
      signIn: "/sign-in", // Your sign-in page
    },
    // This tells `withAuth` which callbacks to use from your NextAuth config.
    // It's important for `req.nextauth.token` to be populated with your custom data (like 'role').
    callbacks: {
      authorized: ({ token }) => {
        // This callback determines if the user is *authenticated* at all.
        // If a token exists, the user is considered authenticated.
        // The more granular role check happens in the `middleware` function above.
        return !!token;
      },
    },
  }
);

// Define which paths the middleware should apply to.
// This is an array of regex patterns.
export const config = {
  matcher: [
    "/admin/:path*", // Protect all paths under /admin
    "/api/admin/:path*", // Protect all API paths under /api/admin
    // Add other protected routes here that should *always* require authentication
    // e.g., "/profile", "/dashboard"
    // Note: for blog/news create/edit/delete, you're already doing getServerSession
    // in the API routes, which is also valid. If you move all auth to middleware,
    // you would remove those getServerSession checks from individual API routes.
  ],
};