"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowUpRight,
    Banknote,
    Bell,
    Check,
    ClipboardCheck,
    Landmark,
    MapPin,
    Minus,
    Package,
    PackageCheck,
    PackageX,
    Pause,
    Phone,
    Play,
    RotateCcw,
    Scale,
    ShieldAlert,
    Smartphone,
    Truck,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Flag, Reveal, Serif, h2Class, shadow } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})
const couriers = ["TCS", "Leopards", "M&P"] as const

/* ---- Order lifecycle ------------------------------------------------------ */

const stages = [
    { key: "placed", label: "Order placed", icon: Smartphone, status: "New", note: "Ayesha ordered a Cotton Kurta — Rs 2,450, cash on delivery. Phone number captured at checkout.", pill: "COD · Rs 2,450" },
    { key: "confirmed", label: "Confirmed", icon: Phone, status: "Confirmed", note: "Order confirmed with the customer before anything ships — the single biggest cut to fake orders.", pill: "Confirmed by phone" },
    { key: "dispatched", label: "Dispatched", icon: Truck, status: "Dispatched", note: "Booked with Leopards in one click. The tracking number is saved on the order and sent to the customer.", pill: "Leopards · #004518-7742" },
    { key: "delivered", label: "Delivered", icon: PackageCheck, status: "Delivered", note: "Delivered and Rs 2,450 collected at the door. The order flips to Delivered from the courier's update.", pill: "Rs 2,450 collected" },
    { key: "remitted", label: "Cash remitted", icon: Landmark, status: "Remitted", note: "Leopards pays out the collected cash in their next remittance. It's matched to this order automatically.", pill: "Remitted · Rs 2,450" },
]

