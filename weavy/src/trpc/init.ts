import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from 'superjson';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ctx, next}) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED", 
        message: "You must be logged in to access this resource." 
      });
    }
    
    return next({
      ctx: {
        ...ctx,
        auth: session,
      },
    });
  } catch (error) {
    // If it's already a TRPCError, re-throw it
    if (error instanceof TRPCError) {
      throw error;
    }
    
    // Handle unexpected errors (e.g., database connection issues)
    if (process.env.NODE_ENV === "development") {
      console.error("Error in protectedProcedure:", error);
    }
    
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while verifying your session. Please try again.",
      cause: error,
    });
  }
});