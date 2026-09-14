"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

/* A card that tilts toward the pointer in 3D, with a glare highlight that follows
   it and an optional slow idle float. Children rendered through <Layer depth> sit
   on separate Z planes, so they visibly separate as the card tilts. Entrance and
   float are framer animations, so MotionConfig's reduced-motion setting skips
   them; the pointer tilt is direct input and stays.

   `spring` — true: tilt/scale settle with spring physics. false: direct tracking
   with a short CSS ease, no overshoot. */
export function TiltCard({
    children,
    delay = 0,
    spring = true,
    float = true,
    floatDuration = 6,
    floatOffset = 0,
    inView = false,
    maxTilt = 12,
    className,
}: {
    children: React.ReactNode
    delay?: number
    spring?: boolean
    float?: boolean
    floatDuration?: number
    floatOffset?: number
    inView?: boolean
    maxTilt?: number
    className?: string
}) {
    const px = useMotionValue(0.5)
    const py = useMotionValue(0.5)
    const rawX = useTransform(py, [0, 1], [maxTilt, -maxTilt])
    const rawY = useTransform(px, [0, 1], [-maxTilt, maxTilt])
    const springCfg = { stiffness: 220, damping: 22, mass: 0.6 }
    const sprX = useSpring(rawX, springCfg)
    const sprY = useSpring(rawY, springCfg)
    const rotateX: MotionValue<number> = spring ? sprX : rawX
    const rotateY: MotionValue<number> = spring ? sprY : rawY
    const glareX = useTransform(px, [0, 1], ["0%", "100%"])
    const glareY = useTransform(py, [0, 1], ["0%", "100%"])
    const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)`
    const [hover, setHover] = React.useState(false)

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width)
        py.set((e.clientY - r.top) / r.height)
    }
    const reset = () => {
        px.set(0.5)
        py.set(0.5)
        setHover(false)
    }

    const entrance = inView
        ? { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } }
        : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }

    return (
        <motion.div {...entrance} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} style={{ perspective: 900 }}>
            <motion.div
                animate={float ? { y: [0, -7, 0] } : undefined}
                transition={{ duration: floatDuration, delay: floatOffset, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div
                    onPointerMove={onPointerMove}
                    onPointerEnter={() => setHover(true)}
                    onPointerLeave={reset}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        // Non-spring mode: smooth the direct tracking without any bounce.
                        transition: spring ? undefined : "transform 0.18s ease-out",
                    }}
                    animate={{ scale: hover ? 1.03 : 1 }}
                    transition={spring ? { type: "spring", stiffness: 260, damping: 20 } : { duration: 0.25, ease: "easeOut" }}
                    className={cn("relative rounded-2xl", className)}
                >
                    {children}
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light"
                        style={{ background: glare, opacity: hover ? 1 : 0, transition: "opacity 0.3s" }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

/* Lifts its children off the card surface; larger depth = closer to the viewer. */
export function Layer({ depth = 20, children, className }: { depth?: number; children: React.ReactNode; className?: string }) {
    return (
        <div className={className} style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}>
            {children}
        </div>
    )
}
