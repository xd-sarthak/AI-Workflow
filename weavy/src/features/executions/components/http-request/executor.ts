import type { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, {type Options as KyOptions} from "ky";
import Handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";

Handlebars.registerHelper("json",(context) =>{
    const stringified = JSON.stringify(context,null,2);
    const safeString = new Handlebars.SafeString(stringified);
    return safeString;
});


type HttpRequestData = {
    variableName: string;
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({data,nodeId,context,step,publish}) => {
    await publish(
        httpRequestChannel().status({
            nodeId,
            status: "loading"
        }),
    );

    if(!data.endpoint){
        await publish(
        httpRequestChannel().status({
            nodeId,
            status: "error"
        }),
    );

        throw new NonRetriableError("HTTP node is not configured with an endpoint");
    }

    if(!data.variableName){
       await publish(
        httpRequestChannel().status({
            nodeId,
            status: "error"
        }),
    );
        throw new NonRetriableError("HTTP node is not configured with a variable name to store the response");
    }

    if(!data.method){
        await publish(
        httpRequestChannel().status({
            nodeId,
            status: "error"
        }),
    );
        throw new NonRetriableError("HTTP node is not configured with a method");
    }
    try{
    const result = await step.run("http-request",async() => {
        const endpoint = Handlebars.compile(data.endpoint)(context);
        const method = data.method;

        const options:KyOptions = {method};

        if(["POST", "PUT", "PATCH"].includes(method) && data.body) {
            const resolved = Handlebars.compile(data.body || "{}")(context);
            JSON.parse(resolved); // Validate JSON
            options.body = resolved;
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
            [data.variableName]: responsePayload
        }
    });

    await publish(
        httpRequestChannel().status({
            nodeId,
            status: "success"
        }),
    );
    
    return result;

} catch(error){
    
    await publish(
        httpRequestChannel().status({
            nodeId,
            status: "error"
        }),
    );

    throw error;
}
}