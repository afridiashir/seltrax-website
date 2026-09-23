"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    ArrowUpRight,
    House,
    LifeBuoy,
    Newspaper,
    Palette,
    PlugZap,
    Wallet,
} from "lucide-react"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"

const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* Where people usually meant to go. Kept short on purpose — a wall of links
   is no more useful than the 404 itself. */
const destinations = [
    { icon: House, title: "Home", desc: "Everything Seltrax does, on one page.", href: "/" },
    { icon: Wallet, title: "Pricing", desc: "One flat plan, Rs 1,349 a month.", href: "/pricing" },
    { icon: Palette, title: "Designs", desc: "Ready-made store designs by category.", href: "/designs" },
    { icon: LifeBuoy, title: "Help center", desc: "Guides for setting up and running a store.", href: "/help" },
    { icon: PlugZap, title: "Integrations", desc: "Couriers, pixels, analytics and WhatsApp.", href: "/integrations" },
    { icon: Newspaper, title: "Blog", desc: "Notes on selling online in Pakistan.", href: "/blog" },
]

export function NotFoundHero() {
    return (
        <section className="relative">
            <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/35 to-white" />
            <div className="relative z-10">
                <HomeNavbar />
                <Container className="pb-12 pt-12 text-center lg:pb-20 lg:pt-20">
                    <motion.p
                        {...float(0)}
                        className="text-[64px] font-semibold leading-none tracking-[-0.04em] text-[#171717] sm:text-[88px] lg:text-[112px]"
                    >
                        4<Serif className="mx-0.5">0</Serif>4
                    </motion.p>
                    <motion.h1
                        {...float(0.05)}
                        className="mx-auto mt-3 max-w-[680px] text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[34px] lg:text-[42px]"
                    >
                        We couldn&apos;t find that page
                    </motion.h1>
                    <motion.p
                        {...float(0.1)}
                        className="mx-auto mt-4 max-w-[520px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[15px]"
                    >
                        The link may be out of date, or the page may have been renamed since it was shared.
                        Your store and your data are unaffected.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-7 flex flex-wrap items-center justify-center gap-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]"
                        >
                            Back to home
                        </Link>
                        <Link
                            href="/help"
                            className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]"
                        >
                            Search the help center <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

export function NotFoundLinks() {
    return (
        <Container className="pb-16 lg:pb-24">
            <Reveal>
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">
                    Try one of these
                </p>
            </Reveal>
            <div className="mx-auto mt-6 grid max-w-[900px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {destinations.map((d, i) => (
                    <Reveal key={d.href} delay={i * 0.05}>
                        <Link
                            href={d.href}
                            className="group flex h-full flex-col rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-colors hover:bg-[#F1F3EE]"
                        >
                            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white">
                                <d.icon className="h-4 w-4" />
                            </span>
                            <span className="mt-4 flex items-center gap-1 text-[14px] font-semibold lg:text-[16px]">
                                {d.title}
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: ACCENT }} />
                            </span>
                            <span className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{d.desc}</span>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </Container>
    )
}
