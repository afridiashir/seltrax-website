"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangle, CalendarDays } from "lucide-react"
import { ACCENT } from "@/components/home/ui"

/* The block vocabulary shared by the legal pages (/privacy, /delete-account).
   Content lives as data next to each page; this file is the only place that
   decides how it looks. */
export type Block =
    | { type: "p"; lead?: string; text: string }
    | { type: "list"; items: string[] }
    | { type: "steps"; items: string[] }
    | { type: "table"; head: string[]; rows: string[][] }
    | { type: "note"; text: string; tone?: "info" | "warn" }

/* Inline markup the legal text is allowed to use: **bold**, [label](href),
   and bare email addresses, which become mailto links. */
const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/

const linkClass = "font-medium underline decoration-[#CFE0FF] underline-offset-2 hover:decoration-[#2B7FFF]"

export function Rich({ text }: { text: string }) {
    return (
        <>
            {text.split(INLINE).map((chunk, i) => {
                if (chunk.startsWith("**") && chunk.endsWith("**")) {
                    return (
                        <strong key={i} className="font-semibold text-[#171717]">
                            {chunk.slice(2, -2)}
                        </strong>
                    )
                }
                const link = LINK.exec(chunk)
                if (link) {
                    return (
                        <Link key={i} href={link[2]} className={linkClass} style={{ color: ACCENT }}>
                            {link[1]}
                        </Link>
                    )
                }
                if (chunk.includes("@") && !chunk.includes(" ")) {
                    return (
                        <a key={i} href={`mailto:${chunk}`} className={linkClass} style={{ color: ACCENT }}>
                            {chunk}
                        </a>
                    )
                }
                return <React.Fragment key={i}>{chunk}</React.Fragment>
            })}
        </>
    )
}

export function RenderBlock({ block }: { block: Block }) {
    switch (block.type) {
        case "p":
            return (
                <p className="mt-3 text-[13.5px] leading-[1.75] text-[#3A3D37] lg:text-[15px]">
                    {block.lead && <strong className="font-semibold text-[#171717]">{block.lead} </strong>}
                    <Rich text={block.text} />
                </p>
            )
        case "list":
            return (
                <ul className="mt-3 space-y-2">
                    {block.items.map((it) => (
                        <li key={it} className="flex gap-2.5 text-[13.5px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ACCENT }} />
                            <span>
                                <Rich text={it} />
                            </span>
                        </li>
                    ))}
                </ul>
            )
        case "steps":
            return (
                <ol className="mt-4 space-y-3">
                    {block.items.map((it, i) => (
                        <li key={it} className="flex gap-3">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#171717] text-[11px] font-semibold text-white">
                                {i + 1}
                            </span>
                            <p className="pt-0.5 text-[13.5px] leading-relaxed text-[#3A3D37] lg:text-[15px]">
                                <Rich text={it} />
                            </p>
                        </li>
                    ))}
                </ol>
            )
        case "note": {
            const warn = block.tone === "warn"
            const Icon = warn ? AlertTriangle : CalendarDays
            return (
                <div
                    className={`mt-5 flex gap-3 rounded-xl border p-4 ${warn ? "border-[#F5D9B0] bg-[#FFF8EE]" : "border-[#CFE0FF] bg-[#F5F9FF]"}`}
                >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: warn ? "#B25E09" : ACCENT }} />
                    <p className="text-[13px] leading-relaxed text-[#3A3D37] lg:text-[14px]">
                        <Rich text={block.text} />
                    </p>
                </div>
            )
        }
        case "table":
            return (
                <div className="mt-4 overflow-x-auto rounded-xl border border-[#E4E6DF]">
                    <table className="w-full min-w-[520px] border-collapse text-left">
                        <thead>
                            <tr className="bg-[#F6F7F3]">
                                {block.head.map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5C6058]"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row) => (
                                <tr key={row[0]} className="border-t border-[#EEF0EA] align-top">
                                    {row.map((cell, i) => (
                                        <td
                                            key={cell}
                                            className={
                                                i === 0
                                                    ? "px-4 py-3 text-[12.5px] font-medium text-[#171717] lg:text-[13.5px]"
                                                    : "px-4 py-3 text-[12.5px] leading-relaxed text-[#3A3D37] lg:text-[13.5px]"
                                            }
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
    }
}
