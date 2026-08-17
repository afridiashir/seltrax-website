"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, CircleHelp, RefreshCw, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlusMark } from "@/components/landing/section"
import { cn } from "@/lib/utils"
import {
    type HealthCheck,
    type HealthReport,
    type HealthService,
    type HealthStatus,
    descriptionFor,
    formatDuration,
    formatUptime,
    labelFor,
    normalizeStatus,
    worstStatus,
} from "@/lib/health"

const REFRESH_MS = 30_000

const STATUS_META: Record<
    HealthStatus,
    {
        label: string
        headline: string
        dot: string
        text: string
        chip: string
        glow: string
        Icon: React.ComponentType<{ className?: string }>
    }
> = {
    ok: {
        label: "Operational",
        headline: "All systems operational",
        dot: "bg-emerald-500",
        text: "text-emerald-600 dark:text-emerald-400",
        chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        glow: "from-emerald-500/[0.09]",
        Icon: CheckCircle2,
    },
    degraded: {
        label: "Degraded",
        headline: "Partially degraded service",
        dot: "bg-amber-500",
        text: "text-amber-600 dark:text-amber-400",
        chip: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        glow: "from-amber-500/[0.09]",
        Icon: AlertTriangle,
    },
    error: {
        label: "Outage",
        headline: "We're having a service disruption",
        dot: "bg-red-500",
        text: "text-red-600 dark:text-red-400",
        chip: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
        glow: "from-red-500/[0.09]",
        Icon: XCircle,
    },
    unknown: {
        label: "Unknown",
        headline: "Status unavailable",
        dot: "bg-muted-foreground",
        text: "text-muted-foreground",
        chip: "border-border bg-muted text-muted-foreground",
        glow: "from-primary/[0.07]",
        Icon: CircleHelp,
    },
}

function StatusDot({ status, className }: { status: HealthStatus; className?: string }) {
    const meta = STATUS_META[status]
    return (
        <span aria-hidden className={cn("relative flex h-2.5 w-2.5 shrink-0", className)}>
            {status !== "ok" && (
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", meta.dot)} />
            )}
            <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", meta.dot)} />
        </span>
    )
}

function StatusPill({ status }: { status: HealthStatus }) {
    const meta = STATUS_META[status]
    return (
        <span className={cn("eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1", meta.chip)}>
            <meta.Icon className="h-3.5 w-3.5" />
            {meta.label}
        </span>
    )
}

function MetaItem({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-1 px-4 py-6 text-center md:py-8">
            <dd className="font-mono text-lg font-medium md:text-xl">{value}</dd>
            <dt className="eyebrow text-muted-foreground">{label}</dt>
        </div>
    )
}

