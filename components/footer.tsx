import { ModeToggle } from "@/components/mode-toggle"
import { Zap } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t py-6 bg-background/50 backdrop-blur-xl">
            <div className="container px-4 md:px-56 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="font-heading font-semibold text-xl flex items-center gap-2"><Zap className="h-6 w-6 text-primary mt-1" color="#2B7FFF" fill="#2B7FFF" />Seltrax</span>
                </div>

                <p className="text-sm text-muted-foreground font-sans">
                    © {new Date().getFullYear()} Seltrax. All rights reserved.
                </p>


            </div>
        </footer>
    )
}
