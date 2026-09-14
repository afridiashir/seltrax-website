import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Integration } from "./data"

export function IntegrationLogo({ item, size = 48, className }: { item: Integration; size?: number; className?: string }) {
    if (item.logo) {
        return <Image src={item.logo} alt={`${item.name} logo`} width={size} height={size} className={cn("shrink-0 rounded-full", className)} style={{ width: size, height: size }} />
    }
    const len = item.monogram.text.length
    return (
        <span
            aria-hidden
            className={cn("grid shrink-0 place-items-center rounded-full font-bold tracking-tight", className)}
            style={{ width: size, height: size, background: item.monogram.bg, color: item.monogram.fg, fontSize: size * (len > 2 ? 0.26 : len > 1 ? 0.34 : 0.46) }}
        >
            {item.monogram.text}
        </span>
    )
}
