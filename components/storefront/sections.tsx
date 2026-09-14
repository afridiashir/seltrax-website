"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowUpRight,
    Check,
    CreditCard,
    Gauge,
    ImageIcon,
    LayoutPanelTop,
    Minus,
    Search,
    Smartphone,
    Wifi,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { TiltCard } from "@/components/home/tilt-card"
import { ACCENT, Container, Reveal, Serif, h2Class } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* ---- Hero -------------------------------------------------------------- */

export function StorefrontHero() {
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
                <Container className="grid grid-cols-1 items-center gap-10 pb-10 pt-10 md:grid-cols-2 md:gap-8 lg:pb-16 lg:pt-16">
                    <div className="text-center md:text-left">
                        <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                            <Smartphone className="h-3 w-3" style={{ color: ACCENT }} />
                            Mobile-first storefronts
                        </motion.span>
                        <motion.h1 {...float(0.05)} className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[48px] lg:text-[60px]">
                            Built for the Phone
                            <br />
                            <Serif>In Your Customer&apos;s Hand</Serif>
                        </motion.h1>
                        <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[440px] text-[12px] leading-relaxed text-[#3A3D37] md:mx-0 lg:text-[15px]">
                            Most of your buyers will never see your store on a desktop. Seltrax storefronts are designed
                            at 360px first, then scaled up — not the other way round. Here is exactly what that means.
                        </motion.p>
                        <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                                Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <a href="#spec-sheet" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                                Read the spec sheet
                            </a>
                        </motion.div>
                        <motion.ul {...float(0.2)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] text-[#5C6058] md:justify-start lg:text-[12px]">
                            {["360px-first layouts", "LCP under 2.5s on 4G", "44px tap targets", "One-thumb COD checkout"].map((t) => (
                                <li key={t} className="inline-flex items-center gap-1">
                                    <Check className="h-3 w-3" style={{ color: ACCENT }} /> {t}
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    <motion.div {...float(0.2)} className="mx-auto w-full max-w-[420px]">
                        <TiltCard spring={false} float={false} maxTilt={6}>
                            <Phone width={240} className="mx-auto lg:hidden" />
                            <Phone width={270} className="mx-auto hidden lg:block" />
                        </TiltCard>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* Storefront screenshots live in public/mobile-first-storefront (400×705 phone, 1046×800 tablet). */
const SHOT_PHONE = "/mobile-first-storefront/mobile.webp"
const SHOT_TABLET = "/mobile-first-storefront/tab.webp"

function Phone({ width, className, screenshot = SHOT_PHONE }: { width: number; className?: string; screenshot?: string }) {
    return (
        <div
            className={cn("relative overflow-hidden rounded-[32px] border-[6px] border-[#171717] bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]", className)}
            style={{ width }}
        >
            <div className="absolute left-1/2 top-1.5 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-[#171717]" />
            <div className="relative w-full" style={{ aspectRatio: "400 / 705" }}>
                <Image src={screenshot} alt="A Seltrax storefront on a phone" fill sizes={`${width}px`} className="object-cover object-top" />
            </div>
        </div>
    )
}

/* ---- Device simulator ------------------------------------------------- */

const devices = [
    { name: "Small phone", w: 360, note: "Budget Android — the width we design at first" },
    { name: "iPhone", w: 390, note: "iPhone 12–15 logical width" },
    { name: "Large phone", w: 430, note: "Plus / Max Android and iPhone" },
    { name: "Tablet", w: 768, note: "iPad portrait — the full product grid opens up" },
]

export function DeviceSimulator() {
    const [i, setI] = React.useState(0)
    const d = devices[i]
    const frame = Math.min(d.w, 430) // the phone frame caps at large-phone size; tablet shows in a wider frame below

    return (
        <Container>
            <section className="pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">One storefront,</Serif>
                        <span className="block font-semibold">Every Screen Width</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-[520px] text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        The layout is fluid between breakpoints, not just swapped at them. Pick a width to see the same store reflow.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-10">
                    <div role="tablist" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-[#F3F4F0] p-1">
                        {devices.map((x, k) => (
                            <button
                                key={x.name}
                                role="tab"
                                aria-selected={i === k}
                                onClick={() => setI(k)}
                                className={cn("relative rounded-full px-3 py-1.5 text-[11px] font-medium lg:px-4 lg:text-[13px]", i === k ? "text-[#171717]" : "text-[#8A8E84] hover:text-[#171717]")}
                            >
                                {i === k && <motion.span layoutId="device-pill" className="absolute inset-0 rounded-full bg-white shadow-sm" transition={{ duration: 0.25, ease }} />}
                                <span className="relative">
                                    {x.name} <span className="text-[#8A8E84]">· {x.w}px</span>
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="relative mt-8 overflow-hidden rounded-[26px] bg-[#C9D1D2]">
                        <Image src="/landing/mist.jpg" alt="" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-[center_45%]" />
                        <div className="absolute inset-0 bg-white/10" />
                        <div className="relative flex min-h-[520px] items-end justify-center px-4 pt-10 lg:min-h-[640px]">
                            <motion.div
                                key={d.w}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease }}
                                className="w-full"
                                style={{ maxWidth: d.w >= 768 ? 640 : frame * 0.72 }}
                            >
                                <div className="mx-auto overflow-hidden rounded-t-[26px] border-[6px] border-b-0 border-[#171717] bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)]">
                                    <div className="relative" style={{ aspectRatio: d.w >= 768 ? "1046 / 800" : "400 / 705" }}>
                                        <Image
                                            src={d.w >= 768 ? SHOT_TABLET : SHOT_PHONE}
                                            alt={d.w >= 768 ? "A Seltrax storefront on a tablet" : "A Seltrax storefront on a phone"}
                                            fill
                                            sizes="640px"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                            <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-medium backdrop-blur lg:text-[12px]">
                                {d.w}px · {d.note}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Detail sections --------------------------------------------------- */

type Detail = { icon: React.ElementType; kicker: string; title: string; intro: string; specs: { k: string; v: string }[] }

const details: Detail[] = [
    {
        icon: LayoutPanelTop,
        kicker: "Layout",
        title: "Designed at 360px, then scaled up",
        intro: "Every template starts as a single-column phone layout. Larger screens add columns; they never squeeze a desktop grid down.",
        specs: [
            { k: "Base breakpoint", v: "360px (single column)" },
            { k: "Breakpoints", v: "640 · 1024 · 1280px" },
            { k: "Product grid", v: "2 cols on phones, 3–4 from tablet" },
            { k: "Type scale", v: "Fluid 14–18px body, clamp() headings" },
            { k: "Tap targets", v: "≥ 44 × 44px, ≥ 8px apart" },
            { k: "Safe areas", v: "env(safe-area-inset-*) respected" },
            { k: "Sticky bar", v: "Add-to-cart pinned to the thumb zone" },
            { k: "Menus", v: "Bottom-sheet nav and filters, no hover states" },
        ],
    },
    {
        icon: Gauge,
        kicker: "Performance",
        title: "A load budget, not a hope",
        intro: "Storefronts ship with a fixed budget so a store on a mid-range Android on 4G opens before the customer's thumb leaves the screen.",
        specs: [
            { k: "LCP target", v: "< 2.5s on 4G, mid-range Android" },
            { k: "CLS target", v: "< 0.1 — every image has reserved space" },
            { k: "INP target", v: "< 200ms" },
            { k: "Critical CSS", v: "Inlined; the rest deferred" },
            { k: "JavaScript", v: "Deferred, split per page, no theme plugins" },
            { k: "Fonts", v: "Subset, preloaded, font-display: swap" },
            { k: "Caching", v: "Edge-cached HTML, immutable hashed assets" },
            { k: "Third parties", v: "Pixel / Analytics loaded after interaction" },
        ],
    },
    {
        icon: ImageIcon,
        kicker: "Images",
        title: "Product photos that don't cost the sale",
        intro: "Photos are the heaviest thing on any store page. Each one is resized, converted and lazy-loaded automatically when you upload it.",
        specs: [
            { k: "Formats", v: "AVIF / WebP with JPEG fallback" },
            { k: "Sizes", v: "srcset at 320 · 640 · 960 · 1280 · 1920w" },
            { k: "Loading", v: "Lazy below the fold, eager for the hero" },
            { k: "Placeholders", v: "Blurred preview while the full image loads" },
            { k: "Aspect ratios", v: "1:1 or 4:5 enforced, no layout shift" },
            { k: "Gallery", v: "Swipe with momentum, pinch-to-zoom" },
            { k: "Compression", v: "Quality 75–80, visually lossless" },
        ],
    },
    {
        icon: CreditCard,
        kicker: "Checkout",
        title: "One thumb, one screen, cash on delivery",
        intro: "The checkout is a single page built around how Pakistan buys: phone number first, COD selected by default, no account required.",
        specs: [
            { k: "Steps", v: "1 page — contact, address, confirm" },
            { k: "Fields", v: "Name · phone · city · address (4 fields)" },
            { k: "Keyboards", v: "inputmode=tel / numeric per field" },
            { k: "Autofill", v: "autocomplete attributes on every field" },
            { k: "Input size", v: "16px min — no iOS zoom on focus" },
            { k: "Payment", v: "COD default; other methods optional" },
            { k: "Account", v: "Guest checkout, no password" },
            { k: "Errors", v: "Inline, next to the field, before submit" },
        ],
    },
    {
        icon: Wifi,
        kicker: "Network",
        title: "Fine on 3G, fast on 4G",
        intro: "Pages are small and resilient, so a flaky connection slows the store down instead of breaking it.",
        specs: [
            { k: "Page weight", v: "< 500KB on first view, typical product page" },
            { k: "Requests", v: "< 30 on first view" },
            { k: "Compression", v: "Brotli for text, HTTP/2 multiplexing" },
            { k: "Forms", v: "Retry-safe; a double tap never double-orders" },
            { k: "Fallbacks", v: "Content renders before JS arrives" },
            { k: "Offline", v: "Cached shell and last-seen pages" },
        ],
    },
    {
        icon: Search,
        kicker: "Search & SEO",
        title: "Found on a phone, too",
        intro: "Google indexes the mobile version of your store. Every page is built so that version is the complete one.",
        specs: [
            { k: "Markup", v: "Semantic HTML, one H1 per page" },
            { k: "Structured data", v: "Product, Offer, BreadcrumbList, Organization" },
            { k: "Meta", v: "Canonical, Open Graph, Twitter cards per page" },
            { k: "Sitemap", v: "Generated automatically, robots.txt included" },
            { k: "Mobile-friendly", v: "Passes Google's mobile usability checks" },
            { k: "Accessibility", v: "Labels, focus order, contrast ≥ 4.5:1" },
        ],
    },
]

export function DetailSections() {
    return (
        <Container>
            <section className="pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The hard details</Serif>
                        <span className="block font-semibold">What Mobile-first Actually Means</span>
                    </h2>
                </Reveal>

                <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
                    {details.map((d, i) => (
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
                                            <dd className="text-right font-medium tabular-nums">{s.v}</dd>
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

/* ---- Spec sheet ----------------------------------------------------------- */

const sheet = [
    ["Design baseline", "360 × 640px viewport, single column"],
    ["Breakpoints", "sm 640px · md 1024px · lg 1280px"],
    ["Minimum tap target", "44 × 44px (48px on primary actions)"],
    ["Minimum body text", "14px; inputs 16px"],
    ["Line length", "45–75 characters on phones"],
    ["Largest Contentful Paint", "< 2.5s (4G, mid-range Android)"],
    ["Cumulative Layout Shift", "< 0.1"],
    ["Interaction to Next Paint", "< 200ms"],
    ["First-view page weight", "< 500KB, < 30 requests"],
    ["Image formats", "AVIF → WebP → JPEG fallback"],
    ["Image widths served", "320 / 640 / 960 / 1280 / 1920"],
    ["Checkout fields", "4 (name, phone, city, address)"],
    ["Checkout pages", "1"],
    ["Default payment", "Cash on Delivery"],
    ["Structured data", "Product · Offer · BreadcrumbList · Organization"],
    ["Colour contrast", "≥ 4.5:1 text, ≥ 3:1 UI"],
]

export function SpecSheet() {
    return (
        <Container>
            <section id="spec-sheet" className="scroll-mt-6 pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Spec sheet</Serif>
                        <span className="block font-semibold">The Numbers We Build To</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-hidden rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full border-collapse text-[11px] lg:text-[13px]">
                            <tbody>
                                {sheet.map(([k, v], i) => (
                                    <tr key={k} className={cn(i % 2 === 0 ? "bg-white" : "bg-[#F6F7F3]")}>
                                        <th scope="row" className="w-1/2 px-4 py-3 text-left font-medium text-[#5C6058] lg:px-6">
                                            {k}
                                        </th>
                                        <td className="px-4 py-3 font-medium tabular-nums lg:px-6">{v}</td>
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

/* ---- Mobile-first vs desktop-shrunk ------------------------------------- */

type Cell = "yes" | "no" | "partial"
const compare: { row: string; mf: Cell; shrunk: Cell }[] = [
    { row: "Single-column layout designed first", mf: "yes", shrunk: "no" },
    { row: "Thumb-zone add-to-cart", mf: "yes", shrunk: "no" },
    { row: "Images sized for the screen, not the desktop", mf: "yes", shrunk: "partial" },
    { row: "Hover-free navigation", mf: "yes", shrunk: "no" },
    { row: "Phone-first, COD-default checkout", mf: "yes", shrunk: "no" },
    { row: "Numeric keyboards on numeric fields", mf: "yes", shrunk: "partial" },
    { row: "Load budget enforced", mf: "yes", shrunk: "no" },
    { row: "Mobile version is the complete version", mf: "yes", shrunk: "partial" },
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

export function Comparison() {
    return (
        <Container>
            <section className="pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Mobile-first</Serif>
                        <span className="block font-semibold">vs a Desktop Site Shrunk Down</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[520px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">What the customer gets</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">Seltrax</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">Typical &ldquo;responsive&rdquo; theme</th>
                                </tr>
                            </thead>
                            <tbody>
                                {compare.map((r) => (
                                    <tr key={r.row} className="border-b border-[#EEF0EA] last:border-b-0">
                                        <td className="px-4 py-3 lg:px-6">{r.row}</td>
                                        <td className="px-4 py-3 text-center lg:px-6">
                                            <CellIcon v={r.mf} />
                                        </td>
                                        <td className="px-4 py-3 text-center lg:px-6">
                                            <CellIcon v={r.shrunk} />
                                        </td>
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
    { q: "Does mobile-first mean the desktop version is worse?", a: "No. Larger screens get more columns, wider galleries and side-by-side layouts. Starting from the phone just guarantees nothing important is hidden or squeezed on the screen most customers actually use." },
    { q: "Can I check my own store's speed?", a: "Yes — run your store URL through Google PageSpeed Insights and look at the Mobile tab. The targets on this page (LCP, CLS, INP) are the same ones it reports." },
    { q: "What happens to my product photos when I upload them?", a: "They are resized into several widths, converted to AVIF and WebP with a JPEG fallback, given a blurred placeholder, and served lazily below the fold. You upload one file; the store picks the right one per device." },
    { q: "Do I need to do anything to make my store mobile-friendly?", a: "No. Every design, every page and the checkout are mobile-first out of the box. Keep product photos at 1:1 or 4:5 and titles reasonably short, and the rest is handled." },
]

export function StorefrontFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-12 lg:pb-24 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Mobile-first</span>
                    </h2>
                </Reveal>
                <Reveal className="mx-auto mt-8 max-w-[760px] lg:mt-12">
                    <ul>
                        {faqs.map((f, i) => {
                            const on = open === i
                            return (
                                <li key={f.q} className={cn(i > 0 && "border-t border-[#EEF0EA]")}>
                                    <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex w-full items-start gap-3 py-3.5 text-left text-[12px] font-medium transition-colors hover:text-[#5C6058] lg:py-4 lg:text-[15px]">
                                        <span className="w-4 shrink-0 tabular-nums lg:w-6">{i + 1}.</span>
                                        <span className="flex-1">{f.q}</span>
                                        <span className="mt-0.5 text-[14px] leading-none text-[#8A8E84] transition-transform lg:text-[18px]" style={{ transform: on ? "rotate(45deg)" : "none" }}>
                                            +
                                        </span>
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
                            Create your store <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            Book a demo <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
