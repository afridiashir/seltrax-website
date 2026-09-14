"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Bell, Clock, LayoutGrid, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const ALL = "all"

export type ListingEntry = {
    slug: string
    title: string
    excerpt: string
    category: string
    date?: string // e.g. "2026-09-14"
    readMinutes?: number
    image?: string
    href?: string // defaults to nothing until detail pages exist
    highlight?: string // case studies: a headline result, e.g. "RTO down 30%"
}

export type ListingConfig = {
    kicker: string
    icon: React.ElementType
    titleSerif: string
    titleSans: string
    intro: string
    background: string
    categories: { key: string; name: string }[]
    entries: ListingEntry[]
    noun: { one: string; many: string }
    empty: { title: string; body: string }
    after?: React.ReactNode // extra content under the grid, e.g. a demo panel
}

/* Selected category lives in the URL hash (/blog#guides). */
function useCategory(keys: string[]) {
    const [cat, setCat] = React.useState<string>(ALL)
    React.useEffect(() => {
        const read = () => {
            const h = window.location.hash.slice(1)
            setCat(keys.includes(h) ? h : ALL)
        }
        read()
        window.addEventListener("hashchange", read)
        return () => window.removeEventListener("hashchange", read)
    }, [keys])
    const select = (c: string) => {
        setCat(c)
        history.replaceState(null, "", c === ALL ? window.location.pathname : `#${c}`)
    }
    return [cat, select] as const
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

export function Listing({ config }: { config: ListingConfig }) {
    const keys = React.useMemo(() => config.categories.map((c) => c.key), [config.categories])
    const [cat, select] = useCategory(keys)
    const rail = [{ key: ALL, name: `All ${config.noun.many}` }, ...config.categories]
    const current = rail.find((r) => r.key === cat) ?? rail[0]
    const sorted = [...config.entries].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
    const shown = cat === ALL ? sorted : sorted.filter((e) => e.category === cat)
    const countFor = (k: string) => (k === ALL ? config.entries.length : config.entries.filter((e) => e.category === k).length)
    const catName = (k: string) => config.categories.find((c) => c.key === k)?.name ?? k
    const Icon = config.icon

    return (
        <>
            <header className="relative">
                <Image src={config.background} alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
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
                    <Container className="pb-10 pt-8 text-center lg:pb-16 lg:pt-14">
                        <Reveal>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                                <Icon className="h-3 w-3" style={{ color: ACCENT }} />
                                {config.kicker}
                            </span>
                            <h1 className="mx-auto mt-4 max-w-[760px] text-[30px] leading-[1.1] tracking-[-0.03em] sm:text-[40px] lg:text-[52px]">
                                <Serif>{config.titleSerif}</Serif> <span className="font-semibold">{config.titleSans}</span>
                            </h1>
                            <p className="mx-auto mt-4 max-w-[520px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">{config.intro}</p>
                        </Reveal>
                    </Container>
                </div>
            </header>

            <Container className="py-8 lg:py-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
                    <nav aria-label={`${config.kicker} categories`} className="md:sticky md:top-6 md:self-start">
                        <p className="hidden px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84] md:block">Categories</p>
                        <ul className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:gap-0.5 md:overflow-visible md:px-0 md:pb-0">
                            {rail.map((c) => {
                                const on = c.key === cat
                                return (
                                    <li key={c.key} className="shrink-0">
                                        <button
                                            type="button"
                                            aria-current={on ? "page" : undefined}
                                            onClick={() => select(c.key)}
                                            className={cn(
                                                "flex w-full items-center gap-2.5 whitespace-nowrap rounded-full px-3 py-2 text-left text-[12px] font-medium transition-colors md:rounded-xl md:text-[13px]",
                                                on ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:bg-[#E6E8E2] hover:text-[#171717] md:bg-transparent",
                                            )}
                                        >
                                            {c.key === ALL && <LayoutGrid className="h-4 w-4 shrink-0" />}
                                            <span className="flex-1">{c.name}</span>
                                            <span className={cn("hidden text-[10px] tabular-nums md:inline", on ? "text-white/60" : "text-[#8A8E84]")}>{countFor(c.key)}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <section aria-live="polite">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div key={cat} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <h2 className="text-[22px] font-semibold tracking-[-0.02em] lg:text-[28px]">{current.name}</h2>
                                    <p className="text-[11px] text-[#8A8E84] lg:text-[12px]">
                                        {shown.length} {shown.length === 1 ? config.noun.one : config.noun.many}
                                    </p>
                                </div>

                                {shown.length > 0 ? (
                                    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        {shown.map((e) => (
                                            <li key={e.slug}>
                                                <EntryCard entry={e} category={catName(e.category)} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="mt-6 rounded-2xl border border-dashed border-[#D9DCD3] bg-[#F6F7F3] px-6 py-14 text-center lg:py-20">
                                        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-[#171717] shadow-sm">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <p className="mt-4 text-[15px] font-semibold lg:text-[18px]">{config.empty.title}</p>
                                        <p className="mx-auto mt-2 max-w-[420px] text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{config.empty.body}</p>
                                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                            <Link href={REGISTER_URL} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white hover:bg-black">
                                                <Rocket className="h-3.5 w-3.5" /> Start selling
                                            </Link>
                                            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#D9DCD3] bg-white px-4 py-2 text-[12px] font-medium hover:bg-[#F3F4F0]">
                                                <Bell className="h-3.5 w-3.5" /> Talk to us
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {config.after}
                            </motion.div>
                        </AnimatePresence>
                    </section>
                </div>
            </Container>
        </>
    )
}

function EntryCard({ entry, category }: { entry: ListingEntry; category: string }) {
    const inner = (
        <>
            {(entry.image || entry.highlight) && (
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-[#F3F4F0]">
                    {entry.image && <Image src={entry.image} alt="" fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
                    {entry.highlight && (
                        <span className="absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: ACCENT }}>
                            {entry.highlight}
                        </span>
                    )}
                </div>
            )}
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>{category}</p>
            <p className="mt-1 text-[15px] font-semibold leading-snug tracking-[-0.01em] lg:text-[17px]">{entry.title}</p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{entry.excerpt}</p>
            {(entry.date || entry.readMinutes) && (
                <p className="mt-3 flex items-center gap-2 text-[10.5px] text-[#8A8E84] lg:text-[11.5px]">
                    {entry.date && <span>{fmtDate(entry.date)}</span>}
                    {entry.readMinutes && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {entry.readMinutes} min read</span>}
                </p>
            )}
        </>
    )
    const cls = "group block h-full rounded-2xl border border-[#E4E6DF] bg-white p-4 transition-all lg:p-5"
    return entry.href ? (
        <Link href={entry.href} className={cn(cls, "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]")}>
            {inner}
            <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium">Read <ArrowUpRight className="h-3.5 w-3.5" /></span>
        </Link>
    ) : (
        <div className={cls}>{inner}</div>
    )
}
