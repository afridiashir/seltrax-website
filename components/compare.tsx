import { Blocks, ChartNoAxesCombined, DollarSign, LaptopMinimalCheck, Lock, Rocket, ShieldCheck, SlidersHorizontal, SquareActivity, Wrench, Zap } from "lucide-react";

export default function ComparisonSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-semibold font-chillax">
                        Seltrax vs Other Platforms
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        See how Seltrax compares with Shopify and WooCommerce
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Seltrax vs Shopify */}
                    <div className="border rounded-xl p-6">
                        <h3 className="text-3xl font-semibold mb-10">
                            Better than Shopify
                        </h3>

                        <ul className="space-y-5">
                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <DollarSign className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Save up to <strong>₨70,000+</strong> every year and reinvest that money into marketing to grow faster.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <ChartNoAxesCombined className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Simple yet powerful analytics that help you track sales and make smarter, data-driven decisions.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Blocks className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Revenue-focused built-in features and extensions — no messy app ecosystem.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Built on a modern tech stack for blazing-fast performance, so customers never wait.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <SlidersHorizontal className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Designed for sellers, not developers — anyone can run a store without technical hurdles.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Secure, fully managed platform so you can focus on selling, not maintenance.
                                </span>
                            </li>
                        </ul>
                    </div>


                    {/* Seltrax vs WooCommerce */}
                    <div className="border rounded-xl p-6">
                        <h3 className="text-3xl font-semibold mb-10">
                            Better than WooCommerce
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <LaptopMinimalCheck className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Launch your store in minutes — no manual setup or technical work.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <SquareActivity className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Fully managed platform — hosting, speed, and uptime handled by Seltrax.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Blocks className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Built-in features without plugin overload or compatibility issues.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Faster performance with automatic image optimization and caching.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Wrench className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Zero maintenance — updates, security, and backups are managed for you.
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Lock className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Enterprise-grade security with end-to-end encryption with seltrax.
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    );
}
