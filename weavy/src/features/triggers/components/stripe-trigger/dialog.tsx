"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import {toast} from "sonner";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const StripeTriggerDialog = ({ open, onOpenChange }: Props) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if(!baseUrl){
        console.error("Base URL not configured");      
    }
    const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

    const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(webhookUrl);
        toast.success("webhook URL copied to clipboard");
    } catch (error) {
        toast.error("Failed to copy webhook URL");
    }

    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Stripe Event Trigger</DialogTitle>
                    <DialogDescription>
                        Use this webhook URL in your Stripe to trigger workflows when a new event is captured.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="webhook-url">
                            Webhook URL
                        </Label>
                        <div className="flex gap-2">
                            <Input
                            id="webhook-url"
                            value={webhookUrl}
                            readOnly
                            className="font-mono text-sm flex-1"
                            />
                            <Button
                                variant="outline"
                                type="button"
                                size="icon"
                                onClick={copyToClipboard} 
                            >
                                <CopyIcon className="size-4"/>
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4 space-y-4">
                        <h4 className="font-medium text-sm">Setup Instructions</h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Open your Stripe Dashboard</li>
                            <li>Go to Developers → Webhooks </li>
                            <li>Click "Add Endpoint"</li>
                            <li>Under "Webhooks", paste the webhook URL above</li>
                            <li>Select events to listen for (e.g. "checkout.session.completed")</li>
                            <li>Save and copy the signing secret</li>
                        </ol>
                    </div>

                    <div className="rounded-lg bg-muted p-4 space-y-2">
                        <h4 className="font-medium text-sm">Available Variables</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{stripe.amount}}"}
                                </code>
                                - Payment amount
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{stripe.customerId}}"}
                                </code>
                                - Customer ID
                            </li>
                            <li>
                                <code className="bg-background px-1 py-0.5 rounded">
                                    {"{{json stripe}}"}
                                </code>
                                - Full Stripe event data
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

