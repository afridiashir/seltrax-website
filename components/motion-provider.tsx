"use client"

import { MotionConfig } from "framer-motion"

/* `reducedMotion="user"` makes every framer-motion animation on the site honour
   the OS "reduce motion" setting — transforms and layout animations are skipped,
   opacity fades still run, so nothing appears blank. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
