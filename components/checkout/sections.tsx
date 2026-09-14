"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowUpRight,
    Banknote,
    Check,
    CreditCard,
    Eye,
    EyeOff,
    Gauge,
    Keyboard,
    Languages,
    ListChecks,
    Lock,
    MapPin,
    Minus,
    Phone,
    Receipt,
    RotateCcw,
    ShieldCheck,
    Smartphone,
    Timer,
    UserRound,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Flag, Reveal, Serif, h2Class } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* ---- Field configurator ------------------------------------------------ */

type Mode = "required" | "optional" | "hidden"
type Field = { key: string; label: string; placeholder: string; mode: Mode; locked?: boolean; seconds: number; kind?: "tel" | "email" | "select" | "textarea" | "text" }

const defaults: Field[] = [
    { key: "name", label: "Full name", placeholder: "Ayesha Shahbaz", mode: "required", locked: true, seconds: 5, kind: "text" },
    { key: "phone", label: "Phone number", placeholder: "03XX XXXXXXX", mode: "required", locked: true, seconds: 6, kind: "tel" },
    { key: "city", label: "City", placeholder: "Lahore", mode: "required", seconds: 3, kind: "select" },
    { key: "address", label: "Address", placeholder: "House, street, area", mode: "required", seconds: 9, kind: "text" },
    { key: "email", label: "Email", placeholder: "you@example.com", mode: "optional", seconds: 7, kind: "email" },
    { key: "alt", label: "Alternate phone", placeholder: "03XX XXXXXXX", mode: "hidden", seconds: 6, kind: "tel" },
    { key: "postal", label: "Postal code", placeholder: "54000", mode: "hidden", seconds: 4, kind: "text" },
    { key: "landmark", label: "Nearby landmark", placeholder: "Opposite Al-Fatah", mode: "hidden", seconds: 6, kind: "text" },
    { key: "note", label: "Order note", placeholder: "Call before delivery", mode: "optional", seconds: 5, kind: "textarea" },
    { key: "whatsapp", label: "Order updates on WhatsApp", placeholder: "", mode: "optional", seconds: 1, kind: "text" },
]

const modeMeta: Record<Mode, { label: string; icon: React.ElementType }> = {
    required: { label: "Required", icon: Check },
    optional: { label: "Optional", icon: Minus },
    hidden: { label: "Hidden", icon: EyeOff },
}