export function CODHero() {
    return (
        <section className="relative">
            <Image src="/landing/mist.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
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
                            <Banknote className="h-3 w-3" style={{ color: ACCENT }} />
                            Cash on Delivery
                        </motion.span>
                        <motion.h1 {...float(0.05)} className="mt-4 text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[62px]">
                            Cash on Delivery,
                            <br />
                            <Serif>Done Properly</Serif>
                        </motion.h1>
                        <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[440px] text-[12px] leading-relaxed text-[#3A3D37] md:mx-0 lg:text-[15px]">
                            In Pakistan the order isn&apos;t done when it&apos;s placed — it&apos;s done when the cash is in your account.
                            Seltrax runs the whole journey: confirmation, courier booking, tracking, delivery, returns and the
                            remittance that finally pays you. Built in, not bolted on.
                        </motion.p>
                        <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                                Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <a href="#reconcile" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                                See the reconciliation
                            </a>
                        </motion.div>
                        <motion.ul {...float(0.2)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] text-[#5C6058] md:justify-start lg:text-[12px]">
                            {["COD selected by default", "TCS · Leopards · M&P booking", "Tracking on every order", "Remittance matched automatically"].map((t) => (
                                <li key={t} className="inline-flex items-center gap-1">
                                    <Check className="h-3 w-3" style={{ color: ACCENT }} /> {t}
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                    <motion.div {...float(0.2)}>
                        <Lifecycle />
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

function Lifecycle() {
    const [i, setI] = React.useState(0)
    const [playing, setPlaying] = React.useState(true)
    const s = stages[i]

    React.useEffect(() => {
        if (!playing) return
        const id = window.setTimeout(() => setI((x) => (x + 1) % stages.length), 2400)
        return () => window.clearTimeout(id)
    }, [i, playing])

    return (
        <div className={`mx-auto w-full max-w-[460px] rounded-2xl bg-white p-4 lg:p-5 ${shadow}`}>
            <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold lg:text-[13px]">One COD order, start to finish</p>
                <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"} className="grid h-7 w-7 place-items-center rounded-full border border-[#D9DCD3] transition-colors hover:bg-[#F3F4F0]">
                    {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </button>
            </div>

            {/* Stepper */}
            <ol className="mt-4 flex items-center">
                {stages.map((st, k) => {
                    const done = k < i
                    const on = k === i
                    return (
                        <li key={st.key} className="flex flex-1 items-center last:flex-none">
                            <button
                                type="button"
                                onClick={() => { setI(k); setPlaying(false) }}
                                aria-current={on ? "step" : undefined}
                                aria-label={st.label}
                                className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors", on ? "border-transparent text-white" : done ? "border-transparent bg-[#171717] text-white" : "border-[#D9DCD3] bg-white text-[#8A8E84]")}
                                style={on ? { background: ACCENT } : undefined}
                            >
                                {done ? <Check className="h-3.5 w-3.5" /> : <st.icon className="h-3.5 w-3.5" />}
                            </button>
                            {k < stages.length - 1 && (
                                <div className="mx-1 h-[2px] flex-1 overflow-hidden rounded-full bg-[#EEF0EA]">
                                    <motion.div className="h-full bg-[#171717]" initial={false} animate={{ width: k < i ? "100%" : "0%" }} transition={{ duration: 0.4, ease }} />
                                </div>
                            )}
                        </li>
                    )
                })}
            </ol>

            {/* Order card */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div key={s.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease }} className="mt-4 rounded-xl border border-[#EEF0EA] bg-[#F8F9F6] p-3.5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <Flag code="pk" size={26} />
                            <div className="text-[10px] leading-tight lg:text-[12px]">
                                <p className="font-semibold">Order-0032 · Ayesha Shahbaz</p>
                                <p className="text-[#8A8E84]">Cotton Kurta — Navy · Lahore</p>
                            </div>
                        </div>
                        <span className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white lg:text-[10px]" style={{ background: i === stages.length - 1 ? "#0F9D58" : ACCENT }}>
                            {s.status}
                        </span>
                    </div>
                    <p className="mt-3 text-[10.5px] leading-relaxed text-[#3A3D37] lg:text-[12px]">{s.note}</p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[10px] font-medium ring-1 ring-[#E4E6DF] lg:text-[11px]">
                        <s.icon className="h-3 w-3" style={{ color: ACCENT }} /> {s.pill}
                    </div>
                </motion.div>
            </AnimatePresence>
            <p className="mt-2.5 text-center text-[9px] text-[#8A8E84] lg:text-[10px]">
                Step {i + 1} of {stages.length} · {s.label}
            </p>
        </div>
    )
}

/* ---- Why COD-first ---------------------------------------------------- */

export function WhyCOD() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Built for how Pakistan buys</Serif>
                        <span className="block font-semibold">COD Is the Default, Not an Add-on</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[640px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        The overwhelming majority of online orders in Pakistan are paid at the door. Platforms built for card
                        payments treat that as an edge case — a &ldquo;manual payment method&rdquo; with no courier, no tracking, no
                        idea when the cash actually arrives. Seltrax starts from the door and works backwards.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6">
                    {[
                        { n: "1", l: "click to book a courier — TCS, Leopards or M&P", },
                        { n: "0", l: "apps or plugins to make COD work" },
                        { n: "100%", l: "of orders tracked from checkout to remittance" },
                    ].map((p, k) => (
                        <Reveal key={p.l} delay={k * 0.08}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-6 text-center lg:p-8">
                                <Serif className="block text-[56px] leading-none tracking-[-0.02em] lg:text-[72px]">{p.n}</Serif>
                                <p className="mt-3 text-[12px] leading-relaxed text-[#3A3D37] lg:text-[14px]">{p.l}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- The flow, stage by stage ------------------------------------------ */

type Stage = { icon: React.ElementType; kicker: string; title: string; intro: string; specs: { k: string; v: string }[] }
const flow: Stage[] = [
    {
        icon: Smartphone,
        kicker: "1 · Checkout",
        title: "Phone number first, COD selected",
        intro: "The checkout is built around the door, not the card: four fields, cash on delivery pre-selected, and the customer's phone captured before anything else.",
        specs: [
            { k: "Fields", v: "Name · phone · city · address" },
            { k: "Default payment", v: "Cash on Delivery" },
            { k: "City", v: "Picker with courier coverage" },
            { k: "Fees", v: "COD / delivery fee per city or flat" },
            { k: "Order note", v: "Optional, shown to packer" },
            { k: "Confirmation", v: "SMS / WhatsApp with order number" },
        ],
    },
    {
        icon: Phone,
        kicker: "2 · Confirmation",
        title: "Confirm before you ship",
        intro: "Fake and impulse orders are the tax on COD. A confirmation step before dispatch — call, SMS or WhatsApp — is where most of it gets stopped.",
        specs: [
            { k: "Status", v: "New → Confirmed / Cancelled" },
            { k: "Channels", v: "Call · SMS · WhatsApp link" },
            { k: "One-tap", v: "Customer confirms from the message" },
            { k: "Auto-cancel", v: "Unconfirmed after N hours (optional)" },
            { k: "History", v: "Every attempt logged on the order" },
        ],
    },
    {
        icon: Truck,
        kicker: "3 · Dispatch",
        title: "Book the courier in a click",
        intro: "Pick the courier, print the label, done. The consignment number is saved on the order and sent to the customer automatically.",
        specs: [
            { k: "Couriers", v: couriers.join(" · ") },
            { k: "Booking", v: "From the order, one click" },
            { k: "Label", v: "Printable with address & COD amount" },
            { k: "Tracking no.", v: "Saved on the order, sent to customer" },
            { k: "Bulk", v: "Dispatch a day's orders together" },
            { k: "Status", v: "Confirmed → Dispatched" },
        ],
    },
    {
        icon: MapPin,
        kicker: "4 · Tracking",
        title: "Everyone knows where the parcel is",
        intro: "The courier's scans update the order; the customer gets a tracking link; you see every order's stage on one screen instead of three courier portals.",
        specs: [
            { k: "Updates", v: "From courier scans, automatic" },
            { k: "Customer", v: "Tracking link by SMS / WhatsApp" },
            { k: "You", v: "Orders board by stage & courier" },
            { k: "Alerts", v: "Stuck, attempted, refused" },
            { k: "Mobile app", v: "Same board on your phone" },
        ],
    },
    {
        icon: PackageX,
        kicker: "5 · Returns (RTO)",
        title: "Refused parcels, handled",
        intro: "Some parcels come back. Seltrax records the return, restocks the item, flags the customer, and keeps the cost visible so RTO never quietly eats your margin.",
        specs: [
            { k: "Status", v: "Delivered / Returned (RTO)" },
            { k: "Stock", v: "Restocked on return" },
            { k: "Customer", v: "Refusal count on their profile" },
            { k: "Defence", v: "Confirm-first for flagged numbers" },
            { k: "Reporting", v: "RTO rate by city, courier, product" },
        ],
    },
    {
        icon: Landmark,
        kicker: "6 · Reconciliation",
        title: "Know what's collected, what's pending, what's paid",
        intro: "Couriers collect your cash and remit it later, in batches. Seltrax matches each remittance to orders, so you can see exactly what's still sitting with the courier.",
        specs: [
            { k: "Per order", v: "Collected · Pending · Remitted" },
            { k: "Per courier", v: "Outstanding balance, live" },
            { k: "Remittance", v: "Import / match statements" },
            { k: "Deductions", v: "COD & delivery fees itemised" },
            { k: "Export", v: "CSV for your accountant" },
        ],
    },
]

export function Flow() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The whole journey</Serif>
                        <span className="block font-semibold">From Checkout to Cash in the Bank</span>
                    </h2>
                </Reveal>
                <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
                    {flow.map((d, i) => (
                        <Reveal key={d.title} delay={0.04}>
                            <article className={cn("grid grid-cols-1 gap-6 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-10 lg:p-8", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
                                <div>
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white">
                                        <d.icon className="h-4 w-4" />
                                    </span>
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

/* ---- RTO / fake-order defences ---------------------------------------- */

const defences = [
    { icon: ClipboardCheck, title: "Confirm before dispatch", desc: "Nothing ships until the customer confirms — by call, or one tap on the SMS/WhatsApp link." },
    { icon: ShieldAlert, title: "Repeat-refusal flags", desc: "Numbers that have refused before are flagged on every new order, so you can confirm harder or decline." },
    { icon: MapPin, title: "Address & city checks", desc: "City picker limited to courier coverage; incomplete addresses are caught before booking." },
    { icon: Bell, title: "Stuck-parcel alerts", desc: "Attempted deliveries and stalled parcels surface immediately, while a call can still save the order." },
    { icon: Scale, title: "RTO reporting", desc: "Return rate by city, courier and product — find the pattern behind the losses." },
    { icon: Banknote, title: "Fees, itemised", desc: "COD and return charges are recorded per order, so margin per delivered order is real, not guessed." },
]

export function Defences() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The COD tax</Serif>
                        <span className="block font-semibold">Fewer Fake Orders, Fewer Returns</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Every refused parcel costs you the delivery both ways. These are the tools that keep that number down.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {defences.map((f, i) => (
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

/* ---- Reconciliation board (interactive) --------------------------------- */

type Row = { id: string; customer: string; city: string; courier: (typeof couriers)[number]; amount: number; stage: "Dispatched" | "Delivered" | "Remitted" | "Returned" }
const orders: Row[] = [
    { id: "0028", customer: "Hamza Iqbal", city: "Karachi", courier: "TCS", amount: 4200, stage: "Remitted" },
    { id: "0029", customer: "Sana Malik", city: "Lahore", courier: "Leopards", amount: 1800, stage: "Delivered" },
    { id: "0030", customer: "Bilal Ahmed", city: "Islamabad", courier: "M&P", amount: 2950, stage: "Dispatched" },
    { id: "0031", customer: "Mariam Khan", city: "Faisalabad", courier: "TCS", amount: 2450, stage: "Returned" },
    { id: "0032", customer: "Ayesha Shahbaz", city: "Lahore", courier: "Leopards", amount: 2450, stage: "Delivered" },
    { id: "0033", customer: "Usman Tariq", city: "Multan", courier: "M&P", amount: 5700, stage: "Delivered" },
    { id: "0034", customer: "Zainab Raza", city: "Karachi", courier: "TCS", amount: 3200, stage: "Remitted" },
    { id: "0035", customer: "Omar Farooq", city: "Peshawar", courier: "Leopards", amount: 1500, stage: "Dispatched" },
]
const stageStyle: Record<Row["stage"], string> = {
    Dispatched: "bg-[#F3F4F0] text-[#5C6058]",
    Delivered: "bg-[#E8F0FF] text-[#1D5FCC]",
    Remitted: "bg-[#E6F4EC] text-[#0F7A44]",
    Returned: "bg-[#FDECEC] text-[#B42318]",
}
const rs = (n: number) => `Rs ${n.toLocaleString("en-PK")}`

export function Reconciliation() {
    const [courier, setCourier] = React.useState<"All" | (typeof couriers)[number]>("All")
    const rows = orders.filter((o) => courier === "All" || o.courier === courier)
    const sum = (st: Row["stage"]) => rows.filter((o) => o.stage === st).reduce((a, o) => a + o.amount, 0)
    const inTransit = sum("Dispatched")
    const collected = sum("Delivered")
    const remitted = sum("Remitted")
    const returned = rows.filter((o) => o.stage === "Returned").length

    return (
        <Container>
            <section id="reconcile" className="scroll-mt-6 pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Where&apos;s my money?</Serif>
                        <span className="block font-semibold">The Reconciliation Board</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Every COD order in one place, with the cash&apos;s real location: still with the parcel, collected at the door, or paid out
                        to you. Filter by courier to see what each one still owes.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-12">
                    <div className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-3 lg:p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                            <div role="tablist" className="flex rounded-full bg-white p-1 ring-1 ring-[#E4E6DF]">
                                {(["All", ...couriers] as const).map((c) => (
                                    <button key={c} role="tab" aria-selected={courier === c} onClick={() => setCourier(c)} className={cn("relative rounded-full px-3 py-1 text-[10px] font-medium lg:text-[12px]", courier === c ? "text-white" : "text-[#5C6058] hover:text-[#171717]")}>
                                        {courier === c && <motion.span layoutId="courier-pill" className="absolute inset-0 rounded-full bg-[#171717]" transition={{ duration: 0.2, ease }} />}
                                        <span className="relative">{c}</span>
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-[#8A8E84] lg:text-[12px]">{rows.length} orders · this week</p>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
                            {[
                                { l: "With the courier", v: rs(inTransit), sub: "dispatched, not yet delivered" },
                                { l: "Collected at the door", v: rs(collected), sub: "delivered, awaiting remittance", hot: true },
                                { l: "Paid out to you", v: rs(remitted), sub: "remitted & matched" },
                                { l: "Returned (RTO)", v: String(returned), sub: "parcels back, restocked" },
                            ].map((s) => (
                                <div key={s.l} className={cn("rounded-xl p-3 lg:p-4", s.hot ? "text-white" : "bg-white")} style={s.hot ? { background: ACCENT } : undefined}>
                                    <p className={cn("text-[9px] lg:text-[11px]", s.hot ? "text-white/70" : "text-[#8A8E84]")}>{s.l}</p>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.p key={s.v} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }} className="mt-0.5 text-[18px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[24px]">
                                            {s.v}
                                        </motion.p>
                                    </AnimatePresence>
                                    <p className={cn("text-[8.5px] lg:text-[10px]", s.hot ? "text-white/70" : "text-[#8A8E84]")}>{s.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 overflow-x-auto rounded-xl bg-white">
                            <table className="w-full min-w-[560px] border-collapse text-[10.5px] lg:text-[12.5px]">
                                <thead>
                                    <tr className="border-b border-[#EEF0EA] text-left text-[#8A8E84]">
                                        {["Order", "Customer", "City", "Courier", "COD amount", "Stage"].map((h) => (
                                            <th key={h} className="px-3 py-2.5 font-medium lg:px-4">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence initial={false}>
                                        {rows.map((o) => (
                                            <motion.tr key={o.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="border-b border-[#EEF0EA] last:border-b-0">
                                                <td className="px-3 py-2.5 font-medium lg:px-4">#{o.id}</td>
                                                <td className="px-3 py-2.5 lg:px-4">{o.customer}</td>
                                                <td className="px-3 py-2.5 text-[#5C6058] lg:px-4">{o.city}</td>
                                                <td className="px-3 py-2.5 lg:px-4">{o.courier}</td>
                                                <td className="px-3 py-2.5 tabular-nums lg:px-4">{rs(o.amount)}</td>
                                                <td className="px-3 py-2.5 lg:px-4">
                                                    <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold lg:text-[10px]", stageStyle[o.stage])}>{o.stage}</span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Comparison ------------------------------------------------------------ */

type Cell = "yes" | "no" | "partial"
const compareRows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "COD selected by default at checkout", s: "yes", sh: "partial", w: "partial" },
    { row: "Phone-first, 4-field checkout", s: "yes", sh: "no", w: "no" },
    { row: "Order confirmation step before dispatch", s: "yes", sh: "no", w: "no" },
    { row: "Book TCS / Leopards / M&P from the order", s: "yes", sh: "no", w: "no" },
    { row: "Tracking number saved & sent automatically", s: "yes", sh: "partial", w: "partial" },
    { row: "Returns (RTO) recorded, stock restored", s: "yes", sh: "no", w: "partial" },
    { row: "Remittance matched to orders", s: "yes", sh: "no", w: "no" },
    { row: "No apps or plugins required for any of this", s: "yes", sh: "no", w: "no" },
]

function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function CODComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">COD on Seltrax vs Elsewhere</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Cash on Delivery</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">Seltrax</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">Shopify</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">WooCommerce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {compareRows.map((r) => (
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
    { q: "Which couriers can I book from Seltrax?", a: `${couriers.join(", ")} today — booked from the order in one click, with the consignment number saved on the order and sent to the customer. Ask us if you use a courier that isn't listed.` },
    { q: "Can I charge a COD fee or a delivery fee?", a: "Yes. Set a flat fee or a per-city fee for cash on delivery and for delivery itself. Both are shown at checkout and itemised on the order." },
    { q: "How do I stop fake orders?", a: "Turn on the confirmation step: orders wait as New until the customer confirms by call or by tapping the link in their SMS/WhatsApp. Repeat refusers are flagged on their profile so you can decline or confirm harder. Unconfirmed orders can auto-cancel after a set time." },
    { q: "How does reconciliation work?", a: "Each order carries its cash status — with the courier, collected, remitted. When a courier pays out, the remittance is matched to the delivered orders it covers, and anything still outstanding per courier is shown on the board. Export to CSV for your accountant." },
    { q: "What about orders paid online?", a: "COD is the default, not the only option. Online payment methods can be enabled alongside it, and the same order board tracks both." },
]

export function CODFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Cash on Delivery</span>
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
                            Start taking COD orders <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <Package className="h-3.5 w-3.5" /> Book a demo
                        </a>
                        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">
                            <RotateCcw className="h-3.5 w-3.5" /> Replay the order journey
                        </button>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
