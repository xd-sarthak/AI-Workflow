"use client"

import  { NodeProps, Node, useReactFlow} from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { useState } from "react";
import { GeminiNodeDialog } from "./dialog";
import { GeminiValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { getGeminiubscriptionToken } from "./actions";
type GeminiNodeData = {
    variableName?: string;
   model?: string;
   systemPrompt?: string;
   userPrompt?: string;
}

type GeminiNodeType = Node<GeminiNodeData>;


export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {

    const [dialogOpen,setDialogOpen] = useState(false);

    const {setNodes} = useReactFlow();
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: "gemini-execution",
        topic: "status",
        refreshToken: getGeminiubscriptionToken
    });

    const handleSubmit = (values: GeminiValues) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        ...values
                    }
                };
            }
            return node;
        }))
    };

    const handleOpenSettings = () => setDialogOpen(true);

    const nodeData = props.data as GeminiNodeData;
    const description = nodeData?.userPrompt ? `gemini-2.5-flash : ${nodeData.userPrompt.slice(0,50)}...` : "Not configured"
    //const nodeStatus = nodeData?.status as "loading" | "success" | "error" | "initial" | undefined;
    return (
        <>
            <GeminiNodeDialog 
            open={dialogOpen} 
            onOpenChange={setDialogOpen} 
            onSubmit={handleSubmit}
            defaultValues={nodeData}
            />
            <BaseExecutionNode 
            {...props}
            id={props.id}
            icon={"/gemini.svg"}
            name="Gemini"
            description={description}
            onDoubleClick={handleOpenSettings}
            onSettings={handleOpenSettings}
            status={nodeStatus}
            />
        </>
    )
});
GeminiNode.displayName = "GeminiNode";