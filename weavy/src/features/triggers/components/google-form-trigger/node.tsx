import { NodeProps, Node } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import {GoogleFormTriggerDialog} from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { getGoogleFormTriggerSubscriptionToken } from "./action";

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    const handleDoubleClick = () => setDialogOpen(true);
    const nodeStatus = useNodeStatus({
                nodeId: props.id,
                channel: "google-form-trigger-execution",
                topic: "status",
                refreshToken: getGoogleFormTriggerSubscriptionToken
            });
    return (
        <>
            <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
            <BaseTriggerNode 
                {...props}
                icon="/googleform.svg"
                name="Google Form"
                onSettings={handleSettings}
                onDoubleClick={handleDoubleClick}
                status = {nodeStatus}
            >
                
            </BaseTriggerNode>
        </>
    )
})