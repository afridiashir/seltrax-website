import { Check, Minus, X } from "lucide-react"
import { Section } from "@/components/landing/section"

type Cell = "yes" | "partial" | "no"

const rows: { feature: string; seltrax: Cell; shopify: Cell; woo: Cell }[] = [
    { feature: "No-code store setup", seltrax: "yes", shopify: "yes", woo: "no" },
    { feature: "Fast out of the box", seltrax: "yes", shopify: "partial", woo: "no" },
    { feature: "No paid apps or themes", seltrax: "yes", shopify: "no", woo: "no" },
    { feature: "Low monthly cost", seltrax: "yes", shopify: "no", woo: "partial" },
    { feature: "Managed hosting & security", seltrax: "yes", shopify: "yes", woo: "no" },
    { feature: "Automatic updates & backups", seltrax: "yes", shopify: "yes", woo: "no" },
    { feature: "Zero technical maintenance", seltrax: "yes", shopify: "partial", woo: "no" },
    { feature: "Built-in analytics", seltrax: "yes", shopify: "partial", woo: "no" },
]

function CellIcon({ value }: { value: Cell }) {
    if (value === "yes") {
        return (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
            </span>
        )
    }
    if (value === "partial") {
        return (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Minus className="h-4 w-4" />
            </span>
        )
    }
    return (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground/60">
            <X className="h-4 w-4" />
        </span>
    )
}

export function Comparison() {
    return (
        <Section
            id="compare"
            label="Compare"
            title="Why sellers switch to Seltrax"
            description="Everything Shopify and WooCommerce charge extra for — or make you build yourself — comes standard."
        >
            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[560px] border-collapse text-sm md:text-base">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="eyebrow px-6 py-4 text-left font-normal text-muted-foreground">
                                Capability
                            </th>
                            <th className="border-x border-border bg-primary/5 px-6 py-4 text-center">
                                <span className="font-heading font-semibold text-primary">Seltrax</span>
                            </th>
                            <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                                Shopify
                            </th>
                            <th className="border-l border-border px-6 py-4 text-center font-medium text-muted-foreground">
                                WooCommerce
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.feature} className="border-b border-border last:border-b-0">
                                <td className="px-6 py-4 text-foreground/90">{row.feature}</td>
                                <td className="border-x border-border bg-primary/5 px-6 py-4 text-center">
                                    <CellIcon value={row.seltrax} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <CellIcon value={row.shopify} />
                                </td>
                                <td className="border-l border-border px-6 py-4 text-center">
                                    <CellIcon value={row.woo} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>
    )
}
