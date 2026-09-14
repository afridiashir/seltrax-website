"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* PLACEHOLDER CONTENT — the quotes, names and companies below are filler written
   to lay the section out. Swap in real, attributable customer reviews before this
   ships, and drop the rating row entirely unless the Trustpilot profile is live. */
const rating = {
    score: "4.9",
    label: "Excellent",
    source: "Trustpilot",
    clients: "5,000+",
}

/* `href` is optional — "Read full story" only renders once a testimonial has a
   real case study to point at, so the section never ships a dead link. */
const testimonials = [
    {
        quote:
            "Placeholder review. A short line about how quickly the store went live and what it replaced.",
        name: "Customer name",
        company: "Store name",
        initials: "SN",
        tint: "bg-primary/10 text-primary",
        href: "",
    },
    {
        quote:
            "Placeholder review. A longer line about the part of running the store that Seltrax now handles automatically.",
        name: "Customer name",
        company: "Store name",
        initials: "SN",
        tint: "bg-emerald-500/10 text-emerald-600",
        href: "",
    },
    {
        quote:
            "Placeholder review. A line about the day-to-day work the team no longer has to do themselves.",
        name: "Customer name",
        company: "Store name",
        initials: "SN",
        tint: "bg-amber-500/10 text-amber-600",
        href: "",
    },
]

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

/* nested lists inherit "show" from the grid, so these only set their own rhythm */
const starRow: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

const starPop: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 500, damping: 18 },
    },
}

const lift = {
    whileHover: { y: -4 },
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
}

function Stars() {
    return (
        <motion.div
            variants={starRow}
            className="flex items-center gap-0.5"
            aria-label="Rated 5 out of 5"
        >
            {Array.from({ length: 5 }, (_, i) => (
                <motion.span key={i} variants={starPop}>
                    <Star className="h-3.5 w-3.5 fill-[#00B67A] text-[#00B67A]" />
                </motion.span>
            ))}
        </motion.div>
    )
}

function Avatar({
    initials,
    tint,
    className,
}: {
    initials: string
    tint: string
    className?: string
}) {
    return (
        <span
            aria-hidden
            className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
                tint,
                className
            )}
        >
            {initials}
        </span>
    )
}

export function Testimonials() {
    return (
        <section className="relative bg-muted/50">
            <div className="container relative mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-24">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={container}
                    className="flex flex-col items-center text-center"
                >
                    <motion.p variants={item} className="flex items-center gap-2 text-sm">
                        <span className="font-semibold">{rating.label}</span>
                        <span className="text-muted-foreground">{rating.score} out of 5</span>
                        <Star className="h-4 w-4 fill-[#00B67A] text-[#00B67A]" />
                        <span className="font-semibold">{rating.source}</span>
                    </motion.p>

                    <motion.h2
                        variants={item}
                        className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
                    >
                        The reviews are in.
                    </motion.h2>

                    <motion.p
                        variants={item}
                        className="mt-5 max-w-md text-sm text-muted-foreground md:text-base"
                    >
                        From small studios to international multinationals. {rating.clients} teams
                        trust Seltrax with their brand.
                    </motion.p>
                </motion.div>

                {/* the stats card is one grid cell; each testimonial is a cell holding a
                    quote card above an author card, so both rows line up across the grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4"
                >
                    <motion.div
                        variants={item}
                        {...lift}
                        className="flex flex-col justify-between gap-10 rounded-xl border border-border bg-card p-6"
                    >
                        <div className="flex items-start gap-4">
                            <p className="text-4xl font-semibold leading-none tracking-tight">
                                {rating.score}
                                <span className="text-base text-muted-foreground">/5</span>
                            </p>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                The full-service commerce platform that helps businesses
                                <span className="text-foreground"> sell online with ease.</span>
                            </p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <div className="flex -space-x-2">
                                {testimonials.map((testimonial, i) => (
                                    <Avatar
                                        key={i}
                                        initials={testimonial.initials}
                                        tint={testimonial.tint}
                                        className="h-8 w-8 rounded-full ring-2 ring-card"
                                    />
                                ))}
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background ring-2 ring-card">
                                    +99
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-foreground">{rating.clients}</span> clients
                            </p>
                        </div>
                    </motion.div>

                    {testimonials.map((testimonial, i) => (
                        <motion.div key={i} variants={item} {...lift} className="flex flex-col gap-4">
                            <blockquote className="flex flex-1 flex-col rounded-xl border border-border bg-card p-6">
                                <p className="text-base leading-relaxed md:text-lg">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                <div className="mt-auto flex items-center justify-between gap-3 pt-10">
                                    <Stars />
                                    {testimonial.href && (
                                        <Link
                                            href={testimonial.href}
                                            className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            Read full story
                                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </Link>
                                    )}
                                </div>
                            </blockquote>

                            <figcaption className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                                <Avatar initials={testimonial.initials} tint={testimonial.tint} />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{testimonial.name}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {testimonial.company}
                                    </p>
                                </div>
                            </figcaption>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-10 flex justify-center">
                    <Button asChild variant="outline" className="rounded-md px-8 font-medium">
                        <Link href="#faq">See more</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
