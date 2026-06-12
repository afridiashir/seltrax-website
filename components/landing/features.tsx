import {
    Zap,
    CreditCard,
    LayoutDashboard,
    Puzzle,
    ShoppingCart,
    LaptopMinimalCheck,
    Globe,
} from "lucide-react"
import { Section } from "@/components/landing/section"
import { cn } from "@/lib/utils"

const features = [
    {
        icon: Zap,
        title: "Sell at full speed",
        description:
            "Your store loads before shoppers can blink. Speed is built into the platform itself — not sold back to you as an optimization app.",
        className: "md:col-span-2",
    },
    {
        icon: CreditCard,
        title: "Pay one flat price",
        description:
            "Rs 1,349/month covers everything — themes, payments, analytics. Your bill never surprises you.",
    },
    {
        icon: LaptopMinimalCheck,
        title: "Set up without code",
        description:
            "Pick a theme, add your products, hit publish. Your store is live in minutes.",
    },
    {
        icon: LayoutDashboard,
        title: "Run everything from one dashboard",
        description:
            "Products, orders, customers — managed from one clean screen, not a maze of menus and settings. Open it, do the work, get back to selling.",
        className: "md:col-span-2",
    },
    {
        icon: Puzzle,
        title: "Skip the plugin hunt",
        description:
            "Payments, checkout, and analytics work out of the box. Nothing to install, nothing to break.",
    },
    {
        icon: ShoppingCart,
        title: "Turn carts into orders",
        description:
            "A fast, distraction-free checkout designed to get shoppers from cart to confirmation.",
    },
    {
        icon: Globe,
        title: "Sell on your own domain",
        description:
            "Connect your domain in a few clicks — HTTPS and setup handled for you.",
    },
]

export function Features() {
    return (
        <Section
            id="features"
            label="Features"
            title="Everything you need to sell. Built in."
            description="Stop assembling your store from plugins and paid apps. Seltrax ships complete — launch, manage, and grow from one place."
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className={cn(
                            "group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50",
                            feature.className
                        )}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-primary/5 text-primary">
                            <feature.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    )
}
