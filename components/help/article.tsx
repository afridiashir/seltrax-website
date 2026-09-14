"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Clock, Lightbulb } from "lucide-react"
import { ACCENT } from "@/components/home/ui"
import { bySlug, headingId, ordered, sectionOf, type Article, type Block } from "./docs"
import { DocsShell } from "./shell"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"

function Render({ block }: { block: Block }) {
    switch (block.type) {
        case "h2":
            return (
                <h2 id={headingId(block.text)} className="mt-9 scroll-mt-6 text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">
                    {block.text}
                </h2>
            )
        case "p":
            return <p className="mt-3 text-[13.5px] leading-[1.75] text-[#3A3D37] lg:text-[15px]">{block.text}</p>
        case "list":
            return (
                <ul className="mt-3 space-y-2">
                    {block.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-[13.5px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                            {it}
                        </li>
                    ))}
                </ul>
            )
        case "steps":
            return (
                <ol className="relative mt-4 space-y-3">
                    {block.items.map((it, i) => (
                        <li key={it} className="flex gap-3">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#171717] text-[11px] font-semibold text-white">{i + 1}</span>
                            <p className="pt-0.5 text-[13.5px] leading-relaxed text-[#3A3D37] lg:text-[15px]">{it}</p>
                        </li>
                    ))}
                </ol>
            )
        case "note": {
            const tip = block.tone === "tip"
            const Icon = tip ? Lightbulb : AlertTriangle
            return (
                <div className={`mt-5 flex gap-3 rounded-xl border p-4 ${tip ? "border-[#CFE0FF] bg-[#F5F9FF]" : "border-[#F5D9B0] bg-[#FFF8EE]"}`}>
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tip ? ACCENT : "#B25E09" }} />
                    <p className="text-[13px] leading-relaxed text-[#3A3D37] lg:text-[14px]">{block.text}</p>
                </div>
            )
        }
    }
}

export function HelpArticle({ slug }: { slug: string }) {
    const a = bySlug(slug) as Article
    const section = sectionOf(slug)
    const i = ordered.findIndex((x) => x.slug === slug)
    const prev = i > 0 ? ordered[i - 1] : null
    const next = i < ordered.length - 1 ? ordered[i + 1] : null
    const toc = a.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")

    return (
        <DocsShell active={slug}>
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_200px]">
                <article className="min-w-0 max-w-[720px]">
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[11.5px] text-[#8A8E84] lg:text-[12px]">
                        <Link href="/help" className="hover:text-[#171717]">Help</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span>{section?.title}</span>
                    </nav>
                    <h1 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] lg:text-[38px]">{a.title}</h1>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#5C6058] lg:text-[16px]">{a.summary}</p>
                    <p className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-[#8A8E84]"><Clock className="h-3 w-3" /> {a.minutes} min read</p>

                    <div className="mt-4 border-t border-[#EEF0EA] pt-2">
                        {a.body.map((b, k) => <Render key={k} block={b} />)}
                    </div>

                    {a.related && (
                        <Link href={a.related.href} className="mt-8 flex items-center justify-between gap-3 rounded-xl border border-[#E4E6DF] bg-[#F6F7F3] px-4 py-3 text-[13px] font-medium hover:bg-[#F1F3EE]">
                            <span><span className="text-[#8A8E84]">Learn more: </span>{a.related.label}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0" />
                        </Link>
                    )}

                    <div className="mt-10 grid grid-cols-1 gap-3 border-t border-[#EEF0EA] pt-6 sm:grid-cols-2">
                        {prev ? (
                            <Link href={`/help/${prev.slug}`} className="group rounded-xl border border-[#E4E6DF] p-4 hover:bg-[#F6F7F3]">
                                <span className="inline-flex items-center gap-1 text-[11px] text-[#8A8E84]"><ArrowLeft className="h-3 w-3" /> Previous</span>
                                <span className="mt-1 block text-[13.5px] font-medium">{prev.title}</span>
                            </Link>
                        ) : <span />}
                        {next && (
                            <Link href={`/help/${next.slug}`} className="group rounded-xl border border-[#E4E6DF] p-4 text-right hover:bg-[#F6F7F3]">
                                <span className="inline-flex items-center gap-1 text-[11px] text-[#8A8E84]">Next <ArrowRight className="h-3 w-3" /></span>
                                <span className="mt-1 block text-[13.5px] font-medium">{next.title}</span>
                            </Link>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl bg-[#171717] p-5 text-white sm:flex-row sm:items-center">
                        <p className="text-[13px]">Still stuck? The team can walk you through it.</p>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                            Book a demo <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </article>

                {toc.length > 0 && (
                    <aside className="hidden xl:block">
                        <div className="sticky top-6">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">On this page</p>
                            <ul className="mt-3 space-y-2 border-l border-[#EEF0EA]">
                                {toc.map((h) => (
                                    <li key={h.text}>
                                        <a href={`#${headingId(h.text)}`} className="-ml-px block border-l border-transparent pl-3 text-[12.5px] text-[#5C6058] hover:border-[#171717] hover:text-[#171717]">
                                            {h.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                )}
            </div>
        </DocsShell>
    )
}
