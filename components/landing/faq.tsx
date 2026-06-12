"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Section } from "@/components/landing/section"

const faqs = [
    {
        question: "How much does Seltrax cost?",
        answer:
            "Rs 1,349/month, flat. That covers your storefront, themes, payments, analytics, hosting, and security. No dollar-pegged plans, no app subscriptions, no transaction fee surprises — the price you see is the price you pay.",
    },
    {
        question: "Is Seltrax really faster than Shopify and WooCommerce?",
        answer:
            "Yes. Shopify and WooCommerce stores slow down as you stack on apps and plugins. Seltrax has nothing to stack — speed is built into the platform, so your store stays fast as you grow.",
    },
    {
        question: "Do I need to know how to code?",
        answer:
            "No. Pick a theme, add your products, and publish. If you can fill in a form, you can launch a store on Seltrax.",
    },
    {
        question: "Do I need hosting or plugins like WooCommerce?",
        answer:
            "No. Hosting, security, backups, and updates are all handled for you. There are no servers to manage and no plugins to install, update, or fix when they conflict.",
    },
    {
        question: "Can I move my store from Shopify or WooCommerce?",
        answer:
            "Yes. Bring your products, customers, and orders over with Seltrax's migration tools — most sellers switch without losing a day of sales.",
    },
    {
        question: "Who is Seltrax built for?",
        answer:
            "Founders, small businesses, and growing brands who want to sell online without becoming part-time IT managers. If you'd rather run your business than your software, Seltrax is for you.",
    },
    {
        question: "How fast can I go live?",
        answer:
            "Most stores launch the same day — many in under an hour. Sign up, pick a theme, add products, publish. No credit card needed to start.",
    },
]

export function FAQ() {
    return (
        <Section
            id="faq"
            label="FAQ"
            title="Questions, answered"
            description="Everything you need to know before you launch."
        >
            <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-heading text-base md:text-lg">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="font-sans text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Section>
    )
}
