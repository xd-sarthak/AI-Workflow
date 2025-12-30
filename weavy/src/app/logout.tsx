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
            await authClient.signOut();
            toast.success("Logged out successfully");
            // Use window.location for a hard redirect to ensure clean state
            window.location.href = "/login";
        } catch (error) {
            let errorMessage = "Failed to log out. Please try again.";
            
            if (error && typeof error === "object" && "message" in error) {
                const errorMessageLower = String(error.message).toLowerCase();
                
                if (errorMessageLower.includes("network") || errorMessageLower.includes("connection")) {
                    errorMessage = "Network error. Please check your connection and try again.";
                } else if (errorMessageLower.includes("session") || errorMessageLower.includes("unauthorized")) {
                    errorMessage = "Your session has expired. Redirecting to login...";
                    // Still redirect even on error if session is invalid
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000);
                } else {
                    errorMessage = String(error.message);
                }
            }
            
            toast.error(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
        </Button>
    );
}