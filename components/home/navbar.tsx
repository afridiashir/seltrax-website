"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LOGIN_URL, REGISTER_URL } from "@/lib/config"
import { NAV, type NavGroup, type NavItem, type NavLink } from "./nav-data"
import { ACCENT, Logo } from "./ui"

const ease = [0.22, 1, 0.36, 1] as const
const CLOSE_DELAY = 160

export function HomeNavbar() {
    const [open, setOpen] = React.useState<string | null>(null)
    const [mobile, setMobile] = React.useState(false)
    const closeTimer = React.useRef<number | null>(null)

    const cancelClose = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current)
        closeTimer.current = null
    }
    const scheduleClose = () => {
        cancelClose()
        closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY)
    }
    const show = (label: string) => {
        cancelClose()
        setOpen(label)
    }

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    const active = NAV.find((n) => n.label === open && n.kind !== "link") as Exclude<NavItem, { kind: "link" }> | undefined

    return (
        <header className="relative z-50" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:h-16 lg:px-12">
                <Link href="/" aria-label="Seltrax home" onClick={() => setOpen(null)}>
                    <Logo />
                </Link>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
                    {NAV.map((item) =>
                        item.kind === "link" ? (
                            <a
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => show("")}
                                className="rounded-full px-3 py-1.5 text-[12px] font-medium text-[#3A3D37] transition-colors hover:bg-white/60 hover:text-[#171717] lg:text-[13px]"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <button
                                key={item.label}
                                type="button"
                                aria-haspopup="true"
                                aria-expanded={open === item.label}
                                onMouseEnter={() => show(item.label)}
                                onFocus={() => show(item.label)}
                                onClick={() => setOpen((o) => (o === item.label ? null : item.label))}
                                className={cn(
                                    "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors lg:text-[13px]",
                                    open === item.label ? "bg-white text-[#171717] shadow-sm" : "text-[#3A3D37] hover:bg-white/60 hover:text-[#171717]",
                                )}
                            >
                                {item.label}
                                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", open === item.label && "rotate-180")} />
                            </button>
                        ),
                    )}
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
                    aria-expanded={mobile}
                    onClick={() => setMobile((o) => !o)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9DCD3] bg-white/70 backdrop-blur md:hidden"
                >
                    {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            {/* Desktop panel: full viewport width (minus the page gutter), white, rounded. */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        key={active.label}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        className="absolute inset-x-3 top-full z-50 hidden pt-2 sm:inset-x-4 md:block lg:inset-x-6"
                    >
                        <div className="overflow-hidden rounded-2xl border border-[#E4E6DF] bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)]">
                            {active.kind === "mega" ? <MegaPanel item={active} onNavigate={() => setOpen(null)} /> : <ListPanel links={active.links} onNavigate={() => setOpen(null)} />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile sheet */}
            <AnimatePresence>
                {mobile && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute inset-x-3 top-full z-50 mt-2 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-[#E4E6DF] bg-white p-3 shadow-xl md:hidden"
                    >
                        <MobileMenu onNavigate={() => setMobile(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

/* ---- Mega panel: every category shown at once as a column of links ------ */

function MegaPanel({ item, onNavigate }: { item: Extract<NavItem, { kind: "mega" }>; onNavigate: () => void }) {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_260px]">
            <div
                className="grid gap-x-4 gap-y-6 p-5 lg:p-6"
                style={{ gridTemplateColumns: `repeat(${item.groups.length}, minmax(0, 1fr))` }}
            >
                {item.groups.map((g: NavGroup) => (
                    <div key={g.label} className="min-w-0">
                        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">{g.label}</p>
                        <ul className="mt-2 space-y-0.5">
                            {g.links.map((l) => (
                                <li key={l.title}>
                                    <NavLinkRow link={l} onNavigate={onNavigate} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* CTA card */}
            <div className="hidden border-l border-[#EEF0EA] p-5 lg:block">
                <div className="flex h-full flex-col justify-between rounded-xl bg-[#171717] p-5 text-white">
                    <div>
                        <p className="text-[15px] font-semibold leading-snug">{item.cta.title}</p>
                        <p className="mt-2 text-[12px] leading-relaxed text-white/70">{item.cta.desc}</p>
                    </div>
                    <a
                        href={item.cta.href}
                        onClick={onNavigate}
                        className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#171717] transition-colors hover:bg-[#F3F4F0]"
                    >
                        {item.cta.label} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </div>
    )
}

function ListPanel({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
    return (
        <ul className="grid grid-cols-2 gap-1 p-4 lg:grid-cols-4 lg:p-5">
            {links.map((l) => (
                <li key={l.title}>
                    <NavLinkRow link={l} onNavigate={onNavigate} />
                </li>
            ))}
        </ul>
    )
}

function NavLinkRow({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
    return (
        <a
            href={link.href}
            onClick={onNavigate}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#F6F7F3]"
        >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F3F4F0] text-[#171717] transition-colors group-hover:bg-[#171717] group-hover:text-white">
                <link.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
                <span className="flex items-center gap-1 text-[13px] font-medium">
                    {link.title}
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" style={{ color: ACCENT }} />
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-[#6B6F66]">{link.desc}</span>
            </span>
        </a>
    )
}

/* ---- Mobile: grouped accordion ---------------------------------------- */

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
    const [openItem, setOpenItem] = React.useState<string | null>(null)

    return (
        <div>
            {NAV.map((item) =>
                item.kind === "link" ? (
                    <a key={item.label} href={item.href} onClick={onNavigate} className="block rounded-lg px-3 py-2.5 text-[14px] font-medium hover:bg-[#F3F4F0]">
                        {item.label}
                    </a>
                ) : (
                    <div key={item.label} className="border-b border-[#EEF0EA] last:border-b-0">
                        <button
                            type="button"
                            aria-expanded={openItem === item.label}
                            onClick={() => setOpenItem((o) => (o === item.label ? null : item.label))}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[14px] font-medium hover:bg-[#F3F4F0]"
                        >
                            {item.label}
                            <ChevronDown className={cn("h-4 w-4 transition-transform", openItem === item.label && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                            {openItem === item.label && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-2">
                                        {(item.kind === "mega" ? item.groups : [{ label: "", blurb: "", links: item.links }]).map((g) => (
                                            <div key={g.label || item.label} className="px-1 pt-1">
                                                {g.label && <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">{g.label}</p>}
                                                {g.links.map((l) => (
                                                    <a
                                                        key={l.title}
                                                        href={l.href}
                                                        onClick={onNavigate}
                                                        target={l.external ? "_blank" : undefined}
                                                        rel={l.external ? "noopener noreferrer" : undefined}
                                                        className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] hover:bg-[#F3F4F0]"
                                                    >
                                                        <l.icon className="h-4 w-4 text-[#5C6058]" />
                                                        {l.title}
                                                    </a>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ),
            )}
            <div className="mt-3 flex gap-2">
                <Link href={LOGIN_URL} className="flex-1 rounded-full border border-[#D9DCD3] py-2 text-center text-[13px] font-medium">
                    Login
                </Link>
                <Link href={REGISTER_URL} className="flex-1 rounded-full bg-[#171717] py-2 text-center text-[13px] font-medium text-white">
                    Start selling
                </Link>
            </div>
        </div>
    )
}
