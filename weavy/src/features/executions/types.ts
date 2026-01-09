import type { Inngest,GetStepTools } from "inngest";
import { Realtime } from "@inngest/realtime";
export type WorflowContext = Record<string,unknown>;

export type StepTools = GetStepTools<Inngest.Any>;

export interface NodeExecutorParams<TData = Record<string,unknown>> {
    data:TData;
    nodeId:string;
    context:WorflowContext;
    step:StepTools;
    publish: Realtime.PublishFn;
} 

export type NodeExecutor<TData = Record<string,unknown>> =
  (params: NodeExecutorParams<TData>) => Promise<WorflowContext>;