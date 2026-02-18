import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { FocusConfig, SessionLog, SessionStatus } from "@/types/focus"
import { Pause, Play, Square } from "lucide-react"
import { useEffect, useState } from "react"

export const Session = ({ focusConfig, startTime, sessionStatus, setSessionStatus, setPendingCompletedSession }: { focusConfig: FocusConfig, startTime: number, sessionStatus: SessionStatus, setSessionStatus: (status: SessionStatus) => void, setPendingCompletedSession: (session: SessionLog | null) => void }) => {

    const totalDuration = focusConfig.duration * 60 * 1000

    const [endsAt, setEndsAt] = useState(() => startTime + totalDuration)
    const [now, setNow] = useState(startTime)  // Start at exact startTime
    const [remainingTime, setRemainingTime] = useState<number | null>(null)

    const handlePause = () => {
        const remaining = endsAt - Date.now()
        setRemainingTime(remaining)
        setSessionStatus("paused")
    }

    const handleResume = () => {
        const newEndsAt = Date.now() + remainingTime!
        setEndsAt(newEndsAt)
        setRemainingTime(null)
        setSessionStatus("running")
    }

    const handleEnd = () => {
        // Log session data when manually ended
        const actualDuration = Math.floor(elapsed / 1000)
        console.log("Session completed:", actualDuration)

        setSessionStatus("completed")
        setPendingCompletedSession({ sessionType: focusConfig.type, durationSeconds: actualDuration, durationMinutes: Math.floor(actualDuration / 60), completedAt: new Date().toISOString(), status: "manually_ended" })
    }

    useEffect(() => {
        if (sessionStatus === 'paused') return  // Don't update timer when paused

        setNow(Date.now())  // Immediately sync to current time

        const interval = setInterval(() => {
            setNow(Date.now())
        }, 100)

        return () => clearInterval(interval)
    }, [sessionStatus])

    const timeLeft = sessionStatus === 'paused' ? remainingTime! : Math.max(0, endsAt - now)
    const elapsed = totalDuration - timeLeft
    const progress = (elapsed / totalDuration) * 100

    const totalSeconds = Math.floor(timeLeft / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    const formattedTime = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`

    useEffect(() => {
        if (sessionStatus === 'running' && timeLeft <= 0) {
            // Log session data when naturally completed
            const actualDuration = Math.floor(elapsed / 1000)
            console.log("Session completed:", actualDuration)

            setSessionStatus("completed")
            setPendingCompletedSession({ sessionType: focusConfig.type, durationSeconds: actualDuration, durationMinutes: Math.floor(actualDuration / 60), completedAt: new Date().toISOString(), status: "naturally_completed" })
        }
    }, [timeLeft, setSessionStatus, sessionStatus, elapsed, focusConfig.type])



    return (
        <div className="w-full h-full p-[14px] font-geist">
            <Card className="w-full mx-auto shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-lg font-semibold">
                            {focusConfig.type || "Focus Session"}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Session in progress
                        </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {focusConfig.duration} min
                    </span>
                </CardHeader>
                <CardContent className="space-y-8 py-8">
                    <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Time Remaining
                        </p>

                        <h1 className="text-6xl font-bold tracking-tight">
                            {formattedTime}
                        </h1>
                    </div>
                    <Progress
                        value={progress}
                        className="h-3 rounded-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                            Elapsed: {Math.floor(elapsed / 60000)}m
                        </span>

                        <span>
                            {Math.round(progress)}% complete
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                    {sessionStatus === 'paused' ? (
                        <Button
                            className="flex-1 cursor-pointer"
                            onClick={handleResume}
                        >
                            <Play height={16} width={16} />
                            Resume
                        </Button>
                    ) : (
                        <Button
                            className="flex-1 cursor-pointer"
                            onClick={handlePause}
                        >
                            <Pause height={16} width={16} />
                            Pause
                        </Button>
                    )}
                    <AlertDialog>
                        <AlertDialogTrigger asChild><Button
                            variant="destructive"
                            className="flex-1 cursor-pointer"
                        >
                            <Square height={16} width={16} color="white" fill="white" />
                            End Session
                        </Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to end your session?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Your session will be logged and you will be able to view it in the dashboard.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleEnd}>End Session</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>

            </Card>

        </div>
    )
}