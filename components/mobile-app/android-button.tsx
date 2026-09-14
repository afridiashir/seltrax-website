import { ArrowDownToLine } from "lucide-react"
import { cn } from "@/lib/utils"
import { ANDROID_APP_URL } from "@/lib/config"

/* Download CTA. Links to ANDROID_APP_URL when configured; otherwise a disabled
   "coming soon" pill so the page never ships with a dead link. */
export function AndroidButton({ size = "md", className }: { size?: "md" | "lg"; className?: string }) {
    const base = cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-colors",
        size === "lg" ? "px-5 py-2.5 text-[13px] lg:px-6 lg:py-3 lg:text-[15px]" : "px-4 py-2 text-[12px] lg:text-[13px]",
        className,
    )

    if (!ANDROID_APP_URL) {
        return (
            <span aria-disabled className={cn(base, "cursor-not-allowed bg-[#171717]/70 text-white")}>
                <AndroidMark className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
                Coming soon to Android
            </span>
        )
    }

    return (
        <a href={ANDROID_APP_URL} className={cn(base, "bg-[#171717] text-white shadow-sm hover:bg-black")}>
            <AndroidMark className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
            Download for Android
            <ArrowDownToLine className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
        </a>
    )
}

/* Simple Android robot glyph (head + antennae), inherits currentColor. */
export function AndroidMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.81 10.81 0 0 0 1 18h22a10.81 10.81 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
        </svg>
    )
}
