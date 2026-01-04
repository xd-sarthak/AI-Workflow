import prisma from "@/lib/db";
import { inngest } from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";
import { NonRetriableError } from "inngest";
import { topologicalSort } from "./utils";
import { getExecutor } from "@/features/executions/lib/executor-registry";

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

    const workflowId = event.data.workflowId;

    if(!workflowId) {
      throw new NonRetriableError("Workflow ID is required");
    }

    const sortedNodes = await step.run("prepare-workflow",async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where:{
          id:workflowId,
        },
        include:{
          nodes:true,
          connections:true,
        }
      });

      return topologicalSort(workflow.nodes,workflow.connections);
    });

    //initialize the context with any initial data from the trigger
    let context = event.data.initialData || {};

    //execute the workflow
    for(const node of sortedNodes) {
      const executor = getExecutor(node.type);
      context = await executor({
        data: node.data as Record<string,unknown>,
        nodeId: node.id,
        context,
        step,
      });
    }
    return {
      workflowId,
      result:context,
    };
  },
);