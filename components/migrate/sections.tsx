"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowLeftRight,
    ArrowRight,
    ArrowUpRight,
    Check,
    CircleDashed,
    FileText,
    Globe,
    Image as ImageIcon,
    Link2,
    ListChecks,
    Loader2,
    Minus,
    Package,
    Percent,
    RotateCcw,
    Search,
    ShieldCheck,
    ShoppingBag,
    Tags,
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

type Platform = "Shopify" | "WooCommerce"

/* ---- Hero ------------------------------------------------------------------ */

export function MigrateHero() {
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
                        <ArrowLeftRight className="h-3 w-3" style={{ color: ACCENT }} />
                        Migrate to Seltrax
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[900px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Switch Platforms.
                        <br />
                        <Serif>Keep Everything.</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[600px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        Moving from Shopify or WooCommerce shouldn&apos;t mean starting over. Bring your products, images, variants,
                        customers, orders and SEO across — keep selling on your old store while it imports, and switch your
                        domain when you&apos;re ready. Most sellers switch without losing a day of sales.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start your migration <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            We&apos;ll do it with you
                        </a>
                    </motion.div>
                    <motion.div {...float(0.2)} className="mx-auto mt-8 flex max-w-[520px] items-center justify-center gap-3 text-[12px] font-semibold lg:text-[14px]">
                        <span className="rounded-full bg-white px-3.5 py-1.5 ring-1 ring-[#E4E6DF]">Shopify</span>
                        <span className="rounded-full bg-white px-3.5 py-1.5 ring-1 ring-[#E4E6DF]">WooCommerce</span>
                        <ArrowRight className="h-4 w-4 text-[#5C6058]" />
                        <span className="rounded-full px-3.5 py-1.5 text-white" style={{ background: ACCENT }}>Seltrax</span>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- Migration wizard ---------------------------------------------------- */

type ItemKey = "products" | "images" | "collections" | "customers" | "orders" | "discounts" | "pages" | "redirects"
const itemsMeta: { key: ItemKey; label: string; icon: React.ElementType; counts: Record<Platform, number>; unit: string }[] = [
    { key: "products", label: "Products & variants", icon: Package, counts: { Shopify: 248, WooCommerce: 312 }, unit: "products" },
    { key: "images", label: "Product images", icon: ImageIcon, counts: { Shopify: 1136, WooCommerce: 1420 }, unit: "images" },
    { key: "collections", label: "Collections / categories", icon: Tags, counts: { Shopify: 18, WooCommerce: 24 }, unit: "collections" },
    { key: "customers", label: "Customers", icon: Users, counts: { Shopify: 3480, WooCommerce: 2915 }, unit: "customers" },
    { key: "orders", label: "Order history", icon: ShoppingBag, counts: { Shopify: 6210, WooCommerce: 5040 }, unit: "orders" },
    { key: "discounts", label: "Discount codes", icon: Percent, counts: { Shopify: 12, WooCommerce: 9 }, unit: "codes" },
    { key: "pages", label: "Pages & policies", icon: FileText, counts: { Shopify: 7, WooCommerce: 11 }, unit: "pages" },
    { key: "redirects", label: "URL redirects", icon: Link2, counts: { Shopify: 266, WooCommerce: 336 }, unit: "redirects" },
]

type Phase = "choose" | "select" | "running" | "done"

export function Wizard() {
    const [platform, setPlatform] = React.useState<Platform>("Shopify")
    const [phase, setPhase] = React.useState<Phase>("choose")
    const [picked, setPicked] = React.useState<Set<ItemKey>>(new Set(itemsMeta.map((i) => i.key)))
    const [progress, setProgress] = React.useState<Record<ItemKey, number>>({} as Record<ItemKey, number>)

    const selected = itemsMeta.filter((i) => picked.has(i.key))

    React.useEffect(() => {
        if (phase !== "running") return
        const start = performance.now()
        const durations = selected.map((_, i) => 900 + i * 380)
        let raf = 0
        const tick = () => {
            const t = performance.now() - start
            const next = {} as Record<ItemKey, number>
            selected.forEach((it, i) => {
                const begin = i * 260
                next[it.key] = Math.max(0, Math.min(1, (t - begin) / durations[i]))
            })
            setProgress(next)
            if (selected.every((it) => next[it.key] >= 1)) setPhase("done")
            else raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase])

    const toggle = (k: ItemKey) =>
        setPicked((s) => {
            const n = new Set(s)
            if (n.has(k)) n.delete(k)
            else n.add(k)
            return n
        })
    const reset = () => {
        setPhase("choose")
        setProgress({} as Record<ItemKey, number>)
        setPicked(new Set(itemsMeta.map((i) => i.key)))
    }
    const steps: { key: Phase; label: string }[] = [
        { key: "choose", label: "Connect" },
        { key: "select", label: "Choose data" },
        { key: "running", label: "Import" },
        { key: "done", label: "Review" },
    ]
    const stepIndex = steps.findIndex((s) => s.key === phase)

    return (
        <Container>
            <section id="wizard" className="scroll-mt-6 pb-6 pt-8 lg:pt-12">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">See how it works</Serif>
                        <span className="block font-semibold">Your Store, Imported in Four Steps</span>
                    </h2>
                </Reveal>

                <Reveal className="mt-8 lg:mt-10">
                    <div className={`mx-auto max-w-[860px] rounded-2xl border border-[#E4E6DF] bg-white ${shadow}`}>
                        {/* Stepper */}
                        <div className="flex items-center justify-between gap-2 border-b border-[#EEF0EA] px-4 py-3">
                            <ol className="flex flex-1 items-center">
                                {steps.map((s, i) => (
                                    <li key={s.key} className="flex flex-1 items-center last:flex-none">
                                        <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold", i < stepIndex ? "bg-[#171717] text-white" : i === stepIndex ? "text-white" : "bg-[#F3F4F0] text-[#8A8E84]")} style={i === stepIndex ? { background: ACCENT } : undefined}>
                                            {i < stepIndex ? <Check className="h-3 w-3" /> : i + 1}
                                        </span>
                                        <span className={cn("ml-1.5 hidden text-[11px] font-medium sm:inline", i <= stepIndex ? "text-[#171717]" : "text-[#8A8E84]")}>{s.label}</span>
                                        {i < steps.length - 1 && <span className={cn("mx-2 h-[2px] flex-1 rounded-full", i < stepIndex ? "bg-[#171717]" : "bg-[#EEF0EA]")} />}
                                    </li>
                                ))}
                            </ol>
                            <button type="button" onClick={reset} className="ml-2 inline-flex shrink-0 items-center gap-1 rounded-full border border-[#D9DCD3] px-2.5 py-1 text-[10px] font-medium hover:bg-[#F3F4F0]">
                                <RotateCcw className="h-3 w-3" /> Restart
                            </button>
                        </div>

                        <div className="min-h-[380px] p-4 lg:p-6">
                            <AnimatePresence mode="wait" initial={false}>
                                {phase === "choose" && (
                                    <motion.div key="choose" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
                                        <p className="text-[15px] font-semibold lg:text-[18px]">Where are you moving from?</p>
                                        <p className="mt-1 text-[11px] text-[#6B6F66] lg:text-[13px]">Connect your current store. It keeps running — nothing is changed or deleted there.</p>
                                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {(["Shopify", "WooCommerce"] as Platform[]).map((p) => (
                                                <button key={p} type="button" aria-pressed={platform === p} onClick={() => setPlatform(p)} className={cn("rounded-xl border-2 p-4 text-left transition-colors", platform === p ? "border-[#171717] bg-[#F6F7F3]" : "border-[#EEF0EA] hover:border-[#D9DCD3]")}>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[15px] font-bold tracking-tight lg:text-[17px]">{p}</span>
                                                        <span className={cn("grid h-5 w-5 place-items-center rounded-full border", platform === p ? "border-[#171717] bg-[#171717] text-white" : "border-[#D9DCD3]")}>{platform === p && <Check className="h-3 w-3" />}</span>
                                                    </div>
                                                    <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[12px]">
                                                        {p === "Shopify" ? "Connect with your store URL and an access token, or upload Shopify's product & customer CSV exports." : "Connect with your site URL and WooCommerce REST API keys, or upload a WooCommerce CSV export."}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                        <label className="mt-4 block rounded-xl border border-[#EEF0EA] px-3 py-2.5">
                                            <span className="text-[10px] text-[#8A8E84]">Store URL</span>
                                            <span className="mt-0.5 flex items-center gap-2 text-[12px]">
                                                <Globe className="h-3.5 w-3.5 text-[#8A8E84]" />
                                                {platform === "Shopify" ? "apna-store.myshopify.com" : "www.apnastore.pk"}
                                                <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium text-[#0F7A44]"><ShieldCheck className="h-3 w-3" /> Read-only access</span>
                                            </span>
                                        </label>
                                        <div className="mt-5 flex justify-end">
                                            <button type="button" onClick={() => setPhase("select")} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white hover:bg-black">
                                                Connect {platform} <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {phase === "select" && (
                                    <motion.div key="select" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <p className="text-[15px] font-semibold lg:text-[18px]">Found in your {platform} store</p>
                                            <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{selected.length} of {itemsMeta.length} selected</p>
                                        </div>
                                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {itemsMeta.map((it) => {
                                                const on = picked.has(it.key)
                                                return (
                                                    <li key={it.key}>
                                                        <button type="button" aria-pressed={on} onClick={() => toggle(it.key)} className={cn("flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors", on ? "border-[#171717] bg-[#F6F7F3]" : "border-[#EEF0EA] hover:border-[#D9DCD3]")}>
                                                            <span className={cn("grid h-4 w-4 shrink-0 place-items-center rounded border", on ? "border-[#171717] bg-[#171717] text-white" : "border-[#D9DCD3]")}>{on && <Check className="h-3 w-3" />}</span>
                                                            <it.icon className="h-4 w-4 shrink-0 text-[#5C6058]" />
                                                            <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium lg:text-[13px]">{it.label}</span>
                                                            <span className="shrink-0 text-[10.5px] tabular-nums text-[#8A8E84] lg:text-[12px]">{it.counts[platform].toLocaleString()}</span>
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        <div className="mt-5 flex items-center justify-between">
                                            <button type="button" onClick={() => setPhase("choose")} className="text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">Back</button>
                                            <button type="button" disabled={!selected.length} onClick={() => setPhase("running")} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white hover:bg-black disabled:opacity-40">
                                                Start import <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {(phase === "running" || phase === "done") && (
                                    <motion.div key="run" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
                                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                                            <p className="text-[15px] font-semibold lg:text-[18px]">{phase === "done" ? "Import complete" : `Importing from ${platform}…`}</p>
                                            <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Your {platform} store is still live and selling</p>
                                        </div>
                                        <ul className="mt-4 space-y-2.5">
                                            {selected.map((it) => {
                                                const p = progress[it.key] ?? 0
                                                const total = it.counts[platform]
                                                const done = p >= 1
                                                return (
                                                    <li key={it.key} className="text-[11px] lg:text-[12.5px]">
                                                        <div className="flex items-center gap-2">
                                                            {done ? <Check className="h-3.5 w-3.5 text-[#0F9D58]" /> : p > 0 ? <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: ACCENT }} /> : <CircleDashed className="h-3.5 w-3.5 text-[#B5B9B0]" />}
                                                            <span className="flex-1 font-medium">{it.label}</span>
                                                            <span className="tabular-nums text-[#5C6058]">{Math.round(p * total).toLocaleString()} / {total.toLocaleString()}</span>
                                                        </div>
                                                        <div className="ml-5.5 mt-1 h-1.5 overflow-hidden rounded-full bg-[#EEF0EA]" style={{ marginLeft: 22 }}>
                                                            <div className="h-full rounded-full" style={{ width: `${p * 100}%`, background: done ? "#0F9D58" : ACCENT }} />
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        <AnimatePresence>
                                            {phase === "done" && (
                                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl bg-[#F6F7F3] p-4">
                                                    <p className="text-[12px] font-semibold lg:text-[14px]">Next: review, then switch your domain</p>
                                                    <ul className="mt-2 grid grid-cols-1 gap-1.5 text-[10.5px] text-[#3A3D37] sm:grid-cols-2 lg:text-[12px]">
                                                        {["Spot-check products, prices and stock", "Pick a design and set up checkout", "Place a test COD order", "Point your domain — redirects go live"].map((t) => (
                                                            <li key={t} className="flex items-start gap-1.5"><Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: ACCENT }} /> {t}</li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">A simulation with sample counts — real import time depends on the size of your store.</p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- What moves ------------------------------------------------------------ */

type Row = { what: string; icon: React.ElementType; detail: string; shopify: "yes" | "partial" | "no"; woo: "yes" | "partial" | "no" }
const moves: Row[] = [
    { what: "Products", icon: Package, detail: "Title, description, price, compare-at price, SKU, weight, status", shopify: "yes", woo: "yes" },
    { what: "Variants & options", icon: ListChecks, detail: "Size, colour and other options with their own price, SKU and stock", shopify: "yes", woo: "yes" },
    { what: "Images", icon: ImageIcon, detail: "All product images, re-optimised for speed on the way in", shopify: "yes", woo: "yes" },
    { what: "Collections / categories", icon: Tags, detail: "Manual collections and categories with their products", shopify: "yes", woo: "yes" },
    { what: "Customers", icon: Users, detail: "Name, phone, email, addresses — no passwords (they're never exportable)", shopify: "yes", woo: "yes" },
    { what: "Order history", icon: ShoppingBag, detail: "Past orders with items, totals and status, for records and reports", shopify: "yes", woo: "yes" },
    { what: "Discount codes", icon: Percent, detail: "Code, value, type and limits", shopify: "partial", woo: "partial" },
    { what: "Pages & policies", icon: FileText, detail: "About, contact, shipping and return policy content", shopify: "yes", woo: "yes" },
    { what: "SEO fields", icon: Search, detail: "Meta titles, descriptions and URL handles", shopify: "yes", woo: "partial" },
    { what: "URL redirects", icon: Link2, detail: "Old product and collection URLs redirect to the new ones", shopify: "yes", woo: "yes" },
    { what: "Theme & app data", icon: Wallet, detail: "Themes and app settings don't transfer — pick a design and rebuild pages in the page builder", shopify: "no", woo: "no" },
]

function Mark({ v }: { v: Row["shopify"] }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function WhatMoves() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">No surprises</Serif>
                        <span className="block font-semibold">Exactly What Comes Across</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Everything that makes up your catalogue and customer base moves. The one thing that doesn&apos;t is the theme — and on Seltrax you won&apos;t miss it.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[620px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Data</th>
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">What&apos;s included</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">From Shopify</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">From WooCommerce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {moves.map((r) => (
                                    <tr key={r.what} className="border-b border-[#EEF0EA] last:border-b-0">
                                        <td className="px-4 py-3 lg:px-6">
                                            <span className="inline-flex items-center gap-2 font-medium"><r.icon className="h-4 w-4 text-[#5C6058]" /> {r.what}</span>
                                        </td>
                                        <td className="px-4 py-3 text-[#5C6058] lg:px-6">{r.detail}</td>
                                        <td className="px-4 py-3 text-center lg:px-6"><Mark v={r.shopify} /></td>
                                        <td className="px-4 py-3 text-center lg:px-6"><Mark v={r.woo} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">
                        <Minus className="mr-1 inline h-3 w-3" /> means it imports, with a review step — some rule types differ between platforms.
                    </p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- SEO ------------------------------------------------------------------ */

const redirects = [
    { from: "/products/cotton-kurta-navy", to: "/products/cotton-kurta-navy", note: "Same handle, kept as-is" },
    { from: "/collections/lawn-2026", to: "/collections/lawn-2026", note: "Same handle, kept as-is" },
    { from: "/product/silk-dupatta-rose/", to: "/products/silk-dupatta-rose", note: "WooCommerce path → 301 redirect" },
    { from: "/product-category/abayas/", to: "/collections/abayas", note: "WooCommerce category → 301 redirect" },
    { from: "/pages/shipping-policy", to: "/pages/shipping-policy", note: "Same handle, kept as-is" },
]

export function KeepSEO() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Your Google rankings</Serif>
                        <span className="block font-semibold">Keep the Traffic You Earned</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Links from Google, Instagram bios and old WhatsApp messages keep working. Handles are kept where possible,
                        and anything that changes gets a permanent 301 redirect — the signal search engines use to pass rankings to the new URL.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
                        <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF] bg-white">
                            <table className="w-full min-w-[520px] border-collapse text-[10.5px] lg:text-[12px]">
                                <thead>
                                    <tr className="border-b border-[#EEF0EA] bg-[#F6F7F3] text-left text-[#8A8E84]">
                                        <th className="px-4 py-2.5 font-medium">Old URL</th>
                                        <th className="px-2 py-2.5" />
                                        <th className="px-4 py-2.5 font-medium">On Seltrax</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {redirects.map((r) => (
                                        <tr key={r.from} className="border-b border-[#EEF0EA] last:border-b-0">
                                            <td className="px-4 py-2.5 font-mono text-[10px] text-[#5C6058] lg:text-[11px]">{r.from}</td>
                                            <td className="px-2 py-2.5"><ArrowRight className="h-3 w-3 text-[#8A8E84]" /></td>
                                            <td className="px-4 py-2.5">
                                                <p className="font-mono text-[10px] lg:text-[11px]">{r.to}</p>
                                                <p className="text-[9.5px] text-[#8A8E84] lg:text-[10.5px]">{r.note}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { t: "301 redirects, automatically", d: "Created for every product, collection and page whose URL changes." },
                                { t: "Meta titles & descriptions", d: "Imported with each product and page, so search snippets don't reset." },
                                { t: "Sitemap on day one", d: "Generated when you switch, ready to submit in Search Console." },
                                { t: "Image alt text", d: "Carried over where your old store had it." },
                            ].map((x) => (
                                <li key={x.t} className="rounded-xl border border-[#E4E6DF] bg-[#F6F7F3] p-4">
                                    <p className="flex items-center gap-1.5 text-[12px] font-semibold lg:text-[14px]"><Check className="h-3.5 w-3.5" style={{ color: ACCENT }} /> {x.t}</p>
                                    <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[12.5px]">{x.d}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- The switch plan ------------------------------------------------------ */

const plan = [
    { day: "Day 1 · morning", title: "Sign up and connect", desc: "Create your Seltrax store, connect Shopify or WooCommerce with read-only access, choose what to bring." },
    { day: "Day 1 · import", title: "Import runs in the background", desc: "Products, images, customers and orders come across while your old store keeps taking orders." },
    { day: "Day 1 · afternoon", title: "Make it yours", desc: "Pick a design, set delivery fees and checkout fields, connect TCS / Leopards / M&P." },
    { day: "Day 2", title: "Test end to end", desc: "Place a test COD order, book a courier, check the tracking message the customer gets." },
    { day: "Switch day", title: "Point your domain", desc: "Update your DNS. Redirects and the sitemap go live; a final sync picks up orders placed in between." },
    { day: "After", title: "Cancel the old plan and apps", desc: "Once you're happy, cancel your old subscription and every app you were paying for." },
]

export function SwitchPlan() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Zero downtime</Serif>
                        <span className="block font-semibold">The Switch, Step by Step</span>
                    </h2>
                </Reveal>
                <Reveal className="mx-auto mt-10 max-w-[760px] lg:mt-14">
                    <ol className="relative">
                        <span className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-[2px] bg-[#EEF0EA]" />
                        {plan.map((d, i) => (
                            <motion.li key={d.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.06, ease }} className="relative flex gap-4 pb-6 last:pb-0">
                                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#171717] text-[12px] font-semibold text-white">{i + 1}</span>
                                <div className="pt-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: ACCENT }}>{d.day}</p>
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

/* ---- Cost after switching ------------------------------------------------ */

export function CostAfter() {
    const [plat, setPlat] = React.useState<Platform>("Shopify")
    const [planCost, setPlanCost] = React.useState(11000)
    const [apps, setApps] = React.useState(5)
    const [perApp, setPerApp] = React.useState(2500)
    const current = planCost + apps * perApp
    const saved = Math.max(0, current - 1349)

    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">What you stop paying</Serif>
                        <span className="block font-semibold">Your Bill, Before and After</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Enter what you pay today — plan or hosting, plus the apps and plugins that make COD, couriers and speed work.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-2 lg:gap-8 lg:p-8">
                        <div className="space-y-5">
                            <div className="flex rounded-full bg-white p-1 ring-1 ring-[#E4E6DF]">
                                {(["Shopify", "WooCommerce"] as Platform[]).map((p) => (
                                    <button key={p} type="button" aria-pressed={plat === p} onClick={() => { setPlat(p); setPlanCost(p === "Shopify" ? 11000 : 6000) }} className={cn("flex-1 rounded-full py-1.5 text-[11px] font-medium lg:text-[12px]", plat === p ? "bg-[#171717] text-white" : "text-[#5C6058]")}>
                                        From {p}
                                    </button>
                                ))}
                            </div>
                            {[
                                { l: plat === "Shopify" ? "Shopify plan / month" : "Hosting & domain / month", v: planCost, set: setPlanCost, min: 0, max: 40000, step: 500, fmt: (n: number) => `Rs ${n.toLocaleString()}` },
                                { l: plat === "Shopify" ? "Paid apps" : "Paid plugins", v: apps, set: setApps, min: 0, max: 15, step: 1, fmt: (n: number) => String(n) },
                                { l: "Average cost each / month", v: perApp, set: setPerApp, min: 0, max: 8000, step: 100, fmt: (n: number) => `Rs ${n.toLocaleString()}` },
                            ].map((f) => (
                                <label key={f.l} className="block">
                                    <span className="flex items-center justify-between text-[11px] lg:text-[13px]">
                                        <span className="text-[#5C6058]">{f.l}</span>
                                        <span className="font-semibold tabular-nums">{f.fmt(f.v)}</span>
                                    </span>
                                    <input type="range" min={f.min} max={f.max} step={f.step} value={f.v} onChange={(e) => f.set(Number(e.target.value))} className="mt-2 h-1.5 w-full cursor-pointer" style={{ accentColor: "#171717" }} />
                                </label>
                            ))}
                            <p className="text-[10px] leading-relaxed text-[#8A8E84] lg:text-[11px]">Defaults are illustrative — dollar-priced plans and apps move with the exchange rate. Use your own invoices.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-xl bg-white p-4 lg:p-5">
                                <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">On {plat} today</p>
                                <p className="mt-1 text-[24px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[30px]">Rs {current.toLocaleString()}</p>
                                <p className="text-[10px] text-[#8A8E84]">per month</p>
                            </div>
                            <div className="rounded-xl p-4 text-white lg:p-5" style={{ background: ACCENT }}>
                                <p className="text-[10px] text-white/70 lg:text-[11px]">On Seltrax</p>
                                <p className="mt-1 text-[24px] font-semibold tracking-[-0.02em] lg:text-[30px]">Rs 1,349</p>
                                <p className="text-[10px] text-white/70">per month, everything included</p>
                            </div>
                            <div className="rounded-xl bg-[#171717] p-4 text-white sm:col-span-2 lg:p-5">
                                <p className="text-[10px] text-white/60">You keep every year</p>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.p key={saved} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="mt-1 text-[28px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[36px]">
                                        Rs {(saved * 12).toLocaleString()}
                                    </motion.p>
                                </AnimatePresence>
                                <p className="text-[10px] text-white/60">Rs {saved.toLocaleString()} a month back in the business</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- FAQ ------------------------------------------------------------------ */

const faqs = [
    { q: "Will my old store go offline during the migration?", a: "No. The import only reads from your Shopify or WooCommerce store — it doesn't change or delete anything. You keep selling there until you switch your domain, and a final sync brings across orders placed in the meantime." },
    { q: "Do my customers need to create new accounts?", a: "No. Checkout on Seltrax is guest-first and recognises customers by phone number, so they can just order. Passwords can't be exported from any platform, so there's nothing to reset." },
    { q: "Will I lose my Google rankings?", a: "Handles are kept wherever possible, and every URL that changes gets a permanent 301 redirect. Meta titles and descriptions come across with the products, and a sitemap is ready on switch day." },
    { q: "What doesn't transfer?", a: "Your theme and app settings — they're specific to the old platform. On Seltrax you pick a design and use the page builder instead, and the things apps did (COD, courier booking, speed, analytics) are built in." },
    { q: "Can you do the migration for me?", a: "Yes. Book a call and we'll run the import with you, check the result together and help you switch the domain." },
]

export function MigrateFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Migrating</span>
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
                            Start your migration <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            Book a guided migration <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
