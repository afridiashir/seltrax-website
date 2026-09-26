"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowUpRight,
    BarChart3,
    Banknote,
    Blocks,
    Check,
    CircleSlash,
    Gauge,
    Globe,
    Palette,
    PlugZap,
    Scale,
    Server,
    ShieldCheck,
    ShoppingBag,
    Smartphone,
    Truck,
    Users,
    Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif, h2Class, shadow } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
/* Billing: Rs 1,999/month billed monthly, or Rs 1,349/month billed yearly. */
const MONTHLY = 1999
const YEARLY_PER_MONTH = 1349
const YEARLY_TOTAL = YEARLY_PER_MONTH * 12
const YEARLY_SAVING = (MONTHLY - YEARLY_PER_MONTH) * 12
const SAVING_PCT = Math.floor(((MONTHLY - YEARLY_PER_MONTH) / MONTHLY) * 100)
const rs = (n: number) => `Rs ${n.toLocaleString("en-PK")}`
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

const highlights = [
    "Your store, hosting, SSL and backups",
    "Ready-made designs and the page builder",
    "COD-first checkout with custom fields",
    "TCS, Leopards and M&P courier booking",
    "Orders, analytics and delivered revenue",
    "Unlimited staff accounts and the Android app",
]

/* ---- Hero with the plan card ------------------------------------------- */

