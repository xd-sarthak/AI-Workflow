import "server-only";

import { z } from 'zod';
import { baseProcedure, createTRPCRouter,protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure
    .query(async ({ctx}) => {
      return prisma.workflow.findMany();
    }), 
    createWorkflow: protectedProcedure.mutation(async ({ctx, input}) => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email:"hey@gmail.com"
        }
      });
       
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;