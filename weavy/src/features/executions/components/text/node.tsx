"use client"

import type { NodeProps, Node, useReactFlow} from "@xyflow/react";
import { FileTextIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { TextNodeDialog } from "./dialog";

type TextNodeData = {
    text?: string;
    [key: string]: unknown;
}

type TextNodeType = Node<TextNodeData>;

export const TextNode = memo((props: NodeProps<TextNodeType>) => {
    const nodeData = props.data as TextNodeData;
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleSettings = () => setDialogOpen(true);
    const handleDoubleClick = () => setDialogOpen(true);
    
    const description = nodeData?.text 
        ? (nodeData.text.length > 50 ? `${nodeData.text.substring(0, 50)}...` : nodeData.text)
        : "Not configured";
    
    const nodeStatus = nodeData?.text ? "success" : "error";
    
    return (
        <>
            <TextNodeDialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen}
                nodeId={props.id}
                initialText={nodeData?.text || ""}
            />
            <BaseExecutionNode 
                {...props}
                id={props.id}
                icon={FileTextIcon}
                name="Text"
                description={description}
                onDoubleClick={handleDoubleClick}
                onSettings={handleSettings}
                status={nodeStatus}
            />
        </>
    )
});
TextNode.displayName = "TextNode";

