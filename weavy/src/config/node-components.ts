import { NodeType } from "@/generated/prisma/enums"
import { NodeTypes } from "@xyflow/react"
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
// Register node components here 
export const nodeComponents = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.MANUAL_TRIGGER] : InitialNode,
    [NodeType.HTTP_REQUEST] : HttpRequestNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents