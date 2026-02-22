import type { ChartConfig } from "@/components/ui/chart"

export const lineChartConfig = {
    durationMinutes: {
        label: "Duration (min)",
        color: "var(--color-chart-1)",
    },
} satisfies ChartConfig

export const pieChartConfig = {
    listening: {
        label: "Listening",
        color: "var(--color-chart-1)",
    },
    reading: {
        label: "Reading",
        color: "var(--color-chart-2)",
    },
    studying: {
        label: "Studying",
        color: "var(--color-chart-3)",
    },
    coding: {
        label: "Coding",
        color: "var(--color-chart-4)",
    },
    working: {
        label: "Working",
        color: "var(--color-chart-5)",
    },
} satisfies ChartConfig