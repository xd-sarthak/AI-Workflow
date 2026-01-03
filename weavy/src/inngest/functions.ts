import prisma from "@/lib/db";
import { inngest } from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";

const google = createGoogleGenerativeAI();

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow" },
  async ({ event, step }) => {

    const worflowId = event.data.workflowId;

    if(!worflowId) {
      throw new NonRetriableError("Workflow ID is required");
    }

    const sortedNodes = await step.run("prepare-workflow",async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where:{
          id:worflowId,
        },
        include:{
          nodes:true,
          connections:true,
        }
      });

      return topologicalSort(workflow.nodes,workflow.connections);
    });

    //initialize the context with any initial data from the trigger
    let context =event.data.initialData || {};
    return {sortedNodes};
  },
);