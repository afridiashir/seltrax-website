"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { LOGIN_URL, REGISTER_URL } from "@/lib/config"
import { Logo } from "./ui"

const links = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
]

export function HomeNavbar() {
    const [open, setOpen] = React.useState(false)

    return (
        <header className="relative">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:h-16 lg:px-12">
                <Link href="/" aria-label="Seltrax home">
                    <Logo />
                </Link>

                <nav className="hidden items-center gap-7 md:flex">
                    {links.map((l, i) => (
                        <a
                            key={l.name}
                            href={l.href}
                            className={
                                i === 0
                                    ? "text-[12px] font-medium text-[#171717] lg:text-[13px]"
                                    : "text-[12px] font-medium text-[#5C6058] transition-colors hover:text-[#171717] lg:text-[13px]"
                            }
                        >
                            {l.name}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-2 md:flex">
                    <Link
                        href={LOGIN_URL}
                        className="rounded-full border border-[#D9DCD3] bg-white/70 px-4 py-1.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:text-[13px]"
                    >
                        Login
                    </Link>
                    <Link
                        href={REGISTER_URL}
                        className="rounded-full bg-[#171717] px-4 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[13px]"
                    >
                        Start selling
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label="Toggle menu"
                    onClick={() => setOpen((o) => !o)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9DCD3] md:hidden"
                >
                    {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            {open && (
                <div className="mx-4 mb-3 flex flex-col gap-1 rounded-2xl border border-[#E4E6DF] bg-white p-3 shadow-lg md:hidden">
                    {links.map((l) => (
                        <a
                            key={l.name}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-[13px] font-medium hover:bg-[#F3F4F0]"
                        >
                            {l.name}
                        </a>
                    ))}
                    <div className="mt-2 flex gap-2">
                        <Link href={LOGIN_URL} className="flex-1 rounded-full border border-[#D9DCD3] py-2 text-center text-[12px] font-medium">
                            Login
                        </Link>
                        <Link href={REGISTER_URL} className="flex-1 rounded-full bg-[#171717] py-2 text-center text-[12px] font-medium text-white">
                            Start selling
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
