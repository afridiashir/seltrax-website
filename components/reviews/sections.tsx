"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, MessageSquareQuote, PenLine, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const

/* PLACEHOLDER CONTENT — the same filler quotes as the homepage testimonials
   (components/home/testimonial.tsx). Replace every entry with a real,
   attributable review before this page ships, and don't add Review structured
   data until the reviews are genuine. */
type Topic = "cod" | "speed" | "price" | "couriers" | "team" | "migration"
const topics: { key: Topic; name: string }[] = [
    { key: "cod", name: "Cash on delivery" },
    { key: "couriers", name: "Couriers" },
    { key: "speed", name: "Speed" },
    { key: "price", name: "Pricing" },
    { key: "team", name: "Staff & team" },
    { key: "migration", name: "Switching" },
]

type Review = { text: string; name: string; role: string; topics: Topic[]; rating: 1 | 2 | 3 | 4 | 5; featured?: boolean }
const reviews: Review[] = [
    {
        text: "Before Seltrax we were paying for Shopify plus four apps just to run cash on delivery properly. Now it's one bill, the store loads faster, and our courier dispatch happens in one click.",
        name: "Seller name",
        role: "Founder, Store name",
        topics: ["cod", "price", "couriers", "migration"],
        rating: 5,
        featured: true,
    },
    {
        text: "We moved our whole catalog over on a Sunday and were taking orders by Monday morning. No developer, no plugins, nothing to maintain.",
        name: "Seller name",
        role: "Owner, Store name",
        topics: ["migration"],
        rating: 5,
    },
    {
        text: "Staff accounts alone fixed a real problem for us — the packing team sees orders, the marketing team sees analytics, and nobody shares a password.",
        name: "Seller name",
        role: "Operations, Store name",
        topics: ["team"],
        rating: 5,
    },
    {
        text: "The store is genuinely fast on mobile data. Our bounce rate dropped the week we switched and it hasn't gone back up.",
        name: "Seller name",
        role: "Co-founder, Store name",
        topics: ["speed", "migration"],
        rating: 5,
    },
    {
        text: "Rs 1,349 a month for everything is the whole pitch. No surprise app bills at the end of the month, no dollar pricing to worry about.",
        name: "Seller name",
        role: "Owner, Store name",
        topics: ["price"],
        rating: 5,
    },
    {
        text: "COD tracking used to be a WhatsApp thread with the courier. Now every order shows its dispatch and tracking number right on the dashboard.",
        name: "Seller name",
        role: "Manager, Store name",
        topics: ["cod", "couriers"],
        rating: 5,
    },
]

const ALL = "all"

