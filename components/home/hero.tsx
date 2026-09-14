"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Box, Check, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "./navbar"
import { Layer, TiltCard } from "./tilt-card"
import { ACCENT, Container, Face, Serif, shadow } from "./ui"

/* Same set as components/landing/trusted-brands.tsx — files are 60px tall. */
const brands = [
    { src: "/brands/truke.png", alt: "trüke", width: 119, height: 58 },
    { src: "/brands/govo.png", alt: "GOVO", width: 145, height: 60 },
    { src: "/brands/lemonade.png", alt: "Lemonade", width: 261, height: 60 },
    { src: "/brands/uppercase.png", alt: "uppercase", width: 264, height: 60 },
]

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"

const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
    return (
        <>
            {/* Full-bleed photo: fog wash at the top for the nav and headline, fading to
                solid white at the bottom so the page flows straight out of it. */}
            <section className="relative overflow-hidden">
                <Image
                    src="/landing/scenery.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_40%]"
                />
                {/* Top wash for the nav + headline. */}
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
                {/* Eased bottom fade: reaches solid white ~10% above the section's edge so
                    the photo dissolves with no visible end line. */}
                <div
                    className="absolute inset-x-0 bottom-0 h-[62%]"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                    }}
                />

                <div className="relative z-10">
                    <HomeNavbar />

                    <div className="px-4 pb-16 pt-10 text-center sm:px-8 sm:pt-16 lg:pb-24 lg:pt-24">
                        <motion.span
                            {...float(0)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]"
                        >
                            <Sparkles className="h-3 w-3" style={{ color: ACCENT }} />
                            Launch your store today, not next month
                        </motion.span>

                        <motion.h1
                            {...float(0.05)}
                            className="mx-auto mt-4 max-w-[760px] text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#171717] sm:text-[52px] lg:text-[66px]"
                        >
                            Selling Made
                            <br />
                            <Serif>Simpler, Faster,</Serif> Better
                        </motion.h1>

                        <motion.p
                            {...float(0.1)}
                            className="mx-auto mt-4 max-w-[380px] text-[12px] leading-relaxed text-[#3A3D37] lg:max-w-[460px] lg:text-[15px]"
                        >
                            Build your online store with themes, payments, analytics and hosting built in — no
                            plugins, no code, no surprise fees.
                        </motion.p>

                        <motion.div {...float(0.15)} className="mt-6 flex items-center justify-center gap-2">
                            <Link
                                href={REGISTER_URL}
                                className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-black lg:px-5 lg:py-2.5 lg:text-[14px]"
                            >
                                Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                            <a
                                href={DEMO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2 text-[12px] font-medium text-[#171717] backdrop-blur transition-colors hover:bg-white lg:px-5 lg:py-2.5 lg:text-[14px]"
                            >
                                Book a Demo <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        </motion.div>

                        <div className="mx-auto mt-12 grid max-w-[760px] grid-cols-1 items-end gap-4 sm:mt-16 sm:grid-cols-3 lg:mt-24 lg:max-w-[900px] lg:gap-6">
                            <TiltCard delay={0.25} floatDuration={6}>
                                <SalesCard />
                            </TiltCard>
                            <TiltCard delay={0.35} floatDuration={7} floatOffset={0.8}>
                                <OrdersCard />
                            </TiltCard>
                            <TiltCard delay={0.45} floatDuration={6.5} floatOffset={1.6}>
                                <SpeedCard />
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </section>

            <Container className="pb-4 pt-2 lg:pt-4">
                <p className="text-center text-[11px] text-[#5C6058] lg:text-[13px]">Trusted brands working with us</p>
                <ul className="mx-auto mt-4 flex max-w-[960px] flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between lg:mt-5">
                    {brands.map((b) => (
                        <li key={b.alt}>
                            <Image
                                src={b.src}
                                alt={b.alt}
                                width={b.width}
                                height={b.height}
                                className="h-6 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-7 lg:h-8"
                            />
                        </li>
                    ))}
                </ul>
            </Container>
        </>
    )
}

/* ---- Floating hero cards ---------------------------------------------- */

const series = {
    Orders: { bars: [38, 52, 30, 66, 44, 58, 36], hot: 3, total: "Rs 105,400" },
    Refunds: { bars: [12, 8, 18, 6, 10, 14, 9], hot: 2, total: "Rs 3,150" },
} as const
type SeriesKey = keyof typeof series

function SalesCard() {
    const [tab, setTab] = React.useState<SeriesKey>("Orders")
    const s = series[tab]

    return (
        <div className={`rounded-2xl bg-white p-3 text-left ${shadow}`}>
            <Layer depth={14}>
                <div role="tablist" className="flex rounded-lg bg-[#F3F4F0] p-0.5 text-[10px] font-medium">
                    {(Object.keys(series) as SeriesKey[]).map((k) => (
                        <button
                            key={k}
                            role="tab"
                            aria-selected={tab === k}
                            onClick={() => setTab(k)}
                            className={cn(
                                "relative flex-1 rounded-md py-1 text-center transition-colors",
                                tab === k ? "text-[#171717]" : "text-[#8A8E84] hover:text-[#171717]",
                            )}
                        >
                            {tab === k && <motion.span layoutId="sales-tab" className="absolute inset-0 rounded-md bg-white shadow-sm" />}
                            <span className="relative">{k === "Orders" ? "↗ Orders" : "↙ Refunds"}</span>
                        </button>
                    ))}
                </div>
            </Layer>
            <p className="mt-3 text-[12px] font-semibold">Today&apos;s sales</p>
            <Layer depth={22}>
                <div className="mt-2 flex items-end justify-between">
                    <span className="text-[10px] text-[#8A8E84]">
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                        This week
                    </span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={tab}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="text-[13px] font-semibold"
                        >
                            {s.total}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </Layer>
            <Layer depth={30}>
                <div className="mt-3 flex h-14 items-end gap-1.5">
                    {s.bars.map((h, i) => (
                        <motion.span
                            key={i}
                            className="flex-1 origin-bottom rounded-sm"
                            initial={{ scaleY: 0 }}
                            animate={{ height: `${h}%`, scaleY: 1, background: i === s.hot ? ACCENT : "#E6E8E2" }}
                            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.5 + i * 0.05 }}
                            whileHover={{ scaleY: 1.12, background: ACCENT }}
                        />
                    ))}
                </div>
            </Layer>
        </div>
    )
}

const methods = [
    { label: "COD", cls: "bg-white text-[#171717]", style: {} },
    { label: "Rs", cls: "bg-white", style: { color: ACCENT } },
    { label: "", cls: "bg-[#171717] text-white", style: {} },
]

function OrdersCard() {
    const [dispatched, setDispatched] = React.useState(false)

    return (
        <div className={`rounded-2xl bg-white p-3 text-left ${shadow}`}>
            <Layer depth={26}>
                <div className="flex items-center justify-center gap-2 rounded-xl bg-[#F3F4F0] py-4">
                    {methods.map((m, i) => (
                        <motion.span
                            key={i}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.6 + i * 0.1 }}
                            whileHover={{ y: -3, scale: 1.12 }}
                            className={cn("grid h-8 w-8 place-items-center rounded-full text-[10px] font-bold shadow-sm", m.cls)}
                            style={m.style}
                        >
                            {m.label || <Box className="h-3.5 w-3.5" />}
                        </motion.span>
                    ))}
                </div>
            </Layer>
            <p className="mt-3 text-[12px] font-semibold">Cash on Delivery, built in</p>
            <Layer depth={16}>
                <button
                    type="button"
                    onClick={() => setDispatched((d) => !d)}
                    aria-pressed={dispatched}
                    className="mt-2 flex w-full items-center justify-between rounded-lg border border-[#E6E8E2] px-2.5 py-2 text-left text-[10px] transition-colors hover:bg-[#F8F9F6]"
                >
                    <span className="text-[#3A3D37]">Order-0028 · via TCS</span>
                    <AnimatePresence mode="wait" initial={false}>
                        {dispatched ? (
                            <motion.span
                                key="done"
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.6, opacity: 0 }}
                                className="inline-flex items-center gap-1 font-medium"
                                style={{ color: ACCENT }}
                            >
                                <Check className="h-3 w-3" /> Dispatched
                            </motion.span>
                        ) : (
                            <motion.span key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-medium text-[#8A8E84]">
                                #001232
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </Layer>
        </div>
    )
}

const team = ["/landing/avatars/a1.jpg", "/landing/avatars/a2.jpg", "/landing/avatars/a3.jpg", "/landing/avatars/a4.jpg"]

function SpeedCard() {
    return (
        <div className={`overflow-hidden rounded-2xl bg-white text-left ${shadow}`}>
            <Layer depth={18}>
                <div className="flex items-center gap-2 px-3 py-3 text-white" style={{ background: ACCENT }}>
                    <motion.span
                        className="grid h-6 w-6 place-items-center rounded-full bg-white/20"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Zap className="h-3.5 w-3.5" fill="currentColor" />
                    </motion.span>
                    <span className="text-[12px] font-semibold">Loads in a blink</span>
                </div>
            </Layer>
            <div className="p-3">
                <p className="text-[11px] text-[#8A8E84]">Staff accounts</p>
                <Layer depth={28}>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="flex -space-x-1.5">
                            {team.map((src, i) => (
                                <motion.span
                                    key={src}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                                    whileHover={{ y: -4, zIndex: 1 }}
                                    className="relative inline-block"
                                >
                                    <Face src={src} size={22} />
                                </motion.span>
                            ))}
                        </span>
                        <span className="text-[13px] font-semibold">No shared logins</span>
                    </div>
                </Layer>
            </div>
        </div>
    )
}
