import type { MetadataRoute } from "next";

/* The site's own pages, in one list. app/sitemap.ts and app/llms.txt both read
   from here, so a new page is announced to crawlers and to AI assistants by
   adding a single entry rather than remembering two files.

   /health is deliberately absent: next.config.ts redirects it to the hosted
   UptimeRobot status page, and a sitemap should not advertise a URL that
   bounces off-site.

   Pages with their own data (help articles, integration detail pages) are not
   listed — both consumers map those from components/help/docs.ts and
   components/integrations/data.ts. */

export type PageGroup =
    | "Start here"
    | "Storefront"
    | "Selling"
    | "Manage"
    | "Grow"
    | "Company"
    | "Resources"
    | "Legal";

export type SitePage = {
    path: string;
    title: string;
    /* One line, written for someone deciding whether to open it — this is what
       an assistant quotes when it cites the page. */
    summary: string;
    group: PageGroup;
    priority: number;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

export const sitePages: SitePage[] = [
    {
        path: "/",
        title: "Seltrax",
        summary:
            "An ecommerce platform for sellers in Pakistan: storefront, cash-on-delivery checkout, courier dispatch, analytics and staff accounts for one flat price in rupees.",
        group: "Start here",
        priority: 1,
        changeFrequency: "weekly",
    },
    {
        path: "/pricing",
        title: "Pricing",
        summary: "One flat plan at Rs 1,349/month — everything included, billed monthly or yearly, cancel anytime.",
        group: "Start here",
        priority: 0.9,
        changeFrequency: "monthly",
    },
    {
        path: "/launch",
        title: "Launch in minutes",
        summary: "No hosting, theme or plugins — sign up, add a product, publish.",
        group: "Start here",
        priority: 0.8,
        changeFrequency: "monthly",
    },

    {
        path: "/designs",
        title: "Designs",
        summary: "Ready-made store designs by category — watches, fragrances, clothing and more.",
        group: "Storefront",
        priority: 0.8,
        changeFrequency: "weekly",
    },
    {
        path: "/mobile-first",
        title: "Mobile-first storefronts",
        summary: "360px-first layouts, a load budget and a one-thumb COD checkout.",
        group: "Storefront",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/page-speed",
        title: "Page speed",
        summary: "One JSON-rendered theme, zero plugins — about 2x faster than Shopify.",
        group: "Storefront",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/page-builder",
        title: "Page builder",
        summary: "Build any page, stack sections in any order, change every setting — no theme required.",
        group: "Storefront",
        priority: 0.8,
        changeFrequency: "monthly",
    },

    {
        path: "/cash-on-delivery",
        title: "Cash on delivery",
        summary: "Confirmation, courier booking, tracking, returns and remittance — built in.",
        group: "Selling",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/courier-dispatch",
        title: "Courier dispatch",
        summary: "Book TCS, Leopards and M&P from the order, with labels, pickup and tracking.",
        group: "Selling",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/checkout",
        title: "Checkout",
        summary: "One page, phone-first — require, make optional or hide any field.",
        group: "Selling",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/orders",
        title: "Orders",
        summary: "One inbox in COD stages — bulk actions, customer history, automation.",
        group: "Selling",
        priority: 0.8,
        changeFrequency: "monthly",
    },

    {
        path: "/analytics",
        title: "Analytics",
        summary: "Sales, conversion, delivered rate and returns by city and courier.",
        group: "Manage",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/staff-accounts",
        title: "Staff accounts",
        summary: "Unlimited team logins with per-area permissions — at no extra cost.",
        group: "Manage",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/mobile-app",
        title: "Mobile app",
        summary: "Live sales and orders wherever you are, from the Seltrax Android app.",
        group: "Manage",
        priority: 0.8,
        changeFrequency: "monthly",
    },

    {
        path: "/migrate",
        title: "Migrate from Shopify or WooCommerce",
        summary: "Bring products, customers, orders and SEO across — no downtime.",
        group: "Grow",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/integrations",
        title: "Integrations",
        summary: "Courier booking, Meta and TikTok pixels, Google Analytics, WhatsApp checkout and chat, and one-click COD checkout.",
        group: "Grow",
        priority: 0.8,
        changeFrequency: "weekly",
    },

    {
        path: "/about",
        title: "About us",
        summary: "Who we are and why we built Seltrax for Pakistani sellers.",
        group: "Company",
        priority: 0.7,
        changeFrequency: "monthly",
    },
    {
        path: "/compare",
        title: "Compare",
        summary: "How Seltrax stacks up against Shopify and WooCommerce on price, speed and what's included.",
        group: "Company",
        priority: 0.8,
        changeFrequency: "monthly",
    },
    {
        path: "/reviews",
        title: "Sellers on Seltrax",
        summary: "What store owners say about selling on Seltrax.",
        group: "Company",
        priority: 0.7,
        changeFrequency: "weekly",
    },

    {
        path: "/blog",
        title: "Blog",
        summary: "Guides on COD, couriers, store design and growth.",
        group: "Resources",
        priority: 0.7,
        changeFrequency: "weekly",
    },
    {
        path: "/case-studies",
        title: "Case studies",
        summary: "How sellers launched and grew on Seltrax.",
        group: "Resources",
        priority: 0.7,
        changeFrequency: "monthly",
    },
    {
        path: "/help",
        title: "Help center",
        summary: "Step-by-step guides for setting up and running a Seltrax store.",
        group: "Resources",
        priority: 0.7,
        changeFrequency: "monthly",
    },

    {
        path: "/privacy",
        title: "Privacy policy",
        summary: "What Seltrax collects, who else sees it, how long it is kept and how to have it deleted.",
        group: "Legal",
        priority: 0.3,
        changeFrequency: "yearly",
    },
    {
        path: "/delete-account",
        title: "Delete your account",
        summary: "How to delete a Seltrax account from the app, what is removed, and the 30-day window to change your mind.",
        group: "Legal",
        priority: 0.3,
        changeFrequency: "yearly",
    },
];

export const siteUrl = "https://seltrax.com";

/* "/" must stay bare — https://seltrax.com, not https://seltrax.com/ — so the
   canonical URL and the sitemap agree. */
export const absolute = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);
