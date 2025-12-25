import { Check, X } from "lucide-react";

export default function ComparisonSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Seltrax vs Other Platforms
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        See how Seltrax compares with Shopify and WooCommerce
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border rounded-xl">
                    <table className="w-full border border-muted rounded-xl overflow-hidden">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-4 font-medium text-left">Feature</th>
                                <th className="p-4 font-medium text-center">Seltrax</th>
                                <th className="p-4 font-medium text-center">Shopify</th>
                                <th className="p-4 font-medium text-center">WooCommerce</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Setup", "No Code, done in minutes", "Easy, but app-dependent", "Technical, done in days"],
                                ["Price", "Simple & Affordable", "Monthly & Paid themes & plugins", "Hosting & Plugins & Themes"],
                                ["Plugins", "Built-in features", "Heavy app reliance", "Plugin Overload"],
                                ["Speed", "Faster then every other platform", "Depends on apps", "Depends on hosting"],
                                ["Customization", "Flexible, no code", "Limited without apps", "High, but technical"],
                                ["Maintenance", "Handled by Seltrax", "Partially", "Fully your responsibility"],
                            ].map(([label, seltrax, shopify, woo], i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-4">{label}</td>
                                    <td className="p-4 text-center font-medium">
                                        {seltrax}
                                    </td>
                                    <td className="p-4 text-center text-muted-foreground">
                                        {shopify}
                                    </td>
                                    <td className="p-4 text-center text-muted-foreground">
                                        {woo}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );
}
