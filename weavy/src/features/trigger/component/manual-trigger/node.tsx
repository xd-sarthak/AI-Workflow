import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointer2Icon } from "lucide-react";
import {ManualTriggerDialog} from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSettings = () => setDialogOpen(true);
    const handleDoubleClick = () => setDialogOpen(true);
    const nodeStatus = "success";
    return (
        <>
            <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen}/>
            <BaseTriggerNode 
                {...props}
                icon={MousePointer2Icon}
                name="Manual Trigger"
                onSettings={handleSettings}
                onDoubleClick={handleDoubleClick}
                status = {nodeStatus}
            >
                
            </BaseTriggerNode>
        </>
    )
})