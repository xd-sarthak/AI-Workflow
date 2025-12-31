import "server-only";

import { z } from 'zod';
import { baseProcedure, createTRPCRouter,protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { inngest } from "@/inngest/client";
import {google} from "@ai-sdk/google"
import {generateText} from "ai"

export const appRouter = createTRPCRouter({

  testAi: protectedProcedure.mutation(async () => {
      await inngest.send({
        name: "execute/ai",
      })

    return {success:true,message:"AI execution started"};
  }),



  getWorkflows: protectedProcedure
    .query(async ({ctx}) => {
      return prisma.workflow.findMany();
    }),


    createWorkflow: protectedProcedure.mutation(async () => {
      // Create the workflow in the database
      const workflow = await prisma.workflow.create({
        data: {
          name: "New Workflow"
        }
      });

      // Optionally send event to Inngest for background processing
      await inngest.send({
        name: "workflow/created",
        data: {
          workflowId: workflow.id,
        }
      });

      return workflow;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;