"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { PlusMark } from "@/components/landing/section"
import { REGISTER_URL } from "@/lib/config"

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
}

export function Hero() {
    const { resolvedTheme } = useTheme()

    return (
        <section id="hero-section" className="relative overflow-hidden">
            {/* Blueprint grid backdrop */}
            <div className="bg-grid mask-fade-edges absolute inset-0 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary/[0.07] to-transparent pointer-events-none" />

            <div className="container relative mx-auto max-w-6xl border-x border-border px-5 pt-36 pb-0 md:px-12 md:pt-44">
                <div className="flex flex-col items-center text-center">
                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.5 }}
                        className="eyebrow mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-primary"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        Seltrax is live
                    </motion.p>

                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-heading max-w-4xl text-3xl font-semibold leading-[1.2] tracking-tight md:text-6xl"
                    >
                        Launch your store today, <br className="hidden md:block" />
                        <span className="text-primary">not next month.</span>
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
                    >
                        Seltrax gives you a complete online store — themes, payments,
                        analytics, and a checkout that converts — for one flat price.
                        No plugins to install, no developers to hire, no surprise fees.
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
                    >
                        <Button asChild size="lg" className="h-12 rounded-md px-8 text-base font-medium">
                            <Link href={REGISTER_URL}>
                                Create your store <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 rounded-md px-8 text-base font-medium">
                            <Link href="#compare">See how it compares</Link>
                        </Button>
                    </motion.div>

                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="eyebrow mt-5 text-muted-foreground"
                    >
                        Rs 1,349/mo · everything included · no credit card to start
                    </motion.p>

                    {/* Dashboard in browser-chrome frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="relative mt-16 w-full md:mt-20"
                    >
                        <PlusMark className="left-1/2 top-0 hidden md:block" />
                        <div className="mask-fade-bottom relative mx-auto w-full max-w-5xl">
                            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
                                {/* Window chrome */}
                                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                                    <span className="h-3 w-3 rounded-full bg-red-400/70" />
                                    <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                                    <span className="h-3 w-3 rounded-full bg-green-400/70" />
                                    <span className="eyebrow ml-4 hidden text-muted-foreground/70 md:block">
                                        admin.seltrax.com
                                    </span>
                                </div>
                                <img
                                    src={resolvedTheme === "dark" ? "/dark-dashboard.png" : "/light-dashboard.png"}
                                    alt="Seltrax dashboard"
                                    className="aspect-[16/9] w-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
