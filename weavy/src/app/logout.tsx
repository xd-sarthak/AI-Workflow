"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await authClient.signOut({
                query: {
                    onSuccess: () => {
                        toast.success("Logged out successfully");
                        router.push("/login");
                        router.refresh();
                    },
                    onError: (error: { message?: string } | Error) => {
                        let errorMessage = "Failed to log out. Please try again.";
                        
                    if (error?.message) {
                        const errorMessageLower = error.message.toLowerCase();
                        
                        if (errorMessageLower.includes("network") || errorMessageLower.includes("connection")) {
                            errorMessage = "Network error. Please check your connection and try again.";
                        } else if (errorMessageLower.includes("session") || errorMessageLower.includes("unauthorized")) {
                            errorMessage = "Your session has expired. Redirecting to login...";
                            // Still redirect even on error if session is invalid
                            setTimeout(() => {
                                router.push("/login");
                                router.refresh();
                            }, 2000);
                        } else {
                            errorMessage = error.message;
                        }
                    }
                    
                        toast.error(errorMessage);
                        setIsLoading(false);
                    }
                }
            });
        } catch (error) {
            toast.error("An unexpected error occurred during logout. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
        </Button>
    );
}