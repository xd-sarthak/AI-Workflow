import { requireAuth } from '@/lib/auth-utils';
import React from 'react'
interface PageProps {
    params: Promise<{
        credentialId: string
    }>
}

const page = async ({params}: PageProps) => {
    const {credentialId} = await params;
    await requireAuth();
    return (
    <div>page {credentialId}</div>
  )
}

export default page