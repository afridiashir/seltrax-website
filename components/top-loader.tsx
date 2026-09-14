"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

/* Route-change progress bar. Starts on any same-origin link click (or
   back/forward) that changes the pathname, trickles towards 90%, then completes
   and fades once the new route has rendered. Hash-only and same-page links are
   ignored, as are new-tab / modifier-key clicks. */
const ACCENT = "#2B7FFF"
const TRICKLE_MS = 200
const FADE_MS = 300
const STALL_MS = 8000 // give up (complete) if a navigation never lands

export function TopLoader() {
    const pathname = usePathname()
    const [progress, setProgress] = React.useState(0)
    const [visible, setVisible] = React.useState(false)
    const active = React.useRef(false)
    const timers = React.useRef<number[]>([])
    const trickle = React.useRef<number | null>(null)

    const clearTimers = () => {
        timers.current.forEach((t) => window.clearTimeout(t))
        timers.current = []
        if (trickle.current) window.clearInterval(trickle.current)
        trickle.current = null
    }

    const start = React.useCallback(() => {
        if (active.current) return
        active.current = true
        clearTimers()
        setVisible(true)
        setProgress(8)
        trickle.current = window.setInterval(() => {
            setProgress((p) => (p >= 90 ? p : p + Math.max(0.5, (90 - p) * 0.08)))
        }, TRICKLE_MS)
        timers.current.push(window.setTimeout(() => finish(), STALL_MS))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const finish = React.useCallback(() => {
        if (!active.current) return
        active.current = false
        clearTimers()
        setProgress(100)
        timers.current.push(
            window.setTimeout(() => {
                setVisible(false)
                timers.current.push(window.setTimeout(() => setProgress(0), FADE_MS))
            }, FADE_MS),
        )
    }, [])

    /* Complete whenever the route actually changes. */
    const lastPath = React.useRef(pathname)
    React.useEffect(() => {
        if (lastPath.current !== pathname) {
            lastPath.current = pathname
            finish()
        }
    }, [pathname, finish])

    React.useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
            const a = (e.target as Element | null)?.closest("a")
            if (!a || a.target === "_blank" || a.hasAttribute("download")) return
            const href = a.getAttribute("href")
            if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return
            let url: URL
            try {
                url = new URL(href, window.location.href)
            } catch {
                return
            }
            if (url.origin !== window.location.origin) return
            if (url.pathname === window.location.pathname) return // same page (hash / query only)
            start()
        }
        const onPop = () => start()
        document.addEventListener("click", onClick, true)
        window.addEventListener("popstate", onPop)
        return () => {
            document.removeEventListener("click", onClick, true)
            window.removeEventListener("popstate", onPop)
            clearTimers()
        }
    }, [start])

    return (
        <div
            aria-hidden
            data-top-loader
            className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]"
            style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}
        >
            <div
                className="h-full"
                style={{
                    width: `${progress}%`,
                    background: ACCENT,
                    boxShadow: `0 0 10px ${ACCENT}, 0 0 4px ${ACCENT}`,
                    transition: progress === 0 ? "none" : `width ${progress === 100 ? 200 : TRICKLE_MS}ms ease-out`,
                }}
            />
        </div>
    )
}
