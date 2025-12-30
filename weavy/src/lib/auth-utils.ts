import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Requires authentication. Redirects to login if not authenticated.
 * Handles errors gracefully and logs them for debugging.
 */
export const requireAuth = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) {
            redirect("/login");
        }
        return session;
    } catch (error) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === "development") {
            console.error("Error getting session in requireAuth:", error);
        }
        // Redirect to login on any error
        redirect("/login");
    }
}

/**
 * Requires unauthenticated state. Redirects to home if already authenticated.
 * Handles errors gracefully.
 */
export const requireUnauth = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (session) {
            redirect("/");
        }
    } catch (error) {
        // Log error for debugging in development
        if (process.env.NODE_ENV === "development") {
            console.error("Error getting session in requireUnauth:", error);
        }
        // On error, allow the page to render (fail open for auth pages)
        // This prevents blocking users from accessing login/signup pages
    }
}