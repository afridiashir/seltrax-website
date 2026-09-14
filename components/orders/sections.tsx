"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowUpRight,
    Ban,
    Bell,
    Check,
    CheckCheck,
    ClipboardList,
    Download,
    Filter,
    History,
    Layers,
    MessageSquare,
    Minus,
    Package,
    PackageCheck,
    PackageX,
    Phone,
    Printer,
    RotateCcw,
    Search,
    Smartphone,
    StickyNote,
    Tag,
    Truck,
    UserRound,
    Users,
    Workflow,
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

/* ---- Hero ------------------------------------------------------------------ */

export function OrdersHero() {
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
                <Container className="pb-10 pt-10 text-center lg:pb-14 lg:pt-16">
                    <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <ClipboardList className="h-3 w-3" style={{ color: ACCENT }} />
                        Orders
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[860px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Every Order,
                        <br />
                        <Serif>One Clear Inbox</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[580px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        New, confirmed, dispatched, delivered, returned — every order sits in the stage it&apos;s actually in, with
                        the customer, the courier, the cash and the history on one screen. Work through a day&apos;s orders in
                        minutes, not a spreadsheet afternoon.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href="#inbox" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Try the inbox
                        </a>
                    </motion.div>
                    <motion.ul {...float(0.2)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] text-[#5C6058] lg:text-[12px]">
                        {["Stages that match COD reality", "Bulk confirm, dispatch, print", "Full history on every order", "Same inbox in the mobile app"].map((t) => (
                            <li key={t} className="inline-flex items-center gap-1">
                                <Check className="h-3 w-3" style={{ color: ACCENT }} /> {t}
                            </li>
                        ))}
                    </motion.ul>
                </Container>
            </div>
        </section>
    )
}

/* ---- Interactive inbox ---------------------------------------------------- */

type Stage = "New" | "Confirmed" | "Dispatched" | "Delivered" | "Returned" | "Cancelled"
const stageOrder: Stage[] = ["New", "Confirmed", "Dispatched", "Delivered", "Returned", "Cancelled"]
const stageStyle: Record<Stage, string> = {
    New: "bg-[#FFF4E5] text-[#B25E09]",
    Confirmed: "bg-[#E8F0FF] text-[#1D5FCC]",
    Dispatched: "bg-[#F3F4F0] text-[#3A3D37]",
    Delivered: "bg-[#E6F4EC] text-[#0F7A44]",
    Returned: "bg-[#FDECEC] text-[#B42318]",
    Cancelled: "bg-[#F3F4F0] text-[#8A8E84]",
}

type Event = { t: string; label: string }
type Order = {
    id: string
    customer: string
    phone: string
    city: string
    items: string
    amount: number
    stage: Stage
    placed: string
    courier?: string
    tag?: string
    repeat: number
    refusals: number
    history: Event[]
}

const seed: Order[] = [
    { id: "1042", customer: "Ayesha Shahbaz", phone: "0321 •••• 543", city: "Lahore", items: "Cotton Kurta — Navy · M", amount: 2450, stage: "New", placed: "10:42", repeat: 3, refusals: 0, history: [{ t: "10:42", label: "Order placed · COD" }] },
    { id: "1041", customer: "Usman Tariq", phone: "0300 •••• 118", city: "Multan", items: "Leather Wallet × 2", amount: 5700, stage: "New", placed: "10:15", tag: "High value", repeat: 0, refusals: 0, history: [{ t: "10:15", label: "Order placed · COD" }] },
    { id: "1040", customer: "Omar Farooq", phone: "0333 •••• 902", city: "Peshawar", items: "Lawn 3-piece — Sage", amount: 1500, stage: "New", placed: "09:58", tag: "Flagged", repeat: 1, refusals: 2, history: [{ t: "09:58", label: "Order placed · COD" }, { t: "09:58", label: "Flagged: 2 previous refusals" }] },
    { id: "1039", customer: "Sana Malik", phone: "0345 •••• 207", city: "Lahore", items: "Silk Dupatta — Rose", amount: 1800, stage: "Confirmed", placed: "Yesterday", repeat: 2, refusals: 0, history: [{ t: "Yest. 18:10", label: "Order placed · COD" }, { t: "Yest. 18:31", label: "Confirmed by customer (WhatsApp)" }] },
    { id: "1038", customer: "Bilal Ahmed", phone: "0312 •••• 664", city: "Islamabad", items: "Sneakers — White · 42", amount: 2950, stage: "Confirmed", placed: "Yesterday", repeat: 0, refusals: 0, history: [{ t: "Yest. 15:02", label: "Order placed · COD" }, { t: "Yest. 16:40", label: "Confirmed by call" }] },
    { id: "1037", customer: "Hamza Iqbal", phone: "0301 •••• 330", city: "Karachi", items: "Kurta — Olive · L", amount: 4200, stage: "Dispatched", placed: "Mon", courier: "TCS", repeat: 4, refusals: 0, history: [{ t: "Mon 11:20", label: "Order placed · COD" }, { t: "Mon 11:45", label: "Confirmed by customer (SMS)" }, { t: "Mon 16:40", label: "Booked with TCS" }] },
    { id: "1036", customer: "Zainab Raza", phone: "0322 •••• 781", city: "Karachi", items: "Perfume 50ml — Oud", amount: 3200, stage: "Delivered", placed: "Sun", courier: "Leopards", repeat: 1, refusals: 0, history: [{ t: "Sun 13:05", label: "Order placed · COD" }, { t: "Sun 13:30", label: "Confirmed" }, { t: "Sun 17:00", label: "Booked with Leopards" }, { t: "Tue 12:48", label: "Delivered · Rs 3,200 collected" }] },
    { id: "1035", customer: "Mariam Khan", phone: "0336 •••• 415", city: "Faisalabad", items: "Abaya — Black · M", amount: 2450, stage: "Returned", placed: "Sat", courier: "M&P", repeat: 0, refusals: 1, history: [{ t: "Sat 20:14", label: "Order placed · COD" }, { t: "Sat 21:02", label: "Confirmed" }, { t: "Sun 10:30", label: "Booked with M&P" }, { t: "Tue 15:10", label: "Refused at door · returned" }, { t: "Wed 09:00", label: "Restocked" }] },
]

const rs = (n: number) => `Rs ${n.toLocaleString("en-PK")}`

export function OrdersInbox() {
    const [orders, setOrders] = React.useState<Order[]>(seed)
    const [tab, setTab] = React.useState<Stage | "All">("New")
    const [q, setQ] = React.useState("")
    const [sel, setSel] = React.useState<Set<string>>(new Set())
    const [open, setOpen] = React.useState<string>("1042")
    const [toast, setToast] = React.useState<string | null>(null)

    const counts = React.useMemo(() => {
        const c: Record<string, number> = { All: orders.length }
        stageOrder.forEach((s) => (c[s] = orders.filter((o) => o.stage === s).length))
        return c
    }, [orders])

    const rows = orders.filter((o) => (tab === "All" || o.stage === tab) && (!q || `${o.id} ${o.customer} ${o.city} ${o.phone}`.toLowerCase().includes(q.toLowerCase())))
    const active = orders.find((o) => o.id === open) ?? null

    const flash = (m: string) => {
        setToast(m)
        window.setTimeout(() => setToast(null), 2200)
    }
    const move = (ids: string[], to: Stage, label: string) => {
        const now = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
        setOrders((x) =>
            x.map((o) =>
                ids.includes(o.id) && o.stage !== to
                    ? { ...o, stage: to, courier: to === "Dispatched" ? o.courier ?? "Leopards" : o.courier, history: [...o.history, { t: now, label }] }
                    : o,
            ),
        )
        setSel(new Set())
        flash(`${ids.length} order${ids.length === 1 ? "" : "s"} → ${to}`)
    }
    const toggle = (id: string) =>
        setSel((s) => {
            const n = new Set(s)
            if (n.has(id)) n.delete(id)
            else n.add(id)
            return n
        })
    const allOn = rows.length > 0 && rows.every((r) => sel.has(r.id))
    const toggleAll = () => setSel(allOn ? new Set() : new Set(rows.map((r) => r.id)))
    const selected = [...sel]
    const reset = () => {
        setOrders(seed)
        setSel(new Set())
        setTab("New")
        setOpen("1042")
        setQ("")
    }

    return (
        <Container>
            <section id="inbox" className="scroll-mt-6 pb-6 pt-8 lg:pt-12">
                <Reveal>
                    <div className={`relative overflow-hidden rounded-2xl border border-[#E4E6DF] bg-white ${shadow}`}>
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF0EA] px-4 py-3">
                            <div className="flex items-center gap-2">
                                <p className="text-[13px] font-semibold lg:text-[15px]">Orders</p>
                                <span className="rounded-full bg-[#F3F4F0] px-2 py-0.5 text-[10px] text-[#5C6058]">{orders.length}</span>
                            </div>
                            <div className="flex flex-1 items-center justify-end gap-2">
                                <label className="flex w-full max-w-[260px] items-center gap-1.5 rounded-full border border-[#E4E6DF] px-3 py-1.5">
                                    <Search className="h-3.5 w-3.5 text-[#8A8E84]" />
                                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, name, city, phone" className="w-full bg-transparent text-[11px] outline-none placeholder:text-[#B5B9B0] lg:text-[12px]" />
                                </label>
                                <button type="button" onClick={reset} className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#D9DCD3] px-2.5 py-1.5 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0]">
                                    <RotateCcw className="h-3 w-3" /> Reset
                                </button>
                            </div>
                        </div>

                        {/* Stage tabs */}
                        <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-[#EEF0EA] px-3 py-2">
                            {(["All", ...stageOrder] as const).map((s) => (
                                <button
                                    key={s}
                                    role="tab"
                                    aria-selected={tab === s}
                                    onClick={() => {
                                        setTab(s)
                                        setSel(new Set())
                                    }}
                                    className={cn("relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium lg:text-[12px]", tab === s ? "text-white" : "text-[#5C6058] hover:bg-[#F3F4F0]")}
                                >
                                    {tab === s && <motion.span layoutId="orders-tab" className="absolute inset-0 rounded-full bg-[#171717]" transition={{ duration: 0.2, ease }} />}
                                    <span className="relative">{s}</span>
                                    <span className={cn("relative rounded-full px-1.5 text-[9px] tabular-nums", tab === s ? "bg-white/20" : "bg-[#F3F4F0]")}>{counts[s]}</span>
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px]">
                            {/* List */}
                            <div className="min-w-0 border-[#EEF0EA] md:border-r">
                                <AnimatePresence>
                                    {selected.length > 0 && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease }} className="overflow-hidden">
                                            <div className="flex flex-wrap items-center gap-2 bg-[#171717] px-4 py-2 text-white">
                                                <span className="text-[11px] font-medium">{selected.length} selected</span>
                                                <span className="mx-1 h-4 w-px bg-white/20" />
                                                <button type="button" onClick={() => move(selected, "Confirmed", "Confirmed (bulk)")} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium hover:bg-white/20"><CheckCheck className="h-3 w-3" /> Confirm</button>
                                                <button type="button" onClick={() => move(selected, "Dispatched", "Booked with Leopards (bulk)")} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium hover:bg-white/20"><Truck className="h-3 w-3" /> Dispatch</button>
                                                <button type="button" onClick={() => flash(`${selected.length} invoices sent to print`)} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium hover:bg-white/20"><Printer className="h-3 w-3" /> Print</button>
                                                <button type="button" onClick={() => move(selected, "Cancelled", "Cancelled (bulk)")} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium hover:bg-white/20"><Ban className="h-3 w-3" /> Cancel</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-center gap-3 border-b border-[#EEF0EA] px-4 py-2 text-[10px] text-[#8A8E84] lg:text-[11px]">
                                    <input type="checkbox" aria-label="Select all" checked={allOn} onChange={toggleAll} className="h-3.5 w-3.5 accent-[#171717]" />
                                    <span className="w-12">Order</span>
                                    <span className="flex-1">Customer</span>
                                    <span className="hidden w-20 text-right sm:block">Total</span>
                                    <span className="w-20 text-right">Stage</span>
                                </div>

                                <ul className="max-h-[420px] min-h-[300px] overflow-y-auto">
                                    <AnimatePresence initial={false}>
                                        {rows.length === 0 && (
                                            <motion.li key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-14 text-center text-[11px] text-[#8A8E84]">
                                                No orders here. {tab === "New" ? "Everything's been confirmed." : "Try another stage."}
                                            </motion.li>
                                        )}
                                        {rows.map((o) => (
                                            <motion.li
                                                key={o.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -12 }}
                                                transition={{ duration: 0.2, ease }}
                                                onClick={() => setOpen(o.id)}
                                                className={cn("flex cursor-pointer items-center gap-3 border-b border-[#EEF0EA] px-4 py-2.5 text-[11px] transition-colors lg:text-[12px]", open === o.id ? "bg-[#F6F7F3]" : "hover:bg-[#FAFBF8]")}
                                            >
                                                <input type="checkbox" aria-label={`Select order ${o.id}`} checked={sel.has(o.id)} onClick={(e) => e.stopPropagation()} onChange={() => toggle(o.id)} className="h-3.5 w-3.5 accent-[#171717]" />
                                                <span className="w-12 font-medium">#{o.id}</span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="truncate font-medium">{o.customer}</span>
                                                        {o.tag && <span className={cn("shrink-0 rounded px-1 py-px text-[8.5px] font-semibold", o.tag === "Flagged" ? "bg-[#FDECEC] text-[#B42318]" : "bg-[#E8F0FF] text-[#1D5FCC]")}>{o.tag}</span>}
                                                    </span>
                                                    <span className="block truncate text-[10px] text-[#8A8E84] lg:text-[11px]">{o.city} · {o.placed}</span>
                                                </span>
                                                <span className="hidden w-20 text-right tabular-nums sm:block">{rs(o.amount)}</span>
                                                <span className="w-20 text-right">
                                                    <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold lg:text-[10px]", stageStyle[o.stage])}>{o.stage}</span>
                                                </span>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            </div>

                            {/* Detail */}
                            <div className="border-t border-[#EEF0EA] md:border-t-0">
                                <AnimatePresence mode="wait" initial={false}>
                                    {active ? (
                                        <motion.div key={active.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.2, ease }} className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-[14px] font-semibold lg:text-[16px]">Order #{active.id}</p>
                                                    <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Placed {active.placed} · Cash on Delivery</p>
                                                </div>
                                                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", stageStyle[active.stage])}>{active.stage}</span>
                                            </div>

                                            <div className="mt-3 rounded-xl bg-[#F6F7F3] p-3 text-[11px] lg:text-[12px]">
                                                <div className="flex items-center gap-2">
                                                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-[#E4E6DF]"><UserRound className="h-3.5 w-3.5" /></span>
                                                    <div className="leading-tight">
                                                        <p className="font-semibold">{active.customer}</p>
                                                        <p className="text-[10px] text-[#8A8E84]">{active.phone} · {active.city}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-1.5 text-[9.5px] lg:text-[10px]">
                                                    <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-[#E4E6DF]">{active.repeat} previous orders</span>
                                                    <span className={cn("rounded-full px-2 py-0.5", active.refusals > 0 ? "bg-[#FDECEC] text-[#B42318]" : "bg-white ring-1 ring-[#E4E6DF]")}>{active.refusals} refusals</span>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between rounded-xl border border-[#EEF0EA] px-3 py-2 text-[11px] lg:text-[12px]">
                                                <span className="truncate">{active.items}</span>
                                                <span className="shrink-0 font-semibold tabular-nums">{rs(active.amount)}</span>
                                            </div>
                                            {active.courier && (
                                                <p className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-[#5C6058] lg:text-[11px]"><Truck className="h-3 w-3" /> {active.courier}</p>
                                            )}

                                            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">History</p>
                                            <ol className="mt-2 space-y-2">
                                                {active.history.map((h, i) => (
                                                    <li key={i} className="flex gap-2.5 text-[10.5px] lg:text-[11.5px]">
                                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: i === active.history.length - 1 ? ACCENT : "#D5D8CF" }} />
                                                        <span className="flex-1">{h.label}</span>
                                                        <span className="shrink-0 text-[#8A8E84]">{h.t}</span>
                                                    </li>
                                                ))}
                                            </ol>

                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {active.stage === "New" && (
                                                    <>
                                                        <button type="button" onClick={() => move([active.id], "Confirmed", "Confirmed by call")} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-3 py-1.5 text-[10.5px] font-medium text-white hover:bg-black"><Phone className="h-3 w-3" /> Confirm</button>
                                                        <button type="button" onClick={() => move([active.id], "Cancelled", "Cancelled — not confirmed")} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10.5px] font-medium hover:bg-[#F3F4F0]"><Ban className="h-3 w-3" /> Cancel</button>
                                                    </>
                                                )}
                                                {active.stage === "Confirmed" && (
                                                    <button type="button" onClick={() => move([active.id], "Dispatched", "Booked with Leopards")} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-3 py-1.5 text-[10.5px] font-medium text-white hover:bg-black"><Truck className="h-3 w-3" /> Dispatch</button>
                                                )}
                                                {active.stage === "Dispatched" && (
                                                    <>
                                                        <button type="button" onClick={() => move([active.id], "Delivered", `Delivered · ${rs(active.amount)} collected`)} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-3 py-1.5 text-[10.5px] font-medium text-white hover:bg-black"><PackageCheck className="h-3 w-3" /> Mark delivered</button>
                                                        <button type="button" onClick={() => move([active.id], "Returned", "Refused at door · returned")} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10.5px] font-medium hover:bg-[#F3F4F0]"><PackageX className="h-3 w-3" /> Returned</button>
                                                    </>
                                                )}
                                                <button type="button" onClick={() => flash(`Note added to #${active.id}`)} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10.5px] font-medium hover:bg-[#F3F4F0]"><StickyNote className="h-3 w-3" /> Note</button>
                                                <button type="button" onClick={() => flash(`WhatsApp opened for ${active.customer}`)} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-3 py-1.5 text-[10.5px] font-medium hover:bg-[#F3F4F0]"><MessageSquare className="h-3 w-3" /> Message</button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <p className="p-6 text-center text-[11px] text-[#8A8E84]">Select an order to see its details.</p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <AnimatePresence>
                            {toast && (
                                <motion.div key={toast} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#171717] px-3.5 py-1.5 text-[11px] font-medium text-white shadow-lg">
                                    {toast}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">Click an order to open it, tick several for bulk actions, or move one through its stages from the detail panel.</p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Stages ------------------------------------------------------------------ */

const stageInfo: { stage: Stage; icon: React.ElementType; desc: string; next: string }[] = [
    { stage: "New", icon: Bell, desc: "Just placed. Waiting for the customer to confirm — the step that stops fake COD orders shipping.", next: "Confirm or cancel" },
    { stage: "Confirmed", icon: CheckCheck, desc: "Verified by call, SMS or WhatsApp. Ready to pack and book.", next: "Dispatch" },
    { stage: "Dispatched", icon: Truck, desc: "Booked with the courier. Consignment number and tracking on the order.", next: "Courier updates it" },
    { stage: "Delivered", icon: PackageCheck, desc: "Handed over and cash collected. Waiting for the courier's remittance.", next: "Remittance matched" },
    { stage: "Returned", icon: PackageX, desc: "Refused or undeliverable. Item restocked, customer's refusal count goes up.", next: "Restocked" },
    { stage: "Cancelled", icon: Ban, desc: "Cancelled before dispatch — by you, the customer, or auto-cancel after no confirmation.", next: "Closed" },
]

export function Stages() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Stages that match reality</Serif>
                        <span className="block font-semibold">Where Every Order Actually Is</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        &ldquo;Paid&rdquo; and &ldquo;fulfilled&rdquo; don&apos;t describe a cash-on-delivery order. These stages do — and each one tells you exactly what needs doing next.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {stageInfo.map((s, i) => (
                        <Reveal key={s.stage} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5">
                                <div className="flex items-center justify-between">
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><s.icon className="h-4 w-4" /></span>
                                    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", stageStyle[s.stage])}>{s.stage}</span>
                                </div>
                                <p className="mt-4 text-[11px] leading-relaxed text-[#3A3D37] lg:text-[13px]">{s.desc}</p>
                                <p className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-[#5C6058] lg:text-[11px]">
                                    Next <ArrowUpRight className="h-3 w-3" /> {s.next}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- In depth ---------------------------------------------------------------- */

type Detail = { icon: React.ElementType; kicker: string; title: string; intro: string; specs: { k: string; v: string }[] }
const details: Detail[] = [
    {
        icon: ClipboardList, kicker: "The order record", title: "Everything about an order, on the order",
        intro: "No switching between a courier portal, WhatsApp and a spreadsheet. The order holds the whole story.",
        specs: [
            { k: "Customer", v: "Name · phone · city · address" },
            { k: "Items", v: "Variant, quantity, price, SKU" },
            { k: "Totals", v: "Subtotal · delivery · COD fee · discount" },
            { k: "Courier", v: "Courier, consignment no., tracking" },
            { k: "Cash", v: "Collected · pending · remitted" },
            { k: "History", v: "Every change, who made it, when" },
            { k: "Notes", v: "Internal notes & customer note" },
            { k: "Tags", v: "Your own, plus automatic flags" },
        ],
    },
    {
        icon: Users, kicker: "Customer context", title: "Know who you're shipping to",
        intro: "Every order shows the customer's track record, so a first-time buyer, a loyal regular and a repeat refuser don't look the same.",
        specs: [
            { k: "Past orders", v: "Count and lifetime value" },
            { k: "Refusals", v: "Returned-at-door count, flagged" },
            { k: "Last address", v: "Pre-filled on their next checkout" },
            { k: "Contact", v: "Call or WhatsApp from the order" },
            { k: "Duplicates", v: "Same phone, same items, same day flagged" },
        ],
    },
    {
        icon: Layers, kicker: "Bulk actions", title: "Work the day's orders in batches",
        intro: "Tick twenty orders and do the same thing to all of them — the difference between an hour and five minutes.",
        specs: [
            { k: "Confirm", v: "Selected orders → Confirmed" },
            { k: "Dispatch", v: "Book with a courier in one go" },
            { k: "Print", v: "Invoices, packing slips, labels" },
            { k: "Tag", v: "Add or remove tags" },
            { k: "Cancel", v: "With a reason recorded" },
            { k: "Export", v: "Selected orders to CSV" },
        ],
    },
    {
        icon: Workflow, kicker: "Automation", title: "Rules that do the routine for you",
        intro: "Set the rule once. Orders that match are tagged, routed or chased without anyone clicking.",
        specs: [
            { k: "Auto-tag", v: "High value, first order, flagged number" },
            { k: "Auto-cancel", v: "Unconfirmed after N hours" },
            { k: "Reminders", v: "Confirmation nudge by SMS / WhatsApp" },
            { k: "Routing", v: "Courier by city, weight or value" },
            { k: "Alerts", v: "Stuck, attempted, refused parcels" },
        ],
    },
    {
        icon: Filter, kicker: "Views & search", title: "Find any order in seconds",
        intro: "Search by anything you'd remember about an order, and save the filters you use every day as views.",
        specs: [
            { k: "Search", v: "Order no. · name · phone · city · consignment" },
            { k: "Filters", v: "Stage · courier · city · date · tag · value" },
            { k: "Saved views", v: "e.g. 'Karachi, confirmed, today'" },
            { k: "Sort", v: "Newest · value · city · stage age" },
            { k: "Export", v: "CSV of any view" },
        ],
    },
    {
        icon: Smartphone, kicker: "Team & mobile", title: "Everyone sees what they need",
        intro: "Packers see what to pack, the owner sees the money, and nobody shares a login. The same inbox is in the mobile app.",
        specs: [
            { k: "Staff roles", v: "Per-person permissions" },
            { k: "Restrict", v: "Hide totals from packers, e.g." },
            { k: "Audit", v: "Every action attributed to a person" },
            { k: "Notifications", v: "New order, confirmation, delivery" },
            { k: "Mobile app", v: "Full inbox and actions on Android" },
        ],
    },
]

export function OrdersDetails() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">In depth</Serif>
                        <span className="block font-semibold">How Order Management Works</span>
                    </h2>
                </Reveal>
                <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
                    {details.map((d, i) => (
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

/* ---- A day in the inbox -------------------------------------------------- */

const day = [
    { t: "09:00", icon: Zap, title: "Overnight orders are waiting in New", desc: "Flagged numbers and duplicates already tagged. Confirmation reminders went out at 8." },
    { t: "09:20", icon: CheckCheck, title: "Confirm the batch", desc: "Most confirmed themselves from the WhatsApp link. Call the rest from the order." },
    { t: "10:00", icon: Truck, title: "Dispatch confirmed orders", desc: "Select all Confirmed, book with the courier your rules picked, print labels." },
    { t: "10:30", icon: Package, title: "Pack & hand over", desc: "Packing slips list items and notes. The rider picks up the whole batch." },
    { t: "Afternoon", icon: Bell, title: "Handle exceptions only", desc: "An attempted delivery alert — call the customer before tomorrow's retry." },
    { t: "Friday", icon: Download, title: "Reconcile and export", desc: "Remittance matched to delivered orders. Export the week for the accountant." },
]

export function DayInInbox() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">A day in the inbox</Serif>
                        <span className="block font-semibold">Orders Done Before Lunch</span>
                    </h2>
                </Reveal>
                <Reveal className="mx-auto mt-10 max-w-[760px] lg:mt-14">
                    <ol className="relative">
                        <span className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-[2px] bg-[#EEF0EA]" />
                        {day.map((d, i) => (
                            <motion.li key={d.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.06, ease }} className="relative flex gap-4 pb-6 last:pb-0">
                                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#171717] text-white"><d.icon className="h-4 w-4" /></span>
                                <div className="pt-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: ACCENT }}>{d.t}</p>
                                    <p className="mt-0.5 text-[14px] font-semibold lg:text-[16px]">{d.title}</p>
                                    <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{d.desc}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Spec sheet + comparison -------------------------------------------- */

const sheet = [
    ["Stages", "New · Confirmed · Dispatched · Delivered · Returned · Cancelled"],
    ["Order record", "Customer, items, totals, courier, cash status, notes, tags, history"],
    ["Customer context", "Past orders, lifetime value, refusal count"],
    ["Bulk actions", "Confirm · dispatch · print · tag · cancel · export"],
    ["Printing", "Invoices, packing slips, courier labels"],
    ["Search", "Order no., name, phone, city, consignment no."],
    ["Filters & views", "Stage, courier, city, date, tag, value; saved views"],
    ["Automation", "Auto-tag, auto-cancel, reminders, courier routing"],
    ["Duplicate detection", "Same phone + items within a day"],
    ["History", "Every change with person and time"],
    ["Staff", "Per-person roles and permissions"],
    ["Notifications", "New order, confirmation, delivery, exceptions"],
    ["Export", "CSV of any view or selection"],
    ["Mobile", "Full inbox in the Android app"],
]

export function OrdersSpec() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Spec sheet</Serif>
                        <span className="block font-semibold">Orders, Itemised</span>
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
    { row: "Stages built for COD (confirm, returned, remitted)", s: "yes", sh: "no", w: "partial" },
    { row: "Confirmation step before dispatch", s: "yes", sh: "no", w: "no" },
    { row: "Customer refusal count on every order", s: "yes", sh: "no", w: "no" },
    { row: "Bulk confirm & bulk courier booking", s: "yes", sh: "partial", w: "partial" },
    { row: "Courier & cash status on the order", s: "yes", sh: "partial", w: "partial" },
    { row: "Duplicate / fake order flags", s: "yes", sh: "partial", w: "no" },
    { row: "Per-person staff permissions", s: "yes", sh: "yes", w: "partial" },
    { row: "No apps or plugins needed for any of this", s: "yes", sh: "no", w: "no" },
]
function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function OrdersComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">Orders on Seltrax vs Elsewhere</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Order management</th>
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
    { q: "Can I edit an order after it's placed?", a: "Yes, until it's dispatched — change items, quantities, address or phone, add a discount or a delivery fee. Every edit is recorded in the order's history with who made it." },
    { q: "Can my packing staff see orders without seeing revenue?", a: "Yes. Staff accounts have their own permissions, so you can let someone confirm, pack and dispatch orders without seeing totals or reports." },
    { q: "What happens to a returned order?", a: "It moves to Returned, the items go back into stock, and the customer's refusal count goes up — so their next order is flagged before you ship it." },
    { q: "Can I create an order manually, e.g. from a WhatsApp chat?", a: "Yes. Create an order from the dashboard or the mobile app, pick the products, enter the customer — it then flows through the same stages as a website order." },
    { q: "Can I export orders?", a: "Any view or selection exports to CSV, with the courier, consignment number and cash status included." },
]

export function OrdersFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Orders</span>
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
                            Start taking orders <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link href="/courier-dispatch" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <Truck className="h-3.5 w-3.5" /> Courier dispatch
                        </Link>
                        <Link href="/cash-on-delivery" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <History className="h-3.5 w-3.5" /> Cash on Delivery
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">
                            <Tag className="h-3.5 w-3.5" /> Book a demo
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
