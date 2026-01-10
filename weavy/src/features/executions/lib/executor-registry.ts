import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "@/features/executions/components/http-request/executor";
import { GoogleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { StripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { geminiExecutor } from "../components/gemini/executor";

// Registry of executors for different node types
export const executorRegistry: Partial<Record<NodeType,NodeExecutor>> = {
    [NodeType.INITIAL]: manualTriggerExecutor,
    [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
    [NodeType.HTTP_REQUEST]: httpRequestExecutor,
    [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerExecutor,
    [NodeType.STRIPE_TRIGGER] : StripeTriggerExecutor,
    [NodeType.GEMINI] : geminiExecutor
};

export const getExecutor = (type: NodeType) : NodeExecutor => {
    const executor = executorRegistry[type];
    if(!executor) throw new Error(`No executor found for node type: ${type}`);
    return executor;
}