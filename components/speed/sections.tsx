"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useInView } from "framer-motion"
import {
    ArrowUpRight,
    Braces,
    Check,
    Cloud,
    Flag,
    Gauge,
    ImageIcon,
    Layers,
    Minus,
    Plug,
    RotateCcw,
    Type,
    X,
    Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif, h2Class } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* Relative load times used across the site (see components/home/built-in.tsx):
   Seltrax 1x, Shopify ~2x, WooCommerce ~2.9x. The race shows them as seconds
   on a mid-range phone over 4G. */
const racers = [
    { name: "Seltrax", seconds: 0.9, hot: true },
    { name: "Shopify", seconds: 1.8 },
    { name: "WooCommerce", seconds: 2.6 },
]

/* ---- Hero with the load race ------------------------------------------ */

export function SpeedHero() {
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
                <Container className="grid grid-cols-1 items-center gap-10 pb-12 pt-10 md:grid-cols-2 md:gap-8 lg:pb-20 lg:pt-16">
                    <div className="text-center md:text-left">
                        <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                            <Zap className="h-3 w-3" fill="currentColor" style={{ color: ACCENT }} />
                            Page speed
                        </motion.span>
                        <motion.h1 {...float(0.05)} className="mt-4 text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                            Loads Before
                            <br />
                            <Serif>They Blink</Serif>
                        </motion.h1>
                        <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[440px] text-[12px] leading-relaxed text-[#3A3D37] md:mx-0 lg:text-[15px]">
                            Every Seltrax store runs on one theme, rendered from JSON — not a pile of theme code and plugin
                            scripts. That&apos;s why it opens about twice as fast as a Shopify store and nearly three times
                            faster than WooCommerce. And speed isn&apos;t a nice-to-have. It&apos;s sales.
                        </motion.p>
                        <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                                Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <a href="#calculator" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                                What slow costs you
                            </a>
                        </motion.div>
                        <motion.div {...float(0.2)} className="mt-8 grid grid-cols-3 gap-3 text-center md:text-left">
                            {[
                                ["2x", "faster than Shopify"],
                                ["0", "plugins to slow it down"],
                                ["1", "theme, tuned for years"],
                            ].map(([n, l]) => (
                                <div key={l}>
                                    <Serif className="block text-[34px] leading-none lg:text-[44px]">{n}</Serif>
                                    <p className="mt-1 text-[10px] text-[#5C6058] lg:text-[12px]">{l}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div {...float(0.2)}>
                        <Race />
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

function Race() {
    const [run, setRun] = React.useState(0)
    const [elapsed, setElapsed] = React.useState(0)
    const ref = React.useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: "-80px" })
    const max = Math.max(...racers.map((r) => r.seconds))

    React.useEffect(() => {
        if (!inView) return
        setElapsed(0)
        const start = performance.now()
        let raf = 0
        const tick = () => {
            const t = (performance.now() - start) / 1000
            setElapsed(Math.min(t, max))
            if (t < max) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [inView, run, max])

    return (
        <div ref={ref} className="mx-auto w-full max-w-[460px] rounded-2xl bg-white p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.3)] lg:p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold lg:text-[13px]">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#171717] text-white">
                        <Flag className="h-2.5 w-2.5" />
                    </span>
                    Same product page, mid-range phone, 4G
                </div>
                <button
                    type="button"
                    onClick={() => setRun((r) => r + 1)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-2.5 py-1 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0] lg:text-[11px]"
                >
                    <RotateCcw className="h-3 w-3" /> Replay
                </button>
            </div>

            <div className="mt-4 space-y-3">
                {racers.map((r) => {
                    const done = elapsed >= r.seconds
                    const pct = Math.min(elapsed / r.seconds, 1) * 100
                    return (
                        <div key={r.name}>
                            <div className="flex items-center justify-between text-[10px] lg:text-[12px]">
                                <span className={cn("font-medium", r.hot ? "text-[#171717]" : "text-[#5C6058]")}>{r.name}</span>
                                <span className={cn("tabular-nums", done ? "font-semibold" : "text-[#8A8E84]")} style={done && r.hot ? { color: ACCENT } : undefined}>
                                    {done ? `${r.seconds.toFixed(1)}s` : `${Math.min(elapsed, r.seconds).toFixed(1)}s`}
                                    {done && r.hot && " · loaded"}
                                </span>
                            </div>
                            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#F3F4F0]">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${pct}%`, background: r.hot ? ACCENT : "#C9CDC3", transition: "width 60ms linear" }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <AnimatePresence>
                {elapsed >= racers[0].seconds && (
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 rounded-lg bg-[#F6F7F3] px-3 py-2 text-[10px] leading-snug text-[#3A3D37] lg:text-[12px]"
                    >
                        <span className="font-semibold">Seltrax is done.</span> The others are still loading — and that&apos;s the moment a customer
                        decides whether to wait.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ---- Why: one theme, rendered from JSON ------------------------------- */

const stackOthers = [
    { label: "Theme code (Liquid / PHP templates)", size: 1 },
    { label: "Theme JavaScript", size: 1 },
    { label: "App / plugin scripts × 6–14", size: 2 },
    { label: "Tracking pixels", size: 0.7 },
    { label: "Unoptimised images", size: 1.6 },
    { label: "Fonts from three places", size: 0.7 },
]

export function WhyFaster() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The unfair advantage</Serif>
                        <span className="block font-semibold">One Theme. Rendered from JSON.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[640px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        On other platforms your store is a stack of code — a theme, then the apps you bolted on, each one
                        adding scripts the customer&apos;s phone has to download before anything shows. A Seltrax store is a JSON
                        document: your sections, colours, products and settings. One engine renders it. Nothing to bolt on,
                        so there&apos;s nothing to slow down.
                    </p>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-14 lg:gap-6">
                    <Reveal>
                        <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 lg:p-7">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Everyone else</p>
                            <p className="mt-1 text-[16px] font-semibold lg:text-[20px]">What the phone has to download first</p>
                            <div className="mt-5 space-y-1.5">
                                {stackOthers.map((s, i) => (
                                    <motion.div
                                        key={s.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.07, ease }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="h-7 rounded-md bg-[#C9CDC3]" style={{ width: `${Math.min(100, 22 * s.size)}%` }} />
                                        <span className="text-[10px] text-[#5C6058] lg:text-[12px]">{s.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <p className="mt-5 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">
                                Each app you install adds its own JavaScript. Stores routinely end up shipping more script than
                                content — and get slower every month they grow.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="h-full rounded-2xl bg-[#171717] p-5 text-white lg:p-7">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Seltrax</p>
                            <p className="mt-1 text-[16px] font-semibold lg:text-[20px]">What the phone has to download first</p>
                            <div className="mt-5 space-y-1.5">
                                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease }} className="flex items-center gap-3">
                                    <div className="h-7 w-[22%] rounded-md" style={{ background: ACCENT }} />
                                    <span className="inline-flex items-center gap-1.5 text-[10px] text-white/80 lg:text-[12px]">
                                        <Braces className="h-3 w-3" /> Your store, as JSON — already rendered to HTML at the edge
                                    </span>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1, ease }} className="flex items-center gap-3">
                                    <div className="h-7 w-[14%] rounded-md bg-white/30" />
                                    <span className="text-[10px] text-white/80 lg:text-[12px]">Right-sized images for that screen</span>
                                </motion.div>
                            </div>
                            <ul className="mt-6 space-y-2 text-[11px] text-white/80 lg:text-[13px]">
                                {[
                                    "No theme scripts to download — the theme lives on our side",
                                    "No plugins, so nothing injects itself into your pages",
                                    "The same speed on day one and with 10,000 products",
                                    "Every store gets every speed improvement we ship, automatically",
                                ].map((t) => (
                                    <li key={t} className="flex items-start gap-2">
                                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} /> {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </section>
        </Container>
    )
}

/* ---- What speed does to sales ------------------------------------------ */

const proof = [
    { n: "53%", l: "of mobile visitors leave a page that takes over 3 seconds", src: "Google" },
    { n: "7%", l: "fewer conversions for every extra second of load time", src: "Widely cited retail research" },
    { n: "2x", l: "faster than Shopify — measured on the same product page", src: "Seltrax" },
]

export function SpeedSells() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Speed isn&apos;t a feature</Serif>
                        <span className="block font-semibold">It&apos;s Revenue</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6">
                    {proof.map((p, i) => (
                        <Reveal key={p.n} delay={i * 0.08}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-6 text-center lg:p-8">
                                <Serif className="block text-[56px] leading-none tracking-[-0.02em] lg:text-[72px]">{p.n}</Serif>
                                <p className="mt-3 text-[12px] leading-relaxed text-[#3A3D37] lg:text-[14px]">{p.l}</p>
                                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-[#8A8E84] lg:text-[10px]">{p.src}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Calculator ----------------------------------------------------------- */

const fmt = (n: number) => `Rs ${Math.round(n).toLocaleString("en-PK")}`

function Row({ label, value, min, max, step, set, display }: { label: string; value: number; min: number; max: number; step: number; set: (n: number) => void; display: string }) {
    return (
        <label className="block">
            <span className="flex items-center justify-between text-[11px] lg:text-[13px]">
                <span className="text-[#5C6058]">{label}</span>
                <span className="font-semibold tabular-nums">{display}</span>
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2 h-1.5 w-full cursor-pointer rounded-full"
                style={{ accentColor: "#171717" }}
            />
        </label>
    )
}

export function Calculator() {
    const [visitors, setVisitors] = React.useState(20000)
    const [conv, setConv] = React.useState(2)
    const [aov, setAov] = React.useState(2500)

    const revenue = visitors * (conv / 100) * aov
    const perSecond = revenue * 0.07 // 7% per extra second
    const recovered = perSecond * (racers[1].seconds - racers[0].seconds) // seconds Seltrax saves vs Shopify

    return (
        <Container>
            <section id="calculator" className="scroll-mt-6 pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">What slow is costing you</Serif>
                        <span className="block font-semibold">Run Your Own Numbers</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-10 lg:mt-14">
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 lg:p-8">
                        <div className="space-y-5">
                            <Row label="Monthly visitors" value={visitors} min={1000} max={200000} step={1000} set={setVisitors} display={visitors.toLocaleString()} />
                            <Row label="Conversion rate" value={conv} min={0.5} max={6} step={0.1} set={setConv} display={`${conv.toFixed(1)}%`} />
                            <Row label="Average order" value={aov} min={500} max={20000} step={100} set={setAov} display={fmt(aov)} />
                            <p className="text-[10px] leading-relaxed text-[#8A8E84] lg:text-[11px]">
                                Uses the widely cited figure of ~7% fewer conversions per extra second of load time, and the
                                {" "}{(racers[1].seconds - racers[0].seconds).toFixed(1)}s a Seltrax store saves against a typical Shopify store on the race above.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
                            <Stat label="Your monthly revenue" value={fmt(revenue)} />
                            <Stat label="Lost for every extra second" value={fmt(perSecond)} sub="per month" />
                            <Stat label="Back in your pocket on Seltrax" value={fmt(recovered)} sub="per month, from speed alone" hot />
                            <Stat label="That's the subscription paid" value={`${Math.max(1, Math.round(recovered / 1349))}×`} sub="over — Rs 1,349/month, everything included" />
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

function Stat({ label, value, sub, hot }: { label: string; value: string; sub?: string; hot?: boolean }) {
    return (
        <div className={cn("rounded-xl p-4 lg:p-5", hot ? "text-white" : "bg-white")} style={hot ? { background: ACCENT } : undefined}>
            <p className={cn("text-[10px] lg:text-[11px]", hot ? "text-white/70" : "text-[#8A8E84]")}>{label}</p>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.p key={value} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="mt-1 text-[22px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[28px]">
                    {value}
                </motion.p>
            </AnimatePresence>
            {sub && <p className={cn("mt-0.5 text-[9px] lg:text-[10px]", hot ? "text-white/70" : "text-[#8A8E84]")}>{sub}</p>}
        </div>
    )
}

/* ---- What's inside ---------------------------------------------------- */

const inside = [
    { icon: Braces, title: "JSON-rendered theme", desc: "Your store is data, not code. We render it to HTML before it ever reaches the phone." },
    { icon: Cloud, title: "Served from the edge", desc: "Pages are cached close to your customers, so the first byte arrives in milliseconds, not seconds." },
    { icon: Plug, title: "Zero plugin JavaScript", desc: "Analytics, COD, couriers and marketing tools are built in — nothing injects scripts into your pages." },
    { icon: ImageIcon, title: "Images sized per screen", desc: "Every photo is converted and resized on upload, then served at exactly the width that screen needs." },
    { icon: Type, title: "Fonts that don't block", desc: "Subset, preloaded and swapped — text is readable before the font even finishes downloading." },
    { icon: Layers, title: "Only what's on screen", desc: "Below-the-fold sections and images load as the customer scrolls, never before." },
    { icon: Gauge, title: "A budget, enforced", desc: "Every release is measured against the same load budget. If it gets slower, it doesn't ship." },
    { icon: Zap, title: "Faster every month", desc: "Speed work lands on every store automatically. You never update a theme to get it." },
]

export function Inside() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Under the hood</Serif>
                        <span className="block font-semibold">Where the Speed Comes From</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {inside.map((f, i) => (
                        <Reveal key={f.title} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-white p-5 transition-colors hover:bg-[#F6F7F3]">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white">
                                    <f.icon className="h-4 w-4" />
                                </span>
                                <p className="mt-4 text-[13px] font-semibold lg:text-[15px]">{f.title}</p>
                                <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{f.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Comparison table ----------------------------------------------------- */

type Cell = "yes" | "no" | "partial"
const rows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "Theme rendered from JSON, no theme code shipped", s: "yes", sh: "no", w: "no" },
    { row: "No plugin / app JavaScript on your pages", s: "yes", sh: "no", w: "no" },
    { row: "Fast out of the box, no tuning", s: "yes", sh: "partial", w: "no" },
    { row: "Stays fast as you add products and features", s: "yes", sh: "partial", w: "no" },
    { row: "Images optimised automatically", s: "yes", sh: "yes", w: "partial" },
    { row: "Edge-cached pages", s: "yes", sh: "yes", w: "partial" },
    { row: "Speed improvements arrive automatically", s: "yes", sh: "partial", w: "no" },
    { row: "No hosting or caching plugins to manage", s: "yes", sh: "yes", w: "no" },
]

function CellIcon({ v }: { v: Cell }) {
    if (v === "yes")
        return (
            <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}>
                <Check className="h-3.5 w-3.5" />
            </span>
        )
    if (v === "partial")
        return (
            <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]">
                <Minus className="h-3.5 w-3.5" />
            </span>
        )
    return (
        <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]">
            <X className="h-3.5 w-3.5" />
        </span>
    )
}

export function SpeedComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">Why the Gap Only Grows</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Speed</th>
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

/* ---- Test it yourself + FAQ --------------------------------------------- */

const faqs = [
    { q: "Is it really twice as fast?", a: "On the same product page, on a mid-range Android over 4G, yes — and the gap widens the more apps a Shopify or WooCommerce store has installed. Run any Seltrax store through Google PageSpeed Insights and compare it with your current one." },
    { q: "What does \"rendered from JSON\" mean for me?", a: "You never touch theme code. Your layout, colours, sections and products are saved as data, and our engine turns that into a finished page on the server. There's no theme JavaScript to download, no plugin scripts, and nothing for you to maintain." },
    { q: "Will my store slow down as I grow?", a: "No. Speed on other platforms decays as you install apps, because each one adds scripts. Seltrax has nothing to install — analytics, COD, couriers and marketing tools are part of the platform — so a store with 10,000 products loads like one with ten." },
    { q: "Can I customise the design if there's only one theme?", a: "Yes — the theme is the engine, not the look. Colours, fonts, sections, layouts and the ready-made designs on the Designs page are all yours to change. What you can't do is bolt on code that would make it slow." },
]

export function SpeedFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal>
                    <div className="rounded-2xl bg-[#171717] p-6 text-white lg:p-10">
                        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Don&apos;t take our word for it</p>
                                <p className="mt-2 text-[20px] font-semibold leading-tight tracking-[-0.02em] lg:text-[28px]">Test it yourself in 30 seconds</p>
                                <p className="mt-2 max-w-[520px] text-[11px] leading-relaxed text-white/70 lg:text-[13px]">
                                    Paste your current store into Google PageSpeed Insights, note the mobile score. Then book a demo — we&apos;ll
                                    set up your products on Seltrax and run the same test, side by side.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] transition-colors hover:bg-[#F3F4F0]">
                                    Open PageSpeed Insights <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-white/30 px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-white/10">
                                    Book a side-by-side demo <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="mx-auto mt-14 max-w-[760px] lg:mt-20">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Speed</span>
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
                </Reveal>
            </section>
        </Container>
    )
}
