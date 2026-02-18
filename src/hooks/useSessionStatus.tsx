import type { SessionStatus } from "@/types/focus"
import { useState } from "react"

export const useSessionStatus = () => {
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>("idle")
    return { sessionStatus, setSessionStatus }
}