import { NodeType } from "@/generated/prisma/enums"
import { NodeTypes } from "@xyflow/react"
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/trigger/component/manual-trigger/node";


export const nodeComponents = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.MANUAL_TRIGGER] : ManualTriggerNode,
    [NodeType.HTTP_REQUEST] : HttpRequestNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents