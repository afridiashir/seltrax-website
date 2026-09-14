"use client"

import type { CSSProperties, ReactNode } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

/* Seltrax brand blue — same value as --primary in globals.css. */
export const ACCENT = "#2B7FFF"
export const ACCENT_SOFT = "#5B9CFF"

/* Instrument Serif italic — the display accent used in every heading. */
export function Serif({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={cn("font-normal italic", className)}
            style={{ fontFamily: "var(--font-home-serif), Georgia, serif" }}
        >
            {children}
        </span>
    )
}

/* Centered content column. The hero and the CTA/footer card skip this and run full-width. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>
}

/* Fade-up on scroll. Reduced-motion users get the opacity fade only (see MotionProvider). */
export function Reveal({
    children,
    className,
    delay = 0,
    style,
}: {
    children: ReactNode
    className?: string
    delay?: number
    style?: CSSProperties
}) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

export const h2Class = "text-center text-[26px] leading-[1.15] tracking-[-0.02em] sm:text-[34px] lg:text-[42px]"

export function Logo({ className }: { className?: string }) {
    return (
        <span className={cn("inline-flex items-center gap-1.5 text-[15px] font-semibold lg:text-[17px]", className)}>
            <Zap className="h-5 w-5 lg:h-6 lg:w-6" color={ACCENT} fill={ACCENT} />
            Seltrax
        </span>
    )
}

/* Round SVG flag — emoji flags don't render on Windows. */
export function Flag({ code, size = 14, className }: { code: "pk"; size?: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={cn("inline-block shrink-0 rounded-full", className)} aria-hidden>
            <clipPath id={`flag-${code}`}>
                <circle cx="12" cy="12" r="12" />
            </clipPath>
            <g clipPath={`url(#flag-${code})`}>
                <rect width="24" height="24" fill="#01411C" />
                <rect width="6" height="24" fill="#fff" />
                <circle cx="15" cy="12" r="5" fill="#fff" />
                <circle cx="16.6" cy="11" r="4.4" fill="#01411C" />
                <circle cx="19.2" cy="8.4" r="1.1" fill="#fff" />
            </g>
        </svg>
    )
}

/* Photo avatar — files live in public/landing/avatars (160px face crops). */
export function Face({ src, size = 20, alt = "", className }: { src: string; size?: number; alt?: string; className?: string }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={cn("inline-block rounded-full object-cover ring-2 ring-white", className)}
            style={{ width: size, height: size }}
        />
    )
}

/* Small "avatar" disc used in stacks. */
export function Avatar({ color, size = 20, className }: { color: string; size?: number; className?: string }) {
    return (
        <span
            className={cn("inline-block rounded-full ring-2 ring-white", className)}
            style={{ width: size, height: size, background: color }}
        />
    )
}

export const shadow = "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)]"
