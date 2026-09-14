"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Minus, Plus, Shirt, ShoppingBag, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { ACCENT, shadow } from "./ui"

const ease = [0.22, 1, 0.36, 1] as const
const card = `rounded-xl bg-white ${shadow}`

/* ---- Step 1: product card you can configure ---------------------------- */

const colours = [
    { name: "Navy", hex: "#1F3A5F" },
    { name: "Olive", hex: "#6B7A3A" },
    { name: "Rust", hex: "#B5532A" },
    { name: "Sand", hex: "#D9C3A3" },
]
const sizes = ["S", "M", "L", "XL"]

export function ProductStudio() {
    const [colour, setColour] = React.useState(0)
    const [size, setSize] = React.useState(1)
    const [stock, setStock] = React.useState(12)
    const [live, setLive] = React.useState(false)
    const c = colours[colour]

    return (
        <div className={`${card} w-full max-w-[340px] p-3 lg:max-w-[400px] lg:p-4`}>
            <div className="flex gap-3">
                <motion.div
                    animate={{ background: `linear-gradient(145deg, ${c.hex}, ${c.hex}cc)` }}
                    transition={{ duration: 0.35, ease }}
                    className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-lg lg:h-[104px] lg:w-[104px]"
                >
                    <motion.span key={c.name} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3, ease }}>
                        <Shirt className="h-9 w-9 text-white/90 lg:h-11 lg:w-11" strokeWidth={1.5} />
                    </motion.span>
                </motion.div>

                <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-[#8A8E84] lg:text-[10px]">Product</p>
                    <p className="truncate text-[12px] font-semibold lg:text-[14px]">
                        Cotton Kurta —{" "}
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span key={c.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }} className="inline-block">
                                {c.name}
                            </motion.span>
                        </AnimatePresence>
                    </p>
                    <p className="mt-0.5 text-[12px] font-semibold lg:text-[14px]">
                        Rs 2,450 <span className="text-[9px] font-normal text-[#8A8E84] line-through lg:text-[10px]">Rs 2,950</span>
                    </p>

                    <p className="mt-2 text-[8px] text-[#8A8E84] lg:text-[9px]">Colour</p>
                    <div className="mt-1 flex gap-1.5">
                        {colours.map((x, i) => (
                            <button
                                key={x.name}
                                type="button"
                                aria-label={x.name}
                                aria-pressed={colour === i}
                                onClick={() => setColour(i)}
                                className={cn("h-4 w-4 rounded-full transition-transform hover:scale-110 lg:h-5 lg:w-5", colour === i && "ring-2 ring-[#171717] ring-offset-1")}
                                style={{ background: x.hex }}
                            />
                        ))}
                    </div>

                    <p className="mt-2 text-[8px] text-[#8A8E84] lg:text-[9px]">Size</p>
                    <div className="mt-1 flex gap-1">
                        {sizes.map((s, i) => (
                            <button
                                key={s}
                                type="button"
                                aria-pressed={size === i}
                                onClick={() => setSize(i)}
                                className={cn(
                                    "h-5 min-w-5 rounded-md px-1.5 text-[8px] font-medium transition-colors lg:h-6 lg:text-[10px]",
                                    size === i ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:bg-[#E6E8E2]",
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-[#EEF0EA] pt-3">
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] text-[#8A8E84] lg:text-[10px]">Stock</span>
                    <button type="button" aria-label="Decrease stock" onClick={() => setStock((s) => Math.max(0, s - 1))} className="grid h-5 w-5 place-items-center rounded-md bg-[#F3F4F0] hover:bg-[#E6E8E2]">
                        <Minus className="h-2.5 w-2.5" />
                    </button>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span key={stock} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} transition={{ duration: 0.15 }} className="w-5 text-center text-[11px] font-semibold tabular-nums lg:text-[12px]">
                            {stock}
                        </motion.span>
                    </AnimatePresence>
                    <button type="button" aria-label="Increase stock" onClick={() => setStock((s) => s + 1)} className="grid h-5 w-5 place-items-center rounded-md bg-[#F3F4F0] hover:bg-[#E6E8E2]">
                        <Plus className="h-2.5 w-2.5" />
                    </button>
                </div>

                <button
                    type="button"
                    role="switch"
                    aria-checked={live}
                    onClick={() => setLive((l) => !l)}
                    className="flex items-center gap-1.5 text-[9px] font-medium lg:text-[10px]"
                >
                    <span className={cn("relative h-4 w-7 rounded-full transition-colors", live ? "bg-[#171717]" : "bg-[#D5D8CF]")}>
                        <motion.span layout className="absolute top-0.5 h-3 w-3 rounded-full bg-white" animate={{ left: live ? 14 : 2 }} transition={{ duration: 0.2, ease }} />
                    </span>
                    <span style={{ color: live ? ACCENT : "#5C6058" }}>{live ? "Live on store" : "Draft"}</span>
                </button>
            </div>
        </div>
    )
}

/* ---- Step 2: theme picker driving a live mini storefront ---------------- */

const themes = [
    { name: "Minimal", radius: 4, hero: "outline", weight: 500 },
    { name: "Bold", radius: 14, hero: "filled", weight: 700 },
    { name: "Classic", radius: 8, hero: "soft", weight: 600 },
] as const
const accents = ["#171717", ACCENT, "#0F9D58", "#F26A1F", "#8E44AD"]
const fonts = ["Sans", "Serif"] as const

export function ThemePicker() {
    const [theme, setTheme] = React.useState(1)
    const [accent, setAccent] = React.useState(1)
    const [font, setFont] = React.useState(0)
    const t = themes[theme]
    const a = accents[accent]
    const fontFamily = font === 1 ? "var(--font-home-serif), Georgia, serif" : "inherit"

    return (
        <div className="flex w-full max-w-[360px] gap-3 lg:max-w-[440px]">
            {/* Live preview */}
            <motion.div layout className={`${card} min-w-0 flex-1 overflow-hidden p-2.5 lg:p-3`} style={{ fontFamily }}>
                <div className="flex items-center justify-between">
                    <span className="text-[9px] lg:text-[11px]" style={{ fontWeight: t.weight }}>
                        Apna Store
                    </span>
                    <span className="flex gap-1">
                        {["Shop", "About"].map((l) => (
                            <span key={l} className="text-[7px] text-[#8A8E84] lg:text-[8px]">
                                {l}
                            </span>
                        ))}
                        <ShoppingBag className="h-2.5 w-2.5 text-[#8A8E84]" />
                    </span>
                </div>

                <motion.div
                    layout
                    className="mt-2 px-2 py-3 lg:py-4"
                    animate={{
                        borderRadius: t.radius,
                        background: t.hero === "filled" ? a : t.hero === "soft" ? `${a}1a` : "transparent",
                        borderColor: t.hero === "outline" ? a : "transparent",
                    }}
                    transition={{ duration: 0.35, ease }}
                    style={{ borderWidth: 1, borderStyle: "solid" }}
                >
                    <p className="text-[9px] leading-tight lg:text-[11px]" style={{ fontWeight: t.weight, color: t.hero === "filled" ? "#fff" : "#171717" }}>
                        Winter drop is here
                    </p>
                    <motion.span
                        layout
                        className="mt-1.5 inline-block px-2 py-0.5 text-[7px] font-medium lg:text-[8px]"
                        animate={{ borderRadius: t.radius, background: t.hero === "filled" ? "#fff" : a, color: t.hero === "filled" ? a : "#fff" }}
                        transition={{ duration: 0.35, ease }}
                    >
                        Shop now
                    </motion.span>
                </motion.div>

                <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {[
                        { n: "Kurta", p: "Rs 2,450", c: "#1F3A5F" },
                        { n: "Shawl", p: "Rs 1,800", c: "#B5532A" },
                    ].map((p) => (
                        <div key={p.n}>
                            <motion.div layout className="h-9 lg:h-12" animate={{ borderRadius: t.radius, background: `${p.c}33` }} transition={{ duration: 0.35, ease }} />
                            <p className="mt-1 text-[7px] lg:text-[8px]" style={{ fontWeight: t.weight }}>
                                {p.n}
                            </p>
                            <p className="text-[7px] lg:text-[8px]" style={{ color: a }}>
                                {p.p}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Controls */}
            <div className={`${card} w-[118px] shrink-0 p-2.5 lg:w-[140px] lg:p-3`}>
                <p className="text-[8px] font-semibold text-[#8A8E84] lg:text-[9px]">Theme</p>
                <div className="mt-1 space-y-1">
                    {themes.map((x, i) => (
                        <button
                            key={x.name}
                            type="button"
                            aria-pressed={theme === i}
                            onClick={() => setTheme(i)}
                            className={cn(
                                "flex w-full items-center justify-between rounded-md px-2 py-1 text-[8px] font-medium transition-colors lg:text-[10px]",
                                theme === i ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:bg-[#E6E8E2]",
                            )}
                        >
                            {x.name}
                            {theme === i && <Check className="h-2.5 w-2.5" />}
                        </button>
                    ))}
                </div>

                <p className="mt-2.5 text-[8px] font-semibold text-[#8A8E84] lg:text-[9px]">Accent</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                    {accents.map((x, i) => (
                        <button
                            key={x}
                            type="button"
                            aria-label={`Accent ${i + 1}`}
                            aria-pressed={accent === i}
                            onClick={() => setAccent(i)}
                            className={cn("h-4 w-4 rounded-full transition-transform hover:scale-110 lg:h-5 lg:w-5", accent === i && "ring-2 ring-[#171717] ring-offset-1")}
                            style={{ background: x }}
                        />
                    ))}
                </div>

                <p className="mt-2.5 text-[8px] font-semibold text-[#8A8E84] lg:text-[9px]">Font</p>
                <div className="mt-1 flex rounded-md bg-[#F3F4F0] p-0.5">
                    {fonts.map((f, i) => (
                        <button
                            key={f}
                            type="button"
                            aria-pressed={font === i}
                            onClick={() => setFont(i)}
                            className={cn("relative flex-1 rounded py-0.5 text-center text-[8px] font-medium lg:text-[9px]", font === i ? "text-[#171717]" : "text-[#8A8E84]")}
                        >
                            {font === i && <motion.span layoutId="font-pill" className="absolute inset-0 rounded bg-white shadow-sm" transition={{ duration: 0.2, ease }} />}
                            <span className="relative" style={{ fontFamily: i === 1 ? "var(--font-home-serif), Georgia, serif" : undefined }}>
                                {f}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ---- Step 3: interactive sales chart ---------------------------------- */

const week = [18500, 22400, 19800, 31200, 27600, 35400, 41300]
/* Deterministic 30-day series so the mock is stable between renders. */
const month = Array.from({ length: 30 }, (_, i) => {
    const trend = 12000 + i * 900
    const wave = Math.sin(i / 2.6) * 5200 + Math.cos(i / 1.7) * 2600
    return Math.round(trend + wave + ((i * 7919) % 2300))
})
const ranges = { "7 days": week, "30 days": month } as const
type RangeKey = keyof typeof ranges

const W = 320
const H = 130
const PAD = { l: 8, r: 8, t: 14, b: 22 }

function smoothPath(pts: { x: number; y: number }[]) {
    if (pts.length < 2) return ""
    let d = `M${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)]
        const p1 = pts[i]
        const p2 = pts[i + 1]
        const p3 = pts[Math.min(pts.length - 1, i + 2)]
        const c1x = p1.x + (p2.x - p0.x) / 6
        const c1y = p1.y + (p2.y - p0.y) / 6
        const c2x = p2.x - (p3.x - p1.x) / 6
        const c2y = p2.y - (p3.y - p1.y) / 6
        d += ` C${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
    }
    return d
}

const fmt = (n: number) => `Rs ${n.toLocaleString("en-PK")}`
const short = (n: number) => (n >= 1000 ? `Rs ${(n / 1000).toFixed(1)}k` : `Rs ${n}`)
const dayLabel = (i: number, total: number) => {
    const d = new Date(2026, 8, 14 - (total - 1 - i))
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
}

export function SalesChart() {
    const [range, setRange] = React.useState<RangeKey>("7 days")
    const [hover, setHover] = React.useState<number | null>(null)
    const data = ranges[range]

    const { pts, line, area, max } = React.useMemo(() => {
        const max = Math.max(...data) * 1.08
        const min = Math.min(...data) * 0.7
        const iw = W - PAD.l - PAD.r
        const ih = H - PAD.t - PAD.b
        const pts = data.map((v, i) => ({
            x: PAD.l + (i / (data.length - 1)) * iw,
            y: PAD.t + ih - ((v - min) / (max - min)) * ih,
        }))
        const line = smoothPath(pts)
        const area = `${line} L${pts[pts.length - 1].x} ${H - PAD.b} L${pts[0].x} ${H - PAD.b} Z`
        return { pts, line, area, max }
    }, [data])

    const total = data.reduce((a, b) => a + b, 0)
    const orders = Math.round(total / 1400)
    const growth = range === "7 days" ? "+23.4%" : "+41.2%"

    const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width) * W
        let best = 0
        for (let i = 1; i < pts.length; i++) if (Math.abs(pts[i].x - x) < Math.abs(pts[best].x - x)) best = i
        setHover(best)
    }

    const h = hover ?? data.length - 1
    const hp = pts[h]
    const tipLeft = Math.min(Math.max((hp.x / W) * 100, 12), 88)

    return (
        <div className={`${card} w-full max-w-[360px] p-3 lg:max-w-[440px] lg:p-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold lg:text-[13px]">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#171717] text-white">
                        <TrendingUp className="h-2.5 w-2.5" />
                    </span>
                    Sales
                </div>
                <div role="tablist" className="flex rounded-md bg-[#F3F4F0] p-0.5">
                    {(Object.keys(ranges) as RangeKey[]).map((k) => (
                        <button
                            key={k}
                            role="tab"
                            aria-selected={range === k}
                            onClick={() => {
                                setRange(k)
                                setHover(null)
                            }}
                            className={cn("relative rounded px-2 py-0.5 text-[8px] font-medium lg:text-[10px]", range === k ? "text-[#171717]" : "text-[#8A8E84] hover:text-[#171717]")}
                        >
                            {range === k && <motion.span layoutId="range-pill" className="absolute inset-0 rounded bg-white shadow-sm" transition={{ duration: 0.2, ease }} />}
                            <span className="relative">{k}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
                {[
                    { l: "Total sales", v: short(total) },
                    { l: "Orders", v: orders.toLocaleString() },
                    { l: "vs previous", v: growth, up: true },
                ].map((s) => (
                    <div key={s.l} className="rounded-lg bg-[#F8F9F6] px-2 py-1.5">
                        <p className="text-[7px] text-[#8A8E84] lg:text-[9px]">{s.l}</p>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.p
                                key={s.v}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.18 }}
                                className="text-[11px] font-semibold tabular-nums lg:text-[13px]"
                                style={s.up ? { color: "#0F9D58" } : undefined}
                            >
                                {s.v}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="relative mt-2">
                {/* Tooltip */}
                <AnimatePresence>
                    {hover !== null && (
                        <motion.div
                            key="tip"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-md bg-[#171717] px-2 py-1 text-white shadow-lg"
                            style={{ left: `${tipLeft}%` }}
                        >
                            <p className="whitespace-nowrap text-[7px] opacity-70 lg:text-[8px]">{dayLabel(h, data.length)}</p>
                            <p className="whitespace-nowrap text-[9px] font-semibold tabular-nums lg:text-[11px]">{fmt(data[h])}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="h-[110px] w-full cursor-crosshair touch-none lg:h-[140px]"
                    onPointerMove={onMove}
                    onPointerLeave={() => setHover(null)}
                >
                    <defs>
                        <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
                            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Gridlines */}
                    {[0.25, 0.5, 0.75].map((f) => (
                        <line key={f} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + (H - PAD.t - PAD.b) * f} y2={PAD.t + (H - PAD.t - PAD.b) * f} stroke="#EEF0EA" strokeWidth="1" />
                    ))}

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.g key={range}>
                            <motion.path d={area} fill="url(#sales-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, delay: 0.4, ease }} />
                            <motion.path
                                d={line}
                                fill="none"
                                stroke={ACCENT}
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ pathLength: { duration: 1.1, ease }, opacity: { duration: 0.2 } }}
                            />
                        </motion.g>
                    </AnimatePresence>

                    {/* Crosshair + point */}
                    {hover !== null && (
                        <g>
                            <line x1={hp.x} x2={hp.x} y1={PAD.t} y2={H - PAD.b} stroke="#171717" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
                            <circle cx={hp.x} cy={hp.y} r="7" fill={ACCENT} opacity="0.18" />
                            <circle cx={hp.x} cy={hp.y} r="3.5" fill="#fff" stroke={ACCENT} strokeWidth="2" />
                        </g>
                    )}
                    {hover === null && <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill="#fff" stroke={ACCENT} strokeWidth="2" />}

                    {/* X labels */}
                    {pts.map((p, i) => {
                        const every = range === "7 days" ? 1 : 7
                        if (i % every !== 0 && i !== pts.length - 1) return null
                        return (
                            <text key={i} x={p.x} y={H - 6} fontSize="7" textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"} fill={hover === i ? "#171717" : "#8A8E84"} fontWeight={hover === i ? 600 : 400}>
                                {range === "7 days" ? dayLabel(i, data.length).split(" ")[0] + " " + dayLabel(i, data.length).split(" ")[1] : dayLabel(i, data.length)}
                            </text>
                        )
                    })}
                    <text x={PAD.l} y={9} fontSize="7" fill="#8A8E84">
                        {short(max)}
                    </text>
                </svg>
            </div>
        </div>
    )
}
