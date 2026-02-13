import { useState } from "react"
import type { FocusConfig, SessionStatus } from "@/types/focus"
import { LockInConfig } from "../lockin-components/LockInConfig"

export const LockIn = () => {

    const [focusConfig, setFocusConfig] = useState<FocusConfig>({ type: '', duration: 0 })

    const [sessionStatus, setSessionStatus] = useState<SessionStatus>("idle")

    console.log(sessionStatus)

    console.log(focusConfig)

    return (
        <>
            {sessionStatus === 'idle' && <LockInConfig focusConfig={focusConfig} setFocusConfig={setFocusConfig} setSessionStatus={setSessionStatus} />}
        </>
    )
}