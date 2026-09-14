"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftRight, ArrowUpRight, Check, Minus, Scale, X } from "lucide-react"
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

type Rival = "shopify" | "woocommerce"
const rivalName: Record<Rival, string> = { shopify: "Shopify", woocommerce: "WooCommerce" }

/* View state lives in the hash so the footer can deep-link /compare#shopify. */
function useRival() {
    const [rival, setRival] = React.useState<Rival | "all">("all")
    React.useEffect(() => {
        const read = () => {
            const h = window.location.hash.slice(1)
            setRival(h === "shopify" || h === "woocommerce" ? h : "all")
        }
        read()
        window.addEventListener("hashchange", read)
        return () => window.removeEventListener("hashchange", read)
    }, [])
    const select = (r: Rival | "all") => {
        setRival(r)
        history.replaceState(null, "", r === "all" ? window.location.pathname : `#${r}`)
    }
    return [rival, select] as const
}

/* ---- Head-to-head summaries --------------------------------------------- */

const summaries: Record<Rival, { lead: string; points: { title: string; us: string; them: string }[] }> = {
    shopify: {
        lead: "Shopify is a polished global platform. For a seller in Pakistan, the gaps show up in the bill and in everything cash on delivery needs.",
        points: [
            { title: "Pricing", us: "One flat plan in rupees. Nothing to add.", them: "Plans billed in dollars, plus the apps most COD stores end up paying for." },
            { title: "Cash on delivery", us: "The default — with confirmation, courier booking and remittance tracking.", them: "A manual payment method; the COD workflow usually comes from apps." },
            { title: "Local couriers", us: "TCS, Leopards and M&P booked from the order.", them: "Needs a third-party app or the courier's own portal." },
            { title: "Speed", us: "One JSON-rendered theme and no app scripts.", them: "Fast base, but each installed app can add scripts to your pages." },
            { title: "Staff", us: "Unlimited staff accounts, no extra cost.", them: "Staff limits depend on the plan you're on." },
        ],
    },
    woocommerce: {
        lead: "WooCommerce is free to install and endlessly flexible — if you're ready to run hosting, security, updates and a stack of plugins yourself.",
        points: [
            { title: "Setup", us: "Sign up and publish. Hosting, SSL and updates are handled.", them: "Buy hosting, install WordPress, pick a theme, configure plugins." },
            { title: "Maintenance", us: "Nothing to update, back up or patch.", them: "Plugin, theme and WordPress updates — and the conflicts they cause." },
            { title: "Speed", us: "Fast out of the box on every store.", them: "Depends on your host, theme and caching plugins." },
            { title: "Cash on delivery", us: "COD-first checkout with confirmation and remittance tracking.", them: "Basic COD built in; the rest comes from plugins." },
            { title: "Real cost", us: "Rs 1,349/month, everything included.", them: "Free core, plus hosting, premium theme and paid plugins." },
        ],
    },
}

