import type { CSSProperties } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Brand } from "@/lib/brands"
import { Container } from "./ui"

/* Enough logos per loop that one copy is wider than the strip, so the marquee
   never shows a gap however few logos the Studio has. */
const MIN_PER_LOOP = 10

/* Scale a logo by area rather than height: a square mark at full height next to
   a long wordmark at full height looks twice as heavy. 1 for a square logo,
   ~0.68 for a 3:1 wordmark. */
const scale = (b: Brand) => Math.min(1, Math.pow(b.width / b.height, -0.35))

export function TrustedBrands({ brands }: { brands: Brand[] }) {
    if (!brands.length) return null
    const loop = Array.from({ length: Math.ceil(MIN_PER_LOOP / brands.length) }, () => brands).flat()
    // Two identical copies; the track slides left by one copy and restarts.
    const track = [...loop, ...loop]

    return (
        <Container className="pb-4 pt-2 lg:pt-4">
            <h2 className="text-center text-[11px] font-normal text-[#5C6058] lg:text-[13px]">
                Trusted by growing online stores across Pakistan
            </h2>
            <div className="group mx-auto mt-4 max-w-[1040px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] motion-reduce:[mask-image:none] lg:mt-6">
                {/* Spacing is padding on each item, not flex gap, so the two copies are
                    exactly half the track each and the -50% loop is seamless. */}
                <ul className="flex w-max items-center animate-[brands-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4">
                    {track.map((b, i) => {
                        // Only the first pass is real content; the rest are marquee filler.
                        const filler = i >= brands.length
                        return (
                            <li
                                key={i}
                                aria-hidden={filler || undefined}
                                className={cn("shrink-0 px-6 sm:px-8 lg:px-10", filler && "motion-reduce:hidden")}
                            >
                                <Image
                                    src={b.src}
                                    alt={filler ? "" : `${b.name}, Seltrax customer`}
                                    width={b.width}
                                    height={b.height}
                                    sizes="200px"
                                    style={{ "--k": scale(b) } as CSSProperties}
                                    className="h-[calc(var(--k)*48px)] w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 lg:h-[calc(var(--k)*68px)]"
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Container>
    )
}
