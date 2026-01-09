import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, {type Options as KyOptions} from "ky";

type HttpRequestData = {
    variableName?: string;
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({data,nodeId,context,step}) => {
    //todo pub loading state

    if(!data.endpoint){
        //TODO: Publish error state
        throw new NonRetriableError("HTTP node is not configured with an endpoint");
    }

    if(!data.variableName){
        //todo publish error state
        throw new NonRetriableError("HTTP node is not configured with a variable name to store the response");
    }

    const result = await step.run("http-request",async() => {
        const endpoint = data.endpoint!;
        const method = data.method || "GET";

        const options:KyOptions = {method};

        if(["POST", "PUT", "PATCH"].includes(method) && data.body) {
            options.body = data.body;
            options.headers = {
                "Content-Type": "application/json",
            }
        }

        const response = await ky(endpoint,options);
        const contentType = response.headers.get("content-type");
        const responseBody = contentType?.includes("application/json") ? await response.json() : await response.text();

        const responsePayload = {
            httpResponse: {
                status: response.status,
                statusText: response.statusText,
                data: responseBody
            }
        }

        return {
            ...context,
            [data.variableName!]: responsePayload
        }
    });
    
    return result;
}