/**
 * An array of routes that are accessible to the public
 * Thes routes do not require authentication
 * @type {String[]}
 */
export const publicRoutes = [
    "/",

    // User can change their email from their dashboard.
    // Both logged in and logged out user can access this page 
    "/new-verification",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to protected pages
 * @type {String[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/error",
    "/reset",
    "/new-password"
]

/**
 * the prefix for api authentication routes
 * Thes routes that start with prefix are used for api authentication purposes
 * @type {String}
 */
export const apiAuthPrefix = "/api/auth"

export const trpcApiPrefix = "/api/trpc"

/**
 * The default direct path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"