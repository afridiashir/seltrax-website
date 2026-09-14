"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* PLACEHOLDER POSTS — titles, dates and covers are filler; there is no /blog
   route yet. Point `cover` at real artwork and fill in `href` once posts exist,
   or swap this array for a CMS fetch. `href` is optional: a card without one
   renders as plain markup instead of a dead link. */
const posts = [
    {
        title: "How to price your first product without guessing",
        date: "2026-09-01",
        cover: "/home/cartspeed.png",
        href: "",
    },
    {
        title: "Cash on delivery: cutting returns without losing orders",
        date: "2026-08-31",
        cover: "/home/checkout.png",
        href: "",
    },
    {
        title: "Setting up your store team and permissions",
        date: "2026-08-31",
        cover: "/home/teams.png",
        href: "",
    },
    {
        title: "What actually makes a storefront load fast",
        date: "2026-08-21",
        cover: "/light-dashboard.png",
        href: "",
    },
    {
        title: "Reading your analytics in the first 30 days",
        date: "2026-08-21",
        cover: "/dark-dashboard.png",
        href: "",
    },
]

/* fixed locale and timezone so the server and client render the same string */
function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    })
}

const GAP = 16

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function Blog() {
    const trackRef = React.useRef<HTMLDivElement>(null)
    const [atStart, setAtStart] = React.useState(true)
    const [atEnd, setAtEnd] = React.useState(false)

    const sync = React.useCallback(() => {
        const track = trackRef.current
        if (!track) return
        setAtStart(track.scrollLeft <= 1)
        setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1)
    }, [])

    React.useEffect(() => {
        sync()
        window.addEventListener("resize", sync)
        return () => window.removeEventListener("resize", sync)
    }, [sync])

    /* step by exactly one card so every scroll lands on a snap point */
    const step = (direction: 1 | -1) => {
        const track = trackRef.current
        if (!track) return
        const card = track.firstElementChild as HTMLElement | null
        const distance = card ? card.offsetWidth + GAP : track.clientWidth
        track.scrollBy({ left: direction * distance, behavior: "smooth" })
    }

    return (
        <section className="relative">
            <div className="container relative mx-auto max-w-6xl px-5 py-16 md:px-12 md:py-24">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <motion.h2
                        variants={item}
                        className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl"
                    >
                        Read up.
                    </motion.h2>
                    <motion.p
                        variants={item}
                        className="mt-5 max-w-md text-sm text-muted-foreground md:text-base"
                    >
                        Explore our most popular insights and ideas shaping the future of
                        online selling.
                    </motion.p>
                </motion.div>

                <motion.div
                    ref={trackRef}
                    onScroll={sync}
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:mt-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {posts.map((post) => {
                        const card = (
                            <article className="group">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
                                    <Image
                                        src={post.cover}
                                        alt=""
                                        fill
                                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 78vw"
                                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                    />
                                </div>
                                <h3 className="mt-4 text-base font-semibold leading-snug md:text-lg">
                                    {post.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {formatDate(post.date)}
                                </p>
                            </article>
                        )

                        return (
                            <motion.div
                                key={post.title}
                                variants={item}
                                whileHover={{ y: -6 }}
                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
                            >
                                {post.href ? (
                                    <Link href={post.href} className="block">
                                        {card}
                                    </Link>
                                ) : (
                                    card
                                )}
                            </motion.div>
                        )
                    })}
                </motion.div>

                <div className="mt-8 flex justify-end gap-3">
                    {(
                        [
                            { direction: -1, label: "Previous posts", Icon: ChevronLeft, disabled: atStart },
                            { direction: 1, label: "Next posts", Icon: ChevronRight, disabled: atEnd },
                        ] as const
                    ).map(({ direction, label, Icon, disabled }) => (
                        <button
                            key={label}
                            type="button"
                            onClick={() => step(direction)}
                            disabled={disabled}
                            aria-label={label}
                            className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition",
                                disabled
                                    ? "cursor-not-allowed opacity-40"
                                    : "hover:bg-muted-foreground/20"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
