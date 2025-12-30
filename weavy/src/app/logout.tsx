"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function Logout() {
    return (
        <Button onClick={() => authClient.signOut()}>Logout</Button>
    );
}