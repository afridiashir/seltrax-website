"use client"

import { Zap, Wallet, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
    {
        title: "Save 70K PKR",
        description: "Launch without the massive upfront costs of Shopify.",
        icon: Wallet,
    },
    {
        title: "2x Faster",
        description: "Optimized for speed and performance in Pakistan.",
        icon: Zap,
    },
    {
        title: "5x More Affordable",
        description: "Pricing plans designed for local businesses.",
        icon: TrendingUp,
    },
]

export function Stats() {
    return (
        <section className="py-20 md:py-32 relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-2">{stat.title}</h3>
                            <p className="text-muted-foreground font-sans">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
