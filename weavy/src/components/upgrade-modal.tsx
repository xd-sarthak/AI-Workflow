"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({open, onOpenChange}: UpgradeModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are currently on the free plan. Upgrade to the pro plan to get access to all features.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    //onClick={() => authClient.checkout({slug: "pro"})}
                    >Upgrade</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
