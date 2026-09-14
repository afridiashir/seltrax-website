"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight, BarChart3, CalendarCheck, Rocket, ShoppingBag, Truck, Palette, Users } from "lucide-react"
import { ACCENT, Reveal, Serif } from "@/components/home/ui"
import { bySlug, sections } from "./docs"
import { DocsShell } from "./shell"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const icons: Record<string, React.ElementType> = { start: Rocket, selling: ShoppingBag, shipping: Truck, store: Palette, growth: BarChart3, account: Users }

export function HelpHome() {
    return (
        <DocsShell>
            <Reveal>
                <h1 className="text-[30px] leading-[1.1] tracking-[-0.03em] lg:text-[44px]">
                    <Serif>How can we</Serif> <span className="font-semibold">help?</span>
                </h1>
                <p className="mt-3 max-w-[560px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                    Step-by-step guides for setting up and running your store on Seltrax. New here? Start with{" "}
                    <Link href="/help/welcome" className="font-medium underline underline-offset-2">Welcome to Seltrax</Link>.
                </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
                {sections.map((s, i) => {
                    const Icon = icons[s.key] ?? Rocket
                    return (
                        <Reveal key={s.key} delay={i * 0.04}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-white p-5 lg:p-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white"><Icon className="h-4 w-4" /></span>
                                    <p className="text-[14px] font-semibold lg:text-[16px]">{s.title}</p>
                                </div>
                                <ul className="mt-3 divide-y divide-[#EEF0EA]">
                                    {s.articles.map((slug) => {
                                        const a = bySlug(slug)
                                        if (!a) return null
                                        return (
                                            <li key={slug}>
                                                <Link href={`/help/${slug}`} className="group flex items-center justify-between gap-3 py-2.5 text-[12.5px] lg:text-[13.5px]">
                                                    <span className="text-[#3A3D37] group-hover:text-[#171717]">{a.title}</span>
                                                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#B5B9B0] transition-transform group-hover:translate-x-0.5 group-hover:text-[#171717]" />
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </Reveal>
                    )
                })}
            </div>

            <Reveal className="mt-6">
                <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#171717] p-6 text-white sm:flex-row sm:items-center lg:p-8">
                    <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: ACCENT }}>
                            <CalendarCheck className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-[16px] font-semibold lg:text-[20px]">Rather see it live? Book a demo</p>
                            <p className="mt-1 text-[12px] text-white/70 lg:text-[13.5px]">A walkthrough with the team — setup, couriers, migration or anything else.</p>
                        </div>
                    </div>
                    <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                        Pick a time <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </Reveal>
        </DocsShell>
    )
}
