"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, LayoutGrid, Megaphone, MessageCircle, PlugZap, Search, ShieldCheck, Truck, BarChart3, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"
import { categories, categoryName, integrations, type CategoryKey } from "./data"
import { IntegrationLogo } from "./logo"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const ALL = "all"
const icons: Record<CategoryKey | typeof ALL, React.ElementType> = {
    all: LayoutGrid,
    marketing: Megaphone,
    analytics: BarChart3,
    shipping: Truck,
    messaging: MessageCircle,
    email: Mail,
    trust: ShieldCheck,
}

/* Selected category lives in the URL hash (/integrations#shipping). */
function useCategory() {
    const [cat, setCat] = React.useState<CategoryKey | typeof ALL>(ALL)
    React.useEffect(() => {
        const read = () => {
            const h = window.location.hash.slice(1)
            setCat(categories.some((c) => c.key === h) ? (h as CategoryKey) : ALL)
        }
        read()
        window.addEventListener("hashchange", read)
        return () => window.removeEventListener("hashchange", read)
    }, [])
    const select = (c: CategoryKey | typeof ALL) => {
        setCat(c)
        history.replaceState(null, "", c === ALL ? window.location.pathname : `#${c}`)
    }
    return [cat, select] as const
}

export function IntegrationsDirectory() {
    const [cat, select] = useCategory()
    const [q, setQ] = React.useState("")
    const rail = [{ key: ALL as typeof ALL, name: "All integrations", blurb: "Everything you can connect to your store." }, ...categories]
    const current = rail.find((r) => r.key === cat) ?? rail[0]
    const shown = integrations.filter(
        (i) => (cat === ALL || i.category === cat) && (!q || `${i.name} ${i.tagline} ${categoryName(i.category)}`.toLowerCase().includes(q.toLowerCase())),
    )

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
                    <Container className="pb-10 pt-8 text-center lg:pb-16 lg:pt-14">
                        <Reveal>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                                <PlugZap className="h-3 w-3" style={{ color: ACCENT }} />
                                Integrations
                            </span>
                            <h1 className="mx-auto mt-4 max-w-[720px] text-[30px] leading-[1.1] tracking-[-0.03em] sm:text-[40px] lg:text-[52px]">
                                <Serif>Connect the tools</Serif> <span className="font-semibold">you already use</span>
                            </h1>
                            <p className="mx-auto mt-4 max-w-[500px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                                Couriers, ad pixels, analytics, messaging and email — connected from settings, included on every plan,
                                and none of them slow your store down.
                            </p>
                            <label className="mx-auto mt-6 flex max-w-[420px] items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-[#E4E6DF]">
                                <Search className="h-4 w-4 text-[#8A8E84]" />
                                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search integrations" className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#B5B9B0] lg:text-[13px]" />
                            </label>
                        </Reveal>
                    </Container>
                </div>
            </header>

            <Container className="py-8 lg:py-12">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
                    <nav aria-label="Integration categories" className="md:sticky md:top-6 md:self-start">
                        <p className="hidden px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84] md:block">Categories</p>
                        <ul className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:gap-0.5 md:overflow-visible md:px-0 md:pb-0">
                            {rail.map((c) => {
                                const on = c.key === cat
                                const Icon = icons[c.key]
                                const count = c.key === ALL ? integrations.length : integrations.filter((i) => i.category === c.key).length
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
                                            <Icon className="h-4 w-4 shrink-0" />
                                            <span className="flex-1">{c.name}</span>
                                            <span className={cn("hidden text-[10px] tabular-nums md:inline", on ? "text-white/60" : "text-[#8A8E84]")}>{count}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    <section aria-live="polite">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div key={`${cat}-${q ? "q" : ""}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease }}>
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <div>
                                        <h2 className="text-[22px] font-semibold tracking-[-0.02em] lg:text-[28px]">{current.name}</h2>
                                        <p className="mt-1 text-[11px] text-[#6B6F66] lg:text-[13px]">{current.blurb}</p>
                                    </div>
                                    <p className="text-[11px] text-[#8A8E84] lg:text-[12px]">
                                        {shown.length} {shown.length === 1 ? "integration" : "integrations"}
                                    </p>
                                </div>

                                {shown.length > 0 ? (
                                    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:gap-4">
                                        {shown.map((i) => (
                                            <li key={i.slug}>
                                                <Link href={`/integrations/${i.slug}`} className="group flex h-full flex-col rounded-2xl border border-[#E4E6DF] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <IntegrationLogo item={i} size={48} />
                                                        <span className="rounded-full bg-[#E6F4EC] px-2 py-0.5 text-[9.5px] font-semibold text-[#0F7A44]">Included</span>
                                                    </div>
                                                    <p className="mt-4 text-[14px] font-semibold lg:text-[16px]">{i.name}</p>
                                                    <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{categoryName(i.category)}</p>
                                                    <p className="mt-2 flex-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{i.tagline}</p>
                                                    <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium lg:text-[12px]">
                                                        Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="mt-6 rounded-2xl border border-dashed border-[#D9DCD3] bg-[#F6F7F3] px-6 py-14 text-center">
                                        <p className="text-[15px] font-semibold">No integrations match &ldquo;{q}&rdquo;</p>
                                        <p className="mx-auto mt-2 max-w-[360px] text-[12px] text-[#6B6F66]">Need something that isn&apos;t here? Tell us and we&apos;ll look at adding it.</p>
                                    </div>
                                )}

                                <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#171717] p-5 text-white sm:flex-row sm:items-center lg:p-6">
                                    <div>
                                        <p className="text-[14px] font-semibold lg:text-[16px]">Missing a tool you rely on?</p>
                                        <p className="mt-1 text-[11px] text-white/70 lg:text-[13px]">Request an integration — new couriers and marketing tools are added on request.</p>
                                    </div>
                                    <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                                        Request an integration <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </section>
                </div>
            </Container>
        </>
    )
}
