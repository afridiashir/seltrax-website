import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, ImageOff, Layers, Package, Zap } from "lucide-react"
import { REGISTER_URL } from "@/lib/config"
import type { PublicTemplate } from "@/lib/templates-api"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container, Reveal, Serif, h2Class } from "@/components/home/ui"
import { slugify } from "./data"

const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"

/* Previews are portrait 1920x2480 (24:31); cropping from the top keeps the
   header and hero, same as the cards on /designs. */
function Preview({ src, alt, priority }: { src?: string; alt: string; priority?: boolean }) {
    return (
        <div className="relative aspect-[24/31] overflow-hidden rounded-2xl border border-[#E4E6DF] bg-[#F3F4F0]">
            {src ? (
                <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
            ) : (
                <div className="grid h-full w-full place-items-center text-[#B5B9AD]">
                    <ImageOff className="h-8 w-8" aria-label="No preview available" />
                </div>
            )}
        </div>
    )
}

export function DesignDetail({ design, related }: { design: PublicTemplate; related: PublicTemplate[] }) {
    const [main, ...rest] = design.previewImages
    const backHref = design.category ? `/designs#${slugify(design.category)}` : "/designs"
    const facts = [
        { k: "Category", v: design.category },
        { k: "Pages", v: design.pages.length ? String(design.pages.length) : null },
        { k: "Sample products", v: design.sampleProductCount ? String(design.sampleProductCount) : null },
        { k: "Collections", v: design.collectionCount ? String(design.collectionCount) : null },
        { k: "Updated", v: new Date(design.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) },
    ].filter((f): f is { k: string; v: string } => !!f.v)

    return (
        <>
            <header className="relative">
                <Image src="/landing/bluish.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/70 to-transparent" />
                <div
                    className="absolute inset-x-0 bottom-0 h-[62%]"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.38) 40%, rgba(255,255,255,0.68) 58%, rgba(255,255,255,0.9) 74%, #fff 88%, #fff 100%)",
                    }}
                />
                <div className="relative z-10">
                    <HomeNavbar />
                    <Container className="pb-10 pt-6 lg:pb-16 lg:pt-10">
                        <Link href={backHref} className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium backdrop-blur hover:bg-white lg:text-[12px]">
                            <ArrowLeft className="h-3 w-3" /> All designs
                        </Link>
                        <Reveal className="mt-6">
                            {design.category && (
                                <span className="rounded-full bg-[#171717] px-2.5 py-0.5 text-[10px] font-medium text-white lg:text-[11px]">{design.category}</span>
                            )}
                            <h1 className="mt-3 text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] lg:text-[52px]">
                                {design.name} <Serif className="text-[#5C6058]">store design</Serif>
                            </h1>
                            {design.description && (
                                <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-[#3A3D37] lg:text-[16px]">{design.description}</p>
                            )}
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Link href={REGISTER_URL} className="inline-flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2.5 text-[12px] font-medium text-white hover:bg-black lg:text-[14px]">
                                    Use this template <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                                {design.demoUrl && (
                                    <a href={design.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#D9DCD3] bg-white/80 px-5 py-2.5 text-[12px] font-medium hover:bg-white lg:text-[14px]">
                                        View demo <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </div>
                        </Reveal>
                    </Container>
                </div>
            </header>

            <Container>
                <div className="grid grid-cols-1 gap-8 pb-6 pt-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:pt-8">
                    <div>
                        <Reveal>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Preview</p>
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Preview src={main} alt={`${design.name} store design`} priority />
                                {rest.map((src, i) => (
                                    <Preview key={src} src={src} alt={`${design.name} store design, view ${i + 2}`} />
                                ))}
                            </div>
                        </Reveal>

                        {(design.pages.length > 0 || design.sampleProductCount > 0 || design.collectionCount > 0) && (
                            <Reveal className="mt-10">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">What&apos;s included</p>
                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {design.pages.length > 0 && (
                                        <div className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5">
                                            <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: ACCENT }}><Layers className="h-4 w-4" /></span>
                                            <p className="mt-3 text-[13px] font-semibold lg:text-[15px]">Designed pages</p>
                                            <ul className="mt-2 space-y-1">
                                                {design.pages.map((p) => (
                                                    <li key={p} className="flex items-center gap-2 text-[11px] text-[#3A3D37] lg:text-[13px]">
                                                        <Check className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} /> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {(design.sampleProductCount > 0 || design.collectionCount > 0) && (
                                        <div className="rounded-2xl border border-[#E4E6DF] bg-[#F6F7F3] p-5">
                                            <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: ACCENT }}><Package className="h-4 w-4" /></span>
                                            <p className="mt-3 text-[13px] font-semibold lg:text-[15px]">Ready to fill</p>
                                            <p className="mt-1 text-[11px] leading-relaxed text-[#6B6F66] lg:text-[13px]">
                                                {[
                                                    design.sampleProductCount > 0 && `${design.sampleProductCount} sample ${design.sampleProductCount === 1 ? "product" : "products"} you can add`,
                                                    design.collectionCount > 0 && `${design.collectionCount} ${design.collectionCount === 1 ? "collection" : "collections"} set up for you`,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" and ")}
                                                . Swap in your own products and photos whenever you&apos;re ready.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        )}

                        <Reveal className="mt-10">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">How to use it</p>
                            <ol className="relative mt-4">
                                <span className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-[2px] bg-[#EEF0EA]" />
                                {[
                                    "Create your Seltrax store.",
                                    "In the admin, open Website → Install Theme and choose this template.",
                                    "Add your logo and products, then publish.",
                                ].map((s, i) => (
                                    <li key={s} className="relative flex gap-4 pb-4 last:pb-0">
                                        <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#171717] text-[12px] font-semibold text-white">{i + 1}</span>
                                        <p className="pt-1.5 text-[12px] leading-relaxed lg:text-[14px]">{s}</p>
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
                    </div>

                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <Reveal>
                            <div className="rounded-2xl border border-[#E4E6DF] bg-white p-5">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8E84]">Details</p>
                                <dl className="mt-2">
                                    {facts.map((f) => (
                                        <div key={f.k} className="flex items-baseline justify-between gap-3 border-b border-[#EEF0EA] py-2.5 text-[11px] last:border-b-0 lg:text-[12.5px]">
                                            <dt className="shrink-0 text-[#8A8E84]">{f.k}</dt>
                                            <dd className="text-right font-medium">{f.v}</dd>
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#F6F7F3] p-3 text-[10.5px] leading-relaxed text-[#3A3D37] lg:text-[11.5px]">
                                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                                    Switching templates later keeps your products, orders and settings — only the look changes.
                                </div>
                                <Link href={REGISTER_URL} className="mt-4 flex items-center justify-center gap-1 rounded-full bg-[#171717] py-2.5 text-[12px] font-medium text-white hover:bg-black">
                                    Use this template <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </Reveal>
                    </aside>
                </div>

                {related.length > 0 && (
                    <section className="pb-16 pt-12 lg:pb-24 lg:pt-16">
                        <Reveal>
                            <h2 className={h2Class}>
                                <Serif className="block">More in {design.category}</Serif>
                                <span className="block font-semibold">Related designs</span>
                            </h2>
                        </Reveal>
                        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-10">
                            {related.map((r, i) => (
                                <Reveal key={r.slug} delay={i * 0.06}>
                                    <li>
                                        <Link href={`/designs/${r.slug}`} className="group block overflow-hidden rounded-2xl border border-[#E4E6DF] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)]">
                                            <div className="relative aspect-[24/31] overflow-hidden bg-[#F3F4F0]">
                                                {r.previewImages[0] && (
                                                    <Image src={r.previewImages[0]} alt={`${r.name} store design`} fill sizes={sizes} className="object-cover object-top" />
                                                )}
                                            </div>
                                            <p className="p-4 text-[13px] font-semibold lg:text-[14px]">{r.name}</p>
                                        </Link>
                                    </li>
                                </Reveal>
                            ))}
                        </ul>
                    </section>
                )}
            </Container>
        </>
    )
}
