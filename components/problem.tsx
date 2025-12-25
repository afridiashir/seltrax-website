
import { Zap, CreditCard, LayoutDashboard, Puzzle, ShoppingCart, LaptopMinimalCheck } from "lucide-react";

export default function WhySeltrax() {

    const reas = [
        {
            icon: <Zap className="h-6 w-6 text-primary mt-1" />,
            title: "Blazing-Fast Performance",
            description: "Built for speed from day one, so your store loads instantly without any technical setup."
        },
        {
            icon: <CreditCard className="h-6 w-6 text-primary mt-1" />,
            title: "Affordable Pricing",
            description: "Start from 1499/month with no hidden fees. Zero theme charges and much more."
        },
        {
            icon: <LayoutDashboard className="h-6 w-6 text-primary mt-1" />,
            title: "Clean & Intuitive Dashboard",
            description: "Manage products, orders, and customers from a modern dashboard designed for clarity."
        },
        {
            icon: <LaptopMinimalCheck className="h-6 w-6 text-primary mt-1" />,
            title: "No-Code Store Setup",
            description: "Launch your store in minutes without writing a single line of code."
        },
        {
            icon: <Puzzle className="h-6 w-6 text-primary mt-1" />,
            title: "Only the Plugins You Need",
            description: "Built-in features replace plugin overload, keeping your store fast and simple."
        },
        {
            icon: <ShoppingCart className="h-6 w-6 text-primary mt-1" />,
            title: "Optimized Checkout",
            description: "A smooth, conversion-focused checkout designed to help you sell more."
        }
    ];


    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold font-chillax">
                        Why Seltrax?
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                        Everything you need to sell online — without complexity.
                    </p>
                </div>

                {/* Reasons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reas.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start gap-4 rounded-xl border bg-background p-6"
                        >
                            {item.icon}
                            <h3 className="text-lg">{item.title}</h3>
                            <p className="text-muted-foreground mt-2">{item.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
