import type { Inngest,GetStepTools } from "inngest";

export type WorflowContext = Record<string,unknown>;

export type StepTools = GetStepTools<Inngest.Any>;

export interface NodeExecutorParams<TData = Record<string,unknown>> {
    data:TData;
    nodeId:string;
    context:WorflowContext;
    step:StepTools;
    //publish: todo
} 

export type NodeExecutor<TData = Record<string,unknown>> =
  (params: NodeExecutorParams<TData>) => Promise<WorflowContext>;