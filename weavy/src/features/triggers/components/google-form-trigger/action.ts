"use server"

import { getSubscriptionToken,type Realtime } from "@inngest/realtime"
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";
import { inngest } from "@/inngest/client"

export type manualTriggerToken = Realtime.Token<
    typeof manualTriggerChannel,
    ["status"]
>;

export async function getManualTriggerSubscriptionToken(): Promise<manualTriggerToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: manualTriggerChannel(),
        topics: ["status"],
        // You can add filters here if needed
    });

    return token;
}