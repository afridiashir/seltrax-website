import {
    ArrowLeftRight,
    BarChart3,
    Banknote,
    Building2,
    CalendarCheck,
    Gauge,
    LayoutTemplate,
    LifeBuoy,
    LogIn,
    Newspaper,
    Package,
    Palette,
    PlugZap,
    Rocket,
    Scale,
    ShieldCheck,
    Smartphone,
    Trophy,
    Truck,
    Users,
    Activity,
    type LucideIcon,
} from "lucide-react"
import { LOGIN_URL, REGISTER_URL } from "@/lib/config"

export const DEMO_URL = "https://calendar.app.google/gBGzD46JoktRZFa78"

export type NavLink = { title: string; desc: string; href: string; icon: LucideIcon; external?: boolean }
export type NavGroup = { label: string; blurb: string; links: NavLink[] }
export type NavItem =
    | { label: string; kind: "mega"; groups: NavGroup[]; cta: { title: string; desc: string; href: string; label: string } }
    | { label: string; kind: "list"; links: NavLink[] }
    | { label: string; kind: "link"; href: string }

/* Links point at sections that exist on the page (or the real app URLs). */
export const NAV: NavItem[] = [
    {
        label: "Product",
        kind: "mega",
        groups: [
            {
                label: "Storefront",
                blurb: "Themes, speed and a store that works on every screen.",
                links: [
                    { title: "Designs", desc: "Ready-made store designs by category — watches, fragrances, clothing and more.", href: "/designs", icon: Palette },
                    { title: "Mobile-first storefronts", desc: "360px-first layouts, a load budget and a one-thumb COD checkout.", href: "/mobile-first", icon: Smartphone },
                    { title: "Page speed", desc: "One JSON-rendered theme, zero plugins — about 2x faster than Shopify.", href: "/page-speed", icon: Gauge },
                    { title: "Page builder", desc: "Build any page, stack sections in any order, change every setting — no theme required.", href: "/page-builder", icon: LayoutTemplate },
                ],
            },
            {
                label: "Selling",
                blurb: "Built for how Pakistan buys — cash on delivery first.",
                links: [
                    { title: "Cash on Delivery", desc: "Confirmation, courier booking, tracking, returns and remittance — built in.", href: "/cash-on-delivery", icon: Banknote },
                    { title: "Courier dispatch", desc: "Book TCS, Leopards and M&P from the order, labels, pickup and tracking.", href: "/courier-dispatch", icon: Truck },
                    { title: "Checkout", desc: "One page, phone-first — require, make optional or hide any field.", href: "/checkout", icon: ShieldCheck },
                    { title: "Orders", desc: "One inbox in COD stages — bulk actions, customer history, automation.", href: "/orders", icon: Package },
                ],
            },
            {
                label: "Manage",
                blurb: "Run the business from the dashboard — or your phone.",
                links: [
                    { title: "Analytics", desc: "Sales, conversion, delivered rate and returns by city and courier.", href: "/analytics", icon: BarChart3 },
                    { title: "Staff accounts", desc: "Unlimited team logins with per-area permissions — at no extra cost.", href: "/staff-accounts", icon: Users },
                    { title: "Mobile app", desc: "Live sales and orders wherever you are.", href: "/mobile-app", icon: Smartphone },
                ],
            },
            {
                label: "Grow",
                blurb: "Move in from elsewhere and connect the tools you use.",
                links: [
                    { title: "Migrate from Shopify / Woo", desc: "Bring products, customers, orders and SEO across — no downtime.", href: "/migrate", icon: ArrowLeftRight },
                    { title: "Integrations", desc: "Couriers, Facebook Pixel, Google Analytics, Clarity, WhatsApp and more.", href: "/integrations", icon: PlugZap },
                    { title: "Launch in minutes", desc: "No hosting, theme or plugins — sign up, add a product, publish.", href: "/launch", icon: Rocket },
                ],
            },
        ],
        cta: { title: "Your store could be live tonight", desc: "Rs 1,349/month, everything included, cancel anytime.", href: REGISTER_URL, label: "Create your store" },
    },
    {
        label: "Company",
        kind: "mega",
        groups: [
            {
                label: "About Seltrax",
                blurb: "Why we built a commerce platform for Pakistani sellers.",
                links: [
                    { title: "About us", desc: "Who we are and why we built Seltrax for Pakistani sellers.", href: "/about", icon: Building2 },
                    { title: "Compare", desc: "How we stack up against Shopify and WooCommerce.", href: "/compare", icon: Scale },
                    { title: "Sellers on Seltrax", desc: "What store owners say about selling on Seltrax.", href: "/reviews", icon: Users },
                ],
            },
            {
                label: "Get in touch",
                blurb: "Talk to us, or jump straight in.",
                links: [
                    { title: "Book a demo", desc: "A 20-minute walkthrough with the team.", href: DEMO_URL, icon: CalendarCheck, external: true },
                    { title: "Login", desc: "Open your existing store dashboard.", href: LOGIN_URL, icon: LogIn },
                    { title: "Create your store", desc: "Start free — no credit card needed.", href: REGISTER_URL, icon: Rocket },
                ],
            },
        ],
        cta: { title: "Prefer to see it first?", desc: "Book a demo and we'll set up a sample store with you.", href: DEMO_URL, label: "Book a demo" },
    },
    {
        label: "Resources",
        kind: "list",
        links: [
            { title: "Blog", desc: "Guides on COD, couriers, store design and growth.", href: "/blog", icon: Newspaper },
            { title: "Case studies", desc: "How sellers launched and grew on Seltrax.", href: "/case-studies", icon: Trophy },
            { title: "Help & demo", desc: "Guides by topic, or book a walkthrough with the team.", href: "/help", icon: LifeBuoy },
            { title: "Platform status", desc: "Live uptime and incident history.", href: "/health", icon: Activity, external: true },
        ],
    },
    { label: "Pricing", kind: "link", href: "/#pricing" },
]