export function CompareHero() {
    const [rival, select] = useRival()
    const tabs: (Rival | "all")[] = ["all", "shopify", "woocommerce"]

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
                        <Scale className="h-3 w-3" style={{ color: ACCENT }} />
                        Compare
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[880px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Seltrax vs Shopify
                        <br />
                        <Serif>vs WooCommerce</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[580px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        An honest comparison for sellers in Pakistan: what each platform costs once you add everything a
                        cash-on-delivery store needs, how much you have to set up and maintain yourself, and where each one fits.
                    </motion.p>

                    <motion.div {...float(0.15)} role="tablist" className="mx-auto mt-7 flex w-fit rounded-full bg-white/80 p-1 shadow-sm ring-1 ring-[#E4E6DF] backdrop-blur">
                        {tabs.map((t) => (
                            <button key={t} role="tab" aria-selected={rival === t} onClick={() => select(t)} className={cn("relative rounded-full px-3.5 py-1.5 text-[11px] font-medium lg:px-5 lg:text-[13px]", rival === t ? "text-white" : "text-[#3A3D37] hover:text-[#171717]")}>
                                {rival === t && <motion.span layoutId="compare-tab" className="absolute inset-0 rounded-full bg-[#171717]" transition={{ duration: 0.22, ease }} />}
                                <span className="relative">{t === "all" ? "All three" : `vs ${rivalName[t]}`}</span>
                            </button>
                        ))}
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

export function HeadToHead() {
    const [rival] = useRival()
    const shown: Rival[] = rival === "all" ? ["shopify", "woocommerce"] : [rival]

    return (
        <Container>
            <section id="head-to-head" className="scroll-mt-6 pb-6 pt-6 lg:pt-10">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={rival} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease }} className={cn("grid grid-cols-1 gap-4 lg:gap-6", shown.length === 2 && "lg:grid-cols-2")}>
                        {shown.map((r) => {
                            const s = summaries[r]
                            return (
                                <div key={r} id={r} className={`rounded-2xl border border-[#E4E6DF] bg-white p-5 lg:p-7 ${shadow}`}>
                                    <div className="flex items-center gap-2 text-[15px] font-semibold lg:text-[18px]">
                                        <span className="rounded-full px-2.5 py-0.5 text-[12px] text-white lg:text-[13px]" style={{ background: ACCENT }}>Seltrax</span>
                                        <ArrowLeftRight className="h-4 w-4 text-[#8A8E84]" />
                                        <span className="rounded-full bg-[#F3F4F0] px-2.5 py-0.5 text-[12px] lg:text-[13px]">{rivalName[r]}</span>
                                    </div>
                                    <p className="mt-3 text-[12px] leading-relaxed text-[#3A3D37] lg:text-[14px]">{s.lead}</p>
                                    <ul className="mt-4 divide-y divide-[#EEF0EA] rounded-xl border border-[#EEF0EA]">
                                        {s.points.map((p) => (
                                            <li key={p.title} className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-[110px_minmax(0,1fr)_minmax(0,1fr)] sm:gap-4 lg:p-4">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A8E84] lg:text-[11.5px]">{p.title}</p>
                                                <p className="flex items-start gap-1.5 text-[11.5px] leading-relaxed lg:text-[13px]">
                                                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} /> {p.us}
                                                </p>
                                                <p className="flex items-start gap-1.5 text-[11.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">
                                                    <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B5B9B0]" /> {p.them}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </section>
        </Container>
    )
}

/* ---- Full comparison ------------------------------------------------------- */

type Cell = "yes" | "partial" | "no"
type Row = { row: string; s: Cell; sh: Cell; w: Cell; note?: string }
const groups: { name: string; rows: Row[] }[] = [
    {
        name: "Getting started",
        rows: [
            { row: "No-code store setup", s: "yes", sh: "yes", w: "partial" },
            { row: "Hosting, SSL and backups included", s: "yes", sh: "yes", w: "no" },
            { row: "Ready-made designs included", s: "yes", sh: "partial", w: "partial" },
            { row: "Launch the same day", s: "yes", sh: "yes", w: "partial" },
        ],
    },
    {
        name: "Selling in Pakistan",
        rows: [
            { row: "Priced and billed in rupees", s: "yes", sh: "no", w: "partial" },
            { row: "COD-first checkout", s: "yes", sh: "partial", w: "partial" },
            { row: "Order confirmation before dispatch", s: "yes", sh: "no", w: "no" },
            { row: "TCS / Leopards / M&P booking built in", s: "yes", sh: "no", w: "no" },
            { row: "COD remittance reconciliation", s: "yes", sh: "no", w: "no" },
        ],
    },
    {
        name: "Speed & maintenance",
        rows: [
            { row: "Fast out of the box", s: "yes", sh: "partial", w: "no" },
            { row: "No plugin or app scripts slowing pages", s: "yes", sh: "no", w: "no" },
            { row: "Zero updates or patches to manage", s: "yes", sh: "yes", w: "no" },
        ],
    },
    {
        name: "Running the store",
        rows: [
            { row: "Page builder for any page", s: "yes", sh: "partial", w: "partial" },
            { row: "Built-in analytics incl. delivered revenue", s: "yes", sh: "partial", w: "no" },
            { row: "Unlimited staff accounts at no cost", s: "yes", sh: "no", w: "partial" },
            { row: "Mobile app for orders and sales", s: "yes", sh: "yes", w: "partial" },
        ],
    },
    {
        name: "Cost",
        rows: [
            { row: "One flat price, everything included", s: "yes", sh: "no", w: "no" },
            { row: "No paid apps needed for COD & couriers", s: "yes", sh: "no", w: "no" },
        ],
    },
]

function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }} aria-label="Yes"><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]" aria-label="Partly"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]" aria-label="No"><X className="h-3.5 w-3.5" /></span>
}

export function FullComparison() {
    const [rival] = useRival()
    const cols: { key: "s" | "sh" | "w"; label: string }[] = [
        { key: "s", label: "Seltrax" },
        ...(rival !== "woocommerce" ? [{ key: "sh" as const, label: "Shopify" }] : []),
        ...(rival !== "shopify" ? [{ key: "w" as const, label: "WooCommerce" }] : []),
    ]
    const score = (k: "s" | "sh" | "w") => groups.flatMap((g) => g.rows).reduce((a, r) => a + (r[k] === "yes" ? 1 : r[k] === "partial" ? 0.5 : 0), 0)
    const total = groups.flatMap((g) => g.rows).length

    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Feature by feature</Serif>
                        <span className="block font-semibold">The Full Comparison</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">What you get</th>
                                    {cols.map((c) => (
                                        <th key={c.key} className={cn("px-4 py-3 text-center lg:px-6", c.key === "s" ? "font-semibold" : "font-medium text-[#8A8E84]")}>{c.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((g) => (
                                    <React.Fragment key={g.name}>
                                        <tr className="border-b border-[#EEF0EA] bg-white">
                                            <td colSpan={cols.length + 1} className="px-4 pb-2 pt-5 text-[10px] font-semibold uppercase tracking-[0.14em] lg:px-6" style={{ color: ACCENT }}>{g.name}</td>
                                        </tr>
                                        {g.rows.map((r) => (
                                            <tr key={r.row} className="border-b border-[#EEF0EA]">
                                                <td className="px-4 py-3 lg:px-6">{r.row}</td>
                                                {cols.map((c) => (
                                                    <td key={c.key} className={cn("px-4 py-3 text-center lg:px-6", c.key === "s" && "bg-[#F5F9FF]")}><CellIcon v={r[c.key]} /></td>
                                                ))}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                                <tr className="bg-[#F6F7F3]">
                                    <td className="px-4 py-3 font-semibold lg:px-6">Covered for a COD store</td>
                                    {cols.map((c) => (
                                        <td key={c.key} className="px-4 py-3 text-center font-semibold tabular-nums lg:px-6">{Math.round((score(c.key) / total) * 100)}%</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">
                        Partial = possible with a higher plan, extra apps/plugins or your own setup. Other platforms change their plans — check their current pricing and feature pages.
                    </p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- 12-month cost ------------------------------------------------------- */

type CostInputs = { plan: number; apps: number; appCost: number; extra: number }
const defaults: Record<Rival, CostInputs> = {
    shopify: { plan: 11000, apps: 5, appCost: 2500, extra: 0 },
    woocommerce: { plan: 4000, apps: 6, appCost: 1800, extra: 1500 },
}

export function TwelveMonthCost() {
    const [rival] = useRival()
    const [which, setWhich] = React.useState<Rival>("shopify")
    const [inputs, setInputs] = React.useState<Record<Rival, CostInputs>>(defaults)

    React.useEffect(() => {
        if (rival !== "all") setWhich(rival)
    }, [rival])

    const v = inputs[which]
    const set = (k: keyof CostInputs, n: number) => setInputs((x) => ({ ...x, [which]: { ...x[which], [k]: n } }))
    const theirs = (v.plan + v.apps * v.appCost + v.extra) * 12
    const ours = 1349 * 12
    const diff = Math.max(0, theirs - ours)
    const max = Math.max(theirs, ours)

    const fields: { k: keyof CostInputs; l: string; min: number; max: number; step: number; money: boolean }[] = [
        { k: "plan", l: which === "shopify" ? "Plan, per month" : "Hosting, per month", min: 0, max: 40000, step: 500, money: true },
        { k: "apps", l: which === "shopify" ? "Paid apps" : "Paid plugins", min: 0, max: 15, step: 1, money: false },
        { k: "appCost", l: "Average cost each, per month", min: 0, max: 8000, step: 100, money: true },
        { k: "extra", l: which === "shopify" ? "Other monthly costs" : "Premium theme & upkeep, per month", min: 0, max: 20000, step: 500, money: true },
    ]

    return (
        <Container>
            <section id="cost" className="scroll-mt-6 pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The real price</Serif>
                        <span className="block font-semibold">Your First Year, Added Up</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[580px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        The sticker price isn&apos;t the price. Add the apps, plugins and hosting a COD store actually needs — using the numbers from your own invoices.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-5 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-2 lg:gap-8 lg:p-8">
                        <div className="space-y-5">
                            <div className="flex rounded-full bg-white p-1 ring-1 ring-[#E4E6DF]">
                                {(["shopify", "woocommerce"] as Rival[]).map((r) => (
                                    <button key={r} type="button" aria-pressed={which === r} onClick={() => setWhich(r)} className={cn("flex-1 rounded-full py-1.5 text-[11px] font-medium lg:text-[12px]", which === r ? "bg-[#171717] text-white" : "text-[#5C6058]")}>
                                        {rivalName[r]}
                                    </button>
                                ))}
                            </div>
                            {fields.map((f) => (
                                <label key={f.k} className="block">
                                    <span className="flex items-center justify-between text-[11px] lg:text-[13px]">
                                        <span className="text-[#5C6058]">{f.l}</span>
                                        <span className="font-semibold tabular-nums">{f.money ? `Rs ${v[f.k].toLocaleString()}` : v[f.k]}</span>
                                    </span>
                                    <input type="range" min={f.min} max={f.max} step={f.step} value={v[f.k]} onChange={(e) => set(f.k, Number(e.target.value))} className="mt-2 h-1.5 w-full cursor-pointer" style={{ accentColor: "#171717" }} />
                                </label>
                            ))}
                            <p className="text-[10px] leading-relaxed text-[#8A8E84] lg:text-[11px]">Starting values are illustrative, not quotes. Dollar-priced plans and apps also move with the exchange rate.</p>
                        </div>

                        <div className="flex flex-col justify-between gap-5 rounded-xl bg-white p-5 lg:p-6">
                            <div className="space-y-4">
                                {[
                                    { name: rivalName[which], value: theirs, color: "#C9CDC3" },
                                    { name: "Seltrax", value: ours, color: ACCENT },
                                ].map((b) => (
                                    <div key={b.name}>
                                        <div className="flex items-baseline justify-between text-[11px] lg:text-[13px]">
                                            <span className="font-medium">{b.name}</span>
                                            <span className="font-semibold tabular-nums">Rs {b.value.toLocaleString()} <span className="font-normal text-[#8A8E84]">/ year</span></span>
                                        </div>
                                        <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-[#F3F4F0]">
                                            <motion.div className="h-full rounded-full" initial={false} animate={{ width: `${Math.max((b.value / (max || 1)) * 100, 2)}%` }} transition={{ duration: 0.4, ease }} style={{ background: b.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-xl bg-[#171717] p-5 text-white">
                                <p className="text-[10px] text-white/60 lg:text-[11px]">You&apos;d keep in year one</p>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.p key={diff} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="mt-1 text-[30px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[40px]">
                                        Rs {diff.toLocaleString()}
                                    </motion.p>
                                </AnimatePresence>
                                <p className="text-[10px] text-white/60 lg:text-[11px]">
                                    {diff > 0 ? `That's ${(theirs / ours).toFixed(1)}× what Seltrax costs.` : "At these numbers the costs are similar — the difference is in what's built in."}
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Honest fit ------------------------------------------------------------- */

const fits = [
    {
        title: "Choose Seltrax if…",
        hot: true,
        items: ["You sell mainly in Pakistan and most orders are cash on delivery", "You ship with TCS, Leopards or M&P", "You want one price in rupees with nothing to add", "You'd rather not manage hosting, plugins or updates", "Your team needs access without per-seat costs"],
    },
    {
        title: "Shopify may suit you if…",
        items: ["You sell mostly internationally with card payments", "You rely on specific apps from the Shopify App Store", "Dollar pricing isn't a concern for your business"],
    },
    {
        title: "WooCommerce may suit you if…",
        items: ["You already run a WordPress site you want to sell from", "You have a developer to manage hosting, security and plugins", "You need deep code-level customisation"],
    },
]

export function HonestFit() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">No hard sell</Serif>
                        <span className="block font-semibold">Which One Fits You</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3 lg:mt-14 lg:gap-4">
                    {fits.map((f, i) => (
                        <Reveal key={f.title} delay={i * 0.06}>
                            <div className={cn("h-full rounded-2xl p-5 lg:p-6", f.hot ? "text-white" : "border border-[#E4E6DF] bg-[#F6F7F3]")} style={f.hot ? { background: ACCENT } : undefined}>
                                <p className="text-[15px] font-semibold lg:text-[17px]">{f.title}</p>
                                <ul className="mt-4 space-y-2">
                                    {f.items.map((it) => (
                                        <li key={it} className={cn("flex items-start gap-2 text-[11.5px] leading-relaxed lg:text-[13px]", f.hot ? "text-white/90" : "text-[#3A3D37]")}>
                                            <Check className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", f.hot ? "text-white" : "text-[#8A8E84]")} /> {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Switch + FAQ ------------------------------------------------------------ */

const faqs = [
    { q: "Is this comparison fair to Shopify and WooCommerce?", a: "We've tried to be. Both are strong platforms, and the 'Which one fits you' section says when they're the better choice. This page is written from the point of view of a cash-on-delivery seller in Pakistan — that's who Seltrax is built for." },
    { q: "Why doesn't this page list Shopify's or WooCommerce's prices?", a: "Their plans, currencies and app prices change often, so any figure we printed would go out of date. The cost calculator lets you enter what you actually pay today." },
    { q: "Can I move my existing store to Seltrax?", a: "Yes. Products, variants, images, customers, orders and SEO come across from Shopify or WooCommerce, and you keep selling on your old store until you switch your domain." },
    { q: "What do I lose by leaving Shopify or WooCommerce?", a: "Your theme and any app-specific features. On Seltrax you pick a design and use the page builder, and the things COD stores usually install apps for — courier booking, confirmation, analytics — are built in." },
]

export function CompareFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal>
                    <div className="grid grid-cols-1 items-center gap-6 rounded-2xl bg-[#171717] p-6 text-white md:grid-cols-[minmax(0,1fr)_auto] lg:p-10">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Already on another platform?</p>
                            <p className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] lg:text-[32px]">
                                Switch without starting over
                            </p>
                            <p className="mt-2 max-w-[520px] text-[11px] leading-relaxed text-white/70 lg:text-[13px]">
                                Bring your products, customers, orders and SEO from Shopify or WooCommerce. Keep selling while it imports.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/migrate" className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                                How migration works <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full border border-white/30 px-4 py-2 text-[12px] font-medium text-white hover:bg-white/10">
                                Start free
                            </Link>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="mx-auto mt-14 max-w-[760px] lg:mt-20">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About This Comparison</span>
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
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium hover:bg-[#F3F4F0]">
                            Compare on a call <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
