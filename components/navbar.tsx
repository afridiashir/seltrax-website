"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "./mode-toggle"

const links = [
    { name: "Features", href: "#features" },
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
            className={`fixed top-0   left-0 right-0 z-50 flex items-center justify-center p-4 flex items-center justify-between w-full h-[60px] px-6 py-3 transition-all duration-300 rounded-md ${isScrolled
                ? "bg-background/80 backdrop-blur-sm border-b "
                : "bg-transparent border border-transparent"
                }`}
        >
            <div className="container px-4 md:px-32 lg:px-64 flex items-center justify-between">
                <Link href="/" className="font-body font-semibold text-xl flex items-center gap-2">
                    <Zap className="w-6 h-6" color="#2B7FFF" fill="#2B7FFF" /><span>Seltrax</span>
                </Link>

                <div className="flex items-center gap-2">

                    <ModeToggle />
                    <Button className="md:inline-flex rounded-md bg-primary font-medium dark:bg-blue-600 text-white">
                        Join Waitlist
                    </Button>
                </div>

            </div>

        </motion.nav>
    )
}
