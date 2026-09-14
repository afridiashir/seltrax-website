"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, BarChart3, Bell, Filter, LogIn, Moon, Package, ShoppingCart, Smartphone, Users } from "lucide-react"
import { HomeNavbar } from "@/components/home/navbar"
import { TiltCard } from "@/components/home/tilt-card"
import { ACCENT, Container, Flag, Reveal, Serif, h2Class, shadow } from "@/components/home/ui"
import { AndroidButton } from "./android-button"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"
const ease = [0.22, 1, 0.36, 1] as const

const float = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

/* ---- Hero: nav over the photo, headline, download button, phone ------- */

export function AppHero() {
    return (
        <section className="relative overflow-hidden">
            <Image src="/landing/bluish.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
            <div
                className="absolute inset-x-0 bottom-0 h-[55%]"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                }}
            />

            <div className="relative z-10">
                <HomeNavbar />

                <Container className="grid grid-cols-1 items-center gap-10 pb-10 pt-10 md:grid-cols-2 md:gap-8 lg:pb-16 lg:pt-16">
                    <div className="text-center md:text-left">
                        <motion.span {...float(0)} className="inline-flex items-center gap-1.5 rounded-full bg-[#171717] px-3 py-1 text-[11px] font-medium text-white lg:text-[12px]">
                            <Smartphone className="h-3 w-3" style={{ color: ACCENT }} />
                            Seltrax for Android
                        </motion.span>
                        <motion.h1 {...float(0.05)} className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[48px] lg:text-[60px]">
                            Your Store,
                            <br />
                            <Serif>In Your Pocket</Serif>
                        </motion.h1>
                        <motion.p {...float(0.1)} className="mx-auto mt-4 max-w-[420px] text-[12px] leading-relaxed text-[#3A3D37] md:mx-0 lg:text-[15px]">
                            Live sales, sessions and conversion, every order and its dispatch status, and your team — the whole
                            Seltrax dashboard on your phone.
                        </motion.p>
                        <motion.div {...float(0.15)} className="mt-6 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            <AndroidButton size="lg" />
                            <a
                                href={DEMO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-4 py-2.5 text-[12px] font-medium text-[#171717] backdrop-blur transition-colors hover:bg-white lg:px-5 lg:text-[14px]"
                            >
                                Book a Demo <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                        </motion.div>
                        <motion.p {...float(0.2)} className="mt-3 text-[10px] text-[#5C6058] lg:text-[12px]">
                            Sign in with your existing Seltrax store login.
                        </motion.p>
                    </div>

                    <motion.div {...float(0.2)} className="relative mx-auto w-full max-w-[420px]">
                        <TiltCard spring={false} float={false} maxTilt={6}>
                            <div className="relative mx-auto w-[230px] overflow-hidden rounded-[32px] border-[6px] border-[#171717] bg-[#F5F6F8] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.5)] lg:w-[260px]">
                                <div className="absolute left-1/2 top-1.5 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-[#171717]" />
                                <div className="relative aspect-[9/17.5] w-full">
                                    <Image src="/mobile-screenshot.jpeg" alt="Seltrax Android app: sales, sessions, conversion and funnel" fill sizes="260px" className="object-cover object-top" />
                                </div>
                            </div>
                        </TiltCard>

                        <div className={`absolute left-0 top-[16%] hidden rounded-xl bg-white p-2.5 sm:block ${shadow}`}>
                            <div className="flex items-center gap-2">
                                <Flag code="pk" size={22} />
                                <div className="text-[9px] leading-tight lg:text-[11px]">
                                    <p className="text-[#8A8E84]">New order · COD</p>
                                    <p className="text-[13px] font-semibold tracking-tight lg:text-[16px]">Rs 5,700</p>
                                </div>
                            </div>
                        </div>
                        <div className={`absolute bottom-[18%] right-0 hidden rounded-xl bg-white p-2.5 sm:block ${shadow}`}>
                            <div className="flex items-center gap-2 text-[9px] lg:text-[11px]">
                                <span className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: ACCENT }}>
                                    <Bell className="h-3 w-3" />
                                </span>
                                <div className="leading-tight">
                                    <p className="font-semibold">Order-0032 dispatched</p>
                                    <p className="text-[#8A8E84]">via Leopards · #004518</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </div>
        </section>
    )
}

/* ---- What you get — every item is visible in the dashboard screenshot --- */

const features = [
    { icon: BarChart3, title: "Live sales & sessions", desc: "Total sales, sessions, conversion and average order — for today, 7, 30 or 90 days." },
    { icon: Filter, title: "Conversion funnel", desc: "Sessions → added to cart → reached checkout → converted, with the drop-off at each step." },
    { icon: Package, title: "Orders & dispatch", desc: "Every order with its courier and tracking number, right when it happens." },
    { icon: Bell, title: "Order notifications", desc: "A ping for new orders, so a COD order never waits for you to open a laptop." },
    { icon: ShoppingCart, title: "Products & stock", desc: "Check stock, update prices and toggle products live from anywhere." },
    { icon: Users, title: "Staff accounts", desc: "Your team signs in with their own permissions — no shared logins." },
    { icon: Moon, title: "Dark mode", desc: "Easy on the eyes when you're checking sales late at night." },
    { icon: LogIn, title: "Same login as the web", desc: "Nothing new to set up — your store credentials just work." },
]

export function AppFeatures() {
    return (
        <Container>
            <section className="pb-10 pt-12 lg:pb-14 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Everything on the dashboard,</Serif>
                        <span className="block font-semibold">Now on Your Phone</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
                    {features.map((f, i) => (
                        <Reveal key={f.title} delay={i * 0.05}>
                            <div className="h-full rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5 transition-colors hover:bg-[#F1F3EE]">
                                <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#171717] text-white">
                                    <f.icon className="h-4 w-4" />
                                </span>
                                <p className="mt-4 text-[13px] font-semibold lg:text-[15px]">{f.title}</p>
                                <p className="mt-1 text-[10.5px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{f.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </Container>
    )
}

/* ---- Three steps to get going ----------------------------------------- */

const steps = [
    { n: "01", title: "Download the app", desc: "Install Seltrax for Android from the button above." },
    { n: "02", title: "Sign in", desc: "Use the same email and password as your store dashboard." },
    { n: "03", title: "Run your store", desc: "Watch orders come in, dispatch with a tap, and keep an eye on sales." },
]

export function AppSteps() {
    return (
        <Container>
            <section className="border-t border-[#EEF0EA] pb-16 pt-12 lg:pb-24 lg:pt-20">
                <Reveal>
                    <h2 className={h2Class}>
                        <Serif className="block">Up and running</Serif>
                        <span className="block font-semibold">In Three Steps</span>
                    </h2>
                </Reveal>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-14 lg:gap-6">
                    {steps.map((s, i) => (
                        <Reveal key={s.n} delay={i * 0.08}>
                            <div className="rounded-2xl bg-white p-5 lg:p-6">
                                <Serif className="block text-[40px] leading-none text-[#8A8E84] lg:text-[48px]">{s.n}</Serif>
                                <p className="mt-4 text-[14px] font-semibold lg:text-[17px]">{s.title}</p>
                                <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">{s.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-10 flex justify-center">
                    <AndroidButton size="lg" />
                </Reveal>
            </section>
        </Container>
    )
}
