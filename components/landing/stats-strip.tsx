import { PlusMark } from "@/components/landing/section"

const stats = [
    { value: "2x", label: "Faster page loads" },
    { value: "Rs 1,349", label: "Per month, all-in" },
    { value: "0", label: "Plugins to manage" },
    { value: "5 min", label: "From signup to live" },
]

export function StatsStrip() {
    return (
        <section className="relative border-t border-border">
            <div className="container relative mx-auto max-w-6xl border-x border-border">
                <PlusMark className="left-0 top-0" />
                <PlusMark className="right-0 top-0 translate-x-1/2" />
                <dl className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center md:py-10">
                            <dd className="font-heading text-3xl font-semibold text-primary md:text-4xl">
                                {stat.value}
                            </dd>
                            <dt className="eyebrow text-muted-foreground">{stat.label}</dt>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
