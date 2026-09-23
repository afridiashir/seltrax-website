"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Clock, Trash2, Undo2, UserMinus } from "lucide-react"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"
import { RenderBlock } from "./blocks"
import { COMPANY } from "./company"
import { intro, sections } from "./delete-account-content"

/* ---- Hero ------------------------------------------------------------------ */

export function DeleteAccountHero() {
    return (
        <section className="relative">
            <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_35%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/40 to-white" />
            <div className="relative z-10">
                <HomeNavbar />
                <Container className="pb-10 pt-10 text-center lg:pb-16 lg:pt-16">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <Trash2 className="h-3 w-3" style={{ color: ACCENT }} />
                        Account deletion
                    </span>
                    <h1 className="mx-auto mt-4 max-w-[760px] text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
                        Deleting your <Serif>Seltrax account</Serif>
                    </h1>
                    <p className="mx-auto mt-4 max-w-[560px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        {intro}
                    </p>
                </Container>
            </div>
        </section>
    )
}

/* ---- The three facts a reviewer (and a seller) needs first ----------------- */

const facts = [
    { icon: UserMinus, title: "From the app", desc: "Profile → Delete Account. No email, no form, no waiting on support." },
    { icon: Clock, title: "30-day window", desc: "Nothing is removed until 30 days have passed." },
    { icon: Undo2, title: "Reversible until then", desc: "Sign back in and tap Keep my account to call it off." },
]

function Facts() {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-4 lg:p-5">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white">
                            <f.icon className="h-4 w-4" />
                        </span>
                        <p className="mt-3 text-[13px] font-semibold lg:text-[14.5px]">{f.title}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[12.5px]">{f.desc}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    )
}

/* ---- Body ------------------------------------------------------------------ */

export function DeleteAccountBody() {
    return (
        <Container className="pb-16 lg:pb-24">
            <div className="mx-auto max-w-[760px]">
                <Facts />

                {sections.map((s) => (
                    <section key={s.id} id={s.id} className="scroll-mt-6">
                        <h2 className="mt-10 text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">{s.title}</h2>
                        {s.body.map((b, k) => (
                            <RenderBlock key={k} block={b} />
                        ))}
                    </section>
                ))}

                <div className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl bg-[#171717] p-5 text-white sm:flex-row sm:items-center lg:p-6">
                    <p className="text-[13px] text-white/70 lg:text-[14px]">
                        Want to know what we hold before you delete it?
                    </p>
                    <Link
                        href="/privacy"
                        className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] transition-colors hover:bg-[#F3F4F0] lg:text-[13px]"
                    >
                        Read the privacy policy <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                <p className="mt-6 text-[11.5px] text-[#8A8E84] lg:text-[12.5px]">
                    Deletion requests by email: <a href={`mailto:${COMPANY.supportEmail}`} className="underline underline-offset-2 hover:text-[#171717]">{COMPANY.supportEmail}</a>
                </p>
            </div>
        </Container>
    )
}
