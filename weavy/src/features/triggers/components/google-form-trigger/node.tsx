import { NodeProps, Node } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";
import {ManualTriggerDialog} from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { getManualTriggerSubscriptionToken } from "./action";
import { manualTriggerChannel } from "@/inngest/channels/manual-trigger";

export const GoogleFormTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    const handleDoubleClick = () => setDialogOpen(true);
    const nodeStatus = "initial";
    return (
        <>
            <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
            <BaseTriggerNode 
                {...props}
                icon="/googleform.svg"
                name="When form is submitted"
                onSettings={handleSettings}
                onDoubleClick={handleDoubleClick}
                status = {nodeStatus}
            >
                
            </BaseTriggerNode>
        </>
    )
})