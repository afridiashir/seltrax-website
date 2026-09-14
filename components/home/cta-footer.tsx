"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { LOGIN_URL, REGISTER_URL } from "@/lib/config"
import { Logo, Reveal } from "./ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"

const columns = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "/#features" },
            { name: "Designs", href: "/designs" },
            { name: "How it works", href: "/#how-it-works" },
            { name: "Mobile app", href: "/mobile-app" },
            { name: "FAQ", href: "/#faq" },
            { name: "Status", href: "/health", external: true },
        ],
    },
    {
        title: "Get started",
        links: [
            { name: "Create your store", href: REGISTER_URL },
            { name: "Login", href: LOGIN_URL },
            { name: "Book a demo", href: DEMO_URL },
        ],
    },
    {
        title: "Compare",
        links: [
            { name: "Seltrax vs Shopify", href: "/compare#shopify" },
            { name: "Seltrax vs WooCommerce", href: "/compare#woocommerce" },
        ],
    },
]

export function CTAFooter() {
    return (
        <Reveal className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
            {/* Rounded photo card with the footer nested inside it as a white card,
                as in the reference design. */}
            <section className="relative overflow-hidden rounded-[28px] bg-[#C9D1D2]">
                <Image src="/landing/scenery.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_30%]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/30" />

                <div className="relative z-10 px-5 pt-12 text-center sm:pt-16 lg:pt-24">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium backdrop-blur lg:text-[12px]">
                        <Plus className="h-3 w-3" /> Get started
                    </span>
                    <h2 className="mx-auto mt-4 max-w-[360px] text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[30px] lg:max-w-[560px] lg:text-[42px]">
                        Your store could be live tonight
                    </h2>
                    <p className="mx-auto mt-3 max-w-[340px] text-[10.5px] leading-relaxed text-[#3A3D37] lg:max-w-[480px] lg:text-[14px]">
                        Sign up, pick a theme, add your products — most sellers launch in under an hour.
                        Rs 1,349/month, everything included, cancel anytime.
                    </p>
                    <Link
                        href={REGISTER_URL}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] py-1.5 pl-4 pr-1.5 text-[11px] font-medium text-white transition-colors hover:bg-black lg:mt-8 lg:py-2 lg:pl-5 lg:pr-2 lg:text-[13px]"
                    >
                        Create your store
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#171717] lg:h-7 lg:w-7">
                            <ArrowRight className="h-3 w-3" />
                        </span>
                    </Link>
                </div>

                <footer className="relative z-10 m-3 mt-12 rounded-2xl bg-white p-5 sm:m-4 sm:mt-14 sm:p-7 lg:m-6 lg:mt-20 lg:p-10">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
                        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                            <Logo />
                            <p className="mt-3 max-w-[260px] text-[9px] leading-relaxed text-[#6B6F66] lg:text-[12px]">
                                Launch your online store in minutes — fast, affordable, and everything built in.
                            </p>
                        </div>

                        {columns.map((c) => (
                            <div key={c.title}>
                                <p className="text-[10px] font-semibold lg:text-[12px]">{c.title}</p>
                                <ul className="mt-2.5 space-y-1.5 lg:mt-3 lg:space-y-2">
                                    {c.links.map((l) => (
                                        <li key={l.name}>
                                            <Link
                                                href={l.href}
                                                target={"external" in l && l.external ? "_blank" : undefined}
                                                rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                                                className="text-[9px] text-[#6B6F66] transition-colors hover:text-[#171717] lg:text-[12px]"
                                            >
                                                {l.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-[#EEF0EA] pt-4 text-[9px] text-[#6B6F66] sm:flex-row sm:items-center sm:justify-between lg:text-[11px]">
                        <p>© {new Date().getFullYear()} Seltrax. All rights reserved.</p>
                        <p>Made for sellers in Pakistan 🇵🇰</p>
                    </div>
                </footer>
            </section>
        </Reveal>
    )
}
