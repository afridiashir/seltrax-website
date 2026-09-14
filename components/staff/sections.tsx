"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
    ArrowUpRight,
    BarChart3,
    Banknote,
    Check,
    ClipboardList,
    Eye,
    EyeOff,
    History,
    KeyRound,
    Megaphone,
    Minus,
    Package,
    Plus,
    RotateCcw,
    Settings,
    ShieldCheck,
    Smartphone,
    Trash2,
    Truck,
    UserCog,
    UserPlus,
    Users,
    Wallet,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Face, Reveal, Serif, h2Class, shadow } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* ---- Hero ------------------------------------------------------------------ */

const heroTeam = ["/landing/avatars/a1.jpg", "/landing/avatars/a2.jpg", "/landing/avatars/a3.jpg", "/landing/avatars/a4.jpg", "/landing/avatars/a5.jpg"]

export function StaffHero() {
    return (
        <section className="relative">
            <Image src="/landing/scenery.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
            <div
                className="absolute inset-x-0 bottom-0 h-[55%]"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                }}
            />
            <div className="relative z-10">
                <HomeNavbar />
                <Container className="pb-10 pt-10 text-center lg:pb-14 lg:pt-16">
                    <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <Users className="h-3 w-3" style={{ color: ACCENT }} />
                        Staff accounts
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[860px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Add Your Whole Team.
                        <br />
                        <Serif>Not One Rupee More.</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[580px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        Packers, support, a manager, your marketing freelancer — give every person their own login with exactly
                        the access they need. No per-seat pricing, no staff limit, no upgrade to add the fifth person. It&apos;s all
                        inside the same Rs 1,349 a month.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href="#team" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Build your team
                        </a>
                    </motion.div>
                    <motion.div {...float(0.2)} className="mt-8 flex flex-col items-center gap-3">
                        <div className="flex -space-x-2.5">
                            {heroTeam.map((src) => (
                                <Face key={src} src={src} size={40} className="ring-[3px]" />
                            ))}
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#171717] text-[11px] font-semibold text-white ring-[3px] ring-white">+∞</span>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center">
                            {[
                                ["∞", "staff accounts"],
                                ["Rs 0", "per extra person"],
                                ["1", "login each, no sharing"],
                            ].map(([n, l]) => (
                                <div key={l}>
                                    <Serif className="block text-[30px] leading-none lg:text-[40px]">{n}</Serif>
                                    <p className="mt-1 text-[10px] text-[#5C6058] lg:text-[12px]">{l}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- Permissions model ----------------------------------------------------- */

type Level = "none" | "view" | "edit"
type AreaKey = "orders" | "dispatch" | "products" | "customers" | "analytics" | "payouts" | "marketing" | "design" | "settings"
const areas: { key: AreaKey; label: string; icon: React.ElementType; hint: string }[] = [
    { key: "orders", label: "Orders", icon: ClipboardList, hint: "See, confirm, edit and cancel orders" },
    { key: "dispatch", label: "Dispatch", icon: Truck, hint: "Book couriers, print labels, mark returns" },
    { key: "products", label: "Products & stock", icon: Package, hint: "Add products, prices, variants, stock" },
    { key: "customers", label: "Customers", icon: Users, hint: "Customer details and order history" },
    { key: "analytics", label: "Analytics & revenue", icon: BarChart3, hint: "Sales totals, reports, exports" },
    { key: "payouts", label: "Cash & remittances", icon: Wallet, hint: "Courier cash, remittances, fees" },
    { key: "marketing", label: "Marketing", icon: Megaphone, hint: "Discount codes, pixels, campaigns" },
    { key: "design", label: "Store design", icon: Eye, hint: "Page builder, designs, menus" },
    { key: "settings", label: "Settings & billing", icon: Settings, hint: "Payments, domains, staff, plan" },
]

type RoleKey = "manager" | "packer" | "support" | "marketing" | "custom"
const presets: Record<Exclude<RoleKey, "custom">, { label: string; icon: React.ElementType; perms: Record<AreaKey, Level> }> = {
    manager: { label: "Manager", icon: UserCog, perms: { orders: "edit", dispatch: "edit", products: "edit", customers: "edit", analytics: "view", payouts: "view", marketing: "edit", design: "edit", settings: "none" } },
    packer: { label: "Packer", icon: Package, perms: { orders: "view", dispatch: "edit", products: "view", customers: "none", analytics: "none", payouts: "none", marketing: "none", design: "none", settings: "none" } },
    support: { label: "Support", icon: ShieldCheck, perms: { orders: "edit", dispatch: "view", products: "view", customers: "edit", analytics: "none", payouts: "none", marketing: "none", design: "none", settings: "none" } },
    marketing: { label: "Marketing", icon: Megaphone, perms: { orders: "none", dispatch: "none", products: "view", customers: "none", analytics: "view", payouts: "none", marketing: "edit", design: "edit", settings: "none" } },
}

type Member = { id: number; name: string; photo: string; role: RoleKey; perms: Record<AreaKey, Level> }
const people = [
    { name: "Hamza Iqbal", photo: "/landing/avatars/a2.jpg" },
    { name: "Sana Malik", photo: "/landing/avatars/a3.jpg" },
    { name: "Bilal Ahmed", photo: "/landing/avatars/a4.jpg" },
    { name: "Ayesha Shahbaz", photo: "/landing/avatars/a5.jpg" },
    { name: "Zainab Raza", photo: "/landing/avatars/a1.jpg" },
]
const seedTeam: Member[] = [
    { id: 1, ...people[0], role: "manager", perms: { ...presets.manager.perms } },
    { id: 2, ...people[1], role: "packer", perms: { ...presets.packer.perms } },
    { id: 3, ...people[2], role: "support", perms: { ...presets.support.perms } },
]
const cycle: Record<Level, Level> = { none: "view", view: "edit", edit: "none" }
const levelStyle: Record<Level, string> = {
    none: "bg-[#F3F4F0] text-[#8A8E84]",
    view: "bg-[#E8F0FF] text-[#1D5FCC]",
    edit: "bg-[#171717] text-white",
}
const levelIcon: Record<Level, React.ElementType> = { none: EyeOff, view: Eye, edit: Check }

let nextMemberId = 10

export function TeamBuilder() {
    const [team, setTeam] = React.useState<Member[]>(seedTeam)
    const [active, setActive] = React.useState<number>(2)
    const [newRole, setNewRole] = React.useState<Exclude<RoleKey, "custom">>("packer")
    const member = team.find((m) => m.id === active) ?? team[0] ?? null

    const add = () => {
        const used = new Set(team.map((m) => m.name))
        const p = people.find((x) => !used.has(x.name)) ?? people[team.length % people.length]
        const name = used.has(p.name) ? `${p.name.split(" ")[0]} (${team.length + 1})` : p.name
        const m: Member = { id: nextMemberId++, name, photo: p.photo, role: newRole, perms: { ...presets[newRole].perms } }
        setTeam((t) => [...t, m])
        setActive(m.id)
    }
    const remove = (id: number) => {
        setTeam((t) => {
            const next = t.filter((m) => m.id !== id)
            if (active === id && next[0]) setActive(next[0].id)
            return next
        })
    }
    const applyPreset = (id: number, role: Exclude<RoleKey, "custom">) =>
        setTeam((t) => t.map((m) => (m.id === id ? { ...m, role, perms: { ...presets[role].perms } } : m)))
    const toggle = (id: number, area: AreaKey) =>
        setTeam((t) => t.map((m) => (m.id === id ? { ...m, role: "custom", perms: { ...m.perms, [area]: cycle[m.perms[area]] } } : m)))
    const reset = () => {
        setTeam(seedTeam)
        setActive(2)
    }
    const seats = team.length + 1 // + owner

    return (
        <Container>
            <section id="team" className="scroll-mt-6 pb-6 pt-8 lg:pt-12">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Try it</Serif>
                        <span className="block font-semibold">Build Your Team, Set Their Access</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-[560px] text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        Add people with a role, then click any permission to cycle it between <b>No access</b>, <b>View</b> and <b>Edit</b>. Watch the bill.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-10">
                    <div className={`grid grid-cols-1 gap-3 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-3 md:grid-cols-[260px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-4 lg:p-4 ${shadow}`}>
                        {/* Team list */}
                        <div className="flex flex-col rounded-xl bg-white p-3">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Team · {seats} people</p>
                                <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-2 py-0.5 text-[9.5px] font-medium hover:bg-[#F3F4F0]"><RotateCcw className="h-2.5 w-2.5" /> Reset</button>
                            </div>

                            <ul className="mt-2 space-y-1">
                                <li className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-[11px] lg:text-[12px]">
                                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#171717] text-[10px] font-semibold text-white">You</span>
                                    <span className="min-w-0 flex-1"><span className="block font-medium">Store owner</span><span className="block text-[10px] text-[#8A8E84]">Full access</span></span>
                                    <KeyRound className="h-3.5 w-3.5 text-[#8A8E84]" />
                                </li>
                                <AnimatePresence initial={false}>
                                    {team.map((m) => {
                                        const role = m.role === "custom" ? "Custom" : presets[m.role].label
                                        return (
                                            <motion.li
                                                key={m.id}
                                                layout
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.22, ease }}
                                                className="overflow-hidden"
                                            >
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() => setActive(m.id)}
                                                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(m.id)}
                                                    className={cn("group flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-[11px] transition-colors lg:text-[12px]", active === m.id ? "bg-[#F3F4F0]" : "hover:bg-[#FAFBF8]")}
                                                >
                                                    <Face src={m.photo} size={32} />
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate font-medium">{m.name}</span>
                                                        <span className="block text-[10px] text-[#8A8E84]">{role}</span>
                                                    </span>
                                                    <button type="button" aria-label={`Remove ${m.name}`} onClick={(e) => { e.stopPropagation(); remove(m.id) }} className="grid h-6 w-6 place-items-center rounded-md text-[#8A8E84] opacity-0 transition-opacity hover:bg-white hover:text-[#B42318] group-hover:opacity-100">
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </motion.li>
                                        )
                                    })}
                                </AnimatePresence>
                            </ul>

                            <div className="mt-3 rounded-lg border border-dashed border-[#D9DCD3] p-2.5">
                                <p className="text-[10px] text-[#8A8E84]">Invite someone as</p>
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                    {(Object.keys(presets) as Exclude<RoleKey, "custom">[]).map((r) => (
                                        <button key={r} type="button" aria-pressed={newRole === r} onClick={() => setNewRole(r)} className={cn("rounded-full px-2.5 py-1 text-[10px] font-medium", newRole === r ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:text-[#171717]")}>
                                            {presets[r].label}
                                        </button>
                                    ))}
                                </div>
                                <button type="button" onClick={add} className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#171717] py-2 text-[11px] font-medium text-white hover:bg-black">
                                    <UserPlus className="h-3.5 w-3.5" /> Add team member
                                </button>
                            </div>

                            {/* The bill */}
                            <div className="mt-auto pt-3">
                                <div className="rounded-xl p-3 text-white" style={{ background: ACCENT }}>
                                    <p className="text-[10px] text-white/70">Extra cost for {team.length} staff {team.length === 1 ? "account" : "accounts"}</p>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.p key={team.length} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="text-[26px] font-semibold tabular-nums tracking-[-0.02em]">
                                            Rs 0
                                        </motion.p>
                                    </AnimatePresence>
                                    <p className="text-[9.5px] text-white/70">Your plan stays Rs 1,349/month — for {seats} people or {seats * 10}.</p>
                                </div>
                            </div>
                        </div>

                        {/* Permission grid */}
                        <div className="min-w-0 rounded-xl bg-white p-3 lg:p-4">
                            <AnimatePresence mode="wait" initial={false}>
                                {member ? (
                                    <motion.div key={member.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.2, ease }}>
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <Face src={member.photo} size={40} />
                                                <div>
                                                    <p className="text-[14px] font-semibold lg:text-[16px]">{member.name}</p>
                                                    <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Own login · signs in on web and the Android app</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {(Object.keys(presets) as Exclude<RoleKey, "custom">[]).map((r) => {
                                                    const P = presets[r]
                                                    return (
                                                        <button key={r} type="button" aria-pressed={member.role === r} onClick={() => applyPreset(member.id, r)} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium lg:text-[11px]", member.role === r ? "bg-[#171717] text-white" : "bg-[#F3F4F0] text-[#5C6058] hover:text-[#171717]")}>
                                                            <P.icon className="h-3 w-3" /> {P.label}
                                                        </button>
                                                    )
                                                })}
                                                {member.role === "custom" && <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium text-white lg:text-[11px]" style={{ background: ACCENT }}>Custom</span>}
                                            </div>
                                        </div>

                                        <ul className="mt-4 divide-y divide-[#EEF0EA] rounded-xl border border-[#EEF0EA]">
                                            {areas.map((a) => {
                                                const lvl = member.perms[a.key]
                                                const L = levelIcon[lvl]
                                                return (
                                                    <li key={a.key} className="flex items-center gap-3 px-3 py-2.5">
                                                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F3F4F0]"><a.icon className="h-4 w-4 text-[#3A3D37]" /></span>
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block text-[11.5px] font-medium lg:text-[13px]">{a.label}</span>
                                                            <span className="block truncate text-[10px] text-[#8A8E84] lg:text-[11px]">{a.hint}</span>
                                                        </span>
                                                        <button type="button" onClick={() => toggle(member.id, a.key)} aria-label={`${a.label}: ${lvl}. Click to change.`} className={cn("inline-flex w-[92px] items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors lg:w-[104px] lg:text-[11px]", levelStyle[lvl])}>
                                                            <L className="h-3 w-3" /> {lvl === "none" ? "No access" : lvl === "view" ? "View" : "Edit"}
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                        <p className="mt-3 text-[10px] leading-relaxed text-[#8A8E84] lg:text-[11px]">
                                            {member.perms.analytics === "none" && member.perms.payouts === "none"
                                                ? `${member.name.split(" ")[0]} works with orders but never sees your revenue, totals or cash.`
                                                : member.perms.settings === "edit"
                                                    ? `${member.name.split(" ")[0]} can change settings — keep that for people you'd trust with the store.`
                                                    : `${member.name.split(" ")[0]} can see revenue figures but can't change settings, billing or other staff.`}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <p className="py-16 text-center text-[11px] text-[#8A8E84]">Add a team member to set their access.</p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Per-seat vs Seltrax cost ---------------------------------------------- */

export function CostCompare() {
    const [staff, setStaff] = React.useState(6)
    const [seat, setSeat] = React.useState(1500)
    const perSeatMonthly = staff * seat
    const yearly = perSeatMonthly * 12

    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">The seat tax</Serif>
                        <span className="block font-semibold">What Per-person Pricing Costs You</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Many tools cap staff by plan or charge for each extra login — so growing the team means paying more for the same
                        store. Set your own numbers below.
                    </p>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-2 lg:gap-8 lg:p-8">
                        <div className="space-y-6">
                            <label className="block">
                                <span className="flex items-center justify-between text-[11px] lg:text-[13px]">
                                    <span className="text-[#5C6058]">Staff on your team</span>
                                    <span className="font-semibold tabular-nums">{staff}</span>
                                </span>
                                <div className="mt-2 flex items-center gap-2">
                                    <button type="button" aria-label="Fewer staff" onClick={() => setStaff((s) => Math.max(1, s - 1))} className="grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-[#E4E6DF] hover:bg-[#F3F4F0]"><Minus className="h-3 w-3" /></button>
                                    <input type="range" min={1} max={30} value={staff} onChange={(e) => setStaff(Number(e.target.value))} className="h-1.5 w-full cursor-pointer" style={{ accentColor: "#171717" }} />
                                    <button type="button" aria-label="More staff" onClick={() => setStaff((s) => Math.min(30, s + 1))} className="grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-[#E4E6DF] hover:bg-[#F3F4F0]"><Plus className="h-3 w-3" /></button>
                                </div>
                            </label>
                            <label className="block">
                                <span className="flex items-center justify-between text-[11px] lg:text-[13px]">
                                    <span className="text-[#5C6058]">A per-seat tool&apos;s price, per person / month</span>
                                    <span className="font-semibold tabular-nums">Rs {seat.toLocaleString()}</span>
                                </span>
                                <input type="range" min={500} max={5000} step={100} value={seat} onChange={(e) => setSeat(Number(e.target.value))} className="mt-2 h-1.5 w-full cursor-pointer" style={{ accentColor: "#171717" }} />
                            </label>
                            <div className="flex -space-x-2">
                                {Array.from({ length: Math.min(staff, 14) }).map((_, i) => (
                                    <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }}>
                                        <Face src={heroTeam[i % heroTeam.length]} size={30} />
                                    </motion.span>
                                ))}
                                {staff > 14 && <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[#171717] text-[9px] font-semibold text-white ring-2 ring-white">+{staff - 14}</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="rounded-xl bg-white p-4 lg:p-5">
                                <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">Per-seat pricing</p>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.p key={perSeatMonthly} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="mt-1 text-[24px] font-semibold tabular-nums tracking-[-0.02em] line-through decoration-[#B42318]/60 lg:text-[30px]">
                                        Rs {perSeatMonthly.toLocaleString()}
                                    </motion.p>
                                </AnimatePresence>
                                <p className="text-[10px] text-[#8A8E84]">extra every month · Rs {yearly.toLocaleString()} a year</p>
                            </div>
                            <div className="rounded-xl p-4 text-white lg:p-5" style={{ background: ACCENT }}>
                                <p className="text-[10px] text-white/70 lg:text-[11px]">Seltrax</p>
                                <p className="mt-1 text-[24px] font-semibold tracking-[-0.02em] lg:text-[30px]">Rs 0</p>
                                <p className="text-[10px] text-white/70">extra, for {staff} people or {staff * 5}</p>
                            </div>
                            <div className="rounded-xl bg-[#171717] p-4 text-white sm:col-span-2 lg:p-5">
                                <p className="text-[10px] text-white/60">Kept in your business every year</p>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.p key={yearly} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }} className="mt-1 text-[28px] font-semibold tabular-nums tracking-[-0.02em] lg:text-[36px]">
                                        Rs {yearly.toLocaleString()}
                                    </motion.p>
                                </AnimatePresence>
                                <p className="text-[10px] text-white/60">That&apos;s {Math.max(1, Math.round(yearly / 1349))} months of your whole Seltrax plan.</p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">The per-seat price is yours to set — it&apos;s an illustration, not a quote for any specific platform.</p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Roles ----------------------------------------------------------------- */

const roleCards: { key: Exclude<RoleKey, "custom">; who: string }[] = [
    { key: "manager", who: "Runs the day-to-day. Everything except billing, settings and other staff." },
    { key: "packer", who: "Sees what to pack and books couriers. Never sees revenue, customers or cash." },
    { key: "support", who: "Answers customers, confirms and edits orders. No revenue, no settings." },
    { key: "marketing", who: "Discount codes, pixels, page builder and the reports that matter for campaigns." },
]

export function Roles() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Start from a role</Serif>
                        <span className="block font-semibold">Presets for the People You Hire</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Pick a preset when you invite someone, then adjust any permission. Save your own custom roles for the next hire.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {roleCards.map((r, i) => {
                        const P = presets[r.key]
                        return (
                            <Reveal key={r.key} delay={i * 0.06}>
                                <div className="flex h-full flex-col rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5">
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><P.icon className="h-4 w-4" /></span>
                                    <p className="mt-4 text-[14px] font-semibold lg:text-[16px]">{P.label}</p>
                                    <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[12.5px]">{r.who}</p>
                                    <ul className="mt-4 space-y-1.5 border-t border-[#E4E6DF] pt-3">
                                        {areas.map((a) => {
                                            const lvl = P.perms[a.key]
                                            return (
                                                <li key={a.key} className="flex items-center justify-between text-[10px] lg:text-[11px]">
                                                    <span className={cn(lvl === "none" ? "text-[#B5B9B0]" : "text-[#3A3D37]")}>{a.label}</span>
                                                    <span className={cn("rounded-full px-1.5 py-px text-[9px] font-semibold", levelStyle[lvl])}>{lvl === "none" ? "—" : lvl === "view" ? "View" : "Edit"}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </section>
        </Container>
    )
}

/* ---- In depth ---------------------------------------------------------------- */

type Detail = { icon: React.ElementType; kicker: string; title: string; intro: string; specs: { k: string; v: string }[] }
const details: Detail[] = [
    {
        icon: UserPlus, kicker: "Inviting", title: "Add someone in under a minute",
        intro: "Enter their phone or email, pick a role, send. They set their own password — you never share yours again.",
        specs: [
            { k: "Invite by", v: "Email or phone number" },
            { k: "Role", v: "Preset or custom" },
            { k: "Password", v: "Set by the staff member" },
            { k: "Limit", v: "None — invite as many as you need" },
            { k: "Cost", v: "Rs 0 per person" },
        ],
    },
    {
        icon: KeyRound, kicker: "Permissions", title: "No access, view, or edit — per area",
        intro: "Nine areas of the store, three levels each. Give a packer dispatch without revenue, or a freelancer the page builder without customers.",
        specs: [
            { k: "Areas", v: "Orders · dispatch · products · customers · analytics · cash · marketing · design · settings" },
            { k: "Levels", v: "No access · view · edit" },
            { k: "Revenue", v: "Hidden unless granted" },
            { k: "Custom roles", v: "Save and reuse" },
            { k: "Changes", v: "Apply instantly, no re-login" },
        ],
    },
    {
        icon: History, kicker: "Activity log", title: "Who did what, and when",
        intro: "Every confirm, edit, dispatch, refund and settings change is recorded against the person who did it.",
        specs: [
            { k: "Recorded", v: "Order, product, stock & settings changes" },
            { k: "Detail", v: "Person · action · before / after · time" },
            { k: "On the order", v: "History shows the staff member" },
            { k: "Filter", v: "By person, area or date" },
        ],
    },
    {
        icon: ShieldCheck, kicker: "Security", title: "Access you can take back instantly",
        intro: "When someone leaves, remove them and they're signed out everywhere — web and app — in the same second.",
        specs: [
            { k: "Remove", v: "Revokes access immediately" },
            { k: "Sessions", v: "Signed out on all devices" },
            { k: "Suspend", v: "Pause access without deleting" },
            { k: "Owner", v: "Only the owner manages billing & staff" },
            { k: "Your password", v: "Never shared" },
        ],
    },
    {
        icon: Smartphone, kicker: "Mobile", title: "Your team works from their phones too",
        intro: "Staff sign in to the Android app with their own login and see only what their role allows.",
        specs: [
            { k: "App", v: "Same login, same permissions" },
            { k: "Packers", v: "Orders to pack, dispatch on the go" },
            { k: "Notifications", v: "Only for areas they can access" },
            { k: "Removal", v: "Signs them out of the app too" },
        ],
    },
]

export function StaffDetails() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">In depth</Serif>
                        <span className="block font-semibold">How Staff Accounts Work</span>
                    </h2>
                </Reveal>
                <div className="mt-10 space-y-6 lg:mt-14 lg:space-y-8">
                    {details.map((d, i) => (
                        <Reveal key={d.title} delay={0.04}>
                            <article className={cn("grid grid-cols-1 gap-6 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-10 lg:p-8", i % 2 === 1 && "md:[&>*:first-child]:order-2")}>
                                <div>
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white"><d.icon className="h-4 w-4" /></span>
                                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">{d.kicker}</p>
                                    <h3 className="mt-1 text-[20px] font-semibold leading-tight tracking-[-0.02em] lg:text-[26px]">{d.title}</h3>
                                    <p className="mt-3 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13.5px]">{d.intro}</p>
                                </div>
                                <dl className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                                    {d.specs.map((s) => (
                                        <div key={s.k} className="flex items-baseline justify-between gap-3 border-b border-[#E4E6DF] py-2.5 text-[11px] lg:text-[12.5px]">
                                            <dt className="shrink-0 text-[#8A8E84]">{s.k}</dt>
                                            <dd className="text-right font-medium">{s.v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Spec + comparison + FAQ ------------------------------------------------- */

const sheet = [
    ["Staff accounts", "Unlimited"],
    ["Cost per staff account", "Rs 0 — included in Rs 1,349/month"],
    ["Role presets", "Manager · Packer · Support · Marketing"],
    ["Custom roles", "Yes, saved for reuse"],
    ["Permission areas", "9"],
    ["Levels per area", "No access · View · Edit"],
    ["Hide revenue", "Yes, per person"],
    ["Activity log", "Every change, per person"],
    ["Revoke access", "Instant, all devices"],
    ["Suspend", "Pause without deleting"],
    ["Mobile app", "Own login, same permissions"],
    ["Billing & staff management", "Owner only"],
]

export function StaffSpec() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Spec sheet</Serif>
                        <span className="block font-semibold">Staff Accounts, Itemised</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-hidden rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full border-collapse text-[11px] lg:text-[13px]">
                            <tbody>
                                {sheet.map(([k, v], i) => (
                                    <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#F6F7F3]"}>
                                        <th scope="row" className="w-1/2 px-4 py-3 text-left font-medium text-[#5C6058] lg:px-6">{k}</th>
                                        <td className="px-4 py-3 font-medium lg:px-6">{v}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

type Cell = "yes" | "no" | "partial"
const rows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "Unlimited staff accounts", s: "yes", sh: "no", w: "partial" },
    { row: "No extra cost per staff member", s: "yes", sh: "partial", w: "partial" },
    { row: "Hide revenue from specific staff", s: "yes", sh: "yes", w: "no" },
    { row: "Role presets built for COD teams (packer, support)", s: "yes", sh: "no", w: "no" },
    { row: "Per-person activity log", s: "yes", sh: "partial", w: "no" },
    { row: "Same permissions in the mobile app", s: "yes", sh: "yes", w: "partial" },
    { row: "No plugin needed for granular roles", s: "yes", sh: "yes", w: "no" },
]
function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function StaffComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Side by side</Serif>
                        <span className="block font-semibold">Staff on Seltrax vs Elsewhere</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Staff accounts</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">Seltrax</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">Shopify</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">WooCommerce</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r) => (
                                    <tr key={r.row} className="border-b border-[#EEF0EA] last:border-b-0">
                                        <td className="px-4 py-3 lg:px-6">{r.row}</td>
                                        <td className="px-4 py-3 text-center lg:px-6"><CellIcon v={r.s} /></td>
                                        <td className="px-4 py-3 text-center lg:px-6"><CellIcon v={r.sh} /></td>
                                        <td className="px-4 py-3 text-center lg:px-6"><CellIcon v={r.w} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-center text-[10px] text-[#8A8E84] lg:text-[11px]">Competitor plans and staff limits change — check their current pricing pages.</p>
                </Reveal>
            </section>
        </Container>
    )
}

const faqs = [
    { q: "Is there really no limit on staff accounts?", a: "No limit, and no charge. Add two people or twenty — the plan stays Rs 1,349 a month." },
    { q: "Can a staff member see my sales and revenue?", a: "Only if you give them access to Analytics or Cash. Packers and support staff can work with orders all day without ever seeing a total." },
    { q: "What happens when someone leaves?", a: "Remove them from Staff and they're signed out of the dashboard and the mobile app immediately. Their past actions stay in the activity log." },
    { q: "Can I see who changed an order?", a: "Yes. Every change on an order — confirmation, edit, dispatch, cancellation — shows the staff member who made it, and the activity log lets you filter by person." },
    { q: "Can staff use the mobile app?", a: "Yes, with their own login. They see exactly what their role allows, and nothing else." },
]

export function StaffFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About Staff Accounts</span>
                    </h2>
                    <ul className="mt-8">
                        {faqs.map((f, i) => {
                            const on = open === i
                            return (
                                <li key={f.q} className={cn(i > 0 && "border-t border-[#EEF0EA]")}>
                                    <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : i)} className="flex w-full items-start gap-3 py-3.5 text-left text-[12px] font-medium transition-colors hover:text-[#5C6058] lg:py-4 lg:text-[15px]">
                                        <span className="w-4 shrink-0 tabular-nums lg:w-6">{i + 1}.</span>
                                        <span className="flex-1">{f.q}</span>
                                        <span className="mt-0.5 text-[14px] leading-none text-[#8A8E84] transition-transform lg:text-[18px]" style={{ transform: on ? "rotate(45deg)" : "none" }}>+</span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {on && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                                                <p className="pb-4 pl-7 pr-6 text-[11px] leading-relaxed text-[#6B6F66] lg:pl-9 lg:text-[13px]">{f.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-black">
                            Add your team free <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link href="/orders" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <ClipboardList className="h-3.5 w-3.5" /> Orders
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[12px] font-medium text-[#5C6058] hover:text-[#171717]">
                            <Banknote className="h-3.5 w-3.5" /> Book a demo
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
