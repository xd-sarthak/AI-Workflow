import React from 'react'
interface PageProps {
    params: Promise<{
        credentialId: string
    }>
}

const page = async ({params}: PageProps) => {
    const {credentialId} = await params;
    return (
    <div>page {credentialId}</div>
  )
}

export default page