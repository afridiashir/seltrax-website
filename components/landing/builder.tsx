"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
    AnimatePresence,
    motion,
    useInView,
    useReducedMotion,
    type Variants,
} from "framer-motion"
import { ArrowRight, Banknote, Building2, CreditCard, Search, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"

/* Theme wall: one storefront capture sliced at different heights, so each tile
   reads as a different layout. Swap for real theme thumbnails when they exist.
   Three rows, each its own marquee, alternating direction. 12 tiles per half
   out-measures the card, so neither half ever shows a gap at the seam. */
const themeRows = [
    { duration: "42s", reverse: false },
    { duration: "34s", reverse: true },
    { duration: "48s", reverse: false },
].map((row, r) => ({
    ...row,
    tiles: Array.from({ length: 12 }, (_, i) => `${(r * 29 + i * 13) % 100}%`),
}))

/* the preview frame morphs between these widths as the pills cycle */
const screens = [
    { label: "Desktop", width: 248 },
    { label: "Tablet", width: 186 },
    { label: "Mobile", width: 132 },
]

const payments = [
    { label: "Cash on delivery", note: "Most orders in Pakistan", Icon: Truck },
    { label: "Debit & credit cards", note: "Visa, Mastercard", Icon: CreditCard },
    { label: "Bank transfer", note: "Direct to your account", Icon: Building2 },
    { label: "Wallets", note: "Easypaisa, JazzCash", Icon: Banknote },
]

const TYPED = "yourstore.com"

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

/* nested lists inherit "show" from the grid, so these only set their own rhythm */
const stagger = (childDelay: number, delay = 0.15): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: childDelay, delayChildren: delay } },
})

/* the selection box snaps in after the heading, the way a design tool draws one */
const selection: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut", delay: 0.25 },
    },
}

const listRow: Variants = {
    hidden: { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-6 md:p-8",
                className
            )}
        >
            {children}
        </motion.div>
    )
}

/* types the domain in, then drops the matched store in underneath */
function BrandLookup() {
    const ref = React.useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.5 })
    const reduced = useReducedMotion()
    const [typed, setTyped] = React.useState("")

    React.useEffect(() => {
        if (!inView) return
        if (reduced) {
            setTyped(TYPED)
            return
        }

        let i = 0
        const id = setInterval(() => {
            i += 1
            setTyped(TYPED.slice(0, i))
            if (i >= TYPED.length) clearInterval(id)
        }, 75)

        return () => clearInterval(id)
    }, [inView, reduced])

    const done = typed.length === TYPED.length

    return (
        <div ref={ref} className="mt-8 space-y-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-white/20 px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-white/70" />
                <span className="text-sm text-white/90">
                    {typed || <span className="text-white/70">Store name or website&hellip;</span>}
                    {!reduced && !done && (
                        <motion.span
                            aria-hidden
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="ml-px inline-block w-px"
                        >
                            |
                        </motion.span>
                    )}
                </span>
            </div>

            <AnimatePresence>
                {done && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="flex items-center gap-3 rounded-xl bg-white/20 p-3"
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-xs font-semibold text-primary">
                            YS
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">Your Store</p>
                            <p className="truncate text-xs text-white/70">{TYPED}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

/* cycles the pills and morphs the frame to the matching device width */
function DevicePreview() {
    const ref = React.useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { amount: 0.4 })
    const reduced = useReducedMotion()
    const [active, setActive] = React.useState(0)

    React.useEffect(() => {
        if (!inView || reduced) return
        const id = setInterval(() => setActive((i) => (i + 1) % screens.length), 2200)
        return () => clearInterval(id)
    }, [inView, reduced])

    return (
        <div
            ref={ref}
            className="relative mt-8 flex flex-1 items-end justify-center overflow-hidden rounded-xl bg-gradient-to-b from-primary/25 to-transparent pt-8"
        >
            <div className="absolute left-0 top-4 flex gap-2">
                {screens.map((screen, i) => (
                    <button
                        key={screen.label}
                        type="button"
                        onClick={() => setActive(i)}
                        className="relative rounded-full px-3 py-1 text-xs transition-colors"
                    >
                        {i === active && (
                            <motion.span
                                layoutId="screen-pill"
                                className="absolute inset-0 rounded-full bg-white"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span
                            className={cn(
                                "relative",
                                i === active ? "text-[#0A0A0A]" : "text-white/70"
                            )}
                        >
                            {screen.label}
                        </span>
                    </button>
                ))}
            </div>

            <motion.div
                animate={{ width: screens[active].width }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="relative h-44 overflow-hidden rounded-t-2xl border border-b-0 border-white/20 bg-white md:h-56"
            >
                <Image
                    src="/ghanam-rang-mobile.png"
                    alt="Storefront preview"
                    fill
                    sizes="248px"
                    className="object-cover object-top"
                />
            </motion.div>
        </div>
    )
}

export function Builder() {
    return (
        <section
            className="relative overflow-hidden bg-[#0A0A0A] text-white"
            style={{ ["--dot-color" as string]: "rgb(255 255 255 / 0.14)" }}
        >
            <div className="bg-dots pointer-events-none absolute inset-0" />

            <div className="container relative mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-28">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <motion.span variants={item} className="text-sm text-white/50">
                        New
                    </motion.span>

                    {/* design-tool selection: the heading sits inside a marquee box with
                        corner handles, which draws itself in just after the text lands */}
                    {/* solid plate so the dot grid doesn't show through inside the
                        selection, matching how a selected object sits on the canvas */}
                    <div className="relative mt-2 inline-block bg-[#0A0A0A] px-5 py-2 md:px-8 md:py-3">
                        <motion.h2
                            variants={item}
                            className="text-4xl font-bold leading-none tracking-tight md:text-6xl lg:text-7xl"
                        >
                            Design Studio
                        </motion.h2>

                        <motion.span
                            aria-hidden
                            variants={selection}
                            className="pointer-events-none absolute inset-0 border border-primary"
                        >
                            {[
                                "-left-1 -top-1",
                                "-right-1 -top-1",
                                "-left-1 -bottom-1",
                                "-right-1 -bottom-1",
                            ].map((corner) => (
                                <span
                                    key={corner}
                                    className={cn(
                                        "absolute h-2 w-2 border border-primary bg-white",
                                        corner
                                    )}
                                />
                            ))}
                        </motion.span>
                    </div>

                    <motion.p
                        variants={item}
                        className="mt-6 max-w-md text-lg leading-relaxed text-white/70 md:text-xl"
                    >
                        Add your brand, pick a theme and preview your store before you launch.
                    </motion.p>
                    <motion.div variants={item}>
                        <Link
                            href={REGISTER_URL}
                            className="group mt-5 inline-flex items-center gap-1.5 text-primary transition-opacity hover:opacity-80"
                        >
                            Start building
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                >
                    {/* Brand lookup */}
                    <Card className="border-transparent bg-primary md:col-span-1">
                        <h3 className="text-2xl font-semibold tracking-tight">Add your brand.</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/80">
                            Enter your store name or domain and we&rsquo;ll pull in your logo,
                            colours and fonts.
                        </p>
                        <BrandLookup />
                    </Card>

                    {/* Theme wall */}
                    <Card className="md:col-span-2">
                        <h3 className="text-2xl font-semibold tracking-tight">
                            Pick a theme, or start from scratch.
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                            Start from a ready-made storefront and make it yours, or build up
                            from a blank canvas.
                        </p>

                        {/* rows run edge to edge past the card padding and fade out at
                            the bottom, so the wall reads as a catalogue rather than a
                            fixed set of tiles. Inert to the pointer by design. */}
                        <div className="pointer-events-none relative mt-8 flex-1 -mx-6 md:-mx-8">
                            <div className="flex flex-col gap-2">
                                {themeRows.map((row, r) => (
                                    <div key={r} className="flex overflow-hidden">
                                        {/* two identical halves; the track shifts -50% for a
                                            seamless loop, reversed on alternate rows */}
                                        <div
                                            className={cn(
                                                "flex w-max shrink-0",
                                                row.reverse
                                                    ? "animate-marquee-reverse"
                                                    : "animate-marquee"
                                            )}
                                            style={
                                                {
                                                    "--marquee-duration": row.duration,
                                                } as React.CSSProperties
                                            }
                                        >
                                            {[0, 1].map((half) => (
                                                <div key={half} className="flex shrink-0">
                                                    {row.tiles.map((position, i) => (
                                                        <span
                                                            key={`${half}-${i}`}
                                                            aria-hidden
                                                            className="mr-2 h-12 w-12 shrink-0 rounded-md bg-white/10 bg-cover ring-1 ring-white/10 md:h-16 md:w-16"
                                                            style={{
                                                                backgroundImage:
                                                                    "url('/ghanam-rang-mobile.png')",
                                                                backgroundSize: "100% auto",
                                                                backgroundPosition: `50% ${position}`,
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141414] to-transparent" />
                        </div>
                    </Card>

                    {/* Device preview */}
                    <Card className="md:col-span-2">
                        <h3 className="text-2xl font-semibold tracking-tight">See every screen.</h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                            Check the storefront on desktop, tablet and phone, then publish when
                            every screen looks right.
                        </p>
                        <DevicePreview />
                    </Card>

                    {/* Payments */}
                    <Card className="md:col-span-1">
                        <h3 className="text-2xl font-semibold tracking-tight">Get paid day one.</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/60">
                            Every way your customers already pay, switched on out of the box.
                        </p>

                        <motion.ul variants={stagger(0.09, 0.25)} className="mt-8 space-y-2">
                            {payments.map(({ label, note, Icon }) => (
                                <motion.li
                                    key={label}
                                    variants={listRow}
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#1C1C1C] p-3"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/80">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{label}</p>
                                        <p className="truncate text-xs text-white/50">{note}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}
