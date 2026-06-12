import Link from "next/link"
import { ArrowRight, PackagePlus, Paintbrush, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/landing/section"
import { REGISTER_URL } from "@/lib/config"

const steps = [
    {
        number: "01",
        icon: PackagePlus,
        title: "Add your first product",
        description:
            "Upload photos, set your price, write a description. Your catalog starts with a single product.",
    },
    {
        number: "02",
        icon: Paintbrush,
        title: "Customize your store",
        description:
            "Pick a theme, add your logo and colors, arrange your homepage — no code needed.",
    },
    {
        number: "03",
        icon: Rocket,
        title: "Start selling",
        description:
            "Hit publish and share your link. Take orders and payments from day one.",
    },
]

export function Steps() {
    return (
        <Section
            label="How it works"
            title="Start selling in three steps"
            description="From signup to first order — most sellers finish all three the same day."
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="relative flex flex-col gap-4 rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-primary/5 text-primary">
                                <step.icon className="h-5 w-5" />
                            </div>
                            <span className="eyebrow text-muted-foreground/60">{step.number}</span>
                        </div>
                        <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Button asChild size="lg" className="h-12 rounded-md px-8 text-base font-medium">
                    <Link href={REGISTER_URL}>
                        Create your store <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </Section>
    )
}
