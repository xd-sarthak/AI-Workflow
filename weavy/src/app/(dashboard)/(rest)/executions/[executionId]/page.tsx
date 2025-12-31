import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        executionId: string
    }>
}

const page = async ({params}: PageProps) => {
    const {executionId} = await params;
    await requireAuth();
    return (
        <div>page {executionId}</div>
    )
}

export default page;