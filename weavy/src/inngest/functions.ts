import { inngest } from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {generateText} from "ai";

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
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const {steps} = await step.ai.wrap("gemini-generate-text",generateText,{
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant that can execute workflows.",
      prompt: "what is 2+2"
    })

    return steps;
  },
);