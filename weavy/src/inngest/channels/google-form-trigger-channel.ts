import {channel,topic} from "@inngest/realtime"

export const GoogleFormTriggerChannel = channel("google-form-trigger-execution")
.addTopic(
    topic("status").type<{
        nodeId: string;
        status: "loading" | "success" | "error";
    }>(),
);