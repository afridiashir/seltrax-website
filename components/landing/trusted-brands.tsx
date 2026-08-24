import Image from "next/image"

/* Drop new logos in /public/brands and add them here — the marquee fills itself.
   Source files are all 60px tall, so h-* sizing keeps them optically even. */
const brands = [
    { src: "/brands/truke.png", alt: "trüke", width: 119, height: 58 },
    { src: "/brands/govo.png", alt: "GOVO", width: 145, height: 60 },
    { src: "/brands/lemonade.png", alt: "Lemonade", width: 261, height: 60 },
    { src: "/brands/uppercase.png", alt: "uppercase", width: 264, height: 60 },
]

/* One half of the track must out-measure the widest viewport or the loop shows a
   gap, so repeat the set up to 8 tiles. */
const row = Array.from(
    { length: Math.max(8, brands.length) },
    (_, i) => brands[i % brands.length]
)

export function TrustedBrands() {
    return (
        <section className="relative">
            <div className="container relative mx-auto max-w-6xl px-5 pt-14 md:px-12 md:pt-20">
                <h2 className="text-center font-medium text-base sm:text-lg">Trusted Brands working with us</h2>

                <div className="marquee relative mt-8 overflow-hidden md:mt-10">
                    {/* two identical halves; the track shifts -50% for a seamless loop */}
                    <div
                        className="animate-marquee flex w-max items-center"
                        style={{ "--marquee-duration": "40s" } as React.CSSProperties}
                    >
                        {[0, 1].map((half) => (
                            <div
                                key={half}
                                aria-hidden={half === 1}
                                className="flex shrink-0 items-center"
                            >
                                {row.map((brand, i) => (
                                    <div
                                        key={`${half}-${i}`}
                                        className="flex shrink-0 items-center justify-center px-6 sm:px-8 md:px-12"
                                    >
                                        <Image
                                            src={brand.src}
                                            alt={brand.alt}
                                            width={brand.width}
                                            height={brand.height}
                                            className="h-8 w-auto grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 md:h-12"
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
 
            </div>
        </section>
    )
}
