"use server"

import { getSubscriptionToken,type Realtime } from "@inngest/realtime"
import { inngest } from "@/inngest/client"
import { GoogleFormTriggerChannel } from "@/inngest/channels/google-form-trigger-channel";
export type GoogleFormTriggerToken = Realtime.Token<
    typeof GoogleFormTriggerChannel,
    ["status"]
>;

export async function getGoogleFormTriggerSubscriptionToken(): Promise<GoogleFormTriggerToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: GoogleFormTriggerChannel(),
        topics: ["status"],
        // You can add filters here if needed
    });

    return token;
}