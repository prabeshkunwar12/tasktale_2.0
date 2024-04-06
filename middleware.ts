import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, apiPrefix, authRoutes, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if(nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}` ,nextUrl));
    }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}