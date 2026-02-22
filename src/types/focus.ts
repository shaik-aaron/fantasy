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

export type Reports = {
    sessions: SessionLog[]
    count: number
    totalSessions: number
    totalTimeSeconds: number,
    sessionTypeBreakdown: [{
        count: number,
        percentage: number,
        type: string
    }]
}

export type SessionContextType = {
    sessionStatus: SessionStatus | null;
    setSessionStatus: (sessionStatus: SessionStatus) => void;
    sessionStartTime: number | null;
    setSessionStartTime: (sessionStartTime: number) => void;
    endsAt: number | null;
    setEndsAt: (endsAt: number | null) => void;
    focusConfig: FocusConfig;
    setFocusConfig: (config: FocusConfig) => void;
    pendingCompletedSession: SessionLog | null;
    setPendingCompletedSession: (session: SessionLog | null) => void;
    remainingTime: number | null;
    setRemainingTime: (remainingTime: number | null) => void;
};

export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed'