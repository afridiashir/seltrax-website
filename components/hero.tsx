"use client"

import { WaitlistForm } from "@/components/waitlist-form"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Aurora from "./aurora"
import { useTheme } from "next-themes"

export function Hero() {
    const { theme, setTheme } = useTheme();
    return (
        <section id="hero-section" className="relative overflow-hidden pb-16 pt-36 md:pb-24 bg-gradient-to-b from-primary/10 to-background/10">

            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -ml-[50%] -translate-x-1/2 w-[200%] h-[500px] opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-blue-500/20 blur-3xl animate-pulse" />
            </div>

            <div className="container px-4 md:px-24 lg:px-32 mx-auto relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-[300px] rounded-full border dark:border-white/10 border-gray-300 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-3xl mb-8 text-center"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    <span className="text-muted-foreground">Launching February 2026</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="font-chillax text-3xl md:text-4xl lg:text-[52px] font-semibold tracking-[0.02em] leading-[1.4] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-3 md:mb-6 max-w-5xl"
                >
                    The <span className="text-primary/80 bg-primary/10 px-2 py-1 rounded-sm">Faster and Effective</span> <br className="hidden md:block" />
                    Shopify & WooCommerce Alternative
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-md md:text-lg text-muted-foreground max-w-2xl mb-10 font-sans"
                >
                    Seltrax is a modern e-commerce platform built as a powerful alternative to Shopify & WooCommerce — faster, simpler, and more affordable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-16"
                >
                    <WaitlistForm />
                    <p className="text-sm text-center text-muted-foreground mt-3">We'll set up your online store for free if you join early.</p>
                </motion.div>

                {/* Dashboard Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full max-w-5xl aspect-[16/9] rounded-xl border bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden group"
                >
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-xl font-medium">
                        {theme === "dark" ? <img src="/dark.png" alt="Dashboard" className="w-full h-full object-cover" /> : <img src="/light.png" alt="Dashboard" className="w-full h-full object-cover" />}
                    </div>
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </motion.div>
            </div>
        </section>
    )
}
