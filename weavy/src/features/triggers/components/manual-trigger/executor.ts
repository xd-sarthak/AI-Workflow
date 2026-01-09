import type { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string,unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({data,nodeId,context,step}) => {
    //todo pub loading state

    //just return the context as is for manual trigger
    const result = await step.run(`manual-trigger-${nodeId}`,async () => context);

    
    //todo publish result
    return result;
}