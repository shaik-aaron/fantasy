import { useContext } from "react"
import { LockInConfig } from "../lockin-components/LockInConfig"
import { Session } from "../lockin-components/Session"
import { CompletedSession } from "../lockin-components/CompletedSession"
import { toast } from "sonner"
import { SessionContext } from "@/context/SessionProvider"

export const LockIn = () => {
    const {
        sessionStatus,
        setSessionStatus,
        sessionStartTime,
        setSessionStartTime,
        endsAt,
        setEndsAt,
        focusConfig,
        setFocusConfig,
        pendingCompletedSession,
        setPendingCompletedSession,
        remainingTime,
        setRemainingTime,
    } = useContext(SessionContext)

    const handleStartSession = () => {
        const now = Date.now()
        const durationMs = focusConfig.duration * 60 * 1000
        setSessionStartTime(now)
        setEndsAt(now + durationMs)
        setSessionStatus('running')
        toast.success("Session started")
    }

    return (
        <>
            {sessionStatus === 'idle' && <LockInConfig focusConfig={focusConfig}
                setFocusConfig={setFocusConfig}
                onStartSession={handleStartSession} />}

            {(sessionStatus === 'running' || sessionStatus === 'paused') && sessionStartTime && endsAt !== null && <Session
                focusConfig={focusConfig}
                startTime={sessionStartTime}
                endsAt={endsAt}
                setEndsAt={setEndsAt}
                sessionStatus={sessionStatus}
                setSessionStatus={setSessionStatus}
                setPendingCompletedSession={setPendingCompletedSession}
                remainingTime={remainingTime ?? 0}
                setRemainingTime={setRemainingTime} />}

            {sessionStatus === 'completed' && pendingCompletedSession && <CompletedSession
                session={pendingCompletedSession}
                setSessionStatus={setSessionStatus} />}
        </>
    )
}