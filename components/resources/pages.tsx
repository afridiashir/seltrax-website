"use client"

import { Newspaper, Trophy } from "lucide-react"
import { Listing } from "./listing"
import { blogCategories, blogPosts } from "./blog-data"
import { caseStudies, caseStudyCategories } from "./case-studies-data"

/* Client wrappers: the listing config holds icon components, which can't be
   passed from a server page, so each page's config lives here. */

export function BlogListing() {
    return (
        <Listing
            config={{
                kicker: "Blog",
                icon: Newspaper,
                titleSerif: "Ideas for sellers",
                titleSans: "who ship every day",
                intro: "Guides on cash on delivery, couriers, store design and growing an online brand in Pakistan — plus what's new in Seltrax.",
                background: "/landing/bluish.jpg",
                categories: blogCategories,
                entries: blogPosts,
                noun: { one: "article", many: "articles" },
                empty: {
                    title: "The first articles are on their way",
                    body: "We're writing practical guides on running a COD store, working with couriers and growing online. Check back soon.",
                },
            }}
        />
    )
}

export function CaseStudiesListing() {
    return (
        <Listing
            config={{
                kicker: "Case studies",
                icon: Trophy,
                titleSerif: "How sellers grow",
                titleSans: "on Seltrax",
                intro: "Real stores, real numbers — how brands launched, switched platforms and scaled their cash-on-delivery business with Seltrax.",
                background: "/landing/mist.jpg",
                categories: caseStudyCategories,
                entries: caseStudies,
                noun: { one: "case study", many: "case studies" },
                empty: {
                    title: "Case studies are coming soon",
                    body: "We're working with sellers to share how they launched and grew. Selling on Seltrax and want to be featured? Talk to us.",
                },
            }}
        />
    )
}
