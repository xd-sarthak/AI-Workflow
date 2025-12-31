import { requireAuth } from '@/lib/auth-utils';
import React from 'react'
interface PageProps {
    params: Promise<{
        workflowId: string
    }>
}

const page = async ({params}: PageProps) => {
    const {workflowId} = await params;
    await requireAuth();
    return (
    <div>page {workflowId}</div>
  )
}   

export default page