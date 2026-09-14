"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    ArrowUpRight,
    Banknote,
    Gauge,
    HeartHandshake,
    Mail,
    MapPin,
    Scale,
    Smartphone,
    Sparkles,
    Truck,
    UserRound,
    Users,
    Wallet,
} from "lucide-react"
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

/* ---- Hero ------------------------------------------------------------------ */

export function AboutHero() {
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
                <Container className="pb-14 pt-12 text-center lg:pb-24 lg:pt-20">
                    <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <HeartHandshake className="h-3 w-3" style={{ color: ACCENT }} />
                        About us
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[900px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[66px]">
                        Built for the Seller
                        <br />
                        <Serif>Who Ships From Home</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-5 max-w-[600px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[16px]">
                        Seltrax is an ecommerce platform made for sellers in Pakistan — the ones taking orders on WhatsApp,
                        booking couriers by phone and collecting cash at the door. We build the store, the checkout and the
                        operations around how you actually sell, for one flat price in rupees.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-7 flex flex-wrap items-center justify-center gap-2">
                        <a href="#story" className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Our story
                        </a>
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Start selling <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- Story ----------------------------------------------------------------- */

const problems = [
    { icon: Wallet, text: "Dollar-priced plans and apps that get more expensive every time the rupee moves." },
    { icon: Banknote, text: "Cash on delivery treated as an afterthought, when it's how most orders are paid." },
    { icon: Truck, text: "Courier portals, spreadsheets of tracking numbers and copy-pasted addresses." },
    { icon: Gauge, text: "Stores that slow down with every plugin you add to fix the last problem." },
]

export function Story() {
    return (
        <Container>
            <section id="story" className="scroll-mt-6 pb-6 pt-12 lg:pt-20">
                <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                    <Reveal>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Who we are</p>
                        <h2 className="mt-3 text-[28px] leading-[1.1] tracking-[-0.02em] lg:text-[40px]">
                            <Serif>Selling online shouldn&apos;t</Serif> <span className="font-semibold">need a tech team</span>
                        </h2>
                        <div className="mt-5 space-y-4 text-[13px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                            <p>
                                The tools most Pakistani sellers were told to use were built for somewhere else. They assume card
                                payments, a warehouse, a developer on call and a budget in dollars. So sellers stitch together a
                                theme, a handful of paid apps and a few courier portals — and spend their evenings keeping it all
                                running instead of growing the business.
                            </p>
                            <p>
                                We started Seltrax to take that whole stack off their hands. One platform where the storefront,
                                a cash-on-delivery checkout, courier booking, tracking, analytics and team access are simply
                                there — fast by default, priced in rupees, with nothing to install.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 lg:p-7">
                            <p className="text-[12px] font-semibold lg:text-[14px]">What we kept hearing from sellers</p>
                            <ul className="mt-4 space-y-3">
                                {problems.map((p) => (
                                    <li key={p.text} className="flex items-start gap-3">
                                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-[#E4E6DF]"><p.icon className="h-4 w-4 text-[#3A3D37]" /></span>
                                        <p className="pt-1 text-[11.5px] leading-relaxed text-[#3A3D37] lg:text-[13.5px]">{p.text}</p>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5 border-t border-[#E4E6DF] pt-4 text-[12px] font-medium lg:text-[14px]">
                                Seltrax is our answer to every one of them.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </Container>
    )
}

/* ---- Mission + facts ---------------------------------------------------- */

const facts = [
    { n: "Rs 1,349", l: "a month, flat — everything included" },
    { n: "0", l: "plugins or apps to install" },
    { n: "3", l: "couriers built in: TCS, Leopards, M&P" },
    { n: "∞", l: "staff accounts at no extra cost" },
]

export function Mission() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <div className="rounded-2xl bg-[#171717] px-6 py-10 text-center text-white lg:px-12 lg:py-16">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Our mission</p>
                        <p className="mx-auto mt-4 max-w-[820px] text-[24px] leading-[1.2] tracking-[-0.02em] lg:text-[38px]">
                            Give every seller in Pakistan a store as <Serif>fast, reliable and complete</Serif> as the biggest brands —
                            without the cost or the complexity.
                        </p>
                        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-2 gap-6 lg:grid-cols-4">
                            {facts.map((f) => (
                                <div key={f.l}>
                                    <Serif className="block text-[34px] leading-none lg:text-[48px]">{f.n}</Serif>
                                    <p className="mt-2 text-[10.5px] leading-snug text-white/65 lg:text-[12.5px]">{f.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- What we believe --------------------------------------------------- */

const values = [
    { icon: MapPin, title: "Built for here", desc: "Cash on delivery, local couriers, Urdu and English, rupee pricing. We design for Pakistan first, not as a translation." },
    { icon: Scale, title: "One honest price", desc: "Rs 1,349 a month covers everything. No per-seat fees, no app store, no transaction surprises." },
    { icon: Gauge, title: "Fast is a feature", desc: "Most of your customers are on a phone and mobile data. Every decision we make is checked against speed." },
    { icon: Sparkles, title: "Nothing to bolt on", desc: "If sellers keep asking for a plugin, it belongs in the platform. We'd rather build it once for everyone." },
    { icon: Smartphone, title: "Run it from your pocket", desc: "Sellers aren't at a desk all day. The whole business — orders, dispatch, sales — works from the mobile app." },
    { icon: Users, title: "Sellers first", desc: "We talk to the people using Seltrax every week, and what we build next comes from those conversations." },
]

export function Values() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">What we believe</Serif>
                        <span className="block font-semibold">The Principles Behind Seltrax</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {values.map((v, i) => (
                        <Reveal key={v.title} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 lg:p-6">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><v.icon className="h-4 w-4" /></span>
                                <p className="mt-4 text-[14px] font-semibold lg:text-[16px]">{v.title}</p>
                                <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{v.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Team -------------------------------------------------------------------- */

/* PLACEHOLDER CONTENT — swap in the real team: name, role, a short line and a
   photo path (e.g. /team/ashir.jpg). Until `photo` is set, the card shows the
   person's initials rather than a stock photo standing in for a real person. */
type Member = { name: string; role: string; bio: string; photo?: string; tint: string }
const team: Member[] = [
    { name: "Team member", role: "Founder & CEO", bio: "Sets the direction and spends most weeks talking to sellers.", tint: "#2B7FFF" },
    { name: "Team member", role: "Head of Engineering", bio: "Keeps every store fast and the platform running.", tint: "#171717" },
    { name: "Team member", role: "Product Design", bio: "Designs the storefronts, checkout and dashboard.", tint: "#0F9D58" },
    { name: "Team member", role: "Seller Success", bio: "Helps sellers launch, migrate and grow.", tint: "#B5532A" },
    { name: "Team member", role: "Logistics & Partnerships", bio: "Works with couriers so dispatch just works.", tint: "#6C4AB6" },
    { name: "Team member", role: "Support", bio: "The person who answers when you need help.", tint: "#5C6058" },
]

const PLACEHOLDER = "Team member"
const initials = (name: string) => name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()

export function Team() {
    return (
        <Container>
            <section id="team" className="scroll-mt-6 pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The people behind it</Serif>
                        <span className="block font-semibold">Meet the Team</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        A small team of engineers, designers and seller-success people who&apos;d rather fix a problem once in the
                        platform than have every seller work around it.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {team.map((m, i) => (
                        <Reveal key={`${m.role}-${i}`} delay={i * 0.05}>
                            <div className="flex h-full items-start gap-4 rounded-2xl border border-[#E4E6DF] bg-white p-5 lg:p-6">
                                {m.photo ? (
                                    <Image src={m.photo} alt={m.name} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                                ) : (
                                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-[18px] font-semibold text-white" style={{ background: m.tint }}>
                                        {m.name === PLACEHOLDER ? <UserRound className="h-7 w-7" /> : initials(m.name)}
                                    </span>
                                )}
                                <div className="min-w-0">
                                    <p className="text-[14px] font-semibold lg:text-[16px]">{m.name}</p>
                                    <p className="text-[11px] font-medium lg:text-[12px]" style={{ color: ACCENT }}>{m.role}</p>
                                    <p className="mt-2 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{m.bio}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-6">
                    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-[#D9DCD3] bg-[#F6F7F3] p-5 sm:flex-row sm:items-center lg:p-6">
                        <div>
                            <p className="text-[14px] font-semibold lg:text-[16px]">Want to build this with us?</p>
                            <p className="mt-1 text-[11px] text-[#6B6F66] lg:text-[13px]">We&apos;re always glad to hear from people who care about helping small sellers grow.</p>
                        </div>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white hover:bg-black">
                            <Mail className="h-3.5 w-3.5" /> Get in touch
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Closing ------------------------------------------------------------- */

export function AboutCTA() {
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4">
                        {[
                            { title: "Start selling", desc: "Launch your store today — no card needed to start.", href: REGISTER_URL, label: "Create your store" },
                            { title: "See it first", desc: "A walkthrough with the team, on your products.", href: DEMO_URL, label: "Book a demo", external: true },
                            { title: "Switching platforms?", desc: "Bring your Shopify or WooCommerce store across.", href: "/migrate", label: "How migration works" },
                        ].map((c) => (
                            <Link
                                key={c.title}
                                href={c.href}
                                target={c.external ? "_blank" : undefined}
                                rel={c.external ? "noopener noreferrer" : undefined}
                                className="group flex h-full flex-col rounded-2xl border border-[#E4E6DF] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] lg:p-6"
                            >
                                <p className="text-[15px] font-semibold lg:text-[17px]">{c.title}</p>
                                <p className="mt-1 flex-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{c.desc}</p>
                                <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium">
                                    {c.label} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
