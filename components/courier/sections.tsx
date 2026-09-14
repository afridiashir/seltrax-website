"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    AlertTriangle,
    ArrowUpRight,
    Bell,
    Boxes,
    Check,
    ClipboardList,
    FileText,
    Landmark,
    MapPin,
    Minus,
    Package,
    PackageCheck,
    Printer,
    RotateCcw,
    Route,
    Scale,
    Truck,
    Warehouse,
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

type Courier = "TCS" | "Leopards" | "M&P"
const couriers: Courier[] = ["TCS", "Leopards", "M&P"]
const prefix: Record<Courier, string> = { TCS: "TCS", Leopards: "LEP", "M&P": "MNP" }

/* ---- Hero + dispatch console ------------------------------------------ */

export function CourierHero() {
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
                <Container className="grid grid-cols-1 items-center gap-10 pb-12 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-8 lg:pb-20 lg:pt-16">
                    <div className="text-center md:text-left">
                        <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                            <Truck className="h-3 w-3" style={{ color: ACCENT }} />
                            Courier dispatch
                        </motion.span>
                        <motion.h1 {...float(0.05)} className="mt-4 text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[48px] lg:text-[60px]">
                            A Day&apos;s Orders,
                            <br />
                            <Serif>Dispatched Before Lunch</Serif>
                        </motion.h1>
                        <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[440px] text-[12px] leading-relaxed text-[#3A3D37] md:mx-0 lg:text-[15px]">
                            No courier portals, no copy-pasting addresses, no spreadsheets of tracking numbers. Tick the orders,
                            pick TCS, Leopards or M&amp;P, book them in one go, print the labels — and every consignment number
                            lands back on its order automatically.
                        </motion.p>
                        <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                                Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <a href="#tracking" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                                See tracking
                            </a>
                        </motion.div>
                        <motion.ul {...float(0.2)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] text-[#5C6058] md:justify-start lg:text-[12px]">
                            {["Book from the order, or in bulk", "Labels with COD amount", "Tracking saved & sent", "Pickup requested for you"].map((t) => (
                                <li key={t} className="inline-flex items-center gap-1">
                                    <Check className="h-3 w-3" style={{ color: ACCENT }} /> {t}
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                    <motion.div {...float(0.2)}>
                        <DispatchConsole />
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

type Order = { id: string; customer: string; city: string; amount: number; weight: string; booked?: { courier: Courier; cn: string } }
const seed: Order[] = [
    { id: "0036", customer: "Hamza Iqbal", city: "Karachi", amount: 4200, weight: "0.5 kg" },
    { id: "0037", customer: "Sana Malik", city: "Lahore", amount: 1800, weight: "0.3 kg" },
    { id: "0038", customer: "Bilal Ahmed", city: "Islamabad", amount: 2950, weight: "1.2 kg" },
    { id: "0039", customer: "Mariam Khan", city: "Faisalabad", amount: 2450, weight: "0.4 kg" },
    { id: "0040", customer: "Usman Tariq", city: "Multan", amount: 5700, weight: "2.1 kg" },
]
const consignment = (c: Courier, id: string) => `${prefix[c]}-${(parseInt(id, 10) * 7919 + 100000).toString().slice(0, 6)}-${id}`

function DispatchConsole() {
    const [orders, setOrders] = React.useState<Order[]>(seed)
    const [sel, setSel] = React.useState<Set<string>>(new Set(seed.slice(0, 3).map((o) => o.id)))
    const [courier, setCourier] = React.useState<Courier>("Leopards")
    const [booking, setBooking] = React.useState(false)
    const [labels, setLabels] = React.useState(0)
    const pending = orders.filter((o) => !o.booked)
    const chosen = pending.filter((o) => sel.has(o.id))

    const toggle = (id: string) =>
        setSel((s) => {
            const n = new Set(s)
            if (n.has(id)) n.delete(id)
            else n.add(id)
            return n
        })
    const book = () => {
        if (!chosen.length || booking) return
        setBooking(true)
        chosen.forEach((o, i) => {
            window.setTimeout(() => {
                setOrders((x) => x.map((y) => (y.id === o.id ? { ...y, booked: { courier, cn: consignment(courier, o.id) } } : y)))
                setSel((s) => { const n = new Set(s); n.delete(o.id); return n })
                if (i === chosen.length - 1) setBooking(false)
            }, 350 + i * 320)
        })
    }
    const reset = () => { setOrders(seed); setSel(new Set(seed.slice(0, 3).map((o) => o.id))); setLabels(0) }
    const bookedCount = orders.filter((o) => o.booked).length

    return (
        <div className={`mx-auto w-full max-w-[560px] rounded-2xl bg-white p-4 lg:p-5 ${shadow}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-semibold lg:text-[13px]">Confirmed orders · ready to dispatch</p>
                <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-2.5 py-1 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0]">
                    <RotateCcw className="h-3 w-3" /> Reset
                </button>
            </div>

            <ul className="mt-3 divide-y divide-[#EEF0EA] rounded-xl border border-[#EEF0EA]">
                {orders.map((o) => (
                    <li key={o.id} className="flex items-center gap-2.5 px-3 py-2 text-[10px] lg:text-[12px]">
                        <input type="checkbox" aria-label={`Select order ${o.id}`} checked={!o.booked && sel.has(o.id)} disabled={!!o.booked} onChange={() => toggle(o.id)} className="h-3.5 w-3.5 accent-[#171717]" />
                        <span className="w-10 font-medium">#{o.id}</span>
                        <span className="min-w-0 flex-1 truncate">{o.customer} <span className="text-[#8A8E84]">· {o.city} · {o.weight}</span></span>
                        <span className="hidden tabular-nums sm:inline">Rs {o.amount.toLocaleString()}</span>
                        <span className="w-[118px] text-right lg:w-[150px]">
                            <AnimatePresence mode="wait" initial={false}>
                                {o.booked ? (
                                    <motion.span key="b" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-1 rounded-full bg-[#E6F4EC] px-2 py-0.5 text-[9px] font-semibold text-[#0F7A44] lg:text-[10px]">
                                        <Check className="h-2.5 w-2.5" /> {o.booked.cn}
                                    </motion.span>
                                ) : (
                                    <motion.span key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-full bg-[#F3F4F0] px-2 py-0.5 text-[9px] font-medium text-[#5C6058] lg:text-[10px]">
                                        Confirmed
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <div role="radiogroup" aria-label="Courier" className="flex rounded-full bg-[#F3F4F0] p-0.5">
                    {couriers.map((c) => (
                        <button key={c} type="button" role="radio" aria-checked={courier === c} onClick={() => setCourier(c)} className={cn("rounded-full px-3 py-1 text-[10px] font-medium lg:text-[11px]", courier === c ? "bg-white text-[#171717] shadow-sm" : "text-[#8A8E84] hover:text-[#171717]")}>
                            {c}
                        </button>
                    ))}
                </div>
                <button type="button" onClick={book} disabled={!chosen.length || booking} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3.5 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-40 lg:text-[11px]">
                    <Truck className="h-3 w-3" /> {booking ? "Booking…" : `Book ${chosen.length} with ${courier}`}
                </button>
                <button type="button" onClick={() => setLabels(bookedCount)} disabled={!bookedCount} className="inline-flex items-center gap-1.5 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0] disabled:cursor-not-allowed disabled:opacity-40 lg:text-[11px]">
                    <Printer className="h-3 w-3" /> Print {bookedCount || ""} labels
                </button>
            </div>
            <AnimatePresence>
                {labels > 0 && (
                    <motion.p key="l" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2.5 rounded-lg bg-[#F6F7F3] px-3 py-2 text-[10px] text-[#3A3D37] lg:text-[11px]">
                        <span className="font-semibold">{labels} labels sent to print</span> — address, phone, COD amount and consignment barcode on each. Pickup requested for today.
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

/* ---- Couriers ------------------------------------------------------------ */

const courierCards: { name: Courier; blurb: string; points: string[] }[] = [
    { name: "TCS", blurb: "Nationwide coverage, strong in the big cities.", points: ["Booking & label from the order", "COD amount on the consignment", "Scan-by-scan tracking", "Pickup requests"] },
    { name: "Leopards", blurb: "Wide network, popular for COD e-commerce.", points: ["Booking & label from the order", "COD amount on the consignment", "Scan-by-scan tracking", "Pickup requests"] },
    { name: "M&P", blurb: "Long-standing courier with deep domestic reach.", points: ["Booking & label from the order", "COD amount on the consignment", "Scan-by-scan tracking", "Pickup requests"] },
]

export function Couriers() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Integrated, not linked to</Serif>
                        <span className="block font-semibold">The Couriers Pakistan Ships With</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Add your courier account once. From then on booking, labels, tracking and the COD amount all flow between
                        Seltrax and the courier without you touching their portal.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6">
                    {courierCards.map((c, i) => (
                        <Reveal key={c.name} delay={i * 0.08}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-6 lg:p-7">
                                <span className="inline-flex h-10 items-center rounded-lg bg-[#171717] px-3 text-[14px] font-bold tracking-tight text-white lg:text-[16px]">{c.name}</span>
                                <p className="mt-4 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{c.blurb}</p>
                                <ul className="mt-4 space-y-1.5">
                                    {c.points.map((p) => (
                                        <li key={p} className="flex items-start gap-2 text-[10.5px] text-[#3A3D37] lg:text-[12.5px]">
                                            <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: ACCENT }} /> {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-4">
                    <p className="text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        Use a different courier? <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">Tell us</a> — integrations are added on request.
                    </p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- The dispatch flow ---------------------------------------------------- */

type Stage = { icon: React.ElementType; kicker: string; title: string; intro: string; specs: { k: string; v: string }[] }
const flow: Stage[] = [
    {
        icon: ClipboardList, kicker: "1 · Queue", title: "Only confirmed orders reach dispatch",
        intro: "Dispatch works from the Confirmed queue, so nothing unverified gets booked and paid for twice on its way back.",
        specs: [
            { k: "Source", v: "Confirmed orders only" },
            { k: "Filters", v: "City · courier · weight · date" },
            { k: "Select", v: "One, several, or the whole day" },
            { k: "Weight", v: "From product weights, editable" },
            { k: "Packer view", v: "Pick list with order notes" },
        ],
    },
    {
        icon: Route, kicker: "2 · Choose courier", title: "Per order, or by rule",
        intro: "Pick the courier per order, or let rules do it — by city, by weight, by COD amount — and only step in for exceptions.",
        specs: [
            { k: "Manual", v: "Per order or per selection" },
            { k: "Rules", v: "City → courier · weight > X → courier" },
            { k: "Default", v: "Store-wide fallback courier" },
            { k: "Coverage", v: "Cities a courier can't serve are flagged" },
            { k: "Override", v: "Change courier before booking" },
        ],
    },
    {
        icon: Truck, kicker: "3 · Book", title: "One click, single or bulk",
        intro: "Booking sends the order to the courier's system and brings the consignment number straight back onto the order.",
        specs: [
            { k: "Bulk", v: "Book a whole selection at once" },
            { k: "Consignment no.", v: "Saved on the order automatically" },
            { k: "COD amount", v: "Sent with the booking" },
            { k: "Failures", v: "Shown per order, retry in place" },
            { k: "Status", v: "Confirmed → Dispatched" },
            { k: "Customer", v: "Tracking link by SMS / WhatsApp" },
        ],
    },
    {
        icon: Printer, kicker: "4 · Labels & pickup", title: "Print, stick, hand over",
        intro: "Labels come out in one batch with everything the courier needs; the pickup is requested for you.",
        specs: [
            { k: "Formats", v: "Thermal 4×6 · A4 (4 per sheet)" },
            { k: "On the label", v: "Address · phone · COD · barcode · order no." },
            { k: "Manifest", v: "Printable handover sheet per courier" },
            { k: "Pickup", v: "Requested at booking, or drop-off" },
            { k: "Reprint", v: "Any label, any time" },
        ],
    },
    {
        icon: MapPin, kicker: "5 · Track", title: "Every parcel, one screen",
        intro: "Courier scans update the order automatically. You see all parcels by stage; the customer sees theirs.",
        specs: [
            { k: "Updates", v: "Automatic, from courier scans" },
            { k: "Stages", v: "Booked · Picked · In transit · Out for delivery · Delivered" },
            { k: "Exceptions", v: "Attempted · Refused · Returned" },
            { k: "Alerts", v: "Stuck > 48h, attempted, refused" },
            { k: "Customer", v: "Live tracking page" },
        ],
    },
    {
        icon: Landmark, kicker: "6 · Close", title: "Delivered, returned, and paid",
        intro: "Delivered orders move to collection and remittance; returned ones restock and get flagged. The dispatch cost is recorded on each.",
        specs: [
            { k: "Delivered", v: "→ COD collected, awaiting remittance" },
            { k: "Returned", v: "→ Restocked, customer flagged" },
            { k: "Charges", v: "Delivery & COD fee per order" },
            { k: "Remittance", v: "Matched to orders" },
            { k: "Reports", v: "Delivery time & RTO by courier / city" },
        ],
    },
]

export function DispatchFlow() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The dispatch flow</Serif>
                        <span className="block font-semibold">From Confirmed to Delivered</span>
                    </h2>
                </Reveal>
                <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
                    {flow.map((d, i) => (
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

/* ---- Label preview -------------------------------------------------------- */

export function LabelPreview() {
    const [fmt, setFmt] = React.useState<"thermal" | "a4">("thermal")
    const [courier, setCourier] = React.useState<Courier>("TCS")
    const bars = React.useMemo(() => Array.from({ length: 46 }, (_, i) => ((i * 37) % 7) + 1), [])

    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">What the courier gets</Serif>
                        <span className="block font-semibold">The Label</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[520px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Everything a rider needs on one sticker, in the format your printer takes — and the COD amount printed large so it&apos;s collected right.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
                        <div className="space-y-4 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-4">
                            <div>
                                <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Format</p>
                                <div className="mt-1.5 flex rounded-md bg-white p-0.5 ring-1 ring-[#E4E6DF]">
                                    {([["thermal", "Thermal 4×6"], ["a4", "A4 sheet"]] as const).map(([v, l]) => (
                                        <button key={v} type="button" aria-pressed={fmt === v} onClick={() => setFmt(v)} className={cn("flex-1 rounded px-2 py-1 text-[10px] font-medium", fmt === v ? "bg-[#171717] text-white" : "text-[#8A8E84] hover:text-[#171717]")}>{l}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Courier</p>
                                <div className="mt-1.5 flex rounded-md bg-white p-0.5 ring-1 ring-[#E4E6DF]">
                                    {couriers.map((c) => (
                                        <button key={c} type="button" aria-pressed={courier === c} onClick={() => setCourier(c)} className={cn("flex-1 rounded px-2 py-1 text-[10px] font-medium", courier === c ? "bg-[#171717] text-white" : "text-[#8A8E84] hover:text-[#171717]")}>{c}</button>
                                    ))}
                                </div>
                            </div>
                            <ul className="space-y-1.5 text-[10px] text-[#3A3D37] lg:text-[11.5px]">
                                {["Consignment barcode", "COD amount, large", "Customer name, phone, address", "Your store name & return address", "Order number & weight"].map((t) => (
                                    <li key={t} className="flex items-start gap-2"><Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: ACCENT }} /> {t}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-6 lg:p-10">
                            <motion.div layout transition={{ duration: 0.35, ease }} className={cn("grid gap-3", fmt === "a4" ? "w-full max-w-[520px] grid-cols-2 rounded-md bg-white p-3 shadow-sm" : "w-full max-w-[340px]")}>
                                {Array.from({ length: fmt === "a4" ? 4 : 1 }).map((_, i) => (
                                    <motion.div key={i} layout className="border-2 border-[#171717] bg-white p-3 text-[#171717] lg:p-4" style={{ aspectRatio: "4 / 6" }}>
                                        <div className="flex items-start justify-between border-b-2 border-[#171717] pb-2">
                                            <span className="text-[13px] font-black tracking-tight lg:text-[16px]">{courier}</span>
                                            <span className="text-right text-[7px] leading-tight lg:text-[8px]">Apna Store<br />Lahore · 0300 1234567</span>
                                        </div>
                                        <div className="mt-2 flex items-end justify-between">
                                            <div className="text-[7px] lg:text-[8px]">
                                                <p className="text-[#5C6058]">CASH ON DELIVERY</p>
                                                <p className="text-[18px] font-black leading-none lg:text-[24px]">Rs 2,450</p>
                                            </div>
                                            <div className="text-right text-[7px] lg:text-[8px]"><p>Order #0037</p><p>0.3 kg</p></div>
                                        </div>
                                        <div className="mt-2 border-t border-dashed border-[#171717] pt-2 text-[7.5px] leading-snug lg:text-[9px]">
                                            <p className="font-bold">Sana Malik</p>
                                            <p>House 12, Street 4, Gulberg III</p>
                                            <p>Lahore · 0321 9876543</p>
                                        </div>
                                        <div className="mt-2 flex h-9 items-end gap-[1.5px] lg:h-12">
                                            {bars.map((b, k) => <div key={k} className="bg-[#171717]" style={{ width: b > 4 ? 3 : 1.5, height: "100%" }} />)}
                                        </div>
                                        <p className="mt-1 text-center text-[7px] tracking-[0.2em] lg:text-[8px]">{consignment(courier, "0037")}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Tracking timeline (interactive) ------------------------------------ */

const scans = [
    { icon: Truck, label: "Booked", detail: "Consignment created · label printed", time: "Mon 10:12" },
    { icon: Warehouse, label: "Picked up", detail: "Collected from Apna Store, Lahore", time: "Mon 16:40" },
    { icon: Route, label: "In transit", detail: "Departed Lahore hub → Karachi", time: "Mon 22:05" },
    { icon: Boxes, label: "At delivery hub", detail: "Arrived Karachi · Gulshan branch", time: "Tue 07:30" },
    { icon: MapPin, label: "Out for delivery", detail: "Rider assigned · customer notified", time: "Tue 09:15" },
    { icon: PackageCheck, label: "Delivered", detail: "Rs 4,200 collected · signed by customer", time: "Tue 12:48" },
]

export function Tracking() {
    const [step, setStep] = React.useState(2)
    const [attempted, setAttempted] = React.useState(false)
    const advance = () => { setStep((s) => Math.min(s + 1, scans.length - 1)); if (step >= 4) setAttempted(false) }
    const attempt = () => { setStep(4); setAttempted(true) }
    const reset = () => { setStep(0); setAttempted(false) }

    return (
        <Container>
            <section id="tracking" className="scroll-mt-6 pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Scan by scan</Serif>
                        <span className="block font-semibold">Tracking That Talks Back</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[540px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Courier scans land on the order as they happen. When something goes wrong — an attempted delivery, a refusal — you hear about it while a phone call can still save the sale.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-4 md:grid-cols-[minmax(0,1fr)_260px] lg:gap-6 lg:p-6">
                        <div className="rounded-xl bg-white p-4 lg:p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="text-[10px] lg:text-[12px]">
                                    <p className="font-semibold">Order #0036 · Hamza Iqbal · Karachi</p>
                                    <p className="text-[#8A8E84]">TCS · {consignment("TCS", "0036")} · COD Rs 4,200</p>
                                </div>
                                <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold lg:text-[10px]", attempted ? "bg-[#FFF4E5] text-[#B25E09]" : step === scans.length - 1 ? "bg-[#E6F4EC] text-[#0F7A44]" : "bg-[#E8F0FF] text-[#1D5FCC]")}>
                                    {attempted ? "Attempted" : scans[step].label}
                                </span>
                            </div>
                            <ol className="mt-4 space-y-0">
                                {scans.map((s, i) => {
                                    const done = i <= step
                                    const isAttempt = attempted && i === 4
                                    return (
                                        <li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
                                            {i < scans.length - 1 && <span className={cn("absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-[2px]", i < step ? "bg-[#171717]" : "bg-[#EEF0EA]")} />}
                                            <span className={cn("relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full", isAttempt ? "bg-[#B25E09] text-white" : done ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#8A8E84]")} style={done && i === step && !isAttempt ? { background: ACCENT } : undefined}>
                                                {isAttempt ? <AlertTriangle className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
                                            </span>
                                            <div className={cn("min-w-0 flex-1 text-[10px] lg:text-[12px]", !done && "opacity-40")}>
                                                <div className="flex items-baseline justify-between gap-2">
                                                    <p className="font-semibold">{isAttempt ? "Attempted delivery" : s.label}</p>
                                                    <p className="shrink-0 text-[#8A8E84]">{done ? s.time : "—"}</p>
                                                </div>
                                                <p className="text-[#6B6F66]">{isAttempt ? "Customer not reachable · rider will retry tomorrow" : s.detail}</p>
                                                {isAttempt && (
                                                    <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-[#FFF4E5] px-2 py-1 text-[9px] font-medium text-[#B25E09] lg:text-[10px]">
                                                        <Bell className="h-3 w-3" /> Alert sent to you · call the customer before the retry
                                                    </motion.p>
                                                )}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
                        <div className="space-y-2 self-start">
                            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Simulate</p>
                            <button type="button" onClick={advance} disabled={step === scans.length - 1 && !attempted} className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-left text-[11px] font-medium ring-1 ring-[#E4E6DF] transition-colors hover:bg-[#F3F4F0] disabled:opacity-40 lg:text-[12px]">
                                <Package className="h-4 w-4 text-[#5C6058]" /> Next courier scan
                            </button>
                            <button type="button" onClick={attempt} className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-left text-[11px] font-medium ring-1 ring-[#E4E6DF] transition-colors hover:bg-[#F3F4F0] lg:text-[12px]">
                                <AlertTriangle className="h-4 w-4 text-[#B25E09]" /> Attempted delivery
                            </button>
                            <button type="button" onClick={reset} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[11px] font-medium text-[#5C6058] hover:text-[#171717] lg:text-[12px]">
                                <RotateCcw className="h-4 w-4" /> Reset
                            </button>
                            <p className="px-1 pt-2 text-[9.5px] leading-relaxed text-[#8A8E84] lg:text-[10.5px]">The customer sees the same timeline on their tracking page, minus the internal notes.</p>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Spec sheet + comparison ---------------------------------------------- */

const sheet = [
    ["Couriers", "TCS · Leopards · M&P (more on request)"],
    ["Booking", "Per order, or bulk from the Confirmed queue"],
    ["Routing rules", "By city, weight, COD amount, with a default courier"],
    ["Consignment number", "Saved on the order, sent to the customer automatically"],
    ["COD amount", "Sent with the booking, printed on the label"],
    ["Label formats", "Thermal 4×6 · A4, 4 per sheet"],
    ["Manifest", "Per courier, per day"],
    ["Pickup", "Requested at booking"],
    ["Tracking updates", "Automatic, from courier scans"],
    ["Exception alerts", "Attempted · refused · stuck > 48h"],
    ["Customer tracking page", "Live, linked from SMS / WhatsApp"],
    ["Returns (RTO)", "Recorded, restocked, customer flagged"],
    ["Charges", "Delivery & COD fee recorded per order"],
    ["Reports", "Delivery time & RTO rate by courier and city"],
]

export function DispatchSpec() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Spec sheet</Serif>
                        <span className="block font-semibold">Dispatch, Itemised</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-hidden rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full border-collapse text-[11px] lg:text-[13px]">
                            <tbody>
                                {sheet.map(([k, v], i) => (
                                    <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#F6F7F3]"}>
                                        <th scope="row" className="w-1/2 px-4 py-3 text-left font-medium text-[#5C6058] lg:px-6">{k}</th>
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
const compareRows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "Book TCS / Leopards / M&P from the order", s: "yes", sh: "no", w: "no" },
    { row: "Bulk-book a whole day's orders", s: "yes", sh: "no", w: "partial" },
    { row: "Consignment number back on the order automatically", s: "yes", sh: "partial", w: "partial" },
    { row: "COD amount sent with the booking", s: "yes", sh: "no", w: "partial" },
    { row: "Labels & manifest without a courier portal", s: "yes", sh: "no", w: "partial" },
    { row: "Tracking updated from courier scans", s: "yes", sh: "partial", w: "partial" },
    { row: "Attempted / refused alerts", s: "yes", sh: "no", w: "no" },
    { row: "No apps or plugins to buy for any of this", s: "yes", sh: "no", w: "no" },
]
function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function DispatchComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">Dispatch on Seltrax vs Elsewhere</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Courier dispatch</th>
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
    { q: "Do I need an account with the courier?", a: "Yes — you keep your own TCS, Leopards or M&P account and your negotiated rates. You add the account to Seltrax once; from then on bookings go through it without you opening the courier's portal." },
    { q: "Can I use more than one courier?", a: "Yes. Book per order, or set rules so Karachi goes to one courier, parcels over 2 kg to another, and everything else to your default." },
    { q: "What if a booking fails?", a: "The failure shows on that order with the courier's reason — a city they don't serve, a missing phone number — and you fix it and retry in place. The rest of the batch isn't held up." },
    { q: "Where do the tracking numbers go?", a: "Onto the order automatically, and to the customer by SMS or WhatsApp with a link to a live tracking page. You never type one." },
    { q: "How do I know a parcel is stuck?", a: "Attempted deliveries, refusals and parcels with no scan for 48 hours raise an alert on the order and in the mobile app, so you can call the customer before the courier returns it." },
]

export function DispatchFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Courier Dispatch</span>
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
                            Start dispatching <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link href="/cash-on-delivery" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <Scale className="h-3.5 w-3.5" /> How COD reconciliation works
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">
                            <FileText className="h-3.5 w-3.5" /> Book a demo
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
