import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { FocusConfig, SessionStatus } from "@/types/focus"

export const LockInConfig = ({ focusConfig, setFocusConfig, setSessionStatus }: { focusConfig: FocusConfig, setFocusConfig: (config: FocusConfig) => void, setSessionStatus: (status: SessionStatus) => void }) => {

    return (
        <div className="w-full h-full p-[14px] font-geist">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="font-geist-bold text-xl">Lock In</CardTitle>
                    <CardDescription>
                        Start a focus session with your chosen configuration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <h2 className="font-geist-semibold text-md mb-4">Focus Type</h2>
                    <ToggleGroup type="single" size="sm" value={focusConfig.type} onValueChange={value => setFocusConfig({ ...focusConfig, type: value })} spacing={2} variant="outline">
                        <ToggleGroupItem value="work" className="cursor-pointer">Work</ToggleGroupItem>
                        <ToggleGroupItem value="coding" className="cursor-pointer">Coding</ToggleGroupItem>
                        <ToggleGroupItem value="studying" className="cursor-pointer">Studying</ToggleGroupItem>
                        <ToggleGroupItem value="reading" className="cursor-pointer">Reading</ToggleGroupItem>
                    </ToggleGroup>
                    <h2 className="font-geist-semibold text-md mb-4 mt-6">Duration</h2>
                    <ToggleGroup type="single" size="sm" value={focusConfig.duration.toString()} onValueChange={value => setFocusConfig({ ...focusConfig, duration: parseInt(value) })} spacing={2} variant="outline">
                        <ToggleGroupItem value="25" className="cursor-pointer">25m</ToggleGroupItem>
                        <ToggleGroupItem value="45" className="cursor-pointer">45m</ToggleGroupItem>
                        <ToggleGroupItem value="60" className="cursor-pointer">1h</ToggleGroupItem>
                        <ToggleGroupItem value="120" className="cursor-pointer">2h</ToggleGroupItem>
                    </ToggleGroup>
                    <hr className="my-6" />
                    <h2 className="font-geist-semibold text-md mb-4 mt-6">Custom Duration (optional)</h2>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                min={0}
                                max={12}
                                className="w-16 text-center"
                            />
                            <span className="text-md text-muted-foreground">h</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Input
                                type="number"
                                min={0}
                                max={59}

                                className="w-16 text-center"
                            />
                            <span className="text-md text-muted-foreground">m</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="cursor-pointer font-geist- mt-8" onClick={() => setSessionStatus('running')}>Start Focus Session</Button>
                </CardFooter>
            </Card>
        </div>
    )
}