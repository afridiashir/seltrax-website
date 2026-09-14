import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/landing/section"
import { cn } from "@/lib/utils"
import { REGISTER_URL } from "@/lib/config"

/* Drop new logos in /public/integrations and add them here — the marquee fills
   itself. Each file is a complete 96x96 circular badge, so the markup only sizes
   it. `lift` staggers the badges into the wave; the pattern repeats with the set,
   so keep the offsets varied across the whole list. */
const integrations = [
    {
        src: "/integrations/facebook-pixel.svg",
        alt: "Facebook Pixel",
        size: "h-14 w-14 md:h-[72px] md:w-[72px]",
        lift: "-translate-y-5",
    },
    {
        src: "/integrations/clarity.svg",
        alt: "Microsoft Clarity",
        size: "h-12 w-12 md:h-16 md:w-16",
        lift: "translate-y-4",
    },
    {
        src: "/integrations/mailchimp.svg",
        alt: "Mailchimp",
        size: "h-14 w-14 md:h-[72px] md:w-[72px]",
        lift: "translate-y-10",
    },
    {
        src: "/integrations/trusted-badges.svg",
        alt: "Trusted Badges",
        size: "h-14 w-14 md:h-[72px] md:w-[72px]",
        lift: "-translate-y-1",
    },
    {
        src: "/integrations/google-analytics.svg",
        alt: "Google Analytics",
        size: "h-12 w-12 md:h-16 md:w-16",
        lift: "translate-y-6",
    },
]

/* One half of the track must out-measure the widest viewport or the loop shows a
   gap, so repeat the set up to 10 tiles. */
const row = Array.from(
    { length: Math.max(10, integrations.length) },
    (_, i) => integrations[i % integrations.length]
)

export function Integrations() {
    return (
        <Section
            title="Connect Every Channel, Carrier, and"
            label="Tool You Already Use"
            description="We have more than 20+ plugins, so you don't have to pay for just a little ease"
        >
            <div className="marquee relative -mx-5 overflow-hidden md:-mx-12">
                {/* two identical halves; the track shifts -50% for a seamless loop */}
                <div
                    className="animate-marquee flex w-max items-center py-10 md:py-12"
                    style={{ "--marquee-duration": "45s" } as React.CSSProperties}
                >
                    {[0, 1].map((half) => (
                        <div
                            key={half}
                            aria-hidden={half === 1}
                            className="flex shrink-0 items-center"
                        >
                            {row.map((integration, i) => (
                                <div
                                    key={`${half}-${i}`}
                                    className={cn(
                                        "flex shrink-0 items-center justify-center px-3 sm:px-4 md:px-5",
                                        integration.lift
                                    )}
                                >
                                    <Image
                                        src={integration.src}
                                        alt={integration.alt}
                                        width={96}
                                        height={96}
                                        unoptimized
                                        className={cn(
                                            "rounded-full shadow-md",
                                            integration.size
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* edge fades — solid at the rim, fully transparent by the centre */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20 md:w-40" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20 md:w-40" />
            </div>

            <div className="mt-6 flex justify-center md:mt-8">
                <Button asChild variant="outline" className="rounded-md px-8 font-medium">
                    <Link href={REGISTER_URL}>Take a look</Link>
                </Button>
            </div>
        </Section>
    )
}
