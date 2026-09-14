"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Bell, Eye, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"
import { ALL, allCategory, categories, designsFor, type Category, type Design } from "./data"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const rail: Category[] = [allCategory, ...categories]

/* The selected category lives in the URL hash (/designs#watches) so links can
   deep-link to a category and the back button behaves. */
function useCategory() {
    const [slug, setSlug] = React.useState(ALL)
    React.useEffect(() => {
        const read = () => {
            const h = window.location.hash.slice(1)
            setSlug(rail.some((c) => c.slug === h) ? h : ALL)
        }
        read()
        window.addEventListener("hashchange", read)
        return () => window.removeEventListener("hashchange", read)
    }, [])
    const select = (s: string) => {
        setSlug(s)
        history.replaceState(null, "", s === ALL ? window.location.pathname : `#${s}`)
    }
    return [slug, select] as const
}

export function DesignsBrowser() {
    const [slug, select] = useCategory()
    const current = rail.find((c) => c.slug === slug) ?? allCategory
    const items = designsFor(slug)

    return (
        <>
            <header className="relative">
                <Image src="/landing/bluish.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
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
                <Container className="pb-12 pt-8 text-center lg:pb-20 lg:pt-14">
                    <Reveal>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                            <Eye className="h-3 w-3" style={{ color: ACCENT }} />
                            Store designs
                        </span>
                        <h1 className="mx-auto mt-4 max-w-[640px] text-[30px] leading-[1.1] tracking-[-0.03em] sm:text-[40px] lg:text-[52px]">
                            <Serif>Pick a look,</Serif> <span className="font-semibold">make it yours</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-[460px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                            Ready-made store designs by category. Pick one, add your logo and products, and publish — no
                            code, nothing to install.
                        </p>
                    </Reveal>
                </Container>
                </div>
            </header>

            <Container className="py-8 lg:py-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
                    {/* Category rail — horizontal chips on phones, sticky list from md up */}
                    <nav aria-label="Design categories" className="md:sticky md:top-6 md:self-start">
                        <p className="hidden px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84] md:block">Categories</p>
                        <ul className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:gap-0.5 md:overflow-visible md:px-0 md:pb-0">
                            {rail.map((c) => {
                                const on = c.slug === slug
                                const count = designsFor(c.slug).length
                                return (
                                    <li key={c.slug} className="shrink-0">
                                        <button
                                            type="button"
                                            aria-current={on ? "page" : undefined}
                                            onClick={() => select(c.slug)}
                                            className={cn(
                                                "flex w-full items-center gap-2.5 whitespace-nowrap rounded-full px-3 py-2 text-left text-[12px] font-medium transition-colors md:rounded-xl md:text-[13px]",
                                                on ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:bg-[#E6E8E2] hover:text-[#171717] md:bg-transparent",
                                            )}
                                        >
                                            <c.icon className="h-4 w-4 shrink-0" />
                                            <span className="flex-1">{c.name}</span>
                                            <span className={cn("hidden text-[10px] tabular-nums md:inline", on ? "text-white/60" : "text-[#8A8E84]")}>{count}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Results */}
                    <section aria-live="polite">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div key={slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <div>
                                        <h2 className="text-[22px] font-semibold tracking-[-0.02em] lg:text-[28px]">{current.name}</h2>
                                        <p className="mt-1 max-w-[520px] text-[11px] text-[#6B6F66] lg:text-[13px]">{current.blurb}</p>
                                    </div>
                                    <p className="text-[11px] text-[#8A8E84] lg:text-[12px]">
                                        {items.length} {items.length === 1 ? "design" : "designs"}
                                    </p>
                                </div>

                                {items.length > 0 ? (
                                    <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        {items.map((d) => (
                                            <li key={d.slug}>
                                                <DesignCard design={d} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <EmptyState category={current} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </section>
                </div>
            </Container>
        </>
    )
}

function DesignCard({ design }: { design: Design }) {
    const cat = categories.find((c) => c.slug === design.category)
    return (
        <article className="group overflow-hidden rounded-2xl border border-[#E4E6DF] bg-white transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F4F0]">
                <Image src={design.image} alt={`${design.name} store design`} fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[13px] font-semibold lg:text-[15px]">{design.name}</p>
                        <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{cat?.name}</p>
                    </div>
                    {design.preview && (
                        <a href={design.preview} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-2.5 py-1 text-[10px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            Preview <ArrowUpRight className="h-3 w-3" />
                        </a>
                    )}
                </div>
                {design.tags && design.tags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                        {design.tags.map((t) => (
                            <span key={t} className="rounded-full bg-[#F3F4F0] px-2 py-0.5 text-[9px] text-[#5C6058] lg:text-[10px]">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
                <Link href={REGISTER_URL} className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#171717] px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-black">
                    Use this design <ArrowUpRight className="h-3 w-3" />
                </Link>
            </div>
        </article>
    )
}

function EmptyState({ category }: { category: Category }) {
    return (
        <div className="mt-6 rounded-2xl border border-dashed border-[#D9DCD3] bg-[#F6F7F3] px-6 py-14 text-center lg:py-20">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-[#171717] shadow-sm">
                <category.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[15px] font-semibold lg:text-[18px]">
                {category.slug === ALL ? "Designs are on their way" : `${category.name} designs are on their way`}
            </p>
            <p className="mx-auto mt-2 max-w-[400px] text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">
                We&apos;re building out ready-made looks for {category.slug === ALL ? "every category" : "this category"}. Until then you can start from a
                blank store and customise it yourself — most sellers launch the same day.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <Link href={REGISTER_URL} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-black">
                    <Rocket className="h-3.5 w-3.5" /> Start with a blank store
                </Link>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#D9DCD3] bg-white px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                    <Bell className="h-3.5 w-3.5" /> Get notified
                </a>
            </div>
        </div>
    )
}
