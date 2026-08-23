"use client"

import Link from "next/link"
import Image from "next/image"
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
            <div className="container relative mx-auto max-w-6xl px-5 pt-24 pb-12 md:px-12 md:pt-28">
                <div className="flex flex-col items-center text-center">
                    <motion.image
                        {...fadeUp}
                        transition={{ duration: 0.5 }}
                        className=" inline-flex items-center"
                    >
                        <div className="w-[220px] h-[220px] pl-6" style={{
                            background: "url('/paper_icon.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain"
                        }}>
                            <h2 className="mt-14 ml-1 rotate-[-7.77deg] text-left text-black font-heading font-semibold text-base">Launch your store <br className="hidden md:block" />today,
                                <span className="text-[#686868]"> not next <br className="hidden md:block" />month.</span></h2>
                        </div>
                    </motion.image>

                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-4xl mt-2 md:-mt-6 text-3xl leading-[1.2] tracking-tight md:text-7xl"
                    >
                        Your Commerce Partner,<br className="block" />
                        Engineered for Peak <br className="block" />
                        Performance
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
                    >
                        Launch your eye-catching online store with ease, attract<br className="hidden md:block" /> 
and convert more customers than ever before.
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-4 flex flex-col items-center gap-3 sm:flex-row"
                    >
                        <Button asChild size="lg" className="h-12 rounded-md px-8 text-base font-medium">
                            <Link href={REGISTER_URL}>
                                Get Started <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
