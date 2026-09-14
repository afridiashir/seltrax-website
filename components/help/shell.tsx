"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, LifeBuoy, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container } from "@/components/home/ui"
import { articles, bySlug, sections } from "./docs"

/* Docs layout: a slim header band, then a sticky sidebar of sections and
   articles next to the content. On phones the sidebar collapses behind a
   "Browse topics" toggle. */
export function DocsShell({ active, children }: { active?: string; children: React.ReactNode }) {
    const [q, setQ] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const query = q.trim().toLowerCase()
    const matches = (slug: string) => {
        if (!query) return true
        const a = bySlug(slug)
        return !!a && `${a.title} ${a.summary}`.toLowerCase().includes(query)
    }
    const total = articles.filter((a) => matches(a.slug)).length

    return (
        <>
            <header className="relative">
                <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_35%]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/40 to-white" />
                <div className="relative z-10">
                    <HomeNavbar />
                    <Container className="pb-8 pt-4 lg:pb-10 lg:pt-6">
                        <Link href="/help" className="inline-flex items-center gap-2 text-[13px] font-semibold lg:text-[15px]">
                            <span className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ background: ACCENT }}>
                                <LifeBuoy className="h-4 w-4" />
                            </span>
                            Seltrax Help Center
                        </Link>
                    </Container>
                </div>
            </header>

            <Container className="pb-16 lg:pb-24">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
                    <aside className="md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:self-start md:overflow-y-auto md:pb-6">
                        <label className="flex items-center gap-2 rounded-xl border border-[#E4E6DF] bg-white px-3 py-2">
                            <Search className="h-3.5 w-3.5 text-[#8A8E84]" />
                            <input value={q} onChange={(e) => { setQ(e.target.value); if (e.target.value) setOpen(true) }} placeholder="Search the docs" className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#B5B9B0] lg:text-[13px]" />
                        </label>

                        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 flex w-full items-center justify-between rounded-xl bg-[#F3F4F0] px-3 py-2 text-[12px] font-medium md:hidden">
                            Browse topics
                            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                        </button>

                        <nav aria-label="Help articles" className={cn("mt-4 space-y-5", !open && "hidden md:block")}>
                            {sections.map((s) => {
                                const items = s.articles.filter(matches)
                                if (!items.length) return null
                                return (
                                    <div key={s.key}>
                                        <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">{s.title}</p>
                                        <ul className="mt-1.5 space-y-0.5">
                                            {items.map((slug) => {
                                                const a = bySlug(slug)
                                                if (!a) return null
                                                const on = slug === active
                                                return (
                                                    <li key={slug}>
                                                        <Link
                                                            href={`/help/${slug}`}
                                                            aria-current={on ? "page" : undefined}
                                                            onClick={() => setOpen(false)}
                                                            className={cn(
                                                                "block rounded-lg border-l-2 px-2.5 py-1.5 text-[12.5px] transition-colors lg:text-[13px]",
                                                                on ? "border-[#2B7FFF] bg-[#F5F9FF] font-medium text-[#171717]" : "border-transparent text-[#5C6058] hover:bg-[#F6F7F3] hover:text-[#171717]",
                                                            )}
                                                        >
                                                            {a.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                            {total === 0 && <p className="px-2 text-[12px] text-[#8A8E84]">No articles match &ldquo;{q}&rdquo;.</p>}
                        </nav>
                    </aside>

                    <div className="min-w-0">{children}</div>
                </div>
            </Container>
        </>
    )
}
