import {channel,topic} from "@inngest/realtime"

export const StripeTriggerChannel = channel("stripe-trigger-execution")
.addTopic(
    topic("status").type<{
        nodeId: string;
        status: "loading" | "success" | "error";
    }>(),
);