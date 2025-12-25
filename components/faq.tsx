"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const faqs = [
    {
        question: "How is Seltrax more affordable than Shopify?",
        answer:
            "Seltrax offers simple, localized pricing without dollar-pegged monthly plans, extra app costs, or high transaction fees, making it significantly more affordable for growing businesses.",
    },
    {
        question: "Is Seltrax really faster than Shopify and WooCommerce?",
        answer:
            "Yes. Seltrax is built on a modern, lightweight architecture with performance optimized by default, while Shopify and WooCommerce often slow down due to heavy apps and plugins.",
    },
    {
        question: "How is Seltrax better than WooCommerce?",
        answer:
            "Unlike WooCommerce, Seltrax is fully no-code and managed for you. You don’t need to worry about hosting, updates, security, or plugin conflicts — everything just works.",
    },
    {
        question: "Do I need hosting or plugins like WooCommerce?",
        answer:
            "No. Seltrax includes hosting, security, and essential features out of the box, so there’s no need to manage servers or install multiple plugins.",
    },
    {
        question: "Can I migrate from Shopify or WooCommerce?",
        answer:
            "Absolutely. Seltrax provides easy migration tools to move your products, customers, and orders from Shopify or WooCommerce with minimal effort.",
    },
    {
        question: "Who is Seltrax best for?",
        answer:
            "Seltrax is built for founders, small businesses, and growing brands who want a fast, affordable, no-code e-commerce platform without technical complexity.",
    },
    {
        question: "When will Seltrax launch?",
        answer:
            "Seltrax is launching in February 2026. Join the waitlist to get early access, priority onboarding, and exclusive founder benefits.",
    },
];


export function FAQ() {
    return (
        <section className="py-20 md:py-32 bg-secondary/5">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold font-chillax text-center mb-4">Frequently Asked Questions</h2>
                <p className="text-center text-muted-foreground mb-12 font-sans">Everything you need to know about the future of commerce.</p>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="font-heading text-lg">{faq.question}</AccordionTrigger>
                            <AccordionContent className="font-sans text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}
