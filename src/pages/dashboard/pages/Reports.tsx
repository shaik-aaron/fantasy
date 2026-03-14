import { useContext, useEffect, useState } from "react"
import api from "../../../api/posts"
import { AuthContext } from "../../../context/AuthProvider"
import type { Reports as ReportsType } from "@/types/focus"
import { toast } from "sonner"
import dayjs from "dayjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import { lineChartConfig, pieChartConfig } from "@/lib/chartTypes"
import { Skeleton } from "@/components/ui/skeleton"

export default function Reports({ reports, setReports }: { reports: ReportsType | null, setReports: (reports: ReportsType | null) => void }) {

    const { auth } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true)
            const response = await api.get(`/sessions/${auth?.userId}`)
            if (response.status === 200) {
                setReports(response.data)
                setIsLoading(false)
            }
            else {
                console.error("Failed to fetch reports :", response.status)
                toast.error("Failed to fetch reports")
                setIsLoading(false)
            }
        }
        if (!reports) {
            fetchReports()
        }
    }, [auth?.userId])

    const averageSessionLength = ((reports?.totalTimeSeconds ?? 0) / (reports?.count ?? 0) / 60).toFixed(2)
    console.log(reports)

    return (
        <div className="w-full h-full p-[14px] font-geist">
            <Card className="w-full col-span-2 mx-auto shadow-sm mb-4">
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                        {isLoading ? <Skeleton className="flex flex-col items-center justify-center py-4 md:py-0" /> : <div className="flex flex-col items-center justify-center py-4 md:py-0">
                            <p className="text-3xl font-bold tracking-tight">
                                {((reports?.totalTimeSeconds ?? 0) / 60).toFixed(2)}m
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Total Focus Time
                            </p>
                        </div>}
                        {isLoading ? <Skeleton className="w-full h-[100px] animate-pulse" /> : <div className="flex flex-col items-center justify-center py-4 md:py-0">
                            <p className="text-3xl font-bold tracking-tight">
                                {reports?.totalSessions ?? 0}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Sessions Completed
                            </p>
                        </div>}
                        {isLoading ? <Skeleton className="w-full h-[100px] animate-pulse" /> : <div className="flex flex-col items-center justify-center py-4 md:py-0">
                            <p className="text-3xl font-bold tracking-tight">
                                {isNaN(parseFloat(averageSessionLength)) ? "0.00" : averageSessionLength}m
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Avg Session Length
                            </p>
                        </div>}
                    </div>
                </CardContent>
            </Card>
            <div className="w-full grid grid-cols-2 gap-2">
                <Card className="w-full min-h-0 mx-auto shadow-md row-start-2 overflow-hidden">
                    <CardHeader>
                        <CardTitle>
                            Weekly Report
                        </CardTitle>
                        <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="w-full h-[300px] animate-pulse" /> : (
                            <>
                                {reports?.count === 0 ? <div className="w-full h-[300px] flex items-center justify-center"><p className="text-md text-muted-foreground">Start a session to see your weekly report</p></div> : <ChartContainer className="h-[300px] w-full" config={lineChartConfig}>
                                    <LineChart data={reports?.sessions ?? []} margin={{
                                        left: 24,
                                        right: 24,
                                    }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="completedAt"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => dayjs(value).format("MM/DD")}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel />}
                                        />
                                        <YAxis hide />
                                        <Line
                                            dataKey="durationMinutes"
                                            type="linear"
                                            stroke="var(--color-chart-1)"
                                            strokeWidth={2}
                                            dot={true}
                                        />
                                    </LineChart>
                                </ChartContainer>}
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card className="w-full min-h-0 mx-auto shadow-md row-start-2 overflow-hidden">
                    <CardHeader>
                        <CardTitle>
                            Session Type Distribution
                        </CardTitle>
                        <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="w-full h-[300px] animate-pulse" /> : (
                            <>
                                {reports?.count === 0 ? <div className="w-full h-[300px] flex items-center justify-center"><p className="text-md text-muted-foreground">Start a session to see your session type distribution</p></div> : <ChartContainer className="h-[300px] w-full" config={pieChartConfig}>
                                    <PieChart>
                                        <ChartTooltip
                                            content={<ChartTooltipContent nameKey="percentage" hideLabel />}
                                        />
                                        <Pie data={reports?.sessionTypeBreakdown ?? []} dataKey="percentage" nameKey="type">
                                            {(reports?.sessionTypeBreakdown ?? []).map((entry) => (
                                                <Cell key={entry.type} fill={pieChartConfig[entry.type as keyof typeof pieChartConfig]?.color ?? "var(--color-chart-1)"} />
                                            ))}
                                            <LabelList
                                                dataKey="type"
                                                className="fill-background"
                                                stroke="none"
                                                fontSize={12}
                                                formatter={(value: keyof typeof pieChartConfig) =>
                                                    pieChartConfig[value]?.label
                                                }
                                            />
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}