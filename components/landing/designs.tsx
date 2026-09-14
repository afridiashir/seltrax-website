"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

/* Five storefronts fanned out behind one another. Every card is the same 3:4
   frame; `crop` picks which slice of the capture is shown, so each one reads as
   a different design. Once the real theme screenshots land, give each entry its
   own `src` and drop the `crop` — the frame classes stay as they are. */
const storefronts = [
    {
        alt: "Newsletter and footer storefront layout",
        src: "/ghanam-rang-mobile.png",
        crop: "object-[50%_96%]",
        frame: "z-10 mt-10 w-[38%] sm:w-[32%] md:mt-16 md:w-[25%]",
    },
    {
        alt: "Product grid storefront layout",
        src: "/ghanam-rang-mobile.png",
        crop: "object-[50%_70%]",
        frame: "z-20 -ml-[7%] mt-5 w-[40%] sm:w-[34%] md:-ml-[4.5%] md:mt-8 md:w-[27%]",
    },
    {
        alt: "Seltrax storefront homepage",
        src: "/ghanam-rang-mobile.png",
        crop: "object-[50%_0%]",
        frame: "z-30 -ml-[7%] w-[44%] sm:w-[37%] md:-ml-[4.5%] md:w-[30%]",
    },
    {
        alt: "New arrivals storefront layout",
        src: "/ghanam-rang-mobile.png",
        crop: "object-[50%_44%]",
        frame: "z-20 -ml-[7%] mt-5 w-[40%] sm:w-[34%] md:-ml-[4.5%] md:mt-8 md:w-[27%]",
    },
    {
        alt: "Collections storefront layout",
        src: "/ghanam-rang-mobile.png",
        crop: "object-[50%_20%]",
        frame: "z-10 -ml-[7%] mt-10 w-[38%] sm:w-[32%] md:-ml-[4.5%] md:mt-16 md:w-[25%]",
    },
]

const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
}

const card: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
}

const Designs = () => {
    return (
        <section className="py-10 md:py-16">
            <div className="relative w-full overflow-hidden bg-primary text-white">
                <div className="px-6 pt-14 text-center md:pt-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl text-2xl font-medium leading-tight tracking-tight sm:text-3xl md:text-5xl"
                    >
                        Launch your store in 30 minutes.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mx-auto mt-4 max-w-md text-sm text-white/75 md:mt-5 md:text-base"
                    >
                        Start your store with prebuilt designs, add your products and
                        get your first sale online.
                    </motion.p>
                </div>

                {/* the cards run wider than the panel — justify-center splits the
                    spill evenly so the outer pair is clipped by both edges */}
                <motion.div
                    className="mt-10 flex items-start justify-center pb-14 md:mt-16 md:pb-24"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {storefronts.map((storefront) => (
                        <motion.div
                            key={storefront.alt}
                            variants={card}
                            whileHover={{ y: -12, scale: 1.04, zIndex: 40 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            className={cn("shrink-0", storefront.frame)}
                        >
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-black/10 md:rounded-xl">
                                <Image
                                    src={storefront.src}
                                    alt={storefront.alt}
                                    fill
                                    sizes="(min-width: 768px) 30vw, 45vw"
                                    className={cn("object-cover", storefront.crop)}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Designs
