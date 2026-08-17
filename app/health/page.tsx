import type { Metadata } from "next";
import { StatusBoard } from "@/components/health/status-board";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: "System Status — Seltrax",
    description:
        "Live health of the Seltrax platform: API, admin dashboard, storefronts, and their underlying checks.",
    alternates: { canonical: "/health" },
    openGraph: {
        type: "website",
        url: "https://seltrax.com/health",
        siteName: "Seltrax",
        title: "System Status — Seltrax",
        description: "Live health of the Seltrax platform.",
    },
};

export default function HealthPage() {
    return (
        <main className="min-h-screen bg-background">
            <StatusBoard />
            <Footer />
        </main>
    );
}
