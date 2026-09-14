"use client"

import * as React from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Package, Paintbrush, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProductStudio, SalesChart, ThemePicker } from "./step-visuals"
import { TiltCard } from "./tilt-card"
import { Container, Reveal, Serif, h2Class } from "./ui"

/* Same three steps as components/landing/steps.tsx. */
const tabs = [
    {
        label: "Add a product",
        icon: Package,
        n: "01",
        title: "Add Your First Product",
        desc: "Upload photos, set your price, pick variants. Your catalog starts with a single product — no spreadsheets, no imports required.",
        hint: "Try it: switch colours, sizes and stock, then flip it live.",
        Visual: ProductStudio,
    },
    {
        label: "Customize",
        icon: Paintbrush,
        n: "02",
        title: "Customize Your Store",
        desc: "Pick a theme, choose your colours and fonts, arrange your homepage. Everything is visual — if you can fill in a form, you can design your store.",
        hint: "Try it: change the theme, accent and font — the storefront updates live.",
        Visual: ThemePicker,
    },
    {
        label: "Start selling",
        icon: Rocket,
        n: "03",
        title: "Start Selling",
        desc: "Hit publish and share your link. Take orders and cash-on-delivery payments from day one, and watch sales come in on your dashboard.",
        hint: "Try it: hover the chart for daily figures, switch between 7 and 30 days.",
        Visual: SalesChart,
    },
]

const AUTO_MS = 7000
const ease = [0.22, 1, 0.36, 1] as const

export function Steps() {
    const [active, setActive] = React.useState(0)
    const [auto, setAuto] = React.useState(true)
    const [cycle, setCycle] = React.useState(0)
    const tab = tabs[active]

    /* Auto-advance until the visitor takes over (click, or pointer inside the demo). */
    React.useEffect(() => {
        if (!auto) return
        const id = window.setTimeout(() => {
            setActive((a) => (a + 1) % tabs.length)
            setCycle((c) => c + 1)
        }, AUTO_MS)
        return () => window.clearTimeout(id)
    }, [auto, active, cycle])

    const go = (i: number) => {
        setAuto(false)
        setActive(i)
    }

    return (
        <Container>
            <section id="how-it-works" className="scroll-mt-4 border-t border-[#EEF0EA] pb-10 pt-16 lg:pb-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Launch in Three Steps</Serif>
                        <span className="block font-semibold">From Signup to First Order</span>
                    </h2>
                </Reveal>

                <Reveal className="mt-10 lg:mt-14">
                    <div role="tablist" className="grid grid-cols-3 border-b border-[#E4E6DF]">
                        {tabs.map((t, i) => {
                            const isActive = active === i
                            return (
                                <button
                                    key={t.label}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => go(i)}
                                    className={cn(
                                        "relative flex items-center justify-center gap-1.5 rounded-t-xl py-3 text-[11px] font-medium transition-colors sm:text-[13px] lg:py-4 lg:text-[15px]",
                                        isActive ? "bg-[#F6F7F3] text-[#171717]" : "text-[#8A8E84] hover:text-[#171717]",
                                    )}
                                >
                                    <t.icon className="hidden h-3.5 w-3.5 sm:block lg:h-4 lg:w-4" />
                                    <span className="hidden sm:inline">{t.label}</span>
                                    <span className="sm:hidden">{t.n}</span>
                                    {isActive && (
                                        <span className="absolute inset-x-0 -bottom-px h-[2px] bg-[#E4E6DF]">
                                            {/* Progress line: runs the auto-advance timer, or fills instantly once manual. */}
                                            <motion.span
                                                key={`${active}-${cycle}-${auto}`}
                                                className="block h-full origin-left bg-[#171717]"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={auto ? { duration: AUTO_MS / 1000, ease: "linear" } : { duration: 0.3, ease }}
                                            />
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-1 items-center gap-8 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-12 lg:gap-16 lg:pt-14">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease }}
                                className="max-w-[340px] lg:max-w-[440px] lg:justify-self-end"
                            >
                                <p className="text-[11px] text-[#8A8E84] lg:text-[13px]">
                                    {tab.n} <span className="mx-1">/</span> 03
                                </p>
                                <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.02em] sm:text-[24px] lg:text-[32px]">{tab.title}</h3>
                                <p className="mt-4 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[14px]">{tab.desc}</p>
                                <p className="mt-3 text-[9.5px] italic text-[#8A8E84] lg:text-[12px]">{tab.hint}</p>
                                <button
                                    type="button"
                                    onClick={() => go((active + 1) % tabs.length)}
                                    className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#D9DCD3] px-3.5 py-1.5 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0] lg:text-[12px]"
                                >
                                    {active === tabs.length - 1 ? "Back to start" : "Next step"} <ArrowRight className="h-3 w-3" />
                                </button>
                            </motion.div>
                        </AnimatePresence>

                        <div onPointerEnter={() => setAuto(false)}>
                            <TiltCard inView spring={false} float={false} maxTilt={4}>
                                <div className="relative aspect-[4/3.2] overflow-hidden rounded-2xl bg-[#C9D1D2]">
                                    <Image src="/landing/scenery.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover object-[center_60%]" />
                                    <div className="absolute inset-0 bg-white/10" />
                                    <div className="absolute inset-0 grid place-items-center p-4 sm:p-6" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.div
                                                key={tab.label}
                                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                                transition={{ duration: 0.35, ease }}
                                                className="flex w-full justify-center"
                                            >
                                                <tab.Visual />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
