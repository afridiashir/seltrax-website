"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowRight,
    ArrowUpRight,
    Banknote,
    Check,
    Clock,
    Globe,
    Lock,
    Package,
    Palette,
    PartyPopper,
    RotateCcw,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    Store,
    Timer,
    Truck,
    UserPlus,
    Minus,
    X,
    Zap,
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

/* ---- Steps (shared by the simulator and the in-depth section) ---------- */

type Step = { key: string; icon: React.ElementType; title: string; minutes: number; action: string; detail: string }
const steps: Step[] = [
    { key: "account", icon: UserPlus, title: "Create your account", minutes: 1, action: "Sign up", detail: "Phone or email and a password. No credit card to start." },
    { key: "name", icon: Store, title: "Name your store", minutes: 1, action: "Set name", detail: "Store name, logo and your free seltrax subdomain — live address from minute two." },
    { key: "design", icon: Palette, title: "Pick a design", minutes: 3, action: "Choose design", detail: "Start from a ready-made design for your category, then change colours and fonts." },
    { key: "product", icon: Package, title: "Add your first product", minutes: 5, action: "Add product", detail: "Photos, price, sizes and colours, stock. Images are optimised automatically." },
    { key: "delivery", icon: Banknote, title: "Set delivery & COD", minutes: 3, action: "Set fees", detail: "Cash on delivery is on by default. Set a flat or per-city delivery fee." },
    { key: "courier", icon: Truck, title: "Connect a courier", minutes: 3, action: "Connect", detail: "Add your TCS, Leopards or M&P account so orders can be booked in one click." },
    { key: "publish", icon: Rocket, title: "Publish", minutes: 1, action: "Go live", detail: "Hit publish and share the link on Instagram, WhatsApp and Facebook." },
]
const totalMinutes = steps.reduce((a, s) => a + s.minutes, 0)

/* ---- Hero ------------------------------------------------------------------ */

