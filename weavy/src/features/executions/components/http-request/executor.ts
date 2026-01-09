import type { NodeExecutor } from "@/features/executions/types";

type HttpRequestData = Record<string,unknown>;

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({data,nodeId,context,step}) => {
    //todo pub loading state
    const result = await step.run(`http-request-${nodeId}`,async () => context) 
    //todo publish result
    return result;
}