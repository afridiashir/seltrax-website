"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Box, Check, Gauge } from "lucide-react"
import { cn } from "@/lib/utils"
import { Layer, TiltCard } from "./tilt-card"
import { ACCENT, ACCENT_SOFT, Container, Reveal, Serif, h2Class, shadow } from "./ui"

const features = [
    {
        title: "Store loads in a blink",
        desc: "Optimised for speed in Pakistan. No plugin bloat, so your store stays fast as you grow.",
        Visual: SpeedVisual,
    },
    {
        title: "COD-first checkout",
        desc: "Cash on delivery, courier dispatch and tracking are built in — because that's how Pakistan buys.",
        Visual: OrdersVisual,
    },
    {
        title: "Built-in analytics",
        desc: "Sales, visitors and best-sellers at a glance. No extra apps, no extra fees.",
        Visual: ChartVisual,
    },
]

/* Figures come from the existing site copy (components/stats.tsx, landing/cta.tsx). */
const stats = [
    { value: "Rs 1,349", label: "per month, everything included" },
    { value: "2x", label: "faster than Shopify & WooCommerce" },
    { value: "70K", label: "PKR saved on setup costs" },
]

/* Plain eased tweens everywhere in this section — no springs. */
const ease = [0.22, 1, 0.36, 1] as const
const once = { once: true, margin: "-40px" } as const

export function BuiltIn() {
    return (
        <Container>
            <section id="features" className="scroll-mt-4 pb-10 pt-16 lg:pb-14 lg:pt-24">
                <Reveal>
                    <h2 className={`mx-auto max-w-[520px] ${h2Class}`}>
                        <Serif>Everything Built In,</Serif> <span className="font-semibold">Nothing</span>
                        <span className="block font-semibold">to Bolt On</span>
                    </h2>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:mt-14 lg:gap-8">
                    {features.map((f, i) => (
                        <div key={f.title}>
                            <TiltCard inView spring={false} float={false} delay={i * 0.08} maxTilt={8}>
                                <div className="aspect-[4/3.4] overflow-hidden rounded-2xl lg:aspect-[4/3]">
                                    <f.Visual />
                                </div>
                            </TiltCard>
                            <Reveal delay={i * 0.08 + 0.1}>
                                <h3 className="mt-4 text-[13px] font-semibold lg:text-[17px]">{f.title}</h3>
                                <p className="mt-1 max-w-[420px] text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{f.desc}</p>
                            </Reveal>
                        </div>
                    ))}
                </div>

                <Reveal className="relative mt-14 grid grid-cols-1 divide-y divide-[#DFE2D9] sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-20">
                    {/* Anchor for the "Pricing" nav link. */}
                    <span id="pricing" className="sr-only scroll-mt-24">Pricing</span>
                    {stats.map((s) => (
                        <div key={s.label} className="py-6 text-center sm:py-2">
                            <Serif className="block text-[46px] leading-none tracking-[-0.02em] sm:text-[52px] lg:text-[64px]">{s.value}</Serif>
                            <p className="mt-3 text-[10px] text-[#6B6F66] lg:text-[12px]">{s.label}</p>
                        </div>
                    ))}
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Tile visuals ------------------------------------------------------ */

function Photo({ position = "center" }: { position?: string }) {
    return (
        <>
            <Image src="/landing/mist.jpg" alt="" fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" style={{ objectPosition: position }} />
            <div className="absolute inset-0 bg-white/10" />
        </>
    )
}

const speedBars = [
    { label: "Seltrax", w: 32, hot: true },
    { label: "Shopify", w: 64 },
    { label: "WooCommerce", w: 92 },
]

function SpeedVisual() {
    const [active, setActive] = React.useState(0)

    return (
        <div className="relative h-full w-full">
            <Photo position="left center" />
            <Layer depth={36} className="absolute inset-x-6 top-1/2 -translate-y-1/2 lg:inset-x-10">
                <div className={`rounded-xl bg-white p-3 ${shadow} lg:p-4`}>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold lg:text-[13px]">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#171717] text-white">
                            <Gauge className="h-2.5 w-2.5" />
                        </span>
                        Page load time
                    </div>
                    <div className="mt-3 space-y-2">
                        {speedBars.map((b, i) => {
                            const isActive = active === i
                            return (
                                <div
                                    key={b.label}
                                    onPointerEnter={() => setActive(i)}
                                    className="cursor-default text-[9px] transition-colors lg:text-[11px]"
                                >
                                    <div className="flex justify-between">
                                        <span className={isActive ? "font-semibold text-[#171717]" : "text-[#8A8E84]"}>{b.label}</span>
                                        <span className={cn("transition-opacity", b.hot ? "font-semibold" : "text-[#8A8E84]", isActive ? "opacity-100" : "opacity-0")}>
                                            {b.hot ? "fastest" : `${(b.w / 32).toFixed(1)}x slower`}
                                        </span>
                                    </div>
                                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#F3F4F0]">
                                        <motion.div
                                            className="h-full rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${b.w}%` }}
                                            viewport={once}
                                            animate={{ background: isActive ? ACCENT : b.hot ? ACCENT : "#D5D8CF" }}
                                            transition={{ width: { duration: 0.9, delay: 0.3 + i * 0.12, ease }, background: { duration: 0.2 } }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layer>
        </div>
    )
}

/* Same rows as components/landing/features.tsx. */
const orders = [
    { id: "0028", courier: "TCS" },
    { id: "0032", courier: "Leopards" },
    { id: "0054", courier: "M&P" },
]

function OrdersVisual() {
    const [done, setDone] = React.useState<Set<string>>(new Set())
    const toggle = (id: string) =>
        setDone((d) => {
            const n = new Set(d)
            if (n.has(id)) n.delete(id)
            else n.add(id)
            return n
        })

    return (
        <div className="relative grid h-full w-full place-items-center bg-[#E3E5DE]">
            <Layer depth={36} className="w-[78%]">
                <div
                    className="rounded-xl p-3 text-white shadow-[0_18px_40px_-14px_rgba(43,127,255,0.6)] lg:p-4"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_SOFT})` }}
                >
                    <p className="text-[9px] font-medium opacity-80 lg:text-[11px]">Dispatched today</p>
                    <div className="mt-2 space-y-1.5">
                        {orders.map((o, i) => {
                            const isDone = done.has(o.id)
                            return (
                                <motion.button
                                    key={o.id}
                                    type="button"
                                    onClick={() => toggle(o.id)}
                                    aria-pressed={isDone}
                                    initial={{ opacity: 0, x: -14 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={once}
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease }}
                                    className="flex w-full items-center gap-2 rounded-md bg-white/20 px-2 py-1.5 text-left transition-colors hover:bg-white/30"
                                >
                                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/30">
                                        <AnimatePresence mode="wait" initial={false}>
                                            {isDone ? (
                                                <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                                                    <Check className="h-2.5 w-2.5" />
                                                </motion.span>
                                            ) : (
                                                <motion.span key="box" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                                                    <Box className="h-2.5 w-2.5" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </span>
                                    <div className="text-[8px] leading-tight lg:text-[10px]">
                                        <p className="font-semibold">Order-{o.id}</p>
                                        <p className="opacity-80">{isDone ? "Delivered · COD collected" : `via ${o.courier} · COD`}</p>
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>
                </div>
            </Layer>
        </div>
    )
}

const chartSeries = {
    Sales: { d: "M0 55 C 30 50, 40 20, 70 30 S 110 60, 140 35 S 180 10, 200 25", dot: { x: 140, y: 35 }, pill: "+Rs 24.5k" },
    Visitors: { d: "M0 45 C 30 40, 50 55, 80 30 S 120 15, 150 28 S 185 40, 200 18", dot: { x: 150, y: 28 }, pill: "+4.8k" },
} as const
type ChartKey = keyof typeof chartSeries

function ChartVisual() {
    const [key, setKey] = React.useState<ChartKey>("Sales")
    const s = chartSeries[key]

    return (
        <div className="relative h-full w-full">
            <Photo position="right center" />
            <Layer depth={36} className="absolute inset-x-6 top-1/2 -translate-y-1/2 lg:inset-x-10">
                <div className={`rounded-xl bg-white p-3 ${shadow} lg:p-4`}>
                    <div className="flex items-center justify-between text-[9px] lg:text-[11px]">
                        <span role="tablist" className="flex gap-2 font-semibold">
                            {(Object.keys(chartSeries) as ChartKey[]).map((k) => (
                                <button
                                    key={k}
                                    role="tab"
                                    aria-selected={key === k}
                                    onClick={() => setKey(k)}
                                    className={cn("transition-colors", key === k ? "text-[#171717]" : "text-[#8A8E84] hover:text-[#171717]")}
                                >
                                    {k}
                                </button>
                            ))}
                        </span>
                        <span className="rounded-md bg-[#F3F4F0] px-1.5 py-0.5 text-[8px] text-[#5C6058] lg:text-[10px]">This week</span>
                    </div>
                    <svg viewBox="0 0 200 70" className="mt-2 h-16 w-full lg:h-20">
                        <motion.path
                            d={s.d}
                            fill="none"
                            stroke="#171717"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={once}
                            animate={{ d: s.d }}
                            transition={{ pathLength: { duration: 1.2, delay: 0.4, ease }, d: { duration: 0.5, ease } }}
                        />
                        <motion.circle r="3.5" fill={ACCENT} animate={{ cx: s.dot.x, cy: s.dot.y }} transition={{ duration: 0.5, ease }} />
                        <motion.g animate={{ x: s.dot.x - 143 }} transition={{ duration: 0.5, ease }}>
                            <rect x="112" y="4" width="62" height="16" rx="8" fill="#171717" />
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.text
                                    key={key}
                                    x="143"
                                    y="15.5"
                                    fill="#fff"
                                    fontSize="8"
                                    textAnchor="middle"
                                    fontWeight="600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {s.pill}
                                </motion.text>
                            </AnimatePresence>
                        </motion.g>
                    </svg>
                </div>
            </Layer>
        </div>
    )
}
