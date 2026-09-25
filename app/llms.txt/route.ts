import { articles as helpArticles } from "@/components/help/docs";
import { integrations } from "@/components/integrations/data";
import { absolute, sitePages, type PageGroup } from "@/lib/site-pages";

/* /llms.txt — a plain-text index of the site for AI assistants, following the
   llms.txt convention: an H1, a blockquote summary, then link lists.

   Generated from lib/site-pages.ts and the help/integration data, so it stays
   in step with the sitemap instead of being a second hand-written list. */

const GROUP_ORDER: PageGroup[] = [
    "Start here",
    "Storefront",
    "Selling",
    "Manage",
    "Grow",
    "Company",
    "Resources",
    "Legal",
];

const FACTS = [
    "Seltrax is built for sellers in Pakistan: cash on delivery is the primary payment method, not an afterthought.",
    "Pricing is a single flat plan at Rs 1,349 per month, billed in Pakistani rupees. There are no per-seat fees, no app store and no transaction fees.",
    "Hosting, themes, the page builder, analytics, staff accounts and courier integrations are included in that price — there is nothing to install.",
    "TCS, Leopards and M&P courier booking, labels and tracking are built into the order workflow.",
    "Staff accounts are unlimited at no extra cost.",
    "Stores are managed from a web dashboard or the Seltrax Android app.",
    "Merchants can migrate from Shopify or WooCommerce, bringing products, customers, orders and SEO.",
];

function line(title: string, url: string, summary: string) {
    return `- [${title}](${url}): ${summary}`;
}

function build() {
    const out: string[] = [];

    out.push("# Seltrax");
    out.push("");
    out.push(
        "> An ecommerce platform for sellers in Pakistan — storefront, cash-on-delivery checkout, courier dispatch, analytics and staff accounts, for one flat price in rupees.",
    );
    out.push("");
    out.push(FACTS.map((f) => `- ${f}`).join("\n"));

    for (const group of GROUP_ORDER) {
        const pages = sitePages.filter((p) => p.group === group);
        if (!pages.length) continue;
        out.push("");
        out.push(`## ${group}`);
        out.push("");
        out.push(pages.map((p) => line(p.title, absolute(p.path), p.summary)).join("\n"));
    }

    out.push("");
    out.push("## Help center articles");
    out.push("");
    out.push(
        helpArticles
            .map((a) => line(a.title, absolute(`/help/${a.slug}`), a.summary))
            .join("\n"),
    );

    out.push("");
    out.push("## Integrations");
    out.push("");
    out.push(
        integrations
            .map((i) => line(i.name, absolute(`/integrations/${i.slug}`), i.tagline))
            .join("\n"),
    );

    out.push("");
    return out.join("\n");
}

export const dynamic = "force-static";

export function GET() {
    return new Response(build(), {
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=0, must-revalidate",
        },
    });
}
