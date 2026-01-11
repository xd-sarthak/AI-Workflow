"use client"

import  { NodeProps, Node, useReactFlow} from "@xyflow/react";
import { memo } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { useState } from "react";
import { OpenAINodeValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { getOpenAiSubscriptionToken } from "./actions";
import { OpenAIDialog } from "./dialog";
type OpenAINodeData = {
   variableName?: string;
   systemPrompt?: string;
   userPrompt?: string;
}

type OpenAINodeType = Node<OpenAINodeData>;


export const OpenAINode = memo((props: NodeProps<OpenAINodeType>) => {

    const [dialogOpen,setDialogOpen] = useState(false);

    const {setNodes} = useReactFlow();
    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: "openai-execution",
        topic: "status",
        refreshToken: getOpenAiSubscriptionToken
    });

    const handleSubmit = (values: OpenAINodeValues) => {
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

    const nodeData = props.data;
    const description = nodeData?.userPrompt ? `openai/gpt-oss-120b : ${nodeData.userPrompt.slice(0,50)}...` : "Not configured"

    return (
        <>
            <OpenAIDialog
             open={dialogOpen} 
             onOpenChange={setDialogOpen} 
             onSubmit={handleSubmit}
             defaultValues={nodeData}
             />
            <BaseExecutionNode 
            {...props}
            id={props.id}
            icon={"/openai.svg"}
            name="openai"
            description={description}
            onDoubleClick={handleOpenSettings}
            onSettings={handleOpenSettings}
            status={nodeStatus}
            />
        </>
    )
});
OpenAINode.displayName = "OpenAINode";