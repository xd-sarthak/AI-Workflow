import { NodeType } from "@/generated/prisma/enums"
import { NodeTypes } from "@xyflow/react"
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/trigger/component/manual-trigger/node";
import { TextNode } from "@/features/executions/components/text/node";
import { ImageNode } from "@/features/executions/components/image/node";


export const nodeComponents = {
    [NodeType.INITIAL] : InitialNode,
    [NodeType.MANUAL_TRIGGER] : ManualTriggerNode,
    [NodeType.HTTP_REQUEST] : HttpRequestNode,
    [NodeType.TEXT] : TextNode,
    [NodeType.IMAGE] : ImageNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents