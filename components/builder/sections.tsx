"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import {
    AlignCenter,
    AlignLeft,
    ArrowDown,
    ArrowUp,
    ArrowUpRight,
    BadgePercent,
    Blocks,
    Check,
    Clock,
    Eye,
    FileText,
    Grid3x3,
    HelpCircle,
    Image as ImageIcon,
    LayoutTemplate,
    Mail,
    MapPin,
    Megaphone,
    Minus,
    MousePointerClick,
    Palette,
    Plus,
    Quote,
    Rows3,
    Search,
    ShoppingBag,
    SlidersHorizontal,
    Smartphone,
    Sparkles,
    Trash2,
    Type,
    Video,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif, h2Class } from "@/components/home/ui"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const
const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* ---- Hero -------------------------------------------------------------- */

export function BuilderHero() {
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
                <Container className="pb-10 pt-10 text-center lg:pb-16 lg:pt-16">
                    <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                        <Blocks className="h-3 w-3" style={{ color: ACCENT }} />
                        Page builder
                    </motion.span>
                    <motion.h1 {...float(0.05)} className="mx-auto mt-4 max-w-[820px] text-[36px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[50px] lg:text-[64px]">
                        Build Any Page.
                        <br />
                        <Serif>No Theme Required.</Serif>
                    </motion.h1>
                    <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[560px] text-[12px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                        There&apos;s no theme deciding what your pages can be. Start blank or from a pre-designed section, stack
                        sections in any order, and change every detail of every one — on every page you build, not just the
                        homepage.
                    </motion.p>
                    <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white transition-colors hover:bg-black lg:text-[14px]">
                            Start Free Trial <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href="#try" className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]">
                            Try the builder below
                        </a>
                    </motion.div>
                    <motion.ul {...float(0.2)} className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[10px] text-[#5C6058] lg:text-[12px]">
                        {["Any page, not just the homepage", "Sections in any order", "Every setting, per section", "Pre-designed sections to start from"].map((t) => (
                            <li key={t} className="inline-flex items-center gap-1">
                                <Check className="h-3 w-3" style={{ color: ACCENT }} /> {t}
                            </li>
                        ))}
                    </motion.ul>
                </Container>
            </div>
        </section>
    )
}

/* ---- Interactive builder ----------------------------------------------- */

type Kind = "hero" | "products" | "features" | "testimonials" | "faq" | "cta" | "text-image" | "logos"
type Bg = "white" | "soft" | "dark" | "accent"
type Align = "left" | "center"
type Pad = "compact" | "normal" | "roomy"
type Sec = { id: number; kind: Kind; bg: Bg; align: Align; pad: Pad }

const library: { kind: Kind; name: string; icon: React.ElementType }[] = [
    { kind: "hero", name: "Hero", icon: LayoutTemplate },
    { kind: "products", name: "Product grid", icon: ShoppingBag },
    { kind: "features", name: "Feature grid", icon: Grid3x3 },
    { kind: "text-image", name: "Text + image", icon: ImageIcon },
    { kind: "testimonials", name: "Testimonials", icon: Quote },
    { kind: "logos", name: "Logo strip", icon: Rows3 },
    { kind: "faq", name: "FAQ", icon: HelpCircle },
    { kind: "cta", name: "CTA banner", icon: Megaphone },
]

const bgs: { v: Bg; label: string; swatch: string }[] = [
    { v: "white", label: "White", swatch: "#FFFFFF" },
    { v: "soft", label: "Soft", swatch: "#F3F4F0" },
    { v: "dark", label: "Dark", swatch: "#171717" },
    { v: "accent", label: "Accent", swatch: ACCENT },
]
const pads: { v: Pad; label: string; px: number }[] = [
    { v: "compact", label: "Compact", px: 8 },
    { v: "normal", label: "Normal", px: 14 },
    { v: "roomy", label: "Roomy", px: 22 },
]

let nextId = 100
const initial: Sec[] = [
    { id: 1, kind: "hero", bg: "accent", align: "center", pad: "roomy" },
    { id: 2, kind: "products", bg: "white", align: "left", pad: "normal" },
    { id: 3, kind: "testimonials", bg: "soft", align: "center", pad: "normal" },
    { id: 4, kind: "cta", bg: "dark", align: "center", pad: "normal" },
]

export function LiveBuilder() {
    const [secs, setSecs] = React.useState<Sec[]>(initial)
    const [sel, setSel] = React.useState<number | null>(1)
    const [device, setDevice] = React.useState<"desktop" | "phone">("desktop")
    const current = secs.find((s) => s.id === sel) ?? null

    const add = (kind: Kind) => {
        const s: Sec = { id: nextId++, kind, bg: "white", align: "center", pad: "normal" }
        setSecs((x) => [...x, s])
        setSel(s.id)
    }
    const remove = (id: number) => {
        setSecs((x) => x.filter((s) => s.id !== id))
        setSel((v) => (v === id ? null : v))
    }
    const move = (id: number, d: -1 | 1) =>
        setSecs((x) => {
            const i = x.findIndex((s) => s.id === id)
            const j = i + d
            if (i < 0 || j < 0 || j >= x.length) return x
            const y = [...x]
            ;[y[i], y[j]] = [y[j], y[i]]
            return y
        })
    const patch = (id: number, p: Partial<Sec>) => setSecs((x) => x.map((s) => (s.id === id ? { ...s, ...p } : s)))

    return (
        <Container>
            <section id="try" className="scroll-mt-6 pb-6 pt-12 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Try it</Serif>
                        <span className="block font-semibold">Stack Sections, Change Anything</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-[560px] text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        Add a section from the library, reorder or remove it, then select one and change its background, alignment and
                        spacing. This is a small taste of the real builder.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-3 md:grid-cols-[180px_minmax(0,1fr)_200px] lg:grid-cols-[210px_minmax(0,1fr)_240px] lg:gap-4 lg:p-4">
                        {/* Library */}
                        <div className="rounded-xl bg-white p-3">
                            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Add a section</p>
                            <div className="mt-2 grid grid-cols-2 gap-1.5 md:grid-cols-1">
                                {library.map((l) => (
                                    <button
                                        key={l.kind}
                                        type="button"
                                        onClick={() => add(l.kind)}
                                        className="group flex items-center gap-2 rounded-lg border border-[#EEF0EA] px-2.5 py-2 text-left text-[11px] font-medium transition-colors hover:border-[#171717] hover:bg-[#F6F7F3] lg:text-[12px]"
                                    >
                                        <l.icon className="h-3.5 w-3.5 shrink-0 text-[#5C6058]" />
                                        <span className="flex-1 truncate">{l.name}</span>
                                        <Plus className="h-3 w-3 text-[#8A8E84] opacity-0 transition-opacity group-hover:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Canvas */}
                        <div className="min-w-0 rounded-xl bg-white p-3">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Your page · {secs.length} sections</p>
                                <div className="flex rounded-md bg-[#F3F4F0] p-0.5">
                                    {(["desktop", "phone"] as const).map((d) => (
                                        <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} className={cn("rounded px-2 py-0.5 text-[10px] font-medium capitalize", device === d ? "bg-white shadow-sm" : "text-[#8A8E84]")}>
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className={cn("mx-auto mt-3 overflow-hidden rounded-lg border border-[#E4E6DF] bg-[#F8F9F6] transition-[max-width] duration-300", device === "phone" ? "max-w-[240px]" : "max-w-full")}>
                                <LayoutGroup>
                                    <AnimatePresence initial={false}>
                                        {secs.length === 0 && (
                                            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-10 text-center text-[11px] text-[#8A8E84]">
                                                Blank page. Add a section from the library.
                                            </motion.p>
                                        )}
                                        {secs.map((s, i) => (
                                            <motion.div
                                                key={s.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ duration: 0.25, ease }}
                                                onClick={() => setSel(s.id)}
                                                className={cn("group relative cursor-pointer outline-offset-[-2px]", sel === s.id && "outline outline-2")}
                                                style={sel === s.id ? { outlineColor: ACCENT } : undefined}
                                            >
                                                <Block sec={s} phone={device === "phone"} />
                                                <div className={cn("absolute right-1.5 top-1.5 flex gap-0.5 rounded-md bg-white/95 p-0.5 shadow-sm transition-opacity", sel === s.id ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                                                    <Tiny label="Move up" disabled={i === 0} onClick={(e) => { e.stopPropagation(); move(s.id, -1) }}><ArrowUp className="h-3 w-3" /></Tiny>
                                                    <Tiny label="Move down" disabled={i === secs.length - 1} onClick={(e) => { e.stopPropagation(); move(s.id, 1) }}><ArrowDown className="h-3 w-3" /></Tiny>
                                                    <Tiny label="Remove" onClick={(e) => { e.stopPropagation(); remove(s.id) }}><Trash2 className="h-3 w-3" /></Tiny>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </LayoutGroup>
                            </div>
                        </div>

                        {/* Properties */}
                        <div className="rounded-xl bg-white p-3">
                            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Section settings</p>
                            {current ? (
                                <div className="mt-2 space-y-4">
                                    <p className="px-1 text-[12px] font-semibold">{library.find((l) => l.kind === current.kind)?.name}</p>
                                    <Field label="Background">
                                        <div className="flex gap-1.5">
                                            {bgs.map((b) => (
                                                <button key={b.v} type="button" aria-label={b.label} aria-pressed={current.bg === b.v} onClick={() => patch(current.id, { bg: b.v })} className={cn("h-6 w-6 rounded-full border border-[#E4E6DF] transition-transform hover:scale-110", current.bg === b.v && "ring-2 ring-[#171717] ring-offset-1")} style={{ background: b.swatch }} />
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Alignment">
                                        <Seg
                                            value={current.align}
                                            onChange={(v) => patch(current.id, { align: v as Align })}
                                            options={[
                                                { v: "left", label: <AlignLeft className="h-3.5 w-3.5" /> },
                                                { v: "center", label: <AlignCenter className="h-3.5 w-3.5" /> },
                                            ]}
                                        />
                                    </Field>
                                    <Field label="Spacing">
                                        <Seg value={current.pad} onChange={(v) => patch(current.id, { pad: v as Pad })} options={pads.map((p) => ({ v: p.v, label: p.label }))} />
                                    </Field>
                                    <p className="px-1 text-[9.5px] leading-relaxed text-[#8A8E84] lg:text-[10.5px]">
                                        In the real builder every section also has its own text, images, colours, fonts, buttons, links,
                                        columns and per-device visibility.
                                    </p>
                                </div>
                            ) : (
                                <p className="mt-2 px-1 text-[11px] text-[#8A8E84]">Select a section on the canvas to edit it.</p>
                            )}
                        </div>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}

function Tiny({ children, label, disabled, onClick }: { children: React.ReactNode; label: string; disabled?: boolean; onClick: (e: React.MouseEvent) => void }) {
    return (
        <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="grid h-5 w-5 place-items-center rounded text-[#5C6058] hover:bg-[#F3F4F0] hover:text-[#171717] disabled:opacity-30 disabled:hover:bg-transparent">
            {children}
        </button>
    )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="px-1">
            <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{label}</p>
            <div className="mt-1.5">{children}</div>
        </div>
    )
}

function Seg({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { v: string; label: React.ReactNode }[] }) {
    return (
        <div className="flex rounded-md bg-[#F3F4F0] p-0.5">
            {options.map((o) => (
                <button key={o.v} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)} className={cn("flex flex-1 items-center justify-center rounded px-2 py-1 text-[10px] font-medium", value === o.v ? "bg-white text-[#171717] shadow-sm" : "text-[#8A8E84] hover:text-[#171717]")}>
                    {o.label}
                </button>
            ))}
        </div>
    )
}

/* Schematic primitives used by the canvas blocks. */
function Bar({ w, h = 4, c }: { w: string; h?: number; c: string }) {
    return <div className="rounded-sm" style={{ width: w, height: h, background: c }} />
}
function Btn({ bg }: { bg: Bg }) {
    return <div className="rounded-full" style={{ width: 34, height: 9, background: bg === "accent" || bg === "dark" ? "#fff" : ACCENT }} />
}

/* Schematic rendering of a section that reflects its settings. */
function Block({ sec, phone }: { sec: Sec; phone: boolean }) {
    const dark = sec.bg === "dark" || sec.bg === "accent"
    const bg = bgs.find((b) => b.v === sec.bg)!.swatch
    const py = pads.find((p) => p.v === sec.pad)!.px
    const line = dark ? "rgba(255,255,255,0.85)" : "#171717"
    const muted = dark ? "rgba(255,255,255,0.35)" : "#D5D8CF"
    const tile = dark ? "rgba(255,255,255,0.18)" : "#E6E8E2"
    const items = phone ? 2 : 4
    const alignCls = sec.align === "center" ? "items-center text-center" : "items-start text-left"

    return (
        <div className={cn("flex flex-col gap-1.5 border-b border-black/5 px-4 last:border-b-0", alignCls)} style={{ background: bg, paddingTop: py, paddingBottom: py }}>
            {sec.kind === "hero" && (
                <>
                    <Bar w="34%" h={7} c={line} /> <Bar w="24%" h={7} c={line} /> <Bar w="46%" h={3} c={muted} /> <div className="mt-1"><Btn bg={sec.bg} /></div>
                </>
            )}
            {sec.kind === "products" && (
                <>
                    <Bar w="28%" h={5} c={line} />
                    <div className="mt-1 grid w-full gap-1.5" style={{ gridTemplateColumns: `repeat(${items}, minmax(0, 1fr))` }}>
                        {Array.from({ length: items }).map((_, i) => (
                            <div key={i}>
                                <div className="aspect-[4/5] rounded" style={{ background: tile }} />
                                <div className="mt-1 h-[3px] w-3/4 rounded-sm" style={{ background: line }} />
                                <div className="mt-0.5 h-[3px] w-1/3 rounded-sm" style={{ background: muted }} />
                            </div>
                        ))}
                    </div>
                </>
            )}
            {sec.kind === "features" && (
                <>
                    <Bar w="30%" h={5} c={line} />
                    <div className="mt-1 grid w-full gap-1.5" style={{ gridTemplateColumns: `repeat(${phone ? 1 : 3}, minmax(0, 1fr))` }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded p-2" style={{ background: tile }}>
                                <div className="h-3 w-3 rounded-sm" style={{ background: line }} />
                                <div className="mt-1.5 h-[3px] w-2/3 rounded-sm" style={{ background: line }} />
                                <div className="mt-0.5 h-[3px] w-full rounded-sm" style={{ background: muted }} />
                            </div>
                        ))}
                    </div>
                </>
            )}
            {sec.kind === "text-image" && (
                <div className={cn("grid w-full items-center gap-2", phone ? "grid-cols-1" : "grid-cols-2")}>
                    <div className={cn("flex flex-col gap-1.5", alignCls)}>
                        <Bar w="60%" h={6} c={line} /> <Bar w="90%" h={3} c={muted} /> <Bar w="80%" h={3} c={muted} /> <div className="mt-1"><Btn bg={sec.bg} /></div>
                    </div>
                    <div className="aspect-[4/3] rounded" style={{ background: tile }} />
                </div>
            )}
            {sec.kind === "testimonials" && (
                <>
                    <Bar w="30%" h={5} c={line} />
                    <div className="mt-1 grid w-full gap-1.5" style={{ gridTemplateColumns: `repeat(${phone ? 1 : 3}, minmax(0, 1fr))` }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded p-2" style={{ background: tile }}>
                                <div className="h-[3px] w-full rounded-sm" style={{ background: muted }} />
                                <div className="mt-0.5 h-[3px] w-5/6 rounded-sm" style={{ background: muted }} />
                                <div className="mt-2 flex items-center gap-1"><div className="h-3 w-3 rounded-full" style={{ background: line }} /><div className="h-[3px] w-1/3 rounded-sm" style={{ background: line }} /></div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {sec.kind === "logos" && (
                <div className="flex w-full items-center justify-around gap-2">
                    {Array.from({ length: phone ? 3 : 5 }).map((_, i) => <div key={i} className="h-3 w-10 rounded-sm" style={{ background: muted }} />)}
                </div>
            )}
            {sec.kind === "faq" && (
                <>
                    <Bar w="28%" h={5} c={line} />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex w-full items-center justify-between rounded px-2 py-1.5" style={{ background: tile }}>
                            <div className="h-[3px] w-1/2 rounded-sm" style={{ background: line }} /><Plus className="h-2.5 w-2.5" style={{ color: line }} />
                        </div>
                    ))}
                </>
            )}
            {sec.kind === "cta" && (
                <>
                    <Bar w="40%" h={6} c={line} /> <Bar w="55%" h={3} c={muted} /> <div className="mt-1"><Btn bg={sec.bg} /></div>
                </>
            )}
        </div>
    )
}

/* ---- Page types ---------------------------------------------------------- */

const pageTypes = [
    { icon: LayoutTemplate, name: "Homepage", desc: "The obvious one — and only the start." },
    { icon: ShoppingBag, name: "Product pages", desc: "Change the layout per product or per collection: gallery style, tabs, upsells, size guides." },
    { icon: Grid3x3, name: "Collection pages", desc: "Filters, banners, editorial blocks between rows of products." },
    { icon: Megaphone, name: "Landing pages", desc: "Campaign, sale and ad-landing pages with their own URL — as many as you need." },
    { icon: FileText, name: "About, contact, policies", desc: "Story pages, contact with map and form, shipping and return policies." },
    { icon: HelpCircle, name: "FAQ & help", desc: "Accordion pages, size charts, care guides." },
    { icon: BadgePercent, name: "Offers & bundles", desc: "Bundle pages, Eid / 11.11 sale pages, limited drops with countdowns." },
    { icon: Sparkles, name: "Anything else", desc: "If it's a page with a URL, you can build it. No template has to exist first." },
]

export function PageTypes() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Not just the homepage</Serif>
                        <span className="block font-semibold">Every Page Is Yours to Build</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[600px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Theme-based platforms let you rearrange the homepage and lock the rest to templates. Seltrax has no theme
                        to lock you to: every page type below opens in the same builder, with the same section library and the
                        same controls.
                    </p>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {pageTypes.map((p, i) => (
                        <Reveal key={p.name} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-colors hover:bg-[#F1F3EE]">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white">
                                    <p.icon className="h-4 w-4" />
                                </span>
                                <p className="mt-4 text-[13px] font-semibold lg:text-[15px]">{p.name}</p>
                                <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{p.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Every customization -------------------------------------------------- */

const controls: { icon: React.ElementType; title: string; items: string[] }[] = [
    { icon: Rows3, title: "Layout", items: ["Sections in any order", "1–4 columns per section", "Full-bleed or contained width", "Section height & vertical alignment", "Sticky and overlapping elements"] },
    { icon: SlidersHorizontal, title: "Spacing", items: ["Padding per section, per side", "Gaps between columns and items", "Margins on every element", "Separate values for phone and desktop"] },
    { icon: Type, title: "Typography", items: ["Font family per heading / body", "Size, weight, line height, letter spacing", "Per-section overrides", "Fluid sizes that scale with the screen"] },
    { icon: Palette, title: "Colour & background", items: ["Any colour, gradient or image behind a section", "Video backgrounds", "Overlay tint and opacity", "Dark sections next to light ones"] },
    { icon: MousePointerClick, title: "Buttons & links", items: ["Shape, size, fill, outline, ghost", "Icons before or after the label", "Link to any page, product, collection, anchor or URL", "Hover and pressed states"] },
    { icon: ImageIcon, title: "Media", items: ["Aspect ratio, focal point, fit", "Galleries, carousels, before/after", "Lazy loading and sizes handled for you", "Alt text on every image"] },
    { icon: Smartphone, title: "Per device", items: ["Show or hide any section on phone / desktop", "Different column counts per device", "Reorder columns for phones", "Preview both without leaving the builder"] },
    { icon: Search, title: "Page settings", items: ["URL slug, title and meta description", "Open Graph image for sharing", "Canonical and noindex controls", "Custom anchors for in-page links"] },
    { icon: Clock, title: "Publishing", items: ["Draft and preview before it's live", "Schedule a page to go live at a time", "Duplicate any page as a starting point", "Version history — roll back a change"] },
]

export function Controls() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Every setting, every section</Serif>
                        <span className="block font-semibold">What You Can Change</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
                    {controls.map((c, i) => (
                        <Reveal key={c.title} delay={i * 0.04}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-white p-5 lg:p-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white">
                                        <c.icon className="h-4 w-4" />
                                    </span>
                                    <p className="text-[13px] font-semibold lg:text-[15px]">{c.title}</p>
                                </div>
                                <ul className="mt-3 space-y-1.5">
                                    {c.items.map((it) => (
                                        <li key={it} className="flex items-start gap-2 text-[10.5px] leading-snug text-[#3A3D37] lg:text-[12.5px]">
                                            <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: ACCENT }} /> {it}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Pre-designed section library ----------------------------------------- */

type Cat = "All" | "Hero" | "Products" | "Content" | "Trust" | "Convert"
const presetCats: Cat[] = ["All", "Hero", "Products", "Content", "Trust", "Convert"]
const presets: { name: string; cat: Exclude<Cat, "All">; icon: React.ElementType; variants: number }[] = [
    { name: "Hero — image", cat: "Hero", icon: LayoutTemplate, variants: 6 },
    { name: "Hero — video", cat: "Hero", icon: Video, variants: 3 },
    { name: "Hero — split", cat: "Hero", icon: ImageIcon, variants: 4 },
    { name: "Announcement bar", cat: "Hero", icon: Megaphone, variants: 3 },
    { name: "Product grid", cat: "Products", icon: ShoppingBag, variants: 5 },
    { name: "Product carousel", cat: "Products", icon: Rows3, variants: 3 },
    { name: "Featured product", cat: "Products", icon: Sparkles, variants: 3 },
    { name: "Collection tiles", cat: "Products", icon: Grid3x3, variants: 4 },
    { name: "Bundle / offer", cat: "Products", icon: BadgePercent, variants: 2 },
    { name: "Text + image", cat: "Content", icon: ImageIcon, variants: 5 },
    { name: "Feature grid", cat: "Content", icon: Grid3x3, variants: 4 },
    { name: "Rich text", cat: "Content", icon: FileText, variants: 2 },
    { name: "Gallery", cat: "Content", icon: ImageIcon, variants: 4 },
    { name: "Video", cat: "Content", icon: Video, variants: 2 },
    { name: "Steps / how it works", cat: "Content", icon: Rows3, variants: 3 },
    { name: "Testimonials", cat: "Trust", icon: Quote, variants: 4 },
    { name: "Logo strip", cat: "Trust", icon: Rows3, variants: 2 },
    { name: "Stats", cat: "Trust", icon: Grid3x3, variants: 3 },
    { name: "FAQ", cat: "Trust", icon: HelpCircle, variants: 2 },
    { name: "CTA banner", cat: "Convert", icon: Megaphone, variants: 5 },
    { name: "Newsletter", cat: "Convert", icon: Mail, variants: 3 },
    { name: "Countdown", cat: "Convert", icon: Clock, variants: 2 },
    { name: "Contact + map", cat: "Convert", icon: MapPin, variants: 2 },
]

export function Presets() {
    const [cat, setCat] = React.useState<Cat>("All")
    const shown = presets.filter((p) => cat === "All" || p.cat === cat)
    const total = presets.reduce((a, p) => a + p.variants, 0)

    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Or don&apos;t start blank</Serif>
                        <span className="block font-semibold">{total}+ Pre-designed Sections</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[560px] text-center text-[12px] leading-relaxed text-[#6B6F66] lg:text-[14px]">
                        Every section type comes in several ready-made styles. Drop one in, swap the content, and every setting is
                        still yours to change afterwards — it&apos;s a starting point, not a template you&apos;re stuck with.
                    </p>
                </Reveal>

                <Reveal className="mt-8 lg:mt-12">
                    <div role="tablist" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full bg-[#F3F4F0] p-1">
                        {presetCats.map((c) => (
                            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={cn("relative rounded-full px-3 py-1.5 text-[11px] font-medium lg:px-4 lg:text-[13px]", cat === c ? "text-[#171717]" : "text-[#8A8E84] hover:text-[#171717]")}>
                                {cat === c && <motion.span layoutId="preset-pill" className="absolute inset-0 rounded-full bg-white shadow-sm" transition={{ duration: 0.25, ease }} />}
                                <span className="relative">{c}</span>
                            </button>
                        ))}
                    </div>
                    <motion.ul layout className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
                        <AnimatePresence initial={false}>
                            {shown.map((p) => (
                                <motion.li key={p.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2, ease }}>
                                    <div className="flex h-full items-center gap-3 rounded-xl border border-[#E4E6DF] bg-white p-3 transition-colors hover:bg-[#F6F7F3] lg:p-4">
                                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#F3F4F0] text-[#171717]">
                                            <p.icon className="h-4 w-4" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="truncate text-[12px] font-semibold lg:text-[13px]">{p.name}</p>
                                            <p className="text-[10px] text-[#8A8E84] lg:text-[11px]">{p.variants} styles · {p.cat}</p>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                    <p className="mt-4 text-center text-[11px] text-[#6B6F66] lg:text-[13px]">
                        Want a whole page done for you? Pick one of the{" "}
                        <Link href="/designs" className="font-medium underline underline-offset-2">
                            ready-made store designs
                        </Link>{" "}
                        and edit from there.
                    </p>
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- Comparison vs theme editors ----------------------------------------- */

type Cell = "yes" | "no" | "partial"
const rows: { row: string; s: Cell; sh: Cell; w: Cell }[] = [
    { row: "Build any page, not just the homepage", s: "yes", sh: "partial", w: "partial" },
    { row: "Sections in any order on any page", s: "yes", sh: "partial", w: "partial" },
    { row: "Every setting per section, no theme limits", s: "yes", sh: "no", w: "partial" },
    { row: "No page-builder plugin to buy or maintain", s: "yes", sh: "no", w: "no" },
    { row: "Per-device layout and visibility", s: "yes", sh: "partial", w: "partial" },
    { row: "Pre-designed sections included", s: "yes", sh: "partial", w: "no" },
    { row: "Stays fast whatever you build", s: "yes", sh: "partial", w: "no" },
    { row: "Version history & scheduling built in", s: "yes", sh: "partial", w: "no" },
]

function CellIcon({ v }: { v: Cell }) {
    if (v === "yes") return <span className="inline-grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}><Check className="h-3.5 w-3.5" /></span>
    if (v === "partial") return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#E6E8E2] text-[#5C6058]"><Minus className="h-3.5 w-3.5" /></span>
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-[#F3F4F0] text-[#8A8E84]"><X className="h-3.5 w-3.5" /></span>
}

export function BuilderComparison() {
    return (
        <Container>
            <section className="pb-6 pt-14 lg:pt-24">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Builder vs theme editor</Serif>
                        <span className="block font-semibold">Why No Theme Is the Point</span>
                    </h2>
                </Reveal>
                <Reveal className="mt-8 lg:mt-12">
                    <div className="overflow-x-auto rounded-2xl border border-[#E4E6DF]">
                        <table className="w-full min-w-[560px] border-collapse text-[11px] lg:text-[13px]">
                            <thead>
                                <tr className="border-b border-[#E4E6DF] bg-[#F6F7F3]">
                                    <th className="px-4 py-3 text-left font-medium text-[#8A8E84] lg:px-6">Building pages</th>
                                    <th className="px-4 py-3 text-center font-semibold lg:px-6">Seltrax</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">Shopify theme editor</th>
                                    <th className="px-4 py-3 text-center font-medium text-[#8A8E84] lg:px-6">WooCommerce + plugin</th>
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
                </Reveal>
            </section>
        </Container>
    )
}

/* ---- FAQ ------------------------------------------------------------------ */

const faqs = [
    { q: "If there's no theme, what decides how my store looks?", a: "You do — section by section. The engine handles speed, responsiveness and consistency; the look comes from the sections you add and the settings you choose. Pre-designed sections and the ready-made store designs give you a polished starting point in one click." },
    { q: "Can I build a landing page for an ad campaign?", a: "Yes. Create a new page, give it its own URL, stack a hero, an offer, testimonials and a CTA, and publish. Duplicate it for the next campaign. There's no limit on the number of pages." },
    { q: "Do product and collection pages use the builder too?", a: "Yes. Product and collection layouts are built from the same sections, so you can add size guides, upsells, editorial blocks or FAQs to them — per product, per collection, or as a default for all." },
    { q: "Will a heavily customised page slow my store down?", a: "No. Every section is rendered by the same engine that makes Seltrax stores fast; there is no plugin code involved. Images you add are optimised automatically." },
    { q: "What if I break something?", a: "Preview before publishing, and every page keeps a version history so you can roll back to any earlier version." },
]

export function BuilderFAQ() {
    const [open, setOpen] = React.useState<number | null>(0)
    return (
        <Container>
            <section className="pb-16 pt-14 lg:pb-24 lg:pt-24">
                <Reveal className="mx-auto max-w-[760px]">
                    <h2 className={h2Class}>
                        <Serif className="block">Questions</Serif>
                        <span className="block font-semibold">About the Page Builder</span>
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
                            Start building <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[#F3F4F0]">
                            <Eye className="h-3.5 w-3.5" /> See it in a demo
                        </a>
                    </div>
                </Reveal>
            </section>
        </Container>
    )
}
