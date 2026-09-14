"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Zap } from "lucide-react"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif, h2Class } from "@/components/home/ui"
import { bySlug, categoryName, type Integration } from "./data"
import { IntegrationLogo } from "./logo"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"

export function IntegrationDetail({ slug }: { slug: string }) {
    const item = bySlug(slug) as Integration
    const related = item.related.map(bySlug).filter(Boolean) as Integration[]

    return (
        <>
            <header className="relative">
                <Image src="/landing/mist.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
                <div
                    className="absolute inset-x-0 bottom-0 h-[62%]"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                    }}
                />
                <div className="relative z-10">
                    <HomeNavbar />
                    <Container className="pb-10 pt-6 lg:pb-16 lg:pt-10">
                        <Link href={`/integrations#${item.category}`} className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium backdrop-blur hover:bg-white lg:text-[12px]">
                            <ArrowLeft className="h-3 w-3" /> All integrations
                        </Link>
                        <Reveal className="mt-6 flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
                            <div className="rounded-full bg-white p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]">
                                <IntegrationLogo item={item} size={88} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="rounded-full bg-[#171717] px-2.5 py-0.5 text-[10px] font-medium text-white lg:text-[11px]">{categoryName(item.category)}</span>
                                    <span className="rounded-full bg-[#E6F4EC] px-2.5 py-0.5 text-[10px] font-semibold text-[#0F7A44] lg:text-[11px]">Included on every plan</span>
                                </div>
                                <h1 className="mt-3 text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] lg:text-[52px]">
                                    {item.name} <Serif className="text-[#5C6058]">for Seltrax</Serif>
                                </h1>
                                <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[16px]">{item.tagline}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white hover:bg-black lg:text-[14px]">
                                    Connect {item.name.split(" ")[0]} <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </Reveal>
                    </Container>
                </div>
            </header>

            <Container>
                <div className="grid grid-cols-1 gap-8 pb-6 pt-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:pt-8">
                    <div>
                        <Reveal>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Overview</p>
                            <p className="mt-3 text-[14px] leading-relaxed text-[#3A3D37] lg:text-[17px]">{item.overview}</p>
                        </Reveal>

                        <Reveal className="mt-10">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">What you get</p>
                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {item.features.map((f) => (
                                    <div key={f.title} className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5">
                                        <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: ACCENT }}><Check className="h-4 w-4" /></span>
                                        <p className="mt-3 text-[13px] font-semibold lg:text-[15px]">{f.title}</p>
                                        <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal className="mt-10">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">How to connect</p>
                            <ol className="relative mt-4">
                                <span className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-[2px] bg-[#EEF0EA]" />
                                {item.setup.map((s, i) => (
                                    <li key={s} className="relative flex gap-4 pb-4 last:pb-0">
                                        <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#171717] text-[12px] font-semibold text-white">{i + 1}</span>
                                        <p className="pt-1.5 text-[12px] leading-relaxed lg:text-[14px]">{s}</p>
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
                    </div>

                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <Reveal>
                            <div className="rounded-2xl border border-[#E4E6DF] bg-white p-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Details</p>
                                <dl className="mt-2">
                                    <div className="flex items-baseline justify-between gap-3 border-b border-[#EEF0EA] py-2.5 text-[11px] lg:text-[12.5px]">
                                        <dt className="shrink-0 text-[#8A8E84]">Category</dt>
                                        <dd className="text-right font-medium">{categoryName(item.category)}</dd>
                                    </div>
                                    {item.specs.map((s) => (
                                        <div key={s.k} className="flex items-baseline justify-between gap-3 border-b border-[#EEF0EA] py-2.5 text-[11px] last:border-b-0 lg:text-[12.5px]">
                                            <dt className="shrink-0 text-[#8A8E84]">{s.k}</dt>
                                            <dd className="text-right font-medium">{s.v}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F6F7F3] p-3 text-[10.5px] leading-relaxed text-[#3A3D37] lg:text-[11.5px]">
                                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                                    Integrations load after your page is usable, so connecting one never costs you speed.
                                </div>
                                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-1 rounded-full border border-[#D9DCD3] py-2 text-[12px] font-medium hover:bg-[#F3F4F0]">
                                    Need help setting it up? <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </Reveal>
                    </aside>
                </div>

                {related.length > 0 && (
                    <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
                        <Reveal>
                            <h2 className={h2Class}>
                                <Serif className="block">Works well with</Serif>
                                <span className="block font-semibold">Related Integrations</span>
                            </h2>
                        </Reveal>
                        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-10 lg:gap-4">
                            {related.map((r, i) => (
                                <Reveal key={r.slug} delay={i * 0.06}>
                                    <li>
                                        <Link href={`/integrations/${r.slug}`} className="group flex items-center gap-3 rounded-2xl border border-[#E4E6DF] bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]">
                                            <IntegrationLogo item={r} size={44} />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[13px] font-semibold lg:text-[14px]">{r.name}</p>
                                                <p className="truncate text-[10.5px] text-[#8A8E84] lg:text-[11.5px]">{r.tagline}</p>
                                            </div>
                                            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#8A8E84] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </Link>
                                    </li>
                                </Reveal>
                            ))}
                        </ul>
                    </section>
                )}
            </Container>
        </>
    )
}
