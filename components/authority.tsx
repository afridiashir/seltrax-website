
import { Check } from 'lucide-react';
import React from 'react';

const Authority = () => {
    const features = [
        "Fast store loading",
        "Lower monthly costs",
        "Built-in plugins and themes for fast stores",
        "Zero maintenance"
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="w-full lg:w-1/2">
                    <div className="relative rounded-2xl border overflow-hidden shadow-sm aspect-video lg:aspect-square">
                        <img
                            src="/seltrax-store.webp"
                            alt="Seltrax Performance Dashboard"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                        <h2 className=" font-semibold font-chillax text-4xl md:text-5xl">
                            A Modern eCommerce Platform Built for Performance & Growth
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Most eCommerce platforms try to do everything — and end up slow, expensive, and hard to manage.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <span className="text-muted-foreground font-regular">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="p-6 bg-muted rounded-xl border-l-4 border-blue-600">
                        <p className="text-muted-foreground italic leading-relaxed">
                            "In 2026, a slow or complex store means lost sales.
                        </p>

                        <span className="block mt-1 font-medium text-base not-italic">Seltrax helps your business stay ahead."</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Authority;
