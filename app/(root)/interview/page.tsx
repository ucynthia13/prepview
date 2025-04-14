import React from 'react'
import AgentCard from '@/components/page-components/AgentCard'
import { getCurrentUser } from '@/lib/actions/auth.action'

const Interview = async () => {
  const user = await getCurrentUser()
  return (
    <>
    <h3>Interview Question</h3>

    <AgentCard userName={user?.name} userId={user?.id}  type="generate"/>
    </>
  )
}

export default Interview
