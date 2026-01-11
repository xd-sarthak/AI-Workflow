import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import { generateText } from "ai";
import Handlebars from "handlebars";
import { OpenAiChannel } from "@/inngest/channels/openai-channel";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

Handlebars.registerHelper("json", (context) => {
    const stringified = JSON.stringify(context, null, 2);
    const safeString = new Handlebars.SafeString(stringified);
    return safeString;
});


type OpenAINodeData = {
    variableName?: string;
    model?: string;
    systemPrompt?: string;
    userPrompt?: string;
};

export const openAIExecutor: NodeExecutor<OpenAINodeData> = async ({ data, nodeId, context, step, publish }) => {
    await publish(
        OpenAiChannel().status({
            nodeId,
            status: "loading"
        }),
    );

    if (!data.variableName) {
        await publish(
            OpenAiChannel().status({
                nodeId,
                status: "error"
            })
        );

        throw new NonRetriableError("OpenAI node is not configured with a variable name to store the response");
    }

    if (!data.userPrompt) {
        await publish(
            OpenAiChannel().status({
                nodeId,
                status: "error"
            })
        );

        throw new NonRetriableError("OpenAI node is not configured with a user prompt");
    }

    const systemPrompt = data.systemPrompt ? Handlebars.compile(data.systemPrompt)(context) : "You are a helpful assistant";

    const userPrompt = Handlebars.compile(data.userPrompt)(context);

    // Fetch OpenRouter API key from environment
    const credentialValue = process.env.OPENROUTER_API_KEY!;

    const openrouter = createOpenRouter({
        apiKey: credentialValue,
    });

    // Use the model from data or default to openai/gpt-oss-120b:free
    const modelName = data.model || "openai/gpt-oss-120b:free";

    try {
        const { steps } = await step.ai.wrap(
            "openai-generate-text",
            generateText,
            {
                model: openrouter.chat(modelName),
                system: systemPrompt,
                prompt: userPrompt,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true
                },
            }
        );

        const content = steps[0].content as Array<{ type: string; text?: string }>;
        const textContent = content.find((item) => item.type === "text");
        const text = textContent?.text || "";

        await publish(
            OpenAiChannel().status({
                nodeId,
                status: "success"
            })
        );

        return {
            ...context,
            [data.variableName]: {
                aiResponse: text
            }
        }
    } catch (error) {
        await publish(
            OpenAiChannel().status({
                nodeId,
                status: "error"
            })
        );
        throw error;
    }
}