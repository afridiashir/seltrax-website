import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlusMark } from "@/components/landing/section"
import { REGISTER_URL } from "@/lib/config"

export function CTA() {
    return (
        <section className="relative border-t border-border">
            <div className="container relative mx-auto max-w-6xl border-x border-border px-5 md:px-12">
                <PlusMark className="left-0 top-0" />
                <PlusMark className="right-0 top-0 translate-x-1/2" />

                <div className="relative my-20 overflow-hidden rounded-2xl border border-border bg-primary/[0.04] px-6 py-20 text-center md:my-28 md:py-28">
                    <div className="bg-dots mask-fade-edges absolute inset-0 pointer-events-none opacity-60" />

                    <div className="relative">
                        <p className="eyebrow mb-4 text-primary">[ Get started ]</p>
                        <h2 className="font-heading mx-auto max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
                            Your store could be live tonight
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
                            Sign up, pick a theme, add your products — most sellers launch
                            in under an hour. Rs 1,349/month, everything included, cancel anytime.
                        </p>
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Button asChild size="lg" className="h-12 rounded-md px-8 text-base font-medium">
                                <Link href={REGISTER_URL}>
                                    Create your store <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
