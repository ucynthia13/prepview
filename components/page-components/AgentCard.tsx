"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

enum CallState {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
}

const AgentCard = ({ userName }: AgentProps) => {
  const [callState, setCallState] = useState<CallState>(CallState.INACTIVE);
  const isSpeaking = callState === CallState.ACTIVE; // Example logic

  const handleCallToggle = () => {
    if (callState === CallState.INACTIVE || callState === CallState.FINISHED) {
      setCallState(CallState.CONNECTING);
      setTimeout(() => setCallState(CallState.ACTIVE), 1000);
    } else if (callState === CallState.ACTIVE) {
      setCallState(CallState.FINISHED);
    }
  };

  const renderButtonText = () => {
    if (callState === CallState.INACTIVE || callState === CallState.FINISHED)
      return "Start Call";
    if (callState === CallState.CONNECTING) return "Connecting...";
    if (callState === CallState.ACTIVE) return "End Call";
  };

  const messages = ["Hello, how are you?", "I am fine, thank you!"];
  const lastMessage = messages[messages.length - 1];
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar relative">
            <Image
              src="/ai-avatar.png"
              alt="AI Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            {isSpeaking && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full animate-ping" />
            )}
          </div>
          <h3 className="font-semibold">AI Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user.png"
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
            <h3 className="font-semibold">{userName}</h3>
          </div>
        </div>
      </div>
      <div className="vapi-scripts">
        {/*  VAPI Transcript maessages we're having */}
        {messages.length > 0 && (
          <div className="transcript-border">
            <div className="transcript">
              <p
                key={lastMessage}
                className={cn(
                  "transition-opacity duration-300",
                  "animate-fadeIn opacity-100"
                )}
              >
                {lastMessage}
              </p>
            </div>
          </div>
        )}
        <button
          className="btn-primary px-8 py-3 items-center"
          disabled={callState === CallState.CONNECTING}
          onClick={handleCallToggle}
        >
          {renderButtonText()}
        </button>
      </div>
    </>
  );
};

export default AgentCard;