function CheckRow({ name, check }: { name: string; check: HealthCheck }) {
    const status = normalizeStatus(check.status)
    const duration = formatDuration(check.durationMs)

    return (
        <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
                <StatusDot status={status} />
                <div className="min-w-0">
                    <p className="text-sm font-medium">{labelFor(name)}</p>
                    {check.message && (
                        <p className="mt-0.5 break-words font-mono text-xs leading-relaxed text-muted-foreground">
                            {check.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
                {check.required === false && (
                    <span className="eyebrow hidden text-muted-foreground/60 sm:inline">optional</span>
                )}
                {duration && <span className="font-mono text-xs text-muted-foreground/80">{duration}</span>}
                <span className={cn("eyebrow", STATUS_META[status].text)}>{STATUS_META[status].label}</span>
            </div>
        </li>
    )
}

function ServiceCard({ name, service }: { name: string; service: HealthService }) {
    const status = normalizeStatus(service.status)
    const duration = formatDuration(service.durationMs)
    const description = descriptionFor(name)
    const checks = Object.entries(service.checks ?? {})

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4">
                <div className="flex items-center gap-3">
                    <StatusDot status={status} />
                    <div>
                        <p className="font-heading text-base font-semibold">{labelFor(name)}</p>
                        {description && <p className="eyebrow text-muted-foreground/70">{description}</p>}
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    {service.required && (
                        <span className="eyebrow hidden rounded-full border border-border px-2 py-0.5 text-muted-foreground/70 sm:inline-flex">
                            required
                        </span>
                    )}
                    {duration && <span className="font-mono text-xs text-muted-foreground/80">{duration}</span>}
                    <StatusPill status={status} />
                </div>
            </div>

            {service.message && (
                <p className="break-words border-t border-border bg-muted/40 px-5 py-3 font-mono text-xs leading-relaxed text-muted-foreground">
                    {service.message}
                </p>
            )}

            {checks.length > 0 && (
                <ul className="divide-y divide-border border-t border-border">
                    {checks.map(([key, check]) => (
                        <CheckRow key={key} name={key} check={check} />
                    ))}
                </ul>
            )}
        </div>
    )
}

function CardSkeleton() {
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-muted-foreground/30" />
                <span className="h-4 w-32 animate-pulse rounded bg-muted-foreground/20" />
                <span className="ml-auto h-6 w-24 animate-pulse rounded-full bg-muted-foreground/15" />
            </div>
        </div>
    )
}

function useRelativeTime(timestamp: number | null) {
    const [now, setNow] = React.useState<number | null>(null)

    React.useEffect(() => {
        setNow(Date.now())
        const id = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(id)
    }, [])

    if (!timestamp || now === null) return null
    const seconds = Math.max(0, Math.round((now - timestamp) / 1000))
    if (seconds < 5) return "just now"
    if (seconds < 60) return `${seconds}s ago`
    return `${Math.floor(seconds / 60)}m ago`
}

export function StatusBoard() {
    const [report, setReport] = React.useState<HealthReport | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [refreshing, setRefreshing] = React.useState(false)
    const [checkedAt, setCheckedAt] = React.useState<number | null>(null)

    const load = React.useCallback(async () => {
        setRefreshing(true)
        try {
            const response = await fetch("/api/health", { cache: "no-store" })
            const data: HealthReport = await response.json()

            if (response.ok) {
                setReport(data)
                setError(null)
            } else {
                setReport(null)
                setError(data?.message ?? "Could not read the platform health report.")
            }
        } catch {
            setReport(null)
            setError("Could not reach the status endpoint from this browser.")
        } finally {
            setCheckedAt(Date.now())
            setRefreshing(false)
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        load()
        const id = setInterval(load, REFRESH_MS)

        // Catch up immediately when the tab comes back into view.
        const onVisible = () => {
            if (document.visibilityState === "visible") load()
        }
        document.addEventListener("visibilitychange", onVisible)

        return () => {
            clearInterval(id)
            document.removeEventListener("visibilitychange", onVisible)
        }
    }, [load])

    const relative = useRelativeTime(checkedAt)

    const services = Object.entries(report?.services ?? {})
    const reported = normalizeStatus(report?.status)
    const overall: HealthStatus = error
        ? "unknown"
        : reported !== "unknown"
            ? reported
            : services.length > 0
                ? worstStatus(services.map(([, service]) => normalizeStatus(service.status)))
                : "unknown"

    const meta = STATUS_META[overall]
    const healthy = services.filter(([, service]) => normalizeStatus(service.status) === "ok").length

    return (
        <>
            {/* Overall status */}
            <section className="relative overflow-hidden">
                <div className="bg-grid mask-fade-edges pointer-events-none absolute inset-0" />
                <div
                    className={cn(
                        "pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b to-transparent",
                        meta.glow
                    )}
                />

                <div className="container relative mx-auto max-w-6xl border-x border-border px-5 pt-32 pb-14 md:px-12 md:pt-40 md:pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center text-center"
                    >
                        <p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-muted-foreground">
                            <StatusDot status={overall} />
                            System status
                        </p>

                        <h1 className="font-heading max-w-3xl text-3xl font-semibold leading-[1.2] tracking-tight md:text-5xl">
                            {loading ? "Checking platform health…" : meta.headline}
                        </h1>

                        <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
                            {error
                                ? error
                                : loading
                                    ? "Fetching a live report from the Seltrax platform."
                                    : services.length > 0
                                        ? `${healthy} of ${services.length} services fully operational. Live health of the Seltrax platform, refreshed every ${REFRESH_MS / 1000} seconds.`
                                        : "Live health of the Seltrax platform."}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Button
                                variant="outline"
                                className="rounded-md font-medium"
                                onClick={load}
                                disabled={refreshing}
                            >
                                <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                                {refreshing ? "Checking…" : "Refresh"}
                            </Button>
                            <span className="eyebrow text-muted-foreground">
                                {relative ? `Last checked ${relative}` : "Checking…"}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Report metadata */}
            <section className="relative border-t border-border">
                <div className="container relative mx-auto max-w-6xl border-x border-border">
                    <PlusMark className="left-0 top-0" />
                    <PlusMark className="right-0 top-0 translate-x-1/2" />
                    <dl className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
                        <MetaItem label="Environment" value={report?.environment ?? "—"} />
                        <MetaItem label="Version" value={report?.version ?? "—"} />
                        <MetaItem label="Uptime" value={formatUptime(report?.uptimeSeconds)} />
                        <MetaItem label="Check duration" value={formatDuration(report?.durationMs) ?? "—"} />
                    </dl>
                </div>
            </section>

            {/* Services */}
            <section className="relative border-t border-border">
                <div className="container relative mx-auto max-w-6xl border-x border-border px-5 py-16 md:px-12 md:py-20">
                    <PlusMark className="left-0 top-0" />
                    <PlusMark className="right-0 top-0 translate-x-1/2" />

                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="eyebrow mb-3 text-primary">[ Services ]</p>
                            <h2 className="font-heading text-2xl font-semibold md:text-3xl">
                                Component-level health
                            </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            {(["ok", "degraded", "error"] as const).map((status) => (
                                <span key={status} className="flex items-center gap-2">
                                    <span className={cn("h-2 w-2 rounded-full", STATUS_META[status].dot)} />
                                    <span className="eyebrow text-muted-foreground">{STATUS_META[status].label}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </div>
                    ) : error ? (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-6 text-center">
                            <XCircle className="mx-auto h-6 w-6 text-red-500" />
                            <p className="mt-3 font-medium">Health report unavailable</p>
                            <p className="mt-1 font-mono text-xs text-muted-foreground">{error}</p>
                            <Button variant="outline" className="mt-5 rounded-md" onClick={load} disabled={refreshing}>
                                <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                                Try again
                            </Button>
                        </div>
                    ) : services.length === 0 ? (
                        <p className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
                            The health report contained no services.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {services.map(([name, service]) => (
                                <ServiceCard key={name} name={name} service={service} />
                            ))}
                        </div>
                    )}

                    <p className="eyebrow mt-8 text-center text-muted-foreground/70">
                        {report?.timestamp
                            ? `Report generated ${new Date(report.timestamp).toLocaleString()}`
                            : "Auto-refreshes every 30 seconds"}
                    </p>
                </div>
            </section>
        </>
    )
}
