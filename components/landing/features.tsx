"use client"

import { Box } from "lucide-react"
import { motion, type Variants } from "framer-motion"
import { Section } from "@/components/landing/section"

const orders = [
    { id: "0028", courier: "TCS", tracking: "#001232-2321" },
    { id: "0032", courier: "Leopards", tracking: "#004518-7742" },
    { id: "0054", courier: "M&P", tracking: "#009874-1130" },
]

// Grid-level scroll-reveal variants
const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
}

// Order list variants — each row appears 500ms after the previous
const orderContainer: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.5,
        },
    },
}

const orderRow: Variants = {
    hidden: { opacity: 0, x: -16 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
}

export function Features() {
    return (
        <Section
            id="features"
            label="Built in."
            title="Everything you need to sell."
            description="Stop assembling your store from plugins and paid apps.
Seltrax ships complete — launch, manage, and grow from one place."
        >
            <motion.div
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {/* Speed card */}
                <motion.div
                    variants={item}
                    className="md:col-span-2 min-h-[340px] sm:min-h-[380px] border rounded-md flex flex-col md:flex-row gap-4"
                >
                    <div className="w-full md:w-1/2 flex flex-col justify-between gap-4 p-4">
                        <div>
                            <motion.p
                                variants={item}
                                className="bg-blue-100 text-primary inline-block p-2 px-4 text-xs rounded-full sm:px-6"
                            >
                                &ldquo;Seltrax stores loads faster than ever&rdquo;
                            </motion.p>
                            <motion.h3 variants={item} className="text-xl mt-2 sm:text-2xl">
                                Store loads within a blink of eye
                            </motion.h3>
                        </div>
                        <motion.div variants={item}>
                            <button className="h-12 px-6 rounded-full border hover:bg-muted cursor-pointer transition-colors">
                                Book a demo
                            </button>
                        </motion.div>
                    </div>
                    <motion.div
                        variants={item}
                        className="w-full md:w-1/2 flex flex-col justify-end px-4 pb-4 md:pb-0"
                    >
                        <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] flex justify-center border rounded-t-md border-b-0 overflow-hidden pt-1">
                            <img
                                src="/home/cartspeed.png"
                                alt="Store speed preview"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* COD First card */}
                <motion.div
                    variants={item}
                    className="md:col-span-1 min-h-[340px] sm:min-h-[380px] border-white rounded-md bg-primary text-white p-4 flex flex-col"
                >
                    <motion.div
                        className="flex-1 min-h-[220px] sm:min-h-[260px] bg-blue-800 rounded-sm overflow-hidden"
                        variants={orderContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                variants={orderRow}
                                className="w-full flex items-start gap-2 p-2"
                            >
                                <div className="w-7 h-7 shrink-0 bg-white/30 text-white/70 rounded-full flex items-center justify-center sm:w-8 sm:h-8">
                                    <Box className="w-4 h-4" />
                                </div>
                                {/* the bubble fills the row and the message wraps —
                                    truncating it in a card this narrow left nothing */}
                                <div className="min-w-0 flex-1 bg-white/30 rounded-md p-2">
                                    <p className="text-white text-sm font-semibold">
                                        Order-{order.id}
                                    </p>
                                    <p className="text-white/70 text-xs leading-snug">
                                        Dispatched via {order.courier} &middot; track{" "}
                                        {order.tracking}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <h2 className="text-xl mt-3 sm:text-2xl">COD First</h2>
                    <p className="text-sm text-white/80 sm:text-base">
                        99.9% of Pakistan is doing cash on delivery so track your store
                        around that.
                    </p>
                </motion.div>

                {/* Staff Accounts card */}
                <motion.div
                    variants={item}
                    className="md:col-span-1 min-h-[340px] sm:min-h-[380px] border-white rounded-md bg-primary text-white p-4 flex flex-col"
                >
                    <div className="flex-1 min-h-[220px] sm:min-h-[260px] bg-blue-800 rounded-sm overflow-hidden">
                        <img
                            src="/home/teams.png"
                            alt="Staff accounts preview"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="text-xl mt-3 sm:text-2xl">Staff Accounts</h2>
                    <p className="text-sm text-white/80 sm:text-base">
                        Add your team with the right permissions, so everyone can do
                        their job without sharing one login.
                    </p>
                </motion.div>

                {/* Checkout card */}
                <motion.div
                    variants={item}
                    className="md:col-span-2 min-h-[340px] sm:min-h-[380px] border rounded-md flex flex-col"
                >
                    <div className="pt-4 px-4">
                        <h2 className="text-xl sm:text-2xl">Best Converting Checkout</h2>
                        <p className="text-sm text-gray-600 sm:text-base">
                            Offer a seamless shopping experience optimised for checkouts
                            and reduce abandonment rates.
                        </p>
                    </div>
                    <div className="w-full flex-1 p-4 pb-0">
                        <div className="w-full h-full min-h-[180px] border border-b-0 rounded-t-md overflow-hidden">
                            <img
                                src="/home/checkout.png"
                                alt="Checkout preview"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    )
}
