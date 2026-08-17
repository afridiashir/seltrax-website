/** Shape of the payload served by the platform health endpoint (/health/all). */
export interface HealthCheck {
    status?: string
    required?: boolean
    durationMs?: number
    message?: string
}

export interface HealthService extends HealthCheck {
    checks?: Record<string, HealthCheck>
}

export interface HealthReport {
    service?: string
    status?: string
    timestamp?: string
    uptimeSeconds?: number
    environment?: string
    version?: string
    durationMs?: number
    services?: Record<string, HealthService>
    /** Set by our proxy route when the upstream could not be read. */
    message?: string
}

export type HealthStatus = "ok" | "degraded" | "error" | "unknown"

export function normalizeStatus(status?: string): HealthStatus {
    switch (status?.toLowerCase()) {
        case "ok":
        case "up":
        case "pass":
        case "healthy":
            return "ok"
        case "degraded":
        case "warn":
        case "warning":
            return "degraded"
        case "error":
        case "down":
        case "fail":
        case "failed":
        case "timeout":
        case "unhealthy":
            return "error"
        default:
            return "unknown"
    }
}

const SEVERITY: Record<HealthStatus, number> = {
    ok: 0,
    unknown: 1,
    degraded: 2,
    error: 3,
}

/** Worst status wins — used to derive an overall status when one isn't reported. */
export function worstStatus(statuses: HealthStatus[]): HealthStatus {
    return statuses.reduce<HealthStatus>(
        (worst, current) => (SEVERITY[current] > SEVERITY[worst] ? current : worst),
        "ok"
    )
}

export function formatDuration(ms?: number): string | null {
    if (typeof ms !== "number" || !Number.isFinite(ms) || ms < 0) return null
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(2)}s`
}

export function formatUptime(seconds?: number): string {
    if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) return "—"

    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (days) return `${days}d ${hours}h`
    if (hours) return `${hours}h ${minutes}m`
    if (minutes) return `${minutes}m ${secs}s`
    return `${secs}s`
}

/** Friendly names for the keys we know about; anything else is prettified. */
const LABELS: Record<string, string> = {
    api: "API",
    admin: "Admin dashboard",
    storefront: "Storefront",
    database: "Database",
    storage: "Object storage",
    auth: "Authentication",
    email: "Email delivery",
    domains: "Custom domains",
}

const DESCRIPTIONS: Record<string, string> = {
    api: "api.seltrax.com",
    admin: "admin.seltrax.com",
    storefront: "Customer-facing storefronts",
}

export function labelFor(key: string): string {
    return LABELS[key] ?? key.replace(/[-_]/g, " ").replace(/^\w/, (c) => c.toUpperCase())
}

export function descriptionFor(key: string): string | undefined {
    return DESCRIPTIONS[key]
}
