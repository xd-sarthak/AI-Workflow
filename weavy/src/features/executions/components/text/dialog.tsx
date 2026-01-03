"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    nodeId: string;
    initialText?: string;
}

export const TextNodeDialog = ({ open, onOpenChange, nodeId, initialText = "" }: Props) => {
    const [text, setText] = useState(initialText);
    const { setNodes, getNodes } = useReactFlow();

    // Update local state when initialText changes
    useEffect(() => {
        setText(initialText);
    }, [initialText, open]);

    const handleSave = () => {
        const nodes = getNodes();
        const updatedNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        text: text,
                    },
                };
            }
            return node;
        });
        setNodes(updatedNodes);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Text Node</DialogTitle>
                    <DialogDescription>
                        Enter the text content for this node
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="text-input">Text Content</Label>
                        <Textarea
                            id="text-input"
                            placeholder="Enter your text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={6}
                            className="resize-none"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

