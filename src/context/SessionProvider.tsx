import { createContext, useState, type PropsWithChildren } from "react"
import type { FocusConfig, SessionContextType, SessionLog, SessionStatus } from "@/types/focus"

const defaultFocusConfig = { type: '', duration: 0 }

export const SessionContext = createContext<SessionContextType>({
    sessionStatus: null,
    setSessionStatus: () => { },
    sessionStartTime: null,
    setSessionStartTime: () => { },
    endsAt: null,
    setEndsAt: () => { },
    focusConfig: defaultFocusConfig,
    setFocusConfig: () => { },
    pendingCompletedSession: null,
    setPendingCompletedSession: () => { },
    remainingTime: null,
    setRemainingTime: () => { },
});

export const SessionProvider = ({ children }: PropsWithChildren) => {
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>("idle")
    const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
    const [endsAt, setEndsAt] = useState<number | null>(null)
    const [focusConfig, setFocusConfig] = useState<FocusConfig>(defaultFocusConfig)
    const [pendingCompletedSession, setPendingCompletedSession] = useState<SessionLog | null>(null)
    const [remainingTime, setRemainingTime] = useState<number | null>(null)

    return (
        <SessionContext.Provider value={{
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
        }}>
            {children}
        </SessionContext.Provider>
    )
}