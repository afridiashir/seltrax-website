"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { REGISTER_URL } from "@/lib/config"

const links = [
    { name: "Features", href: "#features" },
    { name: "Compare", href: "#compare" },
    { name: "FAQ", href: "#faq" },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`fixed inset-x-0 top-0 z-50 h-[60px] transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border"
                : "bg-transparent border-b border-transparent"
                }`}
        >
            <div className="container mx-auto flex h-full max-w-6xl items-center justify-between px-5 md:px-12">
                <Link href="/" className="font-heading flex items-center gap-2 text-xl font-semibold">
                    <Zap className="h-6 w-6" color="#2B7FFF" fill="#2B7FFF" />
                    <span>Seltrax</span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <Button asChild variant="outline" className="hidden rounded-md font-medium sm:inline-flex">
                        <Link href="https://calendar.app.google/gBGzD46JoktRZFa78" target="_blank" rel="noopener noreferrer">Book a Demo</Link>
                    </Button>
                    <Button asChild className="rounded-md bg-primary font-medium text-white">
                        <Link href={REGISTER_URL}>
                            Start selling <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.nav>
    )
}
