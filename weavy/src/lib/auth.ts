import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/lib/db";

let authInstance: ReturnType<typeof betterAuth> | null = null;

/**
 * Get or create the auth instance with error handling.
 * This ensures we handle database connection errors gracefully.
 */
export const getAuth = () => {
    if (authInstance) {
        return authInstance;
    }

    try {
        authInstance = betterAuth({
            database: prismaAdapter(prisma, {
                provider: "postgresql", // or "mysql", "postgresql", ...etc
            }),
            emailAndPassword: {
                enabled: true,
                autoSignIn: true,
            },
        });
        return authInstance;
    } catch (error) {
        // Log error in development
        if (process.env.NODE_ENV === "development") {
            console.error("Error initializing auth:", error);
        }
        // Re-throw to prevent silent failures
        throw new Error(
            "Failed to initialize authentication. Please check your database connection.",
            { cause: error }
        );
    }
};

export const auth = getAuth();