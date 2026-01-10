"use server"

import { getSubscriptionToken,type Realtime } from "@inngest/realtime"
import { inngest } from "@/inngest/client"
import { StripeTriggerChannel } from "@/inngest/channels/stripe-trigger-channel";
export type StripeTriggerToken = Realtime.Token<
    typeof StripeTriggerChannel,
    ["status"]
>;

export async function getStripeTriggerSubscriptionToken(): Promise<StripeTriggerToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: StripeTriggerChannel(),
        topics: ["status"],
        // You can add filters here if needed
    });

    return token;
}