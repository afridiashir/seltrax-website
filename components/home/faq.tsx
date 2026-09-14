"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ACCENT, ACCENT_SOFT, Container, Reveal, Serif, h2Class } from "./ui"

/* Same answers as components/landing/faq.tsx. */
const faqs = [
    {
        q: "How much does Seltrax cost?",
        a: "Rs 1,349/month, flat. That covers your storefront, themes, payments, analytics, hosting, and security. No dollar-pegged plans, no app subscriptions, no transaction fee surprises — the price you see is the price you pay.",
    },
    {
        q: "Is Seltrax really faster than Shopify and WooCommerce?",
        a: "Yes. Shopify and WooCommerce stores slow down as you stack on apps and plugins. Seltrax has nothing to stack — speed is built into the platform, so your store stays fast as you grow.",
    },
    {
        q: "Do I need to know how to code?",
        a: "No. Pick a theme, add your products, and publish. If you can fill in a form, you can launch a store on Seltrax.",
    },
    {
        q: "Do I need hosting or plugins like WooCommerce?",
        a: "No. Hosting, security, backups, and updates are all handled for you. There are no servers to manage and no plugins to install, update, or fix when they conflict.",
    },
    {
        q: "Can I move my store from Shopify or WooCommerce?",
        a: "Yes. Bring your products, customers, and orders over with Seltrax's migration tools — most sellers switch without losing a day of sales.",
    },
    {
        q: "How fast can I go live?",
        a: "Most stores launch the same day — many in under an hour. Sign up, pick a theme, add products, publish. No credit card needed to start.",
    },
]

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
}

export function FAQ() {
    const [open, setOpen] = React.useState<number | null>(0)

    return (
        <Container>
            <section id="faq" className="scroll-mt-4 border-t border-[#EEF0EA] pb-16 pt-16 lg:pb-24 lg:pt-24">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Have a Question?</Serif>
                        <span className="block font-semibold">We&apos;ve Got You Covered</span>
                    </h2>
                </Reveal>

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.35fr] lg:mt-14 lg:gap-6">
                    <Reveal>
                        <CardsOnTiles />
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="px-1 sm:px-4 lg:px-8">
                            <ul>
                                {faqs.map((f, i) => {
                                    const isOpen = open === i
                                    return (
                                        <li key={f.q} className={cn(i > 0 && "border-t border-[#EEF0EA]")}>
                                            <button
                                                type="button"
                                                aria-expanded={isOpen}
                                                onClick={() => setOpen(isOpen ? null : i)}
                                                className="flex w-full items-start gap-3 py-3.5 text-left text-[12px] font-medium transition-colors hover:text-[#5C6058] lg:py-4 lg:text-[15px]"
                                            >
                                                <span className="w-4 shrink-0 tabular-nums lg:w-6">{i + 1}.</span>
                                                <span className="flex-1">{f.q}</span>
                                                <span
                                                    className="mt-0.5 text-[14px] leading-none text-[#8A8E84] transition-transform lg:text-[18px]"
                                                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                                                >
                                                    +
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="pb-4 pl-7 pr-6 text-[11px] leading-relaxed text-[#6B6F66] lg:pl-9 lg:text-[13px]">{f.a}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </section>
        </Container>
    )
}

/* Stack of cards on a tiled surface — built in CSS so it stays crisp. */
function CardsOnTiles() {
    return (
        <div
            className="relative h-full min-h-[240px] overflow-hidden rounded-2xl bg-[#D9DCD5] lg:min-h-[320px]"
            style={{
                backgroundImage: "linear-gradient(#CFD3CB 1px, transparent 1px), linear-gradient(90deg, #CFD3CB 1px, transparent 1px)",
                backgroundSize: "56px 56px",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5" />
            <div
                className="absolute left-[14%] top-[22%] h-[84px] w-[136px] rounded-xl bg-white shadow-[0_18px_30px_-14px_rgba(0,0,0,0.4)] lg:h-[110px] lg:w-[180px]"
                style={{ transform: "rotate(-8deg)" }}
            >
                <div className="m-3 h-3 w-8 rounded-sm bg-[#E6E8E2]" />
                <div className="mx-3 mt-4 h-1.5 w-20 rounded-full bg-[#E6E8E2]" />
            </div>
            <div
                className="absolute left-[34%] top-[36%] h-[84px] w-[136px] rounded-xl bg-[#171717] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.5)] lg:h-[110px] lg:w-[180px]"
                style={{ transform: "rotate(-8deg)" }}
            >
                <div className="m-3 h-3 w-8 rounded-sm bg-white/20" />
                <div className="mx-3 mt-4 h-1.5 w-20 rounded-full bg-white/20" />
            </div>
            <div
                className="absolute left-[54%] top-[50%] h-[84px] w-[136px] rounded-xl shadow-[0_18px_30px_-14px_rgba(43,127,255,0.6)] lg:h-[110px] lg:w-[180px]"
                style={{ transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_SOFT})` }}
            >
                <div className="m-3 h-3 w-8 rounded-sm bg-white/30" />
                <div className="mx-3 mt-4 h-1.5 w-20 rounded-full bg-white/30" />
            </div>
        </div>
    )
}
