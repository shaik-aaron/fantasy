import { useState } from "react"
import type { FocusConfig, SessionLog } from "@/types/focus"
import { LockInConfig } from "../lockin-components/LockInConfig"
import { Session } from "../lockin-components/Session"
import { useSessionStatus } from "@/hooks/useSessionStatus"
import { CompletedSession } from "../lockin-components/CompletedSession"
import { toast } from "sonner"

export const LockIn = () => {

    const [focusConfig, setFocusConfig] = useState<FocusConfig>({ type: '', duration: 0 })

    const { sessionStatus, setSessionStatus } = useSessionStatus()
    const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
    const [pendingCompletedSession, setPendingCompletedSession] = useState<SessionLog | null>(null)

    console.log(sessionStatus)

    console.log(focusConfig)

    const handleStartSession = () => {
        setSessionStartTime(Date.now())
        setSessionStatus('running')
        toast.success("Session started")
    }

    return (
        <>
            {sessionStatus === 'idle' && <LockInConfig focusConfig={focusConfig} setFocusConfig={setFocusConfig} onStartSession={handleStartSession} />}
            {(sessionStatus === 'running' || sessionStatus === 'paused') && sessionStartTime && <Session focusConfig={focusConfig} startTime={sessionStartTime} sessionStatus={sessionStatus} setSessionStatus={setSessionStatus} setPendingCompletedSession={setPendingCompletedSession} />}
            {sessionStatus === 'completed' && pendingCompletedSession && <CompletedSession session={pendingCompletedSession} setSessionStatus={setSessionStatus} />}
        </>
    )
}