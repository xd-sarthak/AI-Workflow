import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import {StripeTriggerDialog} from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { getStripeTriggerSubscriptionToken } from "./action";

export const StripeTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    const handleDoubleClick = () => setDialogOpen(true);
    const nodeStatus = useNodeStatus({
                nodeId: props.id,
                channel: "stripe-trigger-execution",
                topic: "status",
                refreshToken: getStripeTriggerSubscriptionToken
            });
    return (
        <>
            <StripeTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
            <BaseTriggerNode 
                {...props}
                icon="/stripe.svg"
                name="Stripe"
                description="When Stripe event is captured"
                onSettings={handleSettings}
                onDoubleClick={handleDoubleClick}
                status = {nodeStatus}
            >
                
            </BaseTriggerNode>
        </>
    )
})