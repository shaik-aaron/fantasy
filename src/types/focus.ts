export type FocusConfig = {
    type: string,
    duration: number
}

export type SessionLog = {
    sessionType: string,
    durationSeconds: number,
    durationMinutes: number,
    completedAt: string,
    status: string
}

export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed'