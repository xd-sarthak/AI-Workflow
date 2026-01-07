"use client"

import  { NodeProps, Node, useReactFlow} from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo } from "react";
import { BaseExecutionNode } from "@/components/base-execution-node";
import { useState } from "react";
import { HttpRequestDialog } from "./dialog";
import { FormType } from "./dialog";
type HttpRequestNodeData = {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    body?: string;
    //tatus?: "loading" | "success" | "error" | "initial";
    [key: string]: unknown;
}

type HttpRequestNodeType = Node<HttpRequestNodeData>;


export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {

    const [dialogOpen,setDialogOpen] = useState(false);

    const {setNodes} = useReactFlow();

    const handleSubmit = (values: FormType) => {
        setNodes((nodes) => nodes.map((node) => {
            if (node.id === props.id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        endpoint: values.endpoint,
                        method: values.method,
                        body: values.body
                    }
                };
            }
            return node;
        }))
    };

    const handleOpenSettings = () => setDialogOpen(true);

    const nodeData = props.data as HttpRequestNodeData;
    const description = nodeData?.endpoint ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not configured"
    const nodeStatus = nodeData?.status as "loading" | "success" | "error" | "initial" | undefined;
    return (
        <>
            <HttpRequestDialog 
            open={dialogOpen} 
            onOpenChange={setDialogOpen} 
            onSubmit={handleSubmit}
            defaultEndpoint={nodeData?.endpoint}
            defaultMethod={nodeData?.method}
            defaultBody={nodeData?.body}
            />
            <BaseExecutionNode 
            {...props}
            id={props.id}
            icon={GlobeIcon}
            name="HTTP Request"
            description={description}
            onDoubleClick={handleOpenSettings}
            onSettings={handleOpenSettings}
            //status={nodeStatus}
            />
        </>
    )
});
HttpRequestNode.displayName = "HttpRequestNode";