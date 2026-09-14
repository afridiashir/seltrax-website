"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    Check,
    Download,
    Filter,
    LineChart,
    MapPin,
    Megaphone,
    Minus,
    Package,
    PackageX,
    Smartphone,
    Truck,
    Users,
    Wallet,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif, h2Class, shadow } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})
const rsk = (n: number) =>
    n >= 1_000_000 ? `Rs ${(n / 1_000_000).toFixed(2)}M` : n >= 100_000 ? `Rs ${(n / 1000).toFixed(1)}K` : `Rs ${Math.round(n).toLocaleString("en-PK")}`

/* ---- Hero -------------------------------------------------------------------- */

export function AnalyticsHero() {
    return (
        <section className="relative">
            <Image src="/landing/bluish.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
            <div
                className="absolute inset-x-0 bottom-0 h-[55%]"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                }}
            />
            <div className="relative z-10">
                <HomeNavbar />
                <Container className="pb-10 pt-10 text-center lg:pb-14 lg:pt-16">
                    <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <BarChart3 className="h-3 w-3" style={{ color: ACCENT }} />
                        Analytics
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[860px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Know Your Numbers,
                        <br />
                        <Serif>Not Just Your Orders</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[600px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        Sales, sessions, conversion and average order — and the numbers generic analytics never show a COD store:
                        how many orders were actually delivered, which cities refuse parcels, and how much cash is still with the
                        courier. Built in, on every plan, on your phone too.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href="#dashboard" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Explore the dashboard
                        </a>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- Dashboard data ------------------------------------------------------------ */

type Range = "Today" | "7 days" | "30 days" | "90 days"
const ranges: Range[] = ["Today", "7 days", "30 days", "90 days"]

/* Deterministic pseudo-random so the mock is stable between renders. */
const noise = (i: number, seed: number) => {
    const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
    return x - Math.floor(x)
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function buildRange(r: Range) {
    const spec = {
        Today: { n: 12, base: 2800, trend: 260, seed: 1, labels: (i: number) => `${9 + i}:00`, sessions: 720, conv: 5.8, aov: 1380, prev: { s: 0.82, se: 0.9, c: 0.93, a: 0.97 } },
        "7 days": { n: 7, base: 52000, trend: -2500, seed: 2, labels: (i: number) => dayNames[(i + 1) % 7], sessions: 4800, conv: 6.3, aov: 1400, prev: { s: 0.52, se: 0.66, c: 0.64, a: 0.99 } },
        "30 days": { n: 30, base: 38000, trend: 900, seed: 3, labels: (i: number) => `${i + 1}`, sessions: 19200, conv: 6.0, aov: 1420, prev: { s: 0.78, se: 0.84, c: 0.95, a: 0.98 } },
        "90 days": { n: 13, base: 250000, trend: 9000, seed: 4, labels: (i: number) => `W${i + 1}`, sessions: 58400, conv: 5.7, aov: 1450, prev: { s: 0.71, se: 0.8, c: 0.9, a: 0.96 } },
    }[r]
    /* Everything derives from sessions × conversion so the funnel always narrows
       and the chart's total equals the headline sales figure. */
    const orders = Math.round((spec.sessions * spec.conv) / 100)
    const sales = orders * spec.aov
    const raw = Array.from({ length: spec.n }, (_, i) => Math.max(0.2, spec.base + spec.trend * i + (noise(i, spec.seed) - 0.5) * spec.base * 0.55))
    const rawSum = raw.reduce((a, b) => a + b, 0)
    const series = raw.map((v) => Math.round((v / rawSum) * sales))
    const delivered = Math.round(orders * 0.86)
    const checkout = Math.round(orders / 0.68)
    const cart = Math.round(checkout / 0.62)
    return {
        series,
        labels: series.map((_, i) => spec.labels(i)),
        kpis: [
            { label: "Total sales", value: rsk(sales), delta: (1 / spec.prev.s - 1) * 100 },
            { label: "Sessions", value: spec.sessions.toLocaleString(), delta: (1 / spec.prev.se - 1) * 100 },
            { label: "Conversion", value: `${spec.conv.toFixed(1)}%`, delta: (1 / spec.prev.c - 1) * 100 },
            { label: "Avg. order", value: rsk(spec.aov), delta: (1 / spec.prev.a - 1) * 100 },
        ],
        funnel: [
            { label: "Sessions", value: spec.sessions },
            { label: "Viewed a product", value: Math.round(spec.sessions * 0.46) },
            { label: "Added to cart", value: cart },
            { label: "Reached checkout", value: checkout },
            { label: "Placed order", value: orders },
            { label: "Delivered", value: delivered },
        ],
        orders,
        delivered,
    }
}

const cities = [
    { city: "Karachi", share: 0.31, delivered: 0.9 },
    { city: "Lahore", share: 0.27, delivered: 0.89 },
    { city: "Islamabad", share: 0.12, delivered: 0.92 },
    { city: "Faisalabad", share: 0.09, delivered: 0.81 },
    { city: "Multan", share: 0.08, delivered: 0.78 },
    { city: "Peshawar", share: 0.07, delivered: 0.74 },
]
const courierPerf = [
    { name: "TCS", share: 0.42, delivered: 0.9, days: 2.1 },
    { name: "Leopards", share: 0.37, delivered: 0.87, days: 2.6 },
    { name: "M&P", share: 0.21, delivered: 0.83, days: 3.0 },
]
const topProducts = [
    { name: "Cotton Kurta — Navy", units: 0.18 },
    { name: "Lawn 3-piece — Sage", units: 0.14 },
    { name: "Silk Dupatta — Rose", units: 0.11 },
    { name: "Abaya — Black", units: 0.09 },
    { name: "Leather Wallet", units: 0.07 },
]

/* ---- Interactive dashboard ------------------------------------------------ */

const W = 520
const H = 170
const PAD = { l: 6, r: 6, t: 12, b: 22 }

function smooth(pts: { x: number; y: number }[]) {
    let d = `M${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]
        d += ` C${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`
    }
    return d
}

export function Dashboard() {
    const [range, setRange] = React.useState<Range>("7 days")
    const [tab, setTab] = React.useState<"cities" | "couriers" | "products">("cities")
    const [hover, setHover] = React.useState<number | null>(null)
    const data = React.useMemo(() => buildRange(range), [range])

    const { pts, line, area } = React.useMemo(() => {
        const max = Math.max(...data.series) * 1.1
        const min = Math.min(...data.series) * 0.6
        const iw = W - PAD.l - PAD.r
        const ih = H - PAD.t - PAD.b
        const pts = data.series.map((v, i) => ({ x: PAD.l + (i / (data.series.length - 1)) * iw, y: PAD.t + ih - ((v - min) / (max - min)) * ih }))
        const line = smooth(pts)
        return { pts, line, area: `${line} L${pts[pts.length - 1].x} ${H - PAD.b} L${pts[0].x} ${H - PAD.b} Z` }
    }, [data])

    const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width) * W
        let best = 0
        for (let i = 1; i < pts.length; i++) if (Math.abs(pts[i].x - x) < Math.abs(pts[best].x - x)) best = i
        setHover(best)
    }
    const h = hover ?? pts.length - 1
    const everyLabel = Math.ceil(pts.length / 7)
    const funnelMax = data.funnel[0].value

    return (
        <Container>
            <section id="dashboard" className="scroll-mt-6 pb-6 pt-8 lg:pt-12">
                <Reveal>
                    <div className={`rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-3 lg:p-5 ${shadow}`}>
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                            <div>
                                <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Apna Store</p>
                                <p className="text-[16px] font-semibold tracking-tight lg:text-[20px]">Overview</p>
                            </div>
                            <div role="tablist" className="flex flex-wrap gap-1">
                                {ranges.map((r) => (
                                    <button key={r} role="tab" aria-selected={range === r} onClick={() => { setRange(r); setHover(null) }} className={cn("relative rounded-full px-3 py-1.5 text-[11px] font-medium lg:px-4 lg:text-[12px]", range === r ? "text-white" : "bg-white text-[#3A3D37] ring-1 ring-[#E4E6DF] hover:bg-[#F3F4F0]")}>
                                        {range === r && <motion.span layoutId="range-pill-an" className="absolute inset-0 rounded-full" style={{ background: ACCENT }} transition={{ duration: 0.2, ease }} />}
                                        <span className="relative">{r}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* KPIs */}
                        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
                            {data.kpis.map((k) => {
                                const up = k.delta >= 0
                                return (
                                    <div key={k.label} className="rounded-xl bg-white p-3 ring-1 ring-[#EEF0EA] lg:p-4">
                                        <p className="text-[10px] text-[#8A8E84] lg:text-[12px]">{k.label}</p>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.p key={`${range}-${k.value}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="mt-0.5 text-[20px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[26px]">
                                                {k.value}
                                            </motion.p>
                                        </AnimatePresence>
                                        <p className={cn("mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium lg:text-[11px]", up ? "text-[#0F9D58]" : "text-[#B42318]")}>
                                            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                            {up ? "+" : ""}{k.delta.toFixed(1)}% <span className="font-normal text-[#8A8E84]">vs prev</span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                            {/* Sales chart */}
                            <div className="relative rounded-xl bg-white p-3 ring-1 ring-[#EEF0EA] lg:p-4">
                                <div className="flex items-baseline justify-between">
                                    <p className="text-[12px] font-semibold lg:text-[14px]">Total sales</p>
                                    <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">
                                        {data.labels[h]} · <span className="font-semibold tabular-nums text-[#171717]">{rsk(data.series[h])}</span>
                                    </p>
                                </div>
                                <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-[170px] w-full cursor-crosshair touch-none lg:h-[210px]" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
                                    <defs>
                                        <linearGradient id="an-fill" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
                                            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {[0.25, 0.5, 0.75].map((f) => (
                                        <line key={f} x1={PAD.l} x2={W - PAD.r} y1={PAD.t + (H - PAD.t - PAD.b) * f} y2={PAD.t + (H - PAD.t - PAD.b) * f} stroke="#EEF0EA" />
                                    ))}
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.g key={range}>
                                            <motion.path d={area} fill="url(#an-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.3 }} />
                                            <motion.path d={line} fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }} transition={{ pathLength: { duration: 0.9, ease }, opacity: { duration: 0.15 } }} />
                                        </motion.g>
                                    </AnimatePresence>
                                    <line x1={pts[h].x} x2={pts[h].x} y1={PAD.t} y2={H - PAD.b} stroke="#171717" strokeDasharray="3 3" opacity={hover === null ? 0 : 0.3} />
                                    <circle cx={pts[h].x} cy={pts[h].y} r="4" fill="#fff" stroke={ACCENT} strokeWidth="2" />
                                    {data.labels.map((l, i) =>
                                        i % everyLabel === 0 || i === data.labels.length - 1 ? (
                                            <text key={i} x={pts[i].x} y={H - 6} fontSize="9" textAnchor={i === 0 ? "start" : i === data.labels.length - 1 ? "end" : "middle"} fill={i === h ? "#171717" : "#8A8E84"} fontWeight={i === h ? 600 : 400}>
                                                {l}
                                            </text>
                                        ) : null,
                                    )}
                                </svg>
                            </div>

                            {/* Funnel */}
                            <div className="rounded-xl bg-white p-3 ring-1 ring-[#EEF0EA] lg:p-4">
                                <p className="text-[12px] font-semibold lg:text-[14px]">Conversion funnel</p>
                                <ul className="mt-3 space-y-2.5">
                                    {data.funnel.map((f, i) => {
                                        const pct = (f.value / funnelMax) * 100
                                        const step = i === 0 ? null : (f.value / data.funnel[i - 1].value) * 100
                                        return (
                                            <li key={f.label}>
                                                <div className="flex items-baseline justify-between text-[10px] lg:text-[11.5px]">
                                                    <span className={cn(f.label === "Delivered" && "font-semibold")}>{f.label}</span>
                                                    <span className="tabular-nums">
                                                        <span className="font-semibold">{f.value.toLocaleString()}</span>
                                                        {step !== null && <span className="ml-1.5 text-[#8A8E84]">{step.toFixed(0)}%</span>}
                                                    </span>
                                                </div>
                                                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF0EA]">
                                                    <motion.div className="h-full rounded-full" initial={false} animate={{ width: `${Math.max(pct, 1.5)}%` }} transition={{ duration: 0.6, ease }} style={{ background: f.label === "Delivered" ? "#0F9D58" : ACCENT }} />
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <p className="mt-3 text-[9.5px] leading-relaxed text-[#8A8E84] lg:text-[10.5px]">The funnel doesn&apos;t stop at &ldquo;placed order&rdquo; — for COD, the sale only counts once it&apos;s delivered.</p>
                            </div>
                        </div>

                        {/* Breakdowns */}
                        <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-[#EEF0EA] lg:p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div role="tablist" className="flex rounded-full bg-[#F3F4F0] p-0.5">
                                    {([["cities", "By city"], ["couriers", "By courier"], ["products", "Top products"]] as const).map(([v, l]) => (
                                        <button key={v} role="tab" aria-selected={tab === v} onClick={() => setTab(v)} className={cn("rounded-full px-3 py-1 text-[10px] font-medium lg:text-[12px]", tab === v ? "bg-white text-[#171717] shadow-sm" : "text-[#8A8E84] hover:text-[#171717]")}>
                                            {l}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{data.orders.toLocaleString()} orders · {range}</p>
                            </div>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div key={`${tab}-${range}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease }} className="mt-3 overflow-x-auto">
                                    {tab === "cities" && (
                                        <table className="w-full min-w-[460px] text-[10.5px] lg:text-[12px]">
                                            <thead><tr className="text-left text-[#8A8E84]"><th className="pb-2 font-medium">City</th><th className="pb-2 font-medium">Orders</th><th className="pb-2 font-medium">Sales</th><th className="pb-2 font-medium">Delivered</th><th className="w-[30%] pb-2 font-medium">Return rate</th></tr></thead>
                                            <tbody>
                                                {cities.map((c) => {
                                                    const o = Math.round(data.orders * c.share)
                                                    const rto = 1 - c.delivered
                                                    return (
                                                        <tr key={c.city} className="border-t border-[#EEF0EA]">
                                                            <td className="py-2 font-medium">{c.city}</td>
                                                            <td className="py-2 tabular-nums">{o.toLocaleString()}</td>
                                                            <td className="py-2 tabular-nums">{rsk(o * 1400)}</td>
                                                            <td className="py-2 tabular-nums">{(c.delivered * 100).toFixed(0)}%</td>
                                                            <td className="py-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF0EA]"><div className="h-full rounded-full" style={{ width: `${rto * 300}%`, maxWidth: "100%", background: rto > 0.2 ? "#B42318" : rto > 0.15 ? "#B25E09" : "#0F9D58" }} /></div>
                                                                    <span className={cn("w-8 text-right tabular-nums", rto > 0.2 && "font-semibold text-[#B42318]")}>{(rto * 100).toFixed(0)}%</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                    {tab === "couriers" && (
                                        <table className="w-full min-w-[460px] text-[10.5px] lg:text-[12px]">
                                            <thead><tr className="text-left text-[#8A8E84]"><th className="pb-2 font-medium">Courier</th><th className="pb-2 font-medium">Parcels</th><th className="pb-2 font-medium">Delivered</th><th className="pb-2 font-medium">Avg. days to deliver</th><th className="pb-2 font-medium">Cash with courier</th></tr></thead>
                                            <tbody>
                                                {courierPerf.map((c) => {
                                                    const p = Math.round(data.orders * c.share)
                                                    return (
                                                        <tr key={c.name} className="border-t border-[#EEF0EA]">
                                                            <td className="py-2 font-medium">{c.name}</td>
                                                            <td className="py-2 tabular-nums">{p.toLocaleString()}</td>
                                                            <td className="py-2 tabular-nums">{(c.delivered * 100).toFixed(0)}%</td>
                                                            <td className="py-2 tabular-nums">{c.days.toFixed(1)}</td>
                                                            <td className="py-2 tabular-nums">{rsk(p * 1400 * 0.18)}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    )}
                                    {tab === "products" && (
                                        <ul className="space-y-2.5">
                                            {topProducts.map((p, i) => {
                                                const units = Math.max(1, Math.round(data.orders * p.units))
                                                return (
                                                    <li key={p.name} className="flex items-center gap-3 text-[10.5px] lg:text-[12px]">
                                                        <span className="w-4 text-[#8A8E84] tabular-nums">{i + 1}</span>
                                                        <span className="w-[42%] truncate font-medium">{p.name}</span>
                                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EEF0EA]"><motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${(p.units / topProducts[0].units) * 100}%` }} transition={{ duration: 0.6, ease }} style={{ background: ACCENT }} /></div>
                                                        <span className="w-16 text-right tabular-nums">{units} units</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">Sample data. Switch the range, hover the chart, and flip between city, courier and product breakdowns.</p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- COD metrics ------------------------------------------------------------ */

const codMetrics = [
    { icon: Package, n: "Delivered rate", d: "Orders actually delivered ÷ orders placed. The number that tells you what you really sold." },
    { icon: PackageX, n: "Return (RTO) rate", d: "Parcels refused or undeliverable — by city, courier, product and customer." },
    { icon: Wallet, n: "Cash with couriers", d: "Collected at the door but not yet remitted to you, per courier, right now." },
    { icon: Truck, n: "Days to deliver", d: "Average time from dispatch to delivery for each courier and city." },
    { icon: Users, n: "Confirmation rate", d: "How many new orders confirm — and how many would have been fake shipments." },
    { icon: MapPin, n: "Delivered revenue", d: "Sales counted on delivery, not on order — so returns don't inflate your month." },
]

export function CODMetrics() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The numbers generic analytics miss</Serif>
                        <span className="block font-semibold">Metrics Built for Cash on Delivery</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[620px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Google Analytics sees a thank-you page and calls it a sale. For a COD store, that&apos;s where the risk starts.
                        Seltrax follows every order to the door and the cash to your account.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {codMetrics.map((m, i) => (
                        <Reveal key={m.n} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 lg:p-6">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><m.icon className="h-4 w-4" /></span>
                                <p className="mt-4 text-[13px] font-semibold lg:text-[15px]">{m.n}</p>
                                <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{m.d}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Reports in depth ------------------------------------------------------ */

type Detail = { icon: React.ElementType; kicker: string; title: string; intro: string; specs: { k: string; v: string }[] }
const reports: Detail[] = [
    {
        icon: LineChart, kicker: "Sales", title: "Revenue, the way you'd count it",
        intro: "Placed, confirmed and delivered sales side by side, so a big day of orders and a big day of revenue aren't confused.",
        specs: [
            { k: "Totals", v: "Placed · confirmed · delivered" },
            { k: "Breakdown", v: "Day · week · month" },
            { k: "Average order", v: "By period, city, channel" },
            { k: "Discounts", v: "Given, by code" },
            { k: "Fees", v: "Delivery & COD fees collected" },
            { k: "Compare", v: "vs previous period" },
        ],
    },
    {
        icon: Filter, kicker: "Traffic & conversion", title: "Where visitors drop off",
        intro: "Sessions to delivered orders, step by step, with the pages and sources behind each drop.",
        specs: [
            { k: "Funnel", v: "Session → product → cart → checkout → order → delivered" },
            { k: "Sources", v: "Direct · social · search · ads · referral" },
            { k: "Devices", v: "Mobile · desktop · tablet" },
            { k: "Top pages", v: "Views and exits" },
            { k: "Checkout", v: "Drop-off by step" },
        ],
    },
    {
        icon: Package, kicker: "Products", title: "What sells, what comes back",
        intro: "Best-sellers by units and revenue — and the products with the highest return rate, before they cost you more.",
        specs: [
            { k: "Top products", v: "Units · revenue · views" },
            { k: "Variants", v: "Best sizes and colours" },
            { k: "Return rate", v: "Per product" },
            { k: "Stock", v: "Low stock & days of cover" },
            { k: "Collections", v: "Performance per collection" },
        ],
    },
    {
        icon: Truck, kicker: "Delivery & cash", title: "Couriers, cities and money in transit",
        intro: "Which courier delivers fastest, which city refuses most, and how much cash each courier is still holding.",
        specs: [
            { k: "Delivered / RTO", v: "By courier, city, product" },
            { k: "Days to deliver", v: "By courier and city" },
            { k: "Cash with courier", v: "Outstanding per courier" },
            { k: "Remittances", v: "Received and matched" },
            { k: "Charges", v: "Delivery & return costs" },
        ],
    },
    {
        icon: Users, kicker: "Customers", title: "Who buys again",
        intro: "New versus returning customers, lifetime value, and the customers whose refusals are costing you.",
        specs: [
            { k: "New vs returning", v: "Orders & revenue" },
            { k: "Repeat rate", v: "Customers with 2+ orders" },
            { k: "Lifetime value", v: "Average and top customers" },
            { k: "Refusers", v: "Customers with returns" },
            { k: "Cities", v: "Where your customers are" },
        ],
    },
    {
        icon: Megaphone, kicker: "Marketing", title: "What your ads actually delivered",
        intro: "Tie campaigns and discount codes to delivered revenue, not just clicks and placed orders.",
        specs: [
            { k: "UTM campaigns", v: "Orders & delivered revenue" },
            { k: "Discount codes", v: "Uses and revenue" },
            { k: "Facebook Pixel", v: "Events sent automatically" },
            { k: "Google Analytics", v: "Connected in settings" },
            { k: "Microsoft Clarity", v: "Session recordings & heatmaps" },
        ],
    },
]

export function Reports() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">In depth</Serif>
                        <span className="block font-semibold">Every Report, Included</span>
                    </h2>
                </Reveal>
                <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
                    {reports.map((d, i) => (
                        <Reveal key={d.title} delay={0.04}>
                            <article className={cn("grid grid-cols-1 gap-6 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-10 lg:p-8", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
                                <div>
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><d.icon className="h-4 w-4" /></span>
                                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">{d.kicker}</p>
                                    <h3 className="mt-1 text-[20px] font-semibold leading-tight tracking-[-0.02em] lg:text-[26px]">{d.title}</h3>
                                    <p className="mt-3 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13.5px]">{d.intro}</p>
                                </div>
                                <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                                    {d.specs.map((s) => (
                                        <div key={s.k} className="flex items-baseline justify-between gap-3 border-b border-[#E4E6DF] py-2.5 text-[11px] lg:text-[12.5px]">
                                            <dt className="shrink-0 text-[#8A8E84]">{s.k}</dt>
                                            <dd className="text-right font-medium">{s.v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- On your phone -------------------------------------------------------- */

export function OnYourPhone() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-[#171717] p-6 text-white md:grid-cols-[minmax(0,1fr)_auto] lg:p-12">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Seltrax for Android</p>
                            <p className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.02em] lg:text-[36px]">
                                The same numbers, <Serif>in your pocket</Serif>
                            </p>
                            <p className="mt-3 max-w-[460px] text-[11px] leading-relaxed text-white/70 lg:text-[14px]">
                                Total sales, sessions, conversion, average order and the funnel — for today, 7, 30 or 90 days — on the mobile app, exactly as they are on the dashboard.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <Link href="/mobile-app" className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] transition-colors hover:bg-[#F3F4F0]">
                                    <Smartphone className="h-3.5 w-3.5" /> About the app
                                </Link>
                            </div>
                        </div>
                        <div className="mx-auto w-[190px] overflow-hidden rounded-[28px] border-[6px] border-[#3A3D37] bg-[#F5F6F8] lg:w-[220px]">
                            <div className="relative aspect-[9/17.5] w-full">
                                <Image src="/mobile-screenshot.jpeg" alt="Seltrax analytics on the Android app" fill sizes="220px" className="object-cover object-top" />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Spec + comparison ---------------------------------------------------- */

const sheet = [
    ["Core KPIs", "Total sales · sessions · conversion · average order"],
    ["Ranges", "Today · 7 · 30 · 90 days, custom range, vs previous period"],
    ["Funnel", "Session → product → cart → checkout → order → delivered"],
    ["COD metrics", "Delivered rate, RTO rate, cash with couriers, days to deliver"],
    ["Breakdowns", "City · courier · product · variant · source · device"],
    ["Customers", "New vs returning, repeat rate, lifetime value"],
    ["Marketing", "UTM campaigns, discount codes"],
    ["Integrations", "Facebook Pixel · Google Analytics · Microsoft Clarity"],
    ["Mobile", "Dashboard in the Android app"],
    ["Access", "Per-person: hide revenue from staff"],
    ["Export", "CSV of any report"],
    ["Price", "Included — no analytics app to buy"],
]

export function AnalyticsSpec() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Spec sheet</Serif>
                        <span className="block font-semibold">Analytics, Itemised</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-hidden rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full border-collapse text-[11px] lg:text-[13px]">
                            <tbody>
                                {sheet.map(([k, v], i) => (
                                    <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#F6F7F3]"}>
                                        <th scope="row" className="w-2/5 px-4 py-3 text-left font-medium text-[#5C6058] lg:px-6">{k}</th>
                                        <td className="px-4 py-3 font-medium lg:px-6">{v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

type Cell = "yes" | "no" | "partial"
const rows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "Sales, sessions, conversion & AOV built in", s: "yes", sh: "yes", w: "partial" },
    { row: "Funnel through to delivered orders", s: "yes", sh: "no", w: "no" },
    { row: "Return (RTO) rate by city & courier", s: "yes", sh: "no", w: "no" },
    { row: "Cash still with couriers", s: "yes", sh: "no", w: "no" },
    { row: "Courier delivery-time comparison", s: "yes", sh: "no", w: "no" },
    { row: "Full reports on every plan", s: "yes", sh: "partial", w: "partial" },
    { row: "Same dashboard in a mobile app", s: "yes", sh: "yes", w: "partial" },
    { row: "No analytics plugin or app to install", s: "yes", sh: "yes", w: "no" },
]
function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function AnalyticsComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">Analytics on Seltrax vs Elsewhere</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Analytics</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">Seltrax</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">Shopify</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">WooCommerce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r) => (
                                    <tr key={r.row} className="border-b border-[#EEF0EA] last:border-b-0">
                                        <td className="px-4 py-3 lg:px-6">{r.row}</td>
                                        <td className="px-4 py-3 text-center lg:px-6"><CellIcon v={r.s} /></td>
                                        <td className="px-4 py-3 text-center lg:px-6"><CellIcon v={r.sh} /></td>
                                        <td className="px-4 py-3 text-center lg:px-6"><CellIcon v={r.w} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- FAQ ------------------------------------------------------------------ */

const faqs = [
    { q: "Do I still need Google Analytics?", a: "Not for store performance — sales, sessions, conversion, products, couriers and cash are all in Seltrax. If you use GA, Facebook Pixel or Microsoft Clarity for marketing, connect them in settings and they run alongside." },
    { q: "Why is my delivered revenue lower than my sales?", a: "Because some COD parcels come back. Sales counts orders placed; delivered revenue counts orders that were handed over and paid for. The gap is your return rate — and the city and courier breakdowns show where it comes from." },
    { q: "Can I hide revenue from my staff?", a: "Yes. Staff permissions let you give someone access to orders without access to analytics or totals." },
    { q: "Can I export the data?", a: "Every report exports to CSV for the date range you've selected." },
    { q: "Are analytics on every plan?", a: "Yes — the full dashboard and reports are part of the Rs 1,349/month plan. There's no separate analytics tier or app." },
]

export function AnalyticsFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Analytics</span>
                    </h2>
                    <ul className="mt-8">
                        {faqs.map((f, i) => {
                            const on = open === i
                            return (
                                <li key={f.q} className={cn(i > 0 && "border-t border-[#EEF0EA]")}>
                                    <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex w-full items-start gap-3 py-3.5 text-left text-[12px] font-medium transition-colors hover:text-[#5C6058] lg:py-4 lg:text-[15px]">
                                        <span className="w-4 shrink-0 tabular-nums lg:w-6">{i + 1}.</span>
                                        <span className="flex-1">{f.q}</span>
                                        <span className="mt-0.5 text-[14px] leading-none text-[#8A8E84] transition-transform lg:text-[18px]" style={{ transform: on ? "rotate(45deg)" : "none" }}>+</span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                                <p className="pb-4 pl-7 pr-6 text-[11px] leading-relaxed text-[#6B6F66] lg:pl-9 lg:text-[13px]">{f.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-black">
                            See your own numbers <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link href="/orders" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <Package className="h-3.5 w-3.5" /> Orders
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">
                            <Download className="h-3.5 w-3.5" /> Book a demo
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
