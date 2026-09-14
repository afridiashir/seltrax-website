"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDownLeft, ArrowUpRight, BarChart3, Package } from "lucide-react"
import { AndroidButton } from "@/components/mobile-app/android-button"
import { ACCENT, Container, Face, Flag, Reveal, Serif, h2Class, shadow } from "./ui"

export function Mobile() {
    return (
        <section className="pt-16 lg:pt-24">
            <Container>
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Manage on the Go</Serif>
                        <span className="block font-semibold">Your Store in Your Pocket</span>
                    </h2>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                        <Chip icon={<BarChart3 className="h-3 w-3" />} label="Live sales, sessions & conversion" />
                        <Chip icon={<Package className="h-3 w-3" />} label="Orders and dispatch, anywhere" />
                    </div>
                </Reveal>
            </Container>

            <Container>
            <Reveal className="relative mt-8 lg:mt-10" delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[26px] bg-[#C9D1D2] sm:aspect-[2.3/1] lg:aspect-[2.6/1]">
                    <Image src="/landing/bluish.jpg" alt="" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-[center_45%]" />
                    <div className="absolute inset-0 bg-white/10" />

                    {/* Phone showing the Seltrax admin dashboard */}
                    <div className="absolute left-1/2 top-[6%] w-[220px] max-w-[64%] -translate-x-1/2 overflow-hidden rounded-[30px] border-[6px] border-[#171717] bg-[#F5F6F8] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] sm:top-[8%] sm:w-[190px] sm:max-w-none sm:rounded-[32px] lg:w-[240px]">
                        <div className="absolute left-1/2 top-1.5 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-[#171717]" />
                        <div className="relative aspect-[9/17.5] w-full">
                            <Image
                                src="/mobile-screenshot.jpeg"
                                alt="Seltrax dashboard on mobile: sales, sessions, conversion and funnel"
                                fill
                                sizes="240px"
                                className="object-cover object-top"
                            />
                        </div>
                    </div>

                    {/* Left floaters */}
                    <div className={`absolute left-[6%] top-[24%] hidden rounded-xl bg-white p-2.5 sm:block lg:left-[12%] lg:p-3 ${shadow}`}>
                        <div className="flex items-center gap-2">
                            <Flag code="pk" size={22} />
                            <div className="text-[9px] leading-tight lg:text-[11px]">
                                <p className="text-[#8A8E84]">New order · COD</p>
                                <p className="text-[13px] font-semibold tracking-tight lg:text-[16px]">Rs 5,700</p>
                            </div>
                        </div>
                    </div>
                    <div className={`absolute left-[10%] top-[56%] hidden rounded-xl bg-white p-2.5 sm:block lg:left-[18%] lg:p-3 ${shadow}`}>
                        <div className="flex items-center gap-2">
                            <span className="flex -space-x-1.5">
                                <Face src="/landing/avatars/a2.jpg" size={18} />
                                <Face src="/landing/avatars/a3.jpg" size={18} />
                                <Face src="/landing/avatars/a4.jpg" size={18} />
                            </span>
                            <span className="text-[12px] font-semibold lg:text-[14px]">Staff accounts</span>
                        </div>
                    </div>

                    {/* Right floaters */}
                    <div className="absolute right-[7%] top-[20%] hidden max-w-[210px] space-y-1.5 sm:block lg:right-[12%]">
                        <div className={`w-fit rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[9px] lg:text-[11px] ${shadow}`}>
                            Where is my order?
                        </div>
                        <div className={`ml-auto w-fit rounded-xl rounded-tr-sm px-2.5 py-1.5 text-[9px] text-white lg:text-[11px] ${shadow}`} style={{ background: ACCENT }}>
                            Dispatched via Leopards · #004518
                        </div>
                    </div>
                    <div className={`absolute bottom-[14%] right-[7%] hidden rounded-xl bg-white p-2.5 sm:block lg:right-[10%] lg:p-3 ${shadow}`}>
                        <div className="flex items-center gap-2">
                            <Face src="/landing/avatars/a5.jpg" size={22} alt="Ayesha Shahbaz" />
                            <div className="text-[9px] leading-tight lg:text-[11px]">
                                <p className="font-semibold">Ayesha Shahbaz</p>
                                <p className="text-[#8A8E84]">Order delivered</p>
                            </div>
                            <span className="ml-2 inline-flex items-center gap-0.5 text-[11px] font-semibold lg:text-[13px]">
                                <ArrowDownLeft className="h-3 w-3" style={{ color: ACCENT }} />
                                Rs 3,200
                            </span>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Download / about buttons sit below the phone showcase. */}
            <Reveal delay={0.15} className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:mt-8">
                <AndroidButton />
                <Link
                    href="/mobile-app"
                    className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0] lg:text-[13px]"
                >
                    About the app <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
            </Reveal>
            </Container>
        </section>
    )
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1.5 text-[10px] font-medium text-white lg:text-[12px]">
            {icon}
            {label}
        </span>
    )
}
