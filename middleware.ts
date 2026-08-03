import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

function getRoleFromToken(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("__token");
  return token;
}

export default withAuth(
  () => {},
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith("/patient")) {
          return token?.role === "patient" || token?.role === "admin";
        }

        if (pathname.startsWith("/coordinator")) {
          return token?.role === "care_coordinator" || token?.role === "admin";
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/patient/:path*", "/coordinator/:path*", "/(auth)/verify-otp", "/(auth)/login", "/(auth)/register"],
};