export function LaunchHero() {
    return (
        <section className="relative">
            <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
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
                        <Rocket className="h-3 w-3" style={{ color: ACCENT }} />
                        Launch in minutes
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[900px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Your Store, Live
                        <br />
                        <Serif>Before Lunch</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[580px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        No hosting to buy, no theme to install, no plugins to wire together, no developer to wait on. Sign up,
                        pick a design, add a product, publish. Most sellers go live the same day — many in under an hour.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start the clock <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href="#launch" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Walk through a launch
                        </a>
                    </motion.div>
                    <motion.div {...float(0.2)} className="mx-auto mt-8 grid max-w-[640px] grid-cols-3 gap-3">
                        {[
                            [String(steps.length), "steps to go live"],
                            ["0", "code, hosting or plugins"],
                            ["Same day", "launch for most sellers"],
                        ].map(([n, l]) => (
                            <div key={l}>
                                <Serif className="block text-[30px] leading-none lg:text-[42px]">{n}</Serif>
                                <p className="mt-1 text-[10px] text-[#5C6058] lg:text-[12px]">{l}</p>
                            </div>
                        ))}
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- Launch simulator -------------------------------------------------- */

const swatches = ["#1F3A5F", ACCENT, "#0F9D58", "#B5532A"]

export function LaunchSimulator() {
    const [done, setDone] = React.useState(0)
    const [auto, setAuto] = React.useState(false)
    const elapsed = steps.slice(0, done).reduce((a, s) => a + s.minutes, 0)
    const live = done === steps.length
    const next = steps[done]

    React.useEffect(() => {
        if (!auto || live) return
        const id = window.setTimeout(() => setDone((d) => d + 1), 900)
        return () => window.clearTimeout(id)
    }, [auto, done, live])

    const reset = () => {
        setDone(0)
        setAuto(false)
    }
    const has = (k: string) => steps.findIndex((s) => s.key === k) < done

    return (
        <Container>
            <section id="launch" className="scroll-mt-6 pb-6 pt-8 lg:pt-12">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Walk through a launch</Serif>
                        <span className="block font-semibold">Seven Steps, One Clock</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-[540px] text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        Complete each step and watch the storefront build itself. The clock adds a typical time for each one.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-10">
                    <div className={`grid grid-cols-1 gap-3 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-3 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-4 lg:p-4 ${shadow}`}>
                        {/* Checklist */}
                        <div className="rounded-xl bg-white p-3 lg:p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: live ? "#0F9D58" : ACCENT }}>
                                        {live ? <PartyPopper className="h-4 w-4" /> : <Timer className="h-4 w-4" />}
                                    </span>
                                    <div>
                                        <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{live ? "Live in" : "Time so far"}</p>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.p key={elapsed} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="text-[20px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[24px]">
                                                {elapsed} min
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="flex gap-1.5">
                                    <button type="button" onClick={() => setAuto((a) => !a)} disabled={live} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10.5px] font-medium hover:bg-[#F3F4F0] disabled:opacity-40">
                                        <Zap className="h-3 w-3" /> {auto ? "Pause" : "Auto-play"}
                                    </button>
                                    <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10.5px] font-medium hover:bg-[#F3F4F0]">
                                        <RotateCcw className="h-3 w-3" /> Reset
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF0EA]">
                                <motion.div className="h-full rounded-full" animate={{ width: `${(elapsed / totalMinutes) * 100}%`, background: live ? "#0F9D58" : ACCENT }} transition={{ duration: 0.4, ease }} />
                            </div>

                            <ol className="mt-4 space-y-1.5">
                                {steps.map((s, i) => {
                                    const isDone = i < done
                                    const isNext = i === done
                                    return (
                                        <li key={s.key} className={cn("flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors", isNext ? "border-[#171717] bg-[#F6F7F3]" : "border-[#EEF0EA]")}>
                                            <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", isDone ? "bg-[#171717] text-white" : isNext ? "text-white" : "bg-[#F3F4F0] text-[#8A8E84]")} style={isNext ? { background: ACCENT } : undefined}>
                                                {isDone ? <Check className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className={cn("block text-[11.5px] font-medium lg:text-[13px]", !isDone && !isNext && "text-[#8A8E84]")}>{s.title}</span>
                                                <span className="block truncate text-[10px] text-[#8A8E84] lg:text-[11px]">{s.detail}</span>
                                            </span>
                                            <span className="hidden shrink-0 items-center gap-1 text-[10px] text-[#8A8E84] sm:inline-flex"><Clock className="h-3 w-3" /> ~{s.minutes} min</span>
                                            {isNext ? (
                                                <button type="button" onClick={() => setDone((d) => d + 1)} className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#171717] px-3 py-1.5 text-[10.5px] font-medium text-white hover:bg-black">
                                                    {s.action} <ArrowRight className="h-3 w-3" />
                                                </button>
                                            ) : (
                                                <span className="w-[74px] shrink-0 text-right text-[10px] font-medium" style={isDone ? { color: "#0F7A44" } : { color: "#B5B9B0" }}>
                                                    {isDone ? "Done" : "Up next"}
                                                </span>
                                            )}
                                        </li>
                                    )
                                })}
                            </ol>
                            <p className="mt-3 text-[9.5px] leading-relaxed text-[#8A8E84] lg:text-[10.5px]">Step times are typical, not a guarantee — a big catalogue takes longer to add, and you can import it instead.</p>
                        </div>

                        {/* Live preview */}
                        <div className="flex justify-center rounded-xl bg-white p-4">
                            <div className="w-full max-w-[270px]">
                                <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Your store</p>
                                <div className="overflow-hidden rounded-[26px] border-[5px] border-[#171717] bg-[#F8F9F6] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
                                    <div className="mx-auto mt-1.5 h-3 w-12 rounded-full bg-[#171717]" />
                                    <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 text-[8px] text-[#5C6058]">
                                        <Lock className="h-2.5 w-2.5" />
                                        <span className="truncate">{has("name") ? "apnastore.seltrax.com" : "—"}</span>
                                        <span className={cn("ml-auto rounded-full px-1.5 py-px text-[7px] font-semibold", live ? "bg-[#E6F4EC] text-[#0F7A44]" : "bg-[#F3F4F0] text-[#8A8E84]")}>{live ? "LIVE" : "Draft"}</span>
                                    </div>
                                    <div className="relative min-h-[330px] px-3 pb-4 pt-3">
                                        {!has("account") && <p className="pt-24 text-center text-[10px] text-[#B5B9B0]">Nothing here yet</p>}
                                        <AnimatePresence>
                                            {has("account") && (
                                                <motion.div key="head" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
                                                    <span className="text-[10px] font-semibold">{has("name") ? "Apna Store" : "Untitled store"}</span>
                                                    <span className="h-2 w-8 rounded-full bg-[#EEF0EA]" />
                                                </motion.div>
                                            )}
                                            {has("design") ? (
                                                <motion.div key="hero" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} className="mt-2 rounded-lg px-2.5 py-4 text-white" style={{ background: swatches[0] }}>
                                                    <p className="text-[10px] font-semibold">Winter drop is here</p>
                                                    <span className="mt-1.5 inline-block rounded-full bg-white px-2 py-0.5 text-[7px] font-semibold" style={{ color: swatches[0] }}>Shop now</span>
                                                </motion.div>
                                            ) : has("account") ? (
                                                <div key="hero-ph" className="mt-2 h-[58px] rounded-lg border border-dashed border-[#D9DCD3]" />
                                            ) : null}
                                            {has("product") ? (
                                                <motion.div key="prod" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} className="mt-2 grid grid-cols-2 gap-1.5">
                                                    <div>
                                                        <div className="h-16 rounded-md" style={{ background: "#1F3A5F33" }} />
                                                        <p className="mt-1 text-[8px] font-medium">Cotton Kurta</p>
                                                        <p className="text-[8px]" style={{ color: ACCENT }}>Rs 2,450</p>
                                                    </div>
                                                    <div className="h-16 rounded-md border border-dashed border-[#D9DCD3]" />
                                                </motion.div>
                                            ) : has("design") ? (
                                                <div key="prod-ph" className="mt-2 grid grid-cols-2 gap-1.5"><div className="h-16 rounded-md border border-dashed border-[#D9DCD3]" /><div className="h-16 rounded-md border border-dashed border-[#D9DCD3]" /></div>
                                            ) : null}
                                            {has("delivery") && (
                                                <motion.div key="cod" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[8px] text-white" style={{ background: ACCENT }}>
                                                    <span className="inline-flex items-center gap-1"><Banknote className="h-3 w-3" /> Cash on Delivery</span>
                                                    <span>Delivery Rs 150</span>
                                                </motion.div>
                                            )}
                                            {has("courier") && (
                                                <motion.div key="courier" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[8px] ring-1 ring-[#EEF0EA]">
                                                    <Truck className="h-3 w-3 text-[#5C6058]" /> Ships with Leopards · tracking by SMS
                                                </motion.div>
                                            )}
                                            {live && (
                                                <motion.div key="live" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease }} className="absolute inset-x-3 bottom-4 rounded-xl bg-[#171717] p-3 text-center text-white">
                                                    <PartyPopper className="mx-auto h-5 w-5" style={{ color: ACCENT }} />
                                                    <p className="mt-1 text-[10px] font-semibold">You&apos;re live in {elapsed} minutes</p>
                                                    <p className="text-[8px] text-white/60">Share your link and take the first order</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                {next && <p className="mt-3 text-center text-[10px] text-[#8A8E84]">Next: {next.title.toLowerCase()}</p>}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Already done for you ----------------------------------------------- */

const doneForYou = [
    { icon: Server, title: "Hosting", desc: "Your store is hosted and scaled for you. Nothing to buy, set up or upgrade." },
    { icon: ShieldCheck, title: "SSL & security", desc: "HTTPS on every page from the first minute, with security updates handled." },
    { icon: Globe, title: "A live address", desc: "A free store subdomain straight away; connect your own domain whenever you like." },
    { icon: Zap, title: "Speed", desc: "Every store runs on the same fast, JSON-rendered engine. No speed plugins." },
    { icon: Banknote, title: "COD checkout", desc: "A one-page, phone-first checkout with cash on delivery already switched on." },
    { icon: Search, title: "SEO basics", desc: "Sitemap, meta tags and clean URLs generated for every product and page." },
    { icon: Truck, title: "Courier integrations", desc: "TCS, Leopards and M&P ready to connect — no courier plugin to find." },
    { icon: Package, title: "Backups & updates", desc: "Automatic. You'll never lose a weekend to a broken update." },
]

export function DoneForYou() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Why it takes minutes</Serif>
                        <span className="block font-semibold">The Hard Part Is Already Done</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Launching usually takes weeks because of everything around the store — hosting, security, checkout, couriers.
                        On Seltrax all of that is switched on before you sign in.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {doneForYou.map((f, i) => (
                        <Reveal key={f.title} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-colors hover:bg-[#F1F3EE]">
                                <div className="flex items-center justify-between">
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><f.icon className="h-4 w-4" /></span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F4EC] px-2 py-0.5 text-[9px] font-semibold text-[#0F7A44]"><Check className="h-2.5 w-2.5" /> Ready</span>
                                </div>
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

/* ---- Launch-day setup vs elsewhere ------------------------------------- */

type Cell = "yes" | "no" | "partial"
const setup: { task: string; s: Cell; sh: Cell; w: Cell }[] = [
    { task: "Buy and configure hosting", s: "yes", sh: "yes", w: "no" },
    { task: "Install and configure a theme", s: "yes", sh: "partial", w: "no" },
    { task: "Set up SSL certificate", s: "yes", sh: "yes", w: "partial" },
    { task: "Add cash on delivery properly", s: "yes", sh: "partial", w: "partial" },
    { task: "Find & install a courier integration", s: "yes", sh: "no", w: "no" },
    { task: "Add speed / caching plugins", s: "yes", sh: "yes", w: "no" },
    { task: "Price in rupees, pay in rupees", s: "yes", sh: "no", w: "partial" },
]

function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function SetupComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Launch day, side by side</Serif>
                        <span className="block font-semibold">What You Don&apos;t Have to Do</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        A tick means it&apos;s handled for you before launch. A cross means it&apos;s a job on your list.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Before you can sell</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">Seltrax</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">Shopify</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">WooCommerce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {setup.map((r) => (
                                    <tr key={r.task} className="border-b border-[#EEF0EA] last:border-b-0">
                                        <td className="px-4 py-3 lg:px-6">{r.task}</td>
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

/* ---- After launch -------------------------------------------------------- */

const after = [
    { t: "First hour", title: "Share your link", desc: "Post it to Instagram and your WhatsApp status. Orders land in your inbox with a notification." },
    { t: "First order", title: "Confirm and dispatch", desc: "Confirm by call or the WhatsApp link, book the courier in one click, print the label." },
    { t: "First week", title: "Grow the catalogue", desc: "Add the rest of your products — or import them from a CSV, Shopify or WooCommerce." },
    { t: "When ready", title: "Make it fully yours", desc: "Connect your own domain, build more pages, add your team at no extra cost." },
]

export function AfterLaunch() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">After you publish</Serif>
                        <span className="block font-semibold">From Live to First Order</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {after.map((a, i) => (
                        <Reveal key={a.title} delay={i * 0.06}>
                            <div className="relative h-full rounded-2xl border border-[#E4E6DF] bg-white p-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: ACCENT }}>{a.t}</p>
                                <p className="mt-2 text-[14px] font-semibold lg:text-[16px]">{a.title}</p>
                                <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{a.desc}</p>
                                {i < after.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-white text-[#B5B9B0] lg:block" />}
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-6 flex flex-wrap justify-center gap-2">
                    <Link href="/designs" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium hover:bg-[#F3F4F0]"><Palette className="h-3.5 w-3.5" /> Browse designs</Link>
                    <Link href="/migrate" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium hover:bg-[#F3F4F0]"><ArrowRight className="h-3.5 w-3.5" /> Migrate a store</Link>
                    <Link href="/checkout" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium hover:bg-[#F3F4F0]"><Banknote className="h-3.5 w-3.5" /> The checkout</Link>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- FAQ ------------------------------------------------------------------ */

const faqs = [
    { q: "Do I need a credit card to start?", a: "No. Create your store, set it up and publish without entering card details." },
    { q: "Do I need my own domain to launch?", a: "No. You get a free store address the moment you name your store, so you can launch and share it straight away. Connect your own domain whenever you're ready." },
    { q: "What if I have hundreds of products?", a: "Launch with a few, then add the rest — or import the whole catalogue from a CSV, Shopify or WooCommerce so you're not typing them one by one." },
    { q: "Do I need to know how to code or design?", a: "No. Pick a ready-made design and change colours, fonts and sections visually. If you can fill in a form, you can launch a store." },
    { q: "Can someone set it up with me?", a: "Yes. Book a demo and we'll walk through the setup together, live." },
]

export function LaunchFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Launching</span>
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
                            Launch your store <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            Set it up with us <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
