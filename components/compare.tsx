import { Blocks, ChartNoAxesCombined, DollarSign, LaptopMinimalCheck, Lock, Rocket, ShieldCheck, SlidersHorizontal, SquareActivity, Wrench, Zap } from "lucide-react";

export default function ComparisonSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-semibold font-chillax">
                        Compare Seltrax with Other Platforms
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
                            Seltrax vs Shopify
                        </h3>

                        <ul className="space-y-5">
                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <DollarSign className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Lower monthly cost than Shopify
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <ChartNoAxesCombined className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Simple analytics focused on sales
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Blocks className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    No paid apps or themes
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Faster page speed
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <SlidersHorizontal className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Designed for sellers, not developers
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Fully managed hosting & security
                                </span>
                            </li>
                        </ul>
                    </div>


                    {/* Seltrax vs WooCommerce */}
                    <div className="border rounded-xl p-6">
                        <h3 className="text-3xl font-semibold mb-10">
                            Seltrax vs WooCommerce
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <LaptopMinimalCheck className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    No technical and manual setup required
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <SquareActivity className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Fully managed platform — hosting, speed, and uptime
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Blocks className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    No plugins or compatibility issues
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Faster performance out of the box
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Wrench className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Automatic updates and backups
                                </span>
                            </li>

                            <li className="flex gap-4 items-center"><div className="w-8 h-8 flex items-center justify-center">
                                <Lock className="w-6 h-6" />
                            </div>
                                <span className="text-muted-foreground">
                                    Zero technical maintenance
                                </span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    );
}
