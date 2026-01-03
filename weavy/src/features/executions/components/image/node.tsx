"use client"

import type { NodeProps, Node, useReactFlow} from "@xyflow/react";
import { ImageIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { ImageNodeDialog } from "./dialog";

type ImageNodeData = {
    imageUrl?: string;
    imageName?: string;
    [key: string]: unknown;
}

type ImageNodeType = Node<ImageNodeData>;

export const ImageNode = memo((props: NodeProps<ImageNodeType>) => {
    const nodeData = props.data as ImageNodeData;
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleSettings = () => setDialogOpen(true);
    const handleDoubleClick = () => setDialogOpen(true);
    
    const description = nodeData?.imageName 
        ? nodeData.imageName
        : "Not configured";
    
    const nodeStatus = nodeData?.imageUrl ? "success" : "error";
    
    return (
        <>
            <ImageNodeDialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen}
                nodeId={props.id}
                initialImageUrl={nodeData?.imageUrl || ""}
                initialImageName={nodeData?.imageName || ""}
            />
            <BaseExecutionNode 
                {...props}
                id={props.id}
                icon={ImageIcon}
                name="Image"
                description={description}
                onDoubleClick={handleDoubleClick}
                onSettings={handleSettings}
                status={nodeStatus}
            />
        </>
    )
});
ImageNode.displayName = "ImageNode";