export function PricingHero() {
    const [billing, setBilling] = React.useState<"yearly" | "monthly">("yearly")
    const amount = billing === "yearly" ? YEARLY_PER_MONTH : MONTHLY

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
                <Container className="grid grid-cols-1 items-center gap-10 pb-12 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-10 lg:pb-20 lg:pt-16">
                    <div className="text-center md:text-left">
                        <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                            <Wallet className="h-3 w-3" style={{ color: ACCENT }} />
                            Pricing
                        </motion.span>
                        <motion.h1 {...float(0.05)} className="mt-4 text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                            One Plan.
                            <br />
                            <Serif>Everything Included.</Serif>
                        </motion.h1>
                        <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[460px] text-[12px] leading-relaxed text-[#3A3D37] md:mx-0 lg:text-[15px]">
                            No tiers to compare, no apps to add, no charge per staff member. One price in rupees gets you the whole
                            platform — and it stays the same as your store grows.
                        </motion.p>
                        <motion.ul {...float(0.15)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10.5px] text-[#5C6058] md:justify-start lg:text-[12.5px]">
                            {["Priced in rupees", "No per-seat fees", "No paid apps", `Save ${SAVING_PCT}% yearly`].map((t) => (
                                <li key={t} className="inline-flex items-center gap-1">
                                    <Check className="h-3.5 w-3.5" style={{ color: ACCENT }} /> {t}
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    <motion.div {...float(0.2)} className={`mx-auto w-full max-w-[420px] rounded-3xl bg-white p-6 lg:p-8 ${shadow}`}>
                        <div className="flex items-center justify-between">
                            <p className="text-[14px] font-semibold lg:text-[16px]">Seltrax</p>
                            <div role="tablist" aria-label="Billing period" className="flex rounded-full bg-[#F3F4F0] p-0.5">
                                {(["monthly", "yearly"] as const).map((p) => (
                                    <button key={p} role="tab" aria-selected={billing === p} onClick={() => setBilling(p)} className={cn("relative inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10.5px] font-medium lg:text-[11.5px]", billing === p ? "text-[#171717]" : "text-[#8A8E84]")}>
                                        {billing === p && <motion.span layoutId="price-period" className="absolute inset-0 rounded-full bg-white shadow-sm" transition={{ duration: 0.2, ease }} />}
                                        <span className="relative">{p === "monthly" ? "Monthly" : "Yearly"}</span>
                                        {p === "yearly" && <span className="relative rounded-full px-1.5 py-px text-[8.5px] font-semibold text-white lg:text-[9.5px]" style={{ background: "#0F9D58" }}>-{SAVING_PCT}%</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 flex items-end gap-2">
                            <span className="pb-2 text-[16px] font-medium text-[#5C6058] lg:text-[18px]">Rs</span>
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span key={amount} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="text-[56px] font-semibold leading-none tracking-[-0.04em] tabular-nums lg:text-[68px]">
                                    {amount.toLocaleString("en-PK")}
                                </motion.span>
                            </AnimatePresence>
                            <span className="pb-2 text-[13px] text-[#8A8E84] lg:text-[14px]">/ month</span>
                        </div>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.p key={billing} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-1 text-[11px] text-[#8A8E84] lg:text-[12px]">
                                {billing === "yearly" ? (
                                    <>
                                        Billed {rs(YEARLY_TOTAL)} yearly · <span className="font-semibold text-[#0F7A44]">save {rs(YEARLY_SAVING)} a year</span>
                                    </>
                                ) : (
                                    <>
                                        Billed monthly · or {rs(YEARLY_PER_MONTH)}/month billed yearly
                                    </>
                                )}
                            </motion.p>
                        </AnimatePresence>

                        <Link href={REGISTER_URL} className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#171717] py-3 text-[13px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start selling <ArrowUpRight className="h-4 w-4" />
                        </Link>
                        <p className="mt-2 text-center text-[10.5px] text-[#8A8E84] lg:text-[11px]">No credit card needed to start</p>

                        <ul className="mt-6 space-y-2.5 border-t border-[#EEF0EA] pt-5">
                            {highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2.5 text-[12px] leading-snug text-[#3A3D37] lg:text-[13.5px]">
                                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-white" style={{ background: ACCENT }}>
                                        <Check className="h-2.5 w-2.5" />
                                    </span>
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- Everything included ------------------------------------------------ */

const included: { icon: React.ElementType; title: string; href: string; items: string[] }[] = [
    { icon: Server, title: "Store & hosting", href: "/launch", items: ["Hosting and scaling", "SSL on every page", "Automatic backups & updates", "Free store address + your own domain"] },
    { icon: Palette, title: "Design", href: "/designs", items: ["Ready-made designs by category", "Page builder for any page", "Pre-designed sections", "Mobile-first storefronts"] },
    { icon: Gauge, title: "Speed", href: "/page-speed", items: ["JSON-rendered theme", "Images optimised automatically", "No plugin scripts", "Edge-cached pages"] },
    { icon: Banknote, title: "Selling", href: "/cash-on-delivery", items: ["COD-first checkout", "Required / optional / hidden fields", "Order confirmation", "Delivery & COD fees by city"] },
    { icon: Truck, title: "Shipping", href: "/courier-dispatch", items: ["TCS, Leopards & M&P booking", "Bulk dispatch & labels", "Tracking on every order", "Returns handled"] },
    { icon: ShoppingBag, title: "Orders", href: "/orders", items: ["Order stages built for COD", "Bulk actions", "Customer refusal history", "Remittance tracking"] },
    { icon: BarChart3, title: "Analytics", href: "/analytics", items: ["Sales, sessions & conversion", "Funnel to delivered orders", "Returns by city & courier", "Cash with couriers"] },
    { icon: Users, title: "Team", href: "/staff-accounts", items: ["Unlimited staff accounts", "Roles & permissions", "Activity log", "Android app for everyone"] },
    { icon: PlugZap, title: "Integrations", href: "/integrations", items: ["Meta, TikTok & Google Analytics", "WhatsApp checkout & chat", "One-click COD checkout", "TCS, Leopards & M&P booking"] },
]

export function Included() {
    return (
        <Container>
            <section className="pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">What your plan gets you</Serif>
                        <span className="block font-semibold">Everything, on Day One</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        There&apos;s no bigger plan to upgrade to. Every store gets every feature.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {included.map((g, i) => (
                        <Reveal key={g.title} delay={i * 0.04}>
                            <Link href={g.href} className="group flex h-full flex-col rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-colors hover:bg-[#F1F3EE] lg:p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white"><g.icon className="h-4 w-4" /></span>
                                        <p className="text-[14px] font-semibold lg:text-[15px]">{g.title}</p>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-[#B5B9B0] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#171717]" />
                                </div>
                                <ul className="mt-4 space-y-1.5">
                                    {g.items.map((it) => (
                                        <li key={it} className="flex items-start gap-2 text-[11px] leading-snug text-[#3A3D37] lg:text-[12.5px]">
                                            <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: ACCENT }} /> {it}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Never pay / not included ------------------------------------------ */

const never = [
    { icon: Users, title: "Per staff member", desc: "Add your whole team. The price doesn't change." },
    { icon: PlugZap, title: "Apps or plugins", desc: "COD, couriers, analytics and SEO are built in." },
    { icon: Palette, title: "Premium themes", desc: "Every design is included." },
    { icon: Blocks, title: "A bigger plan", desc: "There's only one plan, with every feature." },
    { icon: Server, title: "Hosting or SSL", desc: "Hosting, security and backups are part of the plan." },
    { icon: Scale, title: "Dollar exchange rates", desc: "You're billed in rupees, so the price doesn't move with the dollar." },
]

const notIncluded = [
    { icon: Truck, title: "Courier charges", desc: "Deliveries are booked on your own TCS, Leopards or M&P account, at the rates you've agreed with them." },
    { icon: ShieldCheck, title: "Payment gateway fees", desc: "If you turn on online payments, the payment provider charges its own fees. Cash on delivery has none from us." },
    { icon: Globe, title: "Your domain name", desc: "Using your own domain means registering it with a domain provider. The free store address costs nothing." },
    { icon: Smartphone, title: "SMS & WhatsApp messaging costs", desc: "Where message providers charge for sending, those costs are billed by them." },
]

export function NeverPay() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">No surprises</Serif>
                        <span className="block font-semibold">What You&apos;ll Never Pay Extra For</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {never.map((n, i) => (
                        <Reveal key={n.title} delay={i * 0.04}>
                            <div className="flex h-full items-start gap-3 rounded-2xl border border-[#E4E6DF] bg-white p-5">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#F3F4F0]">
                                    <CircleSlash className="h-4 w-4 text-[#B42318]" />
                                </span>
                                <div>
                                    <p className="text-[13px] font-semibold lg:text-[15px]">{n.title}</p>
                                    <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{n.desc}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-10 lg:mt-14">
                    <div className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 lg:p-8">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">To be clear</p>
                        <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em] lg:text-[22px]">Costs from other companies</p>
                        <p className="mt-2 max-w-[640px] text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                            Seltrax covers the platform. A few things come from other providers you choose, and they bill you directly:
                        </p>
                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {notIncluded.map((n) => (
                                <div key={n.title} className="flex items-start gap-3 rounded-xl bg-white p-4">
                                    <n.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#5C6058]" />
                                    <div>
                                        <p className="text-[12.5px] font-semibold lg:text-[14px]">{n.title}</p>
                                        <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[12.5px]">{n.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Compare teaser ------------------------------------------------------ */

export function CompareTeaser() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <div className="grid grid-cols-1 items-center gap-6 rounded-2xl bg-[#171717] p-6 text-white md:grid-cols-[minmax(0,1fr)_auto] lg:p-10">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Paying for another platform?</p>
                            <p className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] lg:text-[32px]">
                                Add up your plan, apps and plugins
                            </p>
                            <p className="mt-2 max-w-[520px] text-[12px] leading-relaxed text-white/70 lg:text-[14px]">
                                Put in what you pay on Shopify or WooCommerce today and see what a year costs next to Seltrax, from {rs(YEARLY_PER_MONTH)} a month.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Link href="/compare#cost" className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                                Open the cost calculator <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <Link href="/migrate" className="inline-flex items-center gap-1 rounded-full border border-white/30 px-4 py-2 text-[12px] font-medium text-white hover:bg-white/10">
                                How to switch
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- FAQ ------------------------------------------------------------------ */

const faqs = [
    { q: "How much does Seltrax cost?", a: `${rs(MONTHLY)} a month billed monthly, or ${rs(YEARLY_PER_MONTH)} a month billed yearly (${rs(YEARLY_TOTAL)} a year). Either way you get the same plan: storefront, designs, checkout, courier integrations, analytics, hosting, security and unlimited staff accounts.` },
    { q: "How much do I save by paying yearly?", a: `Paying yearly brings the price down from ${rs(MONTHLY)} to ${rs(YEARLY_PER_MONTH)} a month — ${rs(YEARLY_SAVING)} saved over the year, about ${SAVING_PCT}% off.` },
    { q: "Do I need a credit card to start?", a: "No. You can create and set up your store without entering card details." },
    { q: "Are there any extra fees?", a: "Not from Seltrax — no per-seat fees, no paid apps and no premium themes. Other providers you choose bill you directly, such as your courier for deliveries or a payment gateway if you turn on online payments." },
    { q: "Does the price go up as my store grows?", a: "No. There's one plan with every feature. Adding products, orders or staff doesn't move you to a more expensive tier." },
    { q: "Why is it priced in rupees?", a: "Because our sellers earn in rupees. A price in dollars changes every time the exchange rate does — yours won't." },
    { q: "Can I cancel anytime?", a: "Monthly plans have no long contract — cancel whenever you want. Yearly plans are paid up front for 12 months at the lower price." },
]

export function PricingFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Pricing</span>
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
                            Start selling <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            Questions? Book a demo <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
