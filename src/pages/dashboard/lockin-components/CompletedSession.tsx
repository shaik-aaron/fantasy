import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SessionLog, SessionStatus } from "@/types/focus"
import { useContext, useState } from "react"
import { createSessionLog } from "@/lib/utils"
import { AuthContext } from "@/context/AuthProvider"
import { toast } from "sonner"

export const CompletedSession = ({ session, setSessionStatus }: { session: SessionLog, setSessionStatus: (status: SessionStatus) => void }) => {

    const completedDate = new Date(session.completedAt)

    const formattedDate = completedDate.toLocaleDateString()
    const formattedTime = completedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    })

    const durationFormatted = `${session.durationMinutes} min`

    const [isSaving, setIsSaving] = useState<boolean>(false)
    const { auth } = useContext(AuthContext)

    const saveSession = async () => {
        setIsSaving(true)
        try {
            const response = await createSessionLog(auth?.userId ?? 0, session.sessionType, session.durationSeconds, session.durationMinutes, session.completedAt, session.status)
            if (response?.status === 201) {
                console.log("Session saved successfully")
                toast.success("Session saved successfully")
            }
            else {
                console.error("Failed to save session :", response?.status)
                toast.error("Failed to save session")
            }
        } catch (error) {
            console.error("Failed to save session :", error)
            toast.error("Failed to save session")
        } finally {
            setIsSaving(false)
            setSessionStatus("idle")
        }
    }

    return (
        <div className="w-full h-full p-[14px] font-geist">
            <Card className="w-full mx-auto shadow-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold">
                        🎉 Session Completed
                    </CardTitle>

                    <p className="text-muted-foreground">
                        Great work staying focused!
                    </p>
                </CardHeader>
                <CardContent className="space-y-8 py-8">
                    <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Session Type
                        </p>

                        <h2 className="text-xl font-semibold capitalize">
                            {session.sessionType}
                        </h2>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground border-t pt-6">
                        <span>Duration</span>
                        <span>{durationFormatted}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Completed On</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Time</span>
                        <span>{formattedTime}</span>
                    </div>
                </CardContent>
                <div className="px-8 pb-8">
                    <Button onClick={saveSession} className="w-full cursor-pointer">
                        {isSaving ? "Saving..." : "Save and Start Another Session"}
                    </Button>
                </div>
            </Card>
        </div>
    )
}
