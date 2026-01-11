"use server"

import { getSubscriptionToken, type Realtime } from "@inngest/realtime"
import { OpenAiChannel } from "@/inngest/channels/openai-channel"

import { inngest } from "@/inngest/client"

export type OpenAiToken = Realtime.Token<
    typeof OpenAiChannel,
    ["status"]
>;

export async function getOpenAiSubscriptionToken(): Promise<OpenAiToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: OpenAiChannel(),
        topics: ["status"],
        // You can add filters here if needed
    });

    return token;
}