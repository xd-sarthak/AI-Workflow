import type { NodeExecutor } from "@/features/executions/types";
import { GoogleFormTriggerChannel } from "@/inngest/channels/google-form-trigger-channel";

type GoogleFormTriggerData = Record<string,unknown>;

export const GooglFormTriggerExecutor: NodeExecutor<GoogleFormTriggerData> = async ({data,nodeId,context,step,publish}) => {
    await publish(
        GoogleFormTriggerChannel().status({
            nodeId,
            status: "loading"
        })
    )

    //just return the context as is for googleform trigger
    const result = await step.run(`google-form-trigger-${nodeId}`,async () => context);

    
    await publish(
        GoogleFormTriggerChannel().status({
            nodeId,
            status: "success"
        })
    )
    return result;
}