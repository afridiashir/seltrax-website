import { NextResponse } from "next/server";
import { HEALTH_URL } from "@/lib/config";

// Always hit the upstream — a cached health report is worse than none.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = { "cache-control": "no-store, max-age=0" };
const UPSTREAM_TIMEOUT_MS = 12_000;

export async function GET() {
    try {
        const response = await fetch(HEALTH_URL, {
            cache: "no-store",
            headers: { accept: "application/json" },
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });

        // The endpoint answers 503 while unhealthy, and that body is exactly
        // what we want to show — so parse it regardless of the status code.
        const text = await response.text();
        let report: unknown = null;
        try {
            report = JSON.parse(text);
        } catch {
            report = null;
        }

        if (!report || typeof report !== "object") {
            return NextResponse.json(
                {
                    status: "error",
                    message: `Health endpoint responded with ${response.status} and no readable report.`,
                },
                { status: 502, headers: NO_STORE }
            );
        }

        return NextResponse.json(report, { status: 200, headers: NO_STORE });
    } catch (error) {
        const timedOut = error instanceof Error && error.name === "TimeoutError";
        return NextResponse.json(
            {
                status: "error",
                message: timedOut
                    ? `Health endpoint did not respond within ${UPSTREAM_TIMEOUT_MS / 1000}s.`
                    : "Health endpoint is unreachable.",
            },
            { status: 502, headers: NO_STORE }
        );
    }
}
