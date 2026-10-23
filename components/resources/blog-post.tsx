import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextComponents } from "next-sanity"
import { ArrowLeft, ChevronRight, Clock } from "lucide-react"
import { HomeNavbar } from "@/components/home/navbar"
import { ACCENT, Container } from "@/components/home/ui"
import type { Post } from "@/lib/blog"
import { urlFor } from "@/lib/sanity/image"
import { blogCategories } from "./blog-data"

const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
const text = "text-[13.5px] leading-[1.75] text-[#3A3D37] lg:text-[15px]"

/* Same type scale as the help articles (components/help/article.tsx). */
const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className={`mt-4 ${text}`}>{children}</p>,
        h2: ({ children }) => <h2 className="mt-10 text-[19px] font-semibold tracking-[-0.01em] lg:text-[23px]">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-7 text-[16px] font-semibold lg:text-[18px]">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="mt-5 border-l-2 pl-4 text-[14px] italic leading-relaxed text-[#3A3D37] lg:text-[16px]" style={{ borderColor: ACCENT }}>
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-[#2B7FFF]">{children}</ul>,
        number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5">{children}</ol>,
    },
    listItem: ({ children }) => <li className={text}>{children}</li>,
    marks: {
        link: ({ value, children }) => {
            const href: string = value?.href ?? "#"
            const external = /^https?:\/\//.test(href) && !href.startsWith("https://seltrax.com")
            return (
                <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="font-medium underline decoration-[#2B7FFF]/40 underline-offset-2 hover:decoration-[#2B7FFF]"
                >
                    {children}
                </a>
            )
        },
        code: ({ children }) => <code className="rounded bg-[#F3F4F0] px-1 py-0.5 text-[0.9em]">{children}</code>,
    },
    types: {
        image: ({ value }) =>
            value?.asset ? (
                <figure className="mt-6">
                    <Image
                        src={urlFor(value).width(1440).url()}
                        alt={value.alt ?? ""}
                        width={1440}
                        height={810}
                        sizes="(max-width: 768px) 100vw, 720px"
                        className="h-auto w-full rounded-xl border border-[#E4E6DF]"
                    />
                    {value.caption && <figcaption className="mt-2 text-center text-[12px] text-[#8A8E84]">{value.caption}</figcaption>}
                </figure>
            ) : null,
        /* From @sanity/table in the Studio; the first row is the header. */
        table: ({ value }) => {
            const rows: { _key: string; cells: string[] }[] = value?.rows ?? []
            if (!rows.length) return null
            const [head, ...body] = rows
            return (
                <div className="mt-6 overflow-x-auto rounded-xl border border-[#E4E6DF]">
                    <table className="w-full min-w-[480px] border-collapse text-left text-[12.5px] lg:text-[14px]">
                        <thead className="bg-[#F6F7F3]">
                            <tr>
                                {head.cells.map((c, i) => (
                                    <th key={i} scope="col" className="border-b border-[#E4E6DF] px-4 py-3 font-semibold">{c}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {body.map((r) => (
                                <tr key={r._key} className="border-t border-[#EEF0EA] first:border-t-0">
                                    {r.cells.map((c, i) =>
                                        i === 0 ? (
                                            <th key={i} scope="row" className="px-4 py-3 font-medium text-[#171717]">{c}</th>
                                        ) : (
                                            <td key={i} className="px-4 py-3 text-[#3A3D37]">{c}</td>
                                        ),
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        },
    },
}

export function BlogPost({ post }: { post: Post }) {
    const category = blogCategories.find((c) => c.key === post.category)

    return (
        <>
            <header className="relative">
                <Image src="/landing/bluish.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/50 to-white" />
                <div className="relative z-10">
                    <HomeNavbar />
                    <Container className="pb-8 pt-6 lg:pb-12 lg:pt-10">
                        <div className="mx-auto max-w-[720px]">
                            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[11.5px] text-[#5C6058] lg:text-[12px]">
                                <Link href="/blog" className="hover:text-[#171717]">Blog</Link>
                                {category && (
                                    <>
                                        <ChevronRight className="h-3 w-3" />
                                        <Link href={`/blog#${category.key}`} className="hover:text-[#171717]">{category.name}</Link>
                                    </>
                                )}
                            </nav>
                            <h1 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] lg:text-[42px]">{post.title}</h1>
                            {post.excerpt && <p className="mt-3 text-[14px] leading-relaxed text-[#3A3D37] lg:text-[17px]">{post.excerpt}</p>}
                            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] text-[#5C6058] lg:text-[12.5px]">
                                {post.author && (
                                    <span className="inline-flex items-center gap-2">
                                        {post.author.image && (
                                            <Image
                                                src={urlFor(post.author.image).width(64).height(64).fit("crop").url()}
                                                alt=""
                                                width={24}
                                                height={24}
                                                className="rounded-full"
                                            />
                                        )}
                                        <span className="font-medium text-[#171717]">{post.author.name}</span>
                                        {post.author.role && <span>· {post.author.role}</span>}
                                    </span>
                                )}
                                <time dateTime={post.publishedAt}>{fmtDate(post.publishedAt)}</time>
                                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMinutes} min read</span>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>

            <Container className="pb-16 lg:pb-24">
                <article className="mx-auto max-w-[720px]">
                    {post.mainImage && (
                        <Image
                            src={urlFor(post.mainImage).width(1440).height(810).fit("crop").url()}
                            alt={post.mainImage.alt ?? ""}
                            width={1440}
                            height={810}
                            priority
                            sizes="(max-width: 768px) 100vw, 720px"
                            className="h-auto w-full rounded-2xl border border-[#E4E6DF]"
                        />
                    )}

                    <div className="mt-2">
                        <PortableText value={post.body ?? []} components={components} />
                    </div>

                    <div className="mt-12 flex flex-col items-start justify-between gap-3 rounded-xl bg-[#171717] p-5 text-white sm:flex-row sm:items-center">
                        <p className="text-[13px]">Ready to sell online? Launch your store for Rs 1,999/month, everything included.</p>
                        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#171717] hover:bg-[#F3F4F0]">
                            Book a demo
                        </a>
                    </div>

                    <Link href="/blog" className="mt-8 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#5C6058] hover:text-[#171717]">
                        <ArrowLeft className="h-3.5 w-3.5" /> All articles
                    </Link>
                </article>
            </Container>
        </>
    )
}
