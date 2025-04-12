import React from 'react'
import AgentCard from '@/components/page-components/AgentCard'

const Interview = async () => {
  const user = await getCurrentUser()
  return (
    <>
    <h3>Interview Question</h3>

    <AgentCard userName='Cynthia' />
    </>
  )
}

export default Interview
