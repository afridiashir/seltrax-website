"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

/* Swap these paths for the real dashboard captures — all three are 1920x1080,
   so the columns stay optically even. The outer two fan away from the centre,
   pivoting on their top edge so all three line up along the top. */
const dashboards = [
    {
        src: "/light.png",
        alt: "Seltrax storefront dashboard",
        tilt: "-rotate-[7.66deg] md:-rotate-[7.66deg] mt-4 md:mt-16",
    },
    {
        src: "/light-dashboard.png",
        alt: "Seltrax orders dashboard",
        tilt: "",
    },
    {
        src: "/dark-dashboard.png",
        alt: "Seltrax analytics dashboard",
        tilt: "rotate-[7.66deg] md:rotate-[7.66deg] mt-4 md:mt-16",
    },
]

const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
}

const panel: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
}

export function DashboardShowcase() {
    return (
        <section className="relative overflow-hidden pt-24 md:pt-36">
            {/* the track runs wider than the viewport, so the outer two panels
                spill past both edges and get clipped by the section */}
            <motion.div
                className="relative left-1/2 flex w-[185%] -translate-x-1/2 items-start gap-2 sm:w-[170%] sm:gap-4 md:w-[140%] md:gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {dashboards.map((dashboard, i) => (
                    <motion.div
                        key={dashboard.src}
                        variants={panel}
                        /* the centre panel stacks above the two tilted ones */
                        className={cn(
                            "relative min-w-0 flex-1 origin-bottom",
                            i === 1 ? "z-20" : "z-0",
                            dashboard.tilt
                        )}
                    >
                        <Image
                            src={dashboard.src}
                            alt={dashboard.alt}
                            width={1920}
                            height={1080}
                            sizes="(min-width: 768px) 46vw, 56vw"
                            className="h-auto w-full rounded-sm border border-border object-cover shadow-lg sm:rounded-md sm:shadow-xl md:rounded-xl"
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* background at the bottom fading to transparent at the top */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </section>
    )
}