function Stars({ n, size = 14 }: { n: number; size?: number }) {
    return (
        <span className="inline-flex gap-0.5" aria-label={`Rated ${n} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} style={{ width: size, height: size }} className={i < n ? "fill-[#171717] text-[#171717]" : "fill-[#E6E8E2] text-[#E6E8E2]"} />
            ))}
        </span>
    )
}

function Avatar({ name }: { name: string }) {
    const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F3F4F0] text-[11px] font-semibold text-[#5C6058] ring-1 ring-[#E4E6DF]">
            {initials}
        </span>
    )
}

export function ReviewsPage() {
    const [topic, setTopic] = React.useState<Topic | typeof ALL>(ALL)
    const featured = reviews.find((r) => r.featured) ?? reviews[0]
    /* The featured review sits in the hero, so the grid shows the rest. */
    const rest = reviews.filter((r) => r !== featured)
    const shown = rest.filter((r) => topic === ALL || r.topics.includes(topic))
    const countFor = (t: Topic | typeof ALL) => (t === ALL ? rest.length : rest.filter((r) => r.topics.includes(t)).length)

    return (
        <>
            <header className="relative">
                <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
                <div
                    className="absolute inset-x-0 bottom-0 h-[60%]"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                    }}
                />
                <div className="relative z-10">
                    <HomeNavbar />
                    <Container className="pb-10 pt-8 text-center lg:pb-14 lg:pt-14">
                        <Reveal>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                                <MessageSquareQuote className="h-3 w-3" style={{ color: ACCENT }} />
                                Reviews
                            </span>
                            <h1 className="mx-auto mt-4 max-w-[760px] text-[32px] leading-[1.08] tracking-[-0.03em] sm:text-[42px] lg:text-[56px]">
                                <Serif>What sellers say</Serif>
                                <br />
                                <span className="font-semibold">about Seltrax</span>
                            </h1>
                            <p className="mx-auto mt-4 max-w-[520px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                                Store owners on running cash on delivery, dispatching with couriers, switching platforms and
                                growing with their team.
                            </p>
                        </Reveal>

                        <Reveal delay={0.08} className="mx-auto mt-8 max-w-[760px]">
                            <figure className="rounded-2xl bg-white p-6 text-left shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)] lg:p-8">
                                <div className="flex items-center justify-between">
                                    <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: ACCENT }}>
                                        <Quote className="h-4 w-4" />
                                    </span>
                                    <Stars n={featured.rating} size={16} />
                                </div>
                                <blockquote className="mt-5 text-[16px] leading-relaxed tracking-[-0.01em] lg:text-[22px]">&ldquo;{featured.text}&rdquo;</blockquote>
                                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#EEF0EA] pt-5">
                                    <Avatar name={featured.name} />
                                    <div>
                                        <p className="text-[13px] font-semibold lg:text-[14px]">{featured.name}</p>
                                        <p className="text-[11px] text-[#8A8E84] lg:text-[12px]">{featured.role}</p>
                                    </div>
                                </figcaption>
                            </figure>
                        </Reveal>
                    </Container>
                </div>
            </header>

            <Container className="pb-16 pt-6 lg:pb-24 lg:pt-10">
                <Reveal>
                    <div role="tablist" aria-label="Filter reviews by topic" className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
                        {([{ key: ALL, name: "All reviews" }, ...topics] as { key: Topic | typeof ALL; name: string }[]).map((t) => {
                            const on = topic === t.key
                            return (
                                <button
                                    key={t.key}
                                    role="tab"
                                    aria-selected={on}
                                    onClick={() => setTopic(t.key)}
                                    className={cn("relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium lg:text-[13px]", on ? "text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:text-[#171717]")}
                                >
                                    {on && <motion.span layoutId="review-topic" className="absolute inset-0 rounded-full bg-[#171717]" transition={{ duration: 0.2, ease }} />}
                                    <span className="relative">{t.name}</span>
                                    <span className={cn("relative rounded-full px-1.5 text-[9.5px] tabular-nums", on ? "bg-white/20" : "bg-white")}>{countFor(t.key)}</span>
                                </button>
                            )
                        })}
                    </div>
                </Reveal>

                <motion.ul layout className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
                    <AnimatePresence initial={false}>
                        {shown.map((r, i) => (
                            <motion.li
                                key={r.text}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.25, delay: i * 0.03, ease }}
                                className="mb-4 break-inside-avoid lg:mb-5"
                            >
                                <figure className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 lg:p-6">
                                    <Stars n={r.rating} />
                                    <blockquote className="mt-3 text-[12.5px] leading-relaxed text-[#3A3D37] lg:text-[14.5px]">&ldquo;{r.text}&rdquo;</blockquote>
                                    <div className="mt-4 flex flex-wrap gap-1">
                                        {r.topics.map((t) => (
                                            <span key={t} className="rounded-full bg-white px-2 py-0.5 text-[9.5px] text-[#5C6058] ring-1 ring-[#E4E6DF] lg:text-[10.5px]">
                                                {topics.find((x) => x.key === t)?.name}
                                            </span>
                                        ))}
                                    </div>
                                    <figcaption className="mt-4 flex items-center gap-3 border-t border-[#E4E6DF] pt-4">
                                        <Avatar name={r.name} />
                                        <div className="min-w-0">
                                            <p className="truncate text-[12px] font-semibold lg:text-[13px]">{r.name}</p>
                                            <p className="truncate text-[10.5px] text-[#8A8E84] lg:text-[11.5px]">{r.role}</p>
                                        </div>
                                    </figcaption>
                                </figure>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>

                <Reveal className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:mt-12 lg:gap-4">
                    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#171717] p-6 text-white lg:p-8">
                        <div>
                            <PenLine className="h-5 w-5" style={{ color: ACCENT }} />
                            <p className="mt-3 text-[18px] font-semibold tracking-[-0.02em] lg:text-[22px]">Selling on Seltrax?</p>
                            <p className="mt-1 text-[12px] leading-relaxed text-white/70 lg:text-[14px]">Tell us how it&apos;s going — we&apos;d love to share your story here.</p>
                        </div>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                            Share your review <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl p-6 text-white lg:p-8" style={{ background: ACCENT }}>
                        <div>
                            <p className="text-[18px] font-semibold tracking-[-0.02em] lg:text-[22px]">Write your own success story</p>
                            <p className="mt-1 text-[12px] leading-relaxed text-white/80 lg:text-[14px]">Launch today for Rs 1,349/month, everything included.</p>
                        </div>
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                            Start selling <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </Reveal>
            </Container>
        </>
    )
}
