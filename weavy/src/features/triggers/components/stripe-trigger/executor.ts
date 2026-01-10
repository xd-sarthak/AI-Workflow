import type { NodeExecutor } from "@/features/executions/types";
import { StripeTriggerChannel } from "@/inngest/channels/stripe-trigger-channel";

type StripeTriggerData = Record<string,unknown>;

export const StripeTriggerExecutor: NodeExecutor<StripeTriggerData> = async ({data,nodeId,context,step,publish}) => {
    await publish(
        StripeTriggerChannel().status({
            nodeId,
            status: "loading"
        })
    )

    //just return the context as is for stripe trigger
    const result = await step.run(`stripe-trigger-${nodeId}`,async () => context);

    
    await publish(
        StripeTriggerChannel().status({
            nodeId,
            status: "success"
        })
    )
    return result;
}