import React from 'react'
import Image from 'next/image'

enum CallState {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",

}

const AgentCard = ({userName}: AgentProps) => {
    const isSpeaking = true
    const callState: CallState  = CallState.ACTIVE
  return (
    <>
    <div className="call-view">
      <div className="card-interviewer">
        <div className="avatar">
            <Image src="/ai-avatar.png" alt="AI Avatar" width={100} height={100} className="object-cover" />
            {isSpeaking && <span className="animate-speak" />}
        </div>
        <h3 className="font-semibold">AI Interviewer</h3>
      </div>
      <div className="card-border">
        <div className="card-content">
            <Image src="/user-avatar.png" alt="AI Avatar" width={100} height={100} className="object-cover" />
        </div>
        <h3 className="font-semibold">{userName}</h3>
      </div>
      <div className="w-full flex justify-center">
        <button className="">
            {callState !== CallState.ACTIVE ? (
                <span>{callState === CallState.INACTIVE || callState === CallState.FINISHED ? "Start Call" : "Connecting..." }</span>
            ): (
                <button className="">End Call</button>
            )}
        </button>
      </div>
    </div>
    </>
  )
}

export default AgentCard
