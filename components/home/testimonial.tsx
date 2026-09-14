"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container, Reveal, Serif, h2Class } from "./ui"

/* PLACEHOLDER CONTENT — like components/landing/testimonials.tsx, these quotes,
   names and stores are filler to lay the section out. Swap in real, attributable
   seller reviews before this ships. */
const quotes = [
    {
        text: "Before Seltrax we were paying for Shopify plus four apps just to run cash on delivery properly. Now it's one bill, the store loads faster, and our courier dispatch happens in one click.",
        name: "Seller name",
        role: "Founder, Store name",
        initials: "SN",
    },
    {
        text: "We moved our whole catalog over on a Sunday and were taking orders by Monday morning. No developer, no plugins, nothing to maintain.",
        name: "Seller name",
        role: "Owner, Store name",
        initials: "SN",
    },
    {
        text: "Staff accounts alone fixed a real problem for us — the packing team sees orders, the marketing team sees analytics, and nobody shares a password.",
        name: "Seller name",
        role: "Operations, Store name",
        initials: "SN",
    },
    {
        text: "The store is genuinely fast on mobile data. Our bounce rate dropped the week we switched and it hasn't gone back up.",
        name: "Seller name",
        role: "Co-founder, Store name",
        initials: "SN",
    },
    {
        text: "Rs 1,349 a month for everything is the whole pitch. No surprise app bills at the end of the month, no dollar pricing to worry about.",
        name: "Seller name",
        role: "Owner, Store name",
        initials: "SN",
    },
    {
        text: "COD tracking used to be a WhatsApp thread with the courier. Now every order shows its dispatch and tracking number right on the dashboard.",
        name: "Seller name",
        role: "Manager, Store name",
        initials: "SN",
    },
]

const GAP = 24

/* Cards visible at once: 1 on phones, 2 on tablets, 3 from lg up. */
function useVisible() {
    const [n, setN] = React.useState(3)
    React.useEffect(() => {
        const sm = window.matchMedia("(min-width: 640px)")
        const lg = window.matchMedia("(min-width: 1024px)")
        const update = () => setN(lg.matches ? 3 : sm.matches ? 2 : 1)
        update()
        sm.addEventListener("change", update)
        lg.addEventListener("change", update)
        return () => {
            sm.removeEventListener("change", update)
            lg.removeEventListener("change", update)
        }
    }, [])
    return n
}

export function Testimonial() {
    const visible = useVisible()
    const [index, setIndex] = React.useState(0)
    const last = Math.max(0, quotes.length - visible)
    const clamped = Math.min(index, last)
    const go = (d: number) => setIndex((i) => Math.min(last, Math.max(0, i + d)))

    return (
        <Container>
            <section id="reviews" className="scroll-mt-4 border-t border-[#EEF0EA] py-16 lg:py-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">What our</Serif>
                        <span className="block font-semibold">Sellers Say</span>
                    </h2>
                </Reveal>

                <Reveal className="mt-10 lg:mt-14">
                    <div className="overflow-hidden">
                        <div
                            className="flex will-change-transform"
                            style={{
                                gap: GAP,
                                transform: `translateX(calc(${clamped} * (-100% - ${GAP}px) / ${visible}))`,
                                transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        >
                            {quotes.map((q, i) => {
                                const shown = i >= clamped && i < clamped + visible
                                return (
                                    <figure
                                        key={i}
                                        aria-hidden={!shown}
                                        className={cn(
                                            "flex shrink-0 flex-col rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-[opacity,background-color] duration-500 hover:bg-[#F1F3EE] lg:p-7",
                                            !shown && "opacity-40",
                                        )}
                                        style={{ flexBasis: `calc((100% - ${GAP * (visible - 1)}px) / ${visible})` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#171717] text-white">
                                                <Quote className="h-3 w-3" />
                                            </span>
                                            <span className="flex gap-0.5" aria-label="Rated 5 out of 5">
                                                {Array.from({ length: 5 }, (_, s) => (
                                                    <Star key={s} className="h-3 w-3 fill-[#171717] text-[#171717]" />
                                                ))}
                                            </span>
                                        </div>
                                        <blockquote className="mt-4 flex-1 text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">“{q.text}”</blockquote>
                                        <figcaption className="mt-6 flex items-center gap-2.5 border-t border-[#E4E6DF] pt-4">
                                            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[10px] font-semibold text-[#5C6058] ring-1 ring-[#E4E6DF]">
                                                {q.initials}
                                            </span>
                                            <div className="leading-tight">
                                                <p className="text-[11px] font-semibold lg:text-[13px]">{q.name}</p>
                                                <p className="text-[9px] text-[#8A8E84] lg:text-[11px]">{q.role}</p>
                                            </div>
                                        </figcaption>
                                    </figure>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between lg:mt-8">
                        <div className="flex gap-1.5" role="tablist" aria-label="Reviews">
                            {Array.from({ length: last + 1 }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    role="tab"
                                    aria-selected={clamped === i}
                                    aria-label={`Go to review ${i + 1}`}
                                    onClick={() => setIndex(i)}
                                    className={cn("h-1.5 rounded-full transition-all", clamped === i ? "w-5 bg-[#171717]" : "w-1.5 bg-[#D5D8CF] hover:bg-[#B9BDB3]")}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Previous reviews"
                                onClick={() => go(-1)}
                                disabled={clamped === 0}
                                className="grid h-8 w-8 place-items-center rounded-full border border-[#D9DCD3] text-[#171717] transition-colors hover:bg-[#F3F4F0] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent lg:h-9 lg:w-9"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next reviews"
                                onClick={() => go(1)}
                                disabled={clamped === last}
                                className="grid h-8 w-8 place-items-center rounded-full border border-[#D9DCD3] text-[#171717] transition-colors hover:bg-[#F3F4F0] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent lg:h-9 lg:w-9"
                            >
                                <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                            </button>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
