"use server"

import { getSubscriptionToken,type Realtime } from "@inngest/realtime"
import { GeminiChannel } from "@/inngest/channels/gemini-channel"

import { inngest } from "@/inngest/client"

export type geminiToken = Realtime.Token<
    typeof GeminiChannel,
    ["status"]
>;

export async function getGeminiubscriptionToken(): Promise<geminiToken> {
    const token = await getSubscriptionToken(inngest, {
        channel: GeminiChannel(),
        topics: ["status"],
        // You can add filters here if needed
    });

    return token;
}