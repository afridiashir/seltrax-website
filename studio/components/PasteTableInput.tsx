import { useState, type ClipboardEvent } from "react"
import { Card, Stack, Text } from "@sanity/ui"
import { set, type ObjectInputProps } from "sanity"

/* The table plugin only edits cell by cell, so this adds a box above it that
   turns a pasted table into rows. It reads, in order: an HTML table (copied
   from a rendered page, e.g. a Claude chat or Google Docs), a markdown table
   (| a | b |), or tab-separated text (Excel, Google Sheets). The first row is
   shown as the header on the site. */

type Rows = string[][]

const clean = (s: string) => s.replace(/\s+/g, " ").trim()

function fromHtml(html: string): Rows | null {
    const table = new DOMParser().parseFromString(html, "text/html").querySelector("table")
    if (!table) return null
    const rows = [...table.querySelectorAll("tr")].map((tr) => [...tr.querySelectorAll("th, td")].map((c) => clean(c.textContent ?? "")))
    return rows.filter((r) => r.length)
}

function fromText(text: string): Rows | null {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (lines.some((l) => l.startsWith("|"))) {
        return lines
            .filter((l) => l.startsWith("|") && !/^\|[\s:|-]+\|?$/.test(l)) // drop the |---|---| separator
            .map((l) => l.replace(/^\||\|$/g, "").split("|").map((c) => clean(c.replace(/\*\*/g, ""))))
    }
    if (lines.some((l) => l.includes("\t"))) return lines.map((l) => l.split("\t").map(clean))
    return null
}

/* Pads short rows so every row has the same number of cells. */
function toValue(rows: Rows) {
    const cols = Math.max(...rows.map((r) => r.length))
    return rows.map((cells, i) => ({
        _key: `r${Date.now().toString(36)}${i}`,
        _type: "tableRow",
        cells: [...cells, ...Array(cols - cells.length).fill("")],
    }))
}

export function PasteTableInput(props: ObjectInputProps) {
    const [status, setStatus] = useState<{ tone: "positive" | "critical"; text: string } | null>(null)

    const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        const rows = fromHtml(e.clipboardData.getData("text/html")) ?? fromText(e.clipboardData.getData("text/plain"))
        if (!rows || rows.length < 2) {
            setStatus({
                tone: "critical",
                text: "Couldn't find a table. Copy the whole table, or ask Claude for it as a markdown table and paste that.",
            })
            return
        }
        props.onChange(set(toValue(rows), ["rows"]))
        setStatus({ tone: "positive", text: `Added ${rows.length} rows × ${rows[0].length} columns. Edit any cell below.` })
    }

    return (
        <Stack gap={3}>
            <Card
                padding={4}
                radius={2}
                border
                tone={status?.tone ?? "transparent"}
                tabIndex={0}
                onPaste={onPaste}
                style={{ borderStyle: "dashed", cursor: "text" }}
            >
                <Stack gap={2}>
                    <Text size={1} weight="semibold">Paste a table here</Text>
                    <Text size={1} muted>
                        {status?.text ?? "Click this box and press Ctrl+V. Replaces the table below. The first row becomes the header."}
                    </Text>
                </Stack>
            </Card>
            {props.renderDefault(props)}
        </Stack>
    )
}
