import type { NodeExecutor } from "@/features/executions/types";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

type ManualTriggerData = Record<string,unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({data,nodeId,context,step,publish}) => {
    await publish(
        manualTriggerChannel().status({
            nodeId,
            status: "loading"
        })
    )

    //just return the context as is for manual trigger
    const result = await step.run(`manual-trigger-${nodeId}`,async () => context);

    
    await publish(
        manualTriggerChannel().status({
            nodeId,
            status: "success"
        })
    )
    return result;
}