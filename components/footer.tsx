import Link from "next/link"
import { Zap } from "lucide-react"
import { PlusMark } from "@/components/landing/section"
import { LOGIN_URL, REGISTER_URL } from "@/lib/config"

const columns = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "#features" },
            { name: "Compare", href: "#compare" },
            { name: "FAQ", href: "#faq" },
        ],
    },
    {
        title: "Get started",
        links: [
            { name: "Create your store", href: REGISTER_URL },
            { name: "Login", href: LOGIN_URL },
        ],
    },
]

export function Footer() {
    return (
        <footer className="relative border-t border-border">
            <div className="container relative mx-auto max-w-6xl overflow-hidden border-x border-border px-5 pt-16 md:px-12">
                <PlusMark className="left-0 top-0" />
                <PlusMark className="right-0 top-0 translate-x-1/2" />

                <div className="flex flex-col justify-between gap-10 pb-16 md:flex-row">
                    <div className="max-w-xs space-y-3">
                        <span className="font-heading flex items-center gap-2 text-xl font-semibold">
                            <Zap className="h-6 w-6" color="#2B7FFF" fill="#2B7FFF" />
                            Seltrax
                        </span>
                        <p className="text-sm text-muted-foreground">
                            Launch your online store in minutes — fast, affordable,
                            and everything built in.
                        </p>
                        <p className="eyebrow pt-2 text-muted-foreground/70">
                            © {new Date().getFullYear()} Seltrax
                        </p>
                    </div>

                    <div className="flex gap-16 md:gap-24">
                        {columns.map((column) => (
                            <div key={column.title}>
                                <p className="eyebrow mb-4 text-muted-foreground">{column.title}</p>
                                <ul className="space-y-3">
                                    {column.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-foreground/80 transition-colors hover:text-primary"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Giant wordmark, fading out at the bottom */}
                <div aria-hidden className="select-none border-t border-border pt-6">
                    <p className="font-heading bg-gradient-to-b from-foreground/15 to-transparent bg-clip-text text-center text-[20vw] font-semibold leading-[0.8] tracking-tight text-transparent md:text-[13rem]">
                        SELTRAX
                    </p>
                </div>
            </div>
        </footer>
    )
}
