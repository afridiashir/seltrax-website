"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container, Reveal, Serif, h2Class } from "./ui"

/* Store logos double as avatars; same files as the "Trusted by" strip. */
const quotes = [
    {
        text: "Watches are high-value COD orders, so every fake order used to hurt. Now the order, the courier booking and the tracking number all sit in one place, and dispatch takes one click instead of a back-and-forth with the courier.",
        name: "Ahsan",
        role: "Apna Time Watches",
        logo: "/brands/apna-time.png",
    },
    {
        text: "Jewellery needs to look right on a phone, and our store finally does. It loads fast even on mobile data, and we set the whole thing up ourselves without hiring a developer.",
        name: "Mian Jawed",
        role: "Zarqash Jewelers",
        logo: "/brands/zarqash.png",
    },
    {
        text: "We were paying for a platform plus a stack of apps just to run cash on delivery. With Seltrax it's one bill in rupees, and our team each has their own login instead of sharing a password.",
        name: "Mehroz",
        role: "WristGadgets",
        logo: "/brands/wristgadgets.png",
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
            <section id="reviews" className="scroll-mt-4 py-16 lg:py-24">
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
                                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white p-1 ring-1 ring-[#E4E6DF] lg:h-10 lg:w-10">
                                                <Image src={q.logo} alt="" width={40} height={40} className="h-full w-full object-contain" />
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

                    {/* Hidden when every card already fits, e.g. three quotes on desktop. */}
                    <div className={cn("mt-6 flex items-center justify-between lg:mt-8", last === 0 && "hidden")}>
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
