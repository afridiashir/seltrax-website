"use client"

import Image from "next/image"
import { CalendarDays, EyeOff, Lock, ShieldCheck, Smartphone, Trash2 } from "lucide-react"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif } from "@/components/home/ui"
import { RenderBlock } from "./blocks"
import { COMPANY, LAST_UPDATED, contactSection, intro, sections } from "./privacy-policy"

/* ---- Hero ------------------------------------------------------------------ */

export function PrivacyHero() {
    return (
        <section className="relative">
            <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_35%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/40 to-white" />
            <div className="relative z-10">
                <HomeNavbar />
                <Container className="pb-10 pt-10 text-center lg:pb-16 lg:pt-16">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <ShieldCheck className="h-3 w-3" style={{ color: ACCENT }} />
                        Legal
                    </span>
                    <h1 className="mx-auto mt-4 max-w-[760px] text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[46px] lg:text-[58px]">
                        <Serif>Privacy</Serif> Policy
                    </h1>
                    <p className="mx-auto mt-4 max-w-[560px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        What Seltrax collects, why we collect it, who else sees it, and how to get rid of it — in
                        plain language, matching what the platform actually does.
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-[11px] text-[#5C6058] backdrop-blur lg:text-[12px]">
                        <CalendarDays className="h-3 w-3" /> Last updated {LAST_UPDATED}
                    </p>
                </Container>
            </div>
        </section>
    )
}

/* ---- At a glance ----------------------------------------------------------- */

const highlights = [
    { icon: EyeOff, title: "Never sold", desc: "We don't sell your data and we don't share it with advertising networks." },
    { icon: Trash2, title: "Delete it yourself", desc: "Delete your account from the app. It runs 30 days later, cancellable until then." },
    { icon: Smartphone, title: "No camera, no mic", desc: "No location, contacts or audio either. Photos only when you pick one." },
    { icon: Lock, title: "Encrypted in transit", desc: "TLS everywhere, bcrypt password hashes, sessions we can revoke." },
]

function AtAGlance() {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-4 lg:p-5">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white">
                            <h.icon className="h-4 w-4" />
                        </span>
                        <p className="mt-3 text-[13px] font-semibold lg:text-[14.5px]">{h.title}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[12.5px]">{h.desc}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    )
}

/* ---- Policy body ----------------------------------------------------------- */

export function PrivacyBody() {
    const index = [...sections.map((s) => ({ id: s.id, title: s.title })), { id: contactSection.id, title: contactSection.title }]

    return (
        <Container className="pb-16 lg:pb-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
                <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto lg:pb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">On this page</p>
                    <ol className="mt-3 space-y-0.5 border-l border-[#EEF0EA]">
                        {index.map((s, i) => (
                            <li key={s.id}>
                                <a
                                    href={`#${s.id}`}
                                    className="-ml-px flex gap-2 border-l border-transparent py-1 pl-3 text-[12.5px] leading-snug text-[#5C6058] transition-colors hover:border-[#171717] hover:text-[#171717]"
                                >
                                    <span className="text-[#B5B9B0]">{i + 1}.</span>
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </aside>

                <div className="min-w-0 max-w-[760px]">
                    <AtAGlance />

                    <div className="mt-8 border-t border-[#EEF0EA] pt-2">
                        {intro.map((b, i) => (
                            <RenderBlock key={i} block={b} />
                        ))}
                    </div>

                    {sections.map((s, i) => (
                        <section key={s.id} id={s.id} className="scroll-mt-6">
                            <h2 className="mt-10 text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">
                                <span className="mr-2 text-[#B5B9B0]">{i + 1}.</span>
                                {s.title}
                            </h2>
                            {s.body.map((b, k) => (
                                <RenderBlock key={k} block={b} />
                            ))}
                        </section>
                    ))}

                    <section id={contactSection.id} className="scroll-mt-6">
                        <h2 className="mt-10 text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">
                            <span className="mr-2 text-[#B5B9B0]">{sections.length + 1}.</span>
                            {contactSection.title}
                        </h2>
                        <div className="mt-4 rounded-2xl bg-[#171717] p-5 text-white lg:p-6">
                            <p className="text-[13px] text-white/60 lg:text-[14px]">
                                Questions about this policy, or a request about your data?
                            </p>
                            <p className="mt-3 text-[14px] font-semibold lg:text-[16px]">{COMPANY.legalEntity}</p>
                            <p className="mt-1 text-[12.5px] text-white/70 lg:text-[13.5px]">{COMPANY.postalAddress}</p>
                            <a
                                href={`mailto:${COMPANY.privacyEmail}`}
                                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#171717] transition-colors hover:bg-[#F3F4F0] lg:text-[13px]"
                            >
                                {COMPANY.privacyEmail}
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </Container>
    )
}