export function CheckoutHero() {
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
                <Container className="pb-10 pt-10 text-center lg:pb-16 lg:pt-16">
                    <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <ShieldCheck className="h-3 w-3" style={{ color: ACCENT }} />
                        Checkout
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[820px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Frictionless
                        <br />
                        <Serif>Checkout</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[560px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        One page. A phone number and an address. Cash on delivery already selected. Everything else is a field
                        you decide to require, make optional, or hide — because every extra field on a phone screen is a
                        customer who doesn&apos;t finish.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href="#fields" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Configure the fields
                        </a>
                    </motion.div>
                    <motion.div {...float(0.2)} className="mx-auto mt-8 grid max-w-[640px] grid-cols-3 gap-3">
                        {[
                            ["1", "page, no steps"],
                            ["4", "fields by default"],
                            ["0", "accounts to create"],
                        ].map(([n, l]) => (
                            <div key={l}>
                                <Serif className="block text-[34px] leading-none lg:text-[44px]">{n}</Serif>
                                <p className="mt-1 text-[10px] text-[#5C6058] lg:text-[12px]">{l}</p>
                            </div>
                        ))}
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

export function FieldConfigurator() {
    const [fields, setFields] = React.useState<Field[]>(defaults)
    const setMode = (key: string, mode: Mode) => setFields((f) => f.map((x) => (x.key === key ? { ...x, mode } : x)))
    const reset = () => setFields(defaults)
    const visible = fields.filter((f) => f.mode !== "hidden")
    const required = fields.filter((f) => f.mode === "required")
    const seconds = visible.reduce((a, f) => a + (f.mode === "required" ? f.seconds : Math.round(f.seconds * 0.35)), 0) + 6 // + tap to place order

    return (
        <Container>
            <section id="fields" className="scroll-mt-6 pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Your checkout, your fields</Serif>
                        <span className="block font-semibold">Require It, Make It Optional, or Hide It</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-[560px] text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        Flip any field and watch the checkout change. Name and phone stay — a COD order can&apos;t be delivered without them.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-3 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 lg:p-5">
                        {/* Settings */}
                        <div className="rounded-xl bg-white p-3 lg:p-4">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Checkout fields</p>
                                <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-2.5 py-1 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0]">
                                    <RotateCcw className="h-3 w-3" /> Defaults
                                </button>
                            </div>
                            <ul className="mt-2 divide-y divide-[#EEF0EA]">
                                {fields.map((f) => (
                                    <li key={f.key} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                                        <div className="min-w-0">
                                            <p className="text-[12px] font-medium lg:text-[13px]">
                                                {f.label}
                                                {f.locked && <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-[#F3F4F0] px-1.5 py-0.5 text-[9px] font-medium text-[#8A8E84]"><Lock className="h-2.5 w-2.5" /> always</span>}
                                            </p>
                                        </div>
                                        <div role="radiogroup" aria-label={`${f.label} mode`} className="flex rounded-full bg-[#F3F4F0] p-0.5">
                                            {(Object.keys(modeMeta) as Mode[]).map((m) => {
                                                const on = f.mode === m
                                                const disabled = !!f.locked && m !== "required"
                                                const M = modeMeta[m]
                                                return (
                                                    <button key={m} type="button" role="radio" aria-checked={on} disabled={disabled} onClick={() => setMode(f.key, m)} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors lg:text-[11px]", on ? "bg-[#171717] text-white" : "text-[#8A8E84] hover:text-[#171717]", disabled && "cursor-not-allowed opacity-40 hover:text-[#8A8E84]")}>
                                                        <M.icon className="h-3 w-3" /> {M.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {[
                                    { l: "Fields shown", v: String(visible.length) },
                                    { l: "Required", v: String(required.length) },
                                    { l: "Est. time to order", v: `~${seconds}s`, hot: true },
                                ].map((s) => (
                                    <div key={s.l} className={cn("rounded-lg p-2.5 lg:p-3", s.hot ? "text-white" : "bg-[#F6F7F3]")} style={s.hot ? { background: ACCENT } : undefined}>
                                        <p className={cn("text-[9px] lg:text-[10px]", s.hot ? "text-white/70" : "text-[#8A8E84]")}>{s.l}</p>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.p key={s.v} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.18 }} className="text-[16px] font-semibold tabular-nums lg:text-[20px]">
                                                {s.v}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-2 px-1 text-[9.5px] leading-relaxed text-[#8A8E84] lg:text-[10.5px]">
                                Time estimate is illustrative — typical thumb-typing on a phone, with numeric keyboards for numbers and a picker for city.
                            </p>
                        </div>

                        {/* Live preview */}
                        <div className="flex justify-center rounded-xl bg-white p-4">
                            <div className="w-full max-w-[280px]">
                                <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Live preview</p>
                                <div className="overflow-hidden rounded-[26px] border-[5px] border-[#171717] bg-[#F8F9F6] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.45)]">
                                    <div className="mx-auto mt-1.5 h-3 w-12 rounded-full bg-[#171717]" />
                                    <div className="px-3 pb-4 pt-3">
                                        <div className="flex items-center justify-between text-[9px]">
                                            <span className="font-semibold">Checkout</span>
                                            <span className="inline-flex items-center gap-1 text-[#8A8E84]"><Lock className="h-2.5 w-2.5" /> Secure</span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between rounded-lg bg-white px-2.5 py-2 text-[9px] ring-1 ring-[#EEF0EA]">
                                            <span className="flex items-center gap-1.5"><span className="h-5 w-5 rounded bg-[#1F3A5F]" /> Cotton Kurta — Navy · M</span>
                                            <span className="font-semibold">Rs 2,450</span>
                                        </div>
                                        <motion.div layout className="mt-2 space-y-1.5">
                                            <AnimatePresence initial={false}>
                                                {visible.map((f) => (
                                                    <motion.div key={f.key} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease }} className="overflow-hidden">
                                                        {f.key === "whatsapp" ? (
                                                            <label className="flex items-center gap-2 px-0.5 py-1 text-[8.5px]">
                                                                <span className="grid h-3.5 w-3.5 place-items-center rounded border border-[#D9DCD3] bg-white"><Check className="h-2.5 w-2.5" style={{ color: ACCENT }} /></span>
                                                                Send order updates on WhatsApp <span className="text-[#8A8E84]">(optional)</span>
                                                            </label>
                                                        ) : (
                                                            <div className={cn("rounded-lg bg-white px-2.5 ring-1 ring-[#EEF0EA]", f.kind === "textarea" ? "py-2" : "py-1.5")}>
                                                                <p className="text-[7.5px] text-[#8A8E84]">
                                                                    {f.label} {f.mode === "optional" && <span>(optional)</span>}
                                                                </p>
                                                                <div className="flex items-center justify-between">
                                                                    <p className={cn("text-[9px]", f.kind === "textarea" && "pb-2")} style={{ color: "#B5B9B0" }}>{f.placeholder}</p>
                                                                    {f.kind === "tel" && <Keyboard className="h-2.5 w-2.5 text-[#B5B9B0]" />}
                                                                    {f.kind === "select" && <MapPin className="h-2.5 w-2.5 text-[#B5B9B0]" />}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </motion.div>
                                        <div className="mt-2 space-y-1">
                                            <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[8.5px] text-white" style={{ background: ACCENT }}>
                                                <span className="inline-flex items-center gap-1 font-medium"><Banknote className="h-3 w-3" /> Cash on Delivery</span>
                                                <span className="grid h-3 w-3 place-items-center rounded-full bg-white"><Check className="h-2 w-2" style={{ color: ACCENT }} /></span>
                                            </div>
                                            <div className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[8.5px] ring-1 ring-[#EEF0EA]">
                                                <span className="inline-flex items-center gap-1 text-[#5C6058]"><CreditCard className="h-3 w-3" /> Pay online</span>
                                                <span className="h-3 w-3 rounded-full border border-[#D9DCD3]" />
                                            </div>
                                        </div>
                                        <div className="mt-2 flex justify-between text-[8.5px] text-[#5C6058]"><span>Delivery</span><span>Rs 150</span></div>
                                        <div className="mt-0.5 flex justify-between text-[9px] font-semibold"><span>Total</span><span>Rs 2,600</span></div>
                                        <div className="mt-2 rounded-full bg-[#171717] py-2 text-center text-[9px] font-semibold text-white">Place order · Rs 2,600</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Why it's fast ------------------------------------------------------ */

const fast = [
    { icon: ListChecks, title: "One page, no steps", desc: "Contact, address, payment and the order summary on a single screen. No 'continue to shipping', no progress bar, no second load." },
    { icon: Phone, title: "Phone number first", desc: "The first thing we ask for is the one thing a COD delivery can't happen without. Everything else follows." },
    { icon: Keyboard, title: "The right keyboard, every time", desc: "Numeric keypads for phone and postcode, a city picker instead of free text, address fields that autofill." },
    { icon: UserRound, title: "Returning customers, remembered", desc: "Enter the phone number and the last address fills in. Two taps to reorder." },
    { icon: Banknote, title: "COD already selected", desc: "No payment decision to make. Online payment is there for those who want it, one tap away." },
    { icon: Receipt, title: "Fees shown before the tap", desc: "Delivery and COD charges appear in the total up front — no surprise on the confirmation, no refused parcel later." },
    { icon: Timer, title: "Fast on the slowest phone", desc: "Tiny page, no scripts from apps, inline errors — it works on a budget Android on 3G." },
    { icon: Languages, title: "Urdu or English", desc: "Labels and messages in the language your customers actually read." },
]

export function WhyFast() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Every second counts</Serif>
                        <span className="block font-semibold">Why It Converts</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        The checkout is where most stores lose the sale they already made. Ours is designed to be finished with one thumb, in under a minute, with nothing to think about.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {fast.map((f, i) => (
                        <Reveal key={f.title} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-colors hover:bg-[#F1F3EE]">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><f.icon className="h-4 w-4" /></span>
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

/* ---- Per-field controls --------------------------------------------------- */

const controls: { icon: React.ElementType; title: string; items: string[] }[] = [
    { icon: Eye, title: "Visibility", items: ["Required, optional or hidden — per field", "Name and phone always required (COD needs them)", "Add custom fields: text, dropdown, checkbox", "Show a field only for certain cities or products"] },
    { icon: ListChecks, title: "Order & labels", items: ["Reorder fields by drag", "Rename any label and placeholder", "Helper text under a field", "Group fields: Contact · Delivery · Notes"] },
    { icon: ShieldCheck, title: "Validation", items: ["Pakistani mobile format enforced", "City picker limited to courier coverage", "Minimum address length", "Inline errors before the tap, not after"] },
    { icon: Banknote, title: "Payment & fees", items: ["COD default, online optional — or online only", "COD fee flat or per city", "Delivery fee per city / weight / free above Rs X", "Fees itemised in the summary"] },
    { icon: Gauge, title: "Behaviour", items: ["Remember returning customers by phone", "Auto-fill city from phone prefix", "Minimum / maximum order value", "Quantity limits per product"] },
    { icon: Smartphone, title: "Confirmation", items: ["Thank-you page with order number", "SMS / WhatsApp confirmation", "One-tap 'confirm my order' link", "Tracking link once dispatched"] },
]

export function FieldControls() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Every field, every rule</Serif>
                        <span className="block font-semibold">What You Can Change</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {controls.map((c, i) => (
                        <Reveal key={c.title} delay={i * 0.04}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-white p-5 lg:p-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white"><c.icon className="h-4 w-4" /></span>
                                    <p className="text-[13px] font-semibold lg:text-[15px]">{c.title}</p>
                                </div>
                                <ul className="mt-3 space-y-1.5">
                                    {c.items.map((it) => (
                                        <li key={it} className="flex items-start gap-2 text-[10.5px] leading-snug text-[#3A3D37] lg:text-[12.5px]">
                                            <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: ACCENT }} /> {it}
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

/* ---- Spec sheet + comparison --------------------------------------------- */

const sheet = [
    ["Pages", "1"],
    ["Default fields", "Name · phone · city · address (4)"],
    ["Always required", "Name, phone"],
    ["Field modes", "Required · optional · hidden, per field"],
    ["Custom fields", "Text, dropdown, checkbox — unlimited"],
    ["Account", "Guest checkout; no password ever"],
    ["Phone input", "inputmode=tel, PK format validated"],
    ["City", "Picker, limited to courier coverage"],
    ["Autofill", "autocomplete attributes on every field"],
    ["Returning customers", "Recognised by phone; address pre-filled"],
    ["Default payment", "Cash on Delivery"],
    ["Online payment", "Optional, alongside COD"],
    ["Fees", "COD & delivery, flat or per city, shown in total"],
    ["Input size", "16px minimum — no zoom on focus"],
    ["Errors", "Inline, per field, before submit"],
    ["Confirmation", "Thank-you page + SMS / WhatsApp"],
    ["Languages", "English, Urdu"],
]

export function CheckoutSpec() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Spec sheet</Serif>
                        <span className="block font-semibold">The Checkout, Itemised</span>
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
const rows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "Single-page checkout", s: "yes", sh: "yes", w: "partial" },
    { row: "Require / optional / hide any field, no plugin", s: "yes", sh: "no", w: "partial" },
    { row: "Custom fields without an app", s: "yes", sh: "no", w: "no" },
    { row: "Phone-first, COD selected by default", s: "yes", sh: "no", w: "partial" },
    { row: "City picker tied to courier coverage", s: "yes", sh: "no", w: "no" },
    { row: "Returning customer recognised by phone", s: "yes", sh: "partial", w: "no" },
    { row: "COD / delivery fees per city, shown up front", s: "yes", sh: "partial", w: "partial" },
    { row: "Checkout edits available on every plan", s: "yes", sh: "no", w: "yes" },
]
function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function CheckoutComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">Checkout on Seltrax vs Elsewhere</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Checkout</th>
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
    { q: "Can I remove the email field completely?", a: "Yes — set it to Hidden and it's gone from the checkout. Name and phone are the only fields that can't be hidden, because a cash-on-delivery order can't be delivered without them." },
    { q: "Can I add my own fields?", a: "Yes. Add a text field, a dropdown or a checkbox — a delivery time slot, a gift message, a 'how did you hear about us' — and mark each one required or optional. They show on the order and in exports." },
    { q: "Do customers need an account?", a: "No. Checkout is guest-only by default. Returning customers are recognised by their phone number and their last address is pre-filled." },
    { q: "Can I turn on online payment?", a: "Yes, alongside COD or instead of it. COD stays selected by default unless you change that." },
    { q: "Can I charge different delivery fees by city?", a: "Yes. Set a flat fee, per-city fees, free delivery above an order value, or a separate COD fee — all shown in the total before the customer places the order." },
]

export function CheckoutFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About the Checkout</span>
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
                            Set up your checkout <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link href="/cash-on-delivery" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <Flag code="pk" size={14} /> How COD works after the order
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">
                            Book a demo <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
