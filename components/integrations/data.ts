/* The integrations directory. Each entry renders a card on /integrations and its
   own page at /integrations/[slug]. To add one, append to `integrations` — the
   directory, the detail page and the sitemap pick it up automatically.
   `logo` is a 96×96 badge in /public/integrations; entries without one render a
   monogram so we never ship another company's logo we don't have. */

export type CategoryKey = "marketing" | "analytics" | "shipping" | "messaging" | "email" | "trust"

export const categories: { key: CategoryKey; name: string; blurb: string }[] = [
    { key: "marketing", name: "Marketing & ads", blurb: "Measure and retarget the traffic you pay for." },
    { key: "analytics", name: "Analytics", blurb: "See how visitors behave, beyond the built-in dashboard." },
    { key: "shipping", name: "Shipping & couriers", blurb: "Book, label and track parcels from the order." },
    { key: "messaging", name: "Customer messaging", blurb: "Keep customers updated from order to door." },
    { key: "email", name: "Email marketing", blurb: "Grow a list and bring customers back." },
    { key: "trust", name: "Trust & conversion", blurb: "Give first-time buyers a reason to order." },
]

export type Integration = {
    slug: string
    name: string
    category: CategoryKey
    logo?: string
    monogram: { text: string; bg: string; fg: string }
    tagline: string
    overview: string
    features: { title: string; desc: string }[]
    setup: string[]
    specs: { k: string; v: string }[]
    related: string[]
}

export const integrations: Integration[] = [
    {
        slug: "facebook-pixel",
        name: "Facebook Pixel",
        category: "marketing",
        logo: "/integrations/facebook-pixel.svg",
        monogram: { text: "f", bg: "#1877F2", fg: "#fff" },
        tagline: "Track and retarget Facebook & Instagram ad traffic.",
        overview:
            "Connect your Meta Pixel to measure which Facebook and Instagram ads turn into orders, build audiences of people who viewed or added to cart, and let Meta optimise delivery towards buyers. Seltrax sends the standard shopping events for you — no code in your theme, because there isn't a theme to edit.",
        features: [
            { title: "Standard events, automatically", desc: "Page views, product views, add to cart, checkout started and purchase are sent without any setup beyond your Pixel ID." },
            { title: "Retargeting audiences", desc: "Build audiences of visitors who viewed a product or abandoned checkout, then win them back with ads." },
            { title: "Order value on purchase", desc: "Purchase events carry the order total and currency so you can see return on ad spend." },
            { title: "Doesn't slow your store", desc: "The Pixel loads after the page is usable, so tracking never costs you speed." },
        ],
        setup: ["Copy your Pixel ID from Meta Events Manager", "In Seltrax, open Settings → Integrations → Facebook Pixel", "Paste the ID and save", "Use Meta's Test Events tool to confirm events arrive"],
        specs: [
            { k: "Events", v: "PageView · ViewContent · AddToCart · InitiateCheckout · Purchase" },
            { k: "Setup", v: "Paste Pixel ID" },
            { k: "Code required", v: "None" },
            { k: "Cost", v: "Included" },
        ],
        related: ["google-analytics", "microsoft-clarity", "mailchimp"],
    },
    {
        slug: "google-analytics",
        name: "Google Analytics",
        category: "analytics",
        logo: "/integrations/google-analytics.svg",
        monogram: { text: "GA", bg: "#F9AB00", fg: "#fff" },
        tagline: "Send store traffic and ecommerce events to GA4.",
        overview:
            "Already use Google Analytics? Add your GA4 measurement ID and your store's traffic, sources and ecommerce events flow into your property — alongside Seltrax's built-in analytics, which already cover sales, conversion and delivered revenue.",
        features: [
            { title: "GA4 ecommerce events", desc: "Product views, add to cart, begin checkout and purchase are sent in GA4's ecommerce format." },
            { title: "Traffic sources & campaigns", desc: "UTM-tagged links from ads, Instagram bios and WhatsApp broadcasts are attributed in GA4." },
            { title: "Works with Google Ads", desc: "Link your GA4 property to Google Ads to import purchase conversions." },
            { title: "Loaded after the page", desc: "Analytics scripts are deferred so your store stays fast." },
        ],
        setup: ["Create a GA4 property and copy the measurement ID (G-XXXXXXX)", "Open Settings → Integrations → Google Analytics", "Paste the ID and save", "Check GA4's Realtime report while you browse your store"],
        specs: [
            { k: "Version", v: "Google Analytics 4" },
            { k: "Events", v: "page_view · view_item · add_to_cart · begin_checkout · purchase" },
            { k: "Setup", v: "Paste measurement ID" },
            { k: "Cost", v: "Included" },
        ],
        related: ["microsoft-clarity", "facebook-pixel", "google-search-console"],
    },
    {
        slug: "microsoft-clarity",
        name: "Microsoft Clarity",
        category: "analytics",
        logo: "/integrations/clarity.svg",
        monogram: { text: "C", bg: "#0078D4", fg: "#fff" },
        tagline: "Session recordings and heatmaps of real shoppers.",
        overview:
            "Microsoft Clarity shows you what numbers can't: recordings of real sessions, heatmaps of where people tap, and where they get stuck. Connect it to see exactly how customers move through your product pages and checkout on their phones.",
        features: [
            { title: "Session recordings", desc: "Watch anonymised sessions to see where shoppers hesitate, scroll past or drop off." },
            { title: "Heatmaps", desc: "See taps and scroll depth on product pages, collections and the homepage." },
            { title: "Rage & dead clicks", desc: "Clarity flags frustrated tapping so you can fix confusing parts of a page." },
            { title: "Free to use", desc: "Clarity itself is free, and connecting it costs nothing on Seltrax." },
        ],
        setup: ["Create a project at clarity.microsoft.com and copy the project ID", "Open Settings → Integrations → Microsoft Clarity", "Paste the ID and save", "Recordings start appearing in Clarity within a couple of hours"],
        specs: [
            { k: "Provides", v: "Recordings · heatmaps · rage clicks" },
            { k: "Setup", v: "Paste project ID" },
            { k: "Checkout fields", v: "Masked in recordings" },
            { k: "Cost", v: "Included" },
        ],
        related: ["google-analytics", "facebook-pixel", "trusted-badges"],
    },
    {
        slug: "google-search-console",
        name: "Google Search Console",
        category: "analytics",
        monogram: { text: "SC", bg: "#4285F4", fg: "#fff" },
        tagline: "Verify your store and submit its sitemap to Google.",
        overview:
            "Seltrax generates a sitemap for every store automatically. Verify your domain in Google Search Console and submit it so Google finds your products, collections and pages quickly — and so you can see which searches bring customers in.",
        features: [
            { title: "Automatic sitemap", desc: "Every product, collection and page is listed and kept up to date as you add more." },
            { title: "Domain verification", desc: "Add the verification tag from Search Console in settings — no file uploads." },
            { title: "Search performance", desc: "See the queries, clicks and positions your store earns in Google Search." },
        ],
        setup: ["Add your store in Google Search Console and choose the HTML tag method", "Paste the verification tag in Settings → Integrations → Search Console", "Verify, then submit /sitemap.xml"],
        specs: [
            { k: "Sitemap", v: "Generated automatically" },
            { k: "Verification", v: "HTML meta tag" },
            { k: "Cost", v: "Included" },
        ],
        related: ["google-analytics", "microsoft-clarity", "facebook-pixel"],
    },
    {
        slug: "tcs",
        name: "TCS",
        category: "shipping",
        monogram: { text: "TCS", bg: "#171717", fg: "#fff" },
        tagline: "Book TCS parcels and track them from the order.",
        overview:
            "Connect your TCS account and book confirmed orders straight from Seltrax — one at a time or in bulk. The consignment number comes back onto the order, the COD amount goes with the booking, and tracking updates flow in as TCS scans the parcel.",
        features: [
            { title: "Book from the order", desc: "Single or bulk booking from the Confirmed queue, with the COD amount included." },
            { title: "Labels & manifest", desc: "Print labels with the consignment barcode and a handover manifest." },
            { title: "Tracking on the order", desc: "Scan updates land on the order; the customer gets a tracking link." },
            { title: "Your own rates", desc: "Bookings go through your TCS account, at the rates you've agreed." },
        ],
        setup: ["Have your TCS account credentials ready", "Open Settings → Couriers → TCS and connect", "Set TCS as default, or add routing rules by city or weight", "Book a test order to confirm"],
        specs: [
            { k: "Booking", v: "Single & bulk" },
            { k: "COD amount", v: "Sent with booking" },
            { k: "Tracking", v: "Automatic scan updates" },
            { k: "Account", v: "Your own TCS account" },
        ],
        related: ["leopards", "mp", "whatsapp"],
    },
    {
        slug: "leopards",
        name: "Leopards Courier",
        category: "shipping",
        monogram: { text: "LCS", bg: "#171717", fg: "#fff" },
        tagline: "Leopards bookings, labels and tracking, built in.",
        overview:
            "Connect Leopards Courier to book confirmed COD orders from Seltrax, print labels, and track every parcel without opening the Leopards portal. Consignment numbers and scan updates are saved on each order automatically.",
        features: [
            { title: "One-click booking", desc: "Book one order or a whole day's confirmed orders at once." },
            { title: "COD on the consignment", desc: "The collection amount is sent with the booking and printed on the label." },
            { title: "Scan-by-scan tracking", desc: "Picked up, in transit, out for delivery, delivered — all on the order." },
            { title: "Exception alerts", desc: "Attempted and refused deliveries raise an alert while a call can still save the order." },
        ],
        setup: ["Have your Leopards account credentials ready", "Open Settings → Couriers → Leopards and connect", "Choose it as default or route specific cities to it", "Book a test order to confirm"],
        specs: [
            { k: "Booking", v: "Single & bulk" },
            { k: "COD amount", v: "Sent with booking" },
            { k: "Tracking", v: "Automatic scan updates" },
            { k: "Account", v: "Your own Leopards account" },
        ],
        related: ["tcs", "mp", "sms"],
    },
    {
        slug: "mp",
        name: "M&P",
        category: "shipping",
        monogram: { text: "M&P", bg: "#171717", fg: "#fff" },
        tagline: "Ship with M&P straight from your orders.",
        overview:
            "Connect M&P to add another courier to your dispatch — book confirmed orders, print labels with the COD amount, and see tracking on the order. Route the cities where M&P performs best to it automatically.",
        features: [
            { title: "Book from Seltrax", desc: "Single or bulk booking, no portal and no copy-pasting addresses." },
            { title: "Labels with COD", desc: "Everything the rider needs on the label, including the amount to collect." },
            { title: "Tracking & returns", desc: "Scan updates on the order; returned parcels restock automatically." },
            { title: "Routing rules", desc: "Send chosen cities or weights to M&P and the rest to your default courier." },
        ],
        setup: ["Have your M&P account credentials ready", "Open Settings → Couriers → M&P and connect", "Add routing rules if you use more than one courier", "Book a test order to confirm"],
        specs: [
            { k: "Booking", v: "Single & bulk" },
            { k: "COD amount", v: "Sent with booking" },
            { k: "Tracking", v: "Automatic scan updates" },
            { k: "Account", v: "Your own M&P account" },
        ],
        related: ["tcs", "leopards", "whatsapp"],
    },
    {
        slug: "whatsapp",
        name: "WhatsApp order updates",
        category: "messaging",
        monogram: { text: "WA", bg: "#25D366", fg: "#fff" },
        tagline: "Confirmations and tracking where customers already are.",
        overview:
            "Send order confirmations, one-tap 'confirm my order' links and tracking updates on WhatsApp. Confirmation by WhatsApp is the fastest way to stop fake COD orders before they ship — and customers actually read it.",
        features: [
            { title: "Order confirmation link", desc: "Customers confirm their COD order with one tap, moving it from New to Confirmed." },
            { title: "Dispatch & tracking", desc: "The consignment number and tracking link are sent when the order ships." },
            { title: "Message from the order", desc: "Open a WhatsApp chat with the customer from any order in one click." },
            { title: "Customer opt-in", desc: "An optional checkbox at checkout lets customers choose WhatsApp updates." },
        ],
        setup: ["Open Settings → Integrations → WhatsApp", "Connect your business number", "Choose which updates to send: confirmation, dispatch, delivery", "Place a test order to see the messages"],
        specs: [
            { k: "Messages", v: "Order placed · confirm link · dispatched · delivered" },
            { k: "Opt-in", v: "Checkbox at checkout" },
            { k: "Effect", v: "Confirmed orders move stage automatically" },
        ],
        related: ["sms", "tcs", "leopards"],
    },
    {
        slug: "sms",
        name: "SMS notifications",
        category: "messaging",
        monogram: { text: "SMS", bg: "#5C6058", fg: "#fff" },
        tagline: "Order and delivery updates by text message.",
        overview:
            "Not every customer is on WhatsApp. SMS notifications send the order number, a confirmation link and the tracking link by text, so every COD customer knows their order is real and on its way.",
        features: [
            { title: "Order confirmation", desc: "Order number and a confirm link sent the moment an order is placed." },
            { title: "Tracking link", desc: "Sent automatically when the parcel is booked with the courier." },
            { title: "Works alongside WhatsApp", desc: "Use SMS as the fallback for customers who didn't opt in to WhatsApp." },
        ],
        setup: ["Open Settings → Integrations → SMS", "Choose which messages to send", "Edit the message templates if you like", "Place a test order to see them arrive"],
        specs: [
            { k: "Messages", v: "Order placed · confirm link · dispatched" },
            { k: "Templates", v: "Editable" },
            { k: "Fallback", v: "For customers without WhatsApp opt-in" },
        ],
        related: ["whatsapp", "tcs", "mp"],
    },
    {
        slug: "mailchimp",
        name: "Mailchimp",
        category: "email",
        logo: "/integrations/mailchimp.svg",
        monogram: { text: "M", bg: "#FFE01B", fg: "#241C15" },
        tagline: "Sync customers to Mailchimp and email them back.",
        overview:
            "Connect Mailchimp to sync customers and newsletter sign-ups into your audience, so you can send new-arrival emails, sale announcements and win-back campaigns to people who have already bought from you.",
        features: [
            { title: "Customer sync", desc: "Customers who opt in at checkout or via a newsletter section are added to your audience." },
            { title: "Newsletter sign-ups", desc: "Add a newsletter section with the page builder and sign-ups go straight to Mailchimp." },
            { title: "Tags for segments", desc: "Contacts are tagged by source so you can target buyers separately from subscribers." },
        ],
        setup: ["Connect your Mailchimp account in Settings → Integrations → Mailchimp", "Pick the audience to sync into", "Add a newsletter section to any page", "Check the audience for new contacts"],
        specs: [
            { k: "Syncs", v: "Opted-in customers · newsletter sign-ups" },
            { k: "Tags", v: "By source" },
            { k: "Cost", v: "Included (Mailchimp plan separate)" },
        ],
        related: ["facebook-pixel", "trusted-badges", "whatsapp"],
    },
    {
        slug: "trusted-badges",
        name: "Trusted Badges",
        category: "trust",
        logo: "/integrations/trusted-badges.svg",
        monogram: { text: "✓", bg: "#0F9D58", fg: "#fff" },
        tagline: "Trust badges that reassure first-time COD buyers.",
        overview:
            "Show cash on delivery, easy returns, secure checkout and nationwide delivery badges on product pages and at checkout. Small reassurances that make a first-time visitor comfortable placing an order with a store they haven't heard of.",
        features: [
            { title: "Ready-made badges", desc: "Cash on delivery, free delivery above Rs X, easy returns, secure checkout." },
            { title: "Place them anywhere", desc: "Product pages, cart, checkout, or any page through the page builder." },
            { title: "Matches your design", desc: "Badges pick up your store's colours and fonts." },
        ],
        setup: ["Open Settings → Integrations → Trusted Badges", "Choose the badges and edit their text", "Pick where they appear", "Preview your product page"],
        specs: [
            { k: "Placement", v: "Product page · cart · checkout · any page" },
            { k: "Styling", v: "Uses store design" },
            { k: "Cost", v: "Included" },
        ],
        related: ["microsoft-clarity", "whatsapp", "mailchimp"],
    },
]

export const bySlug = (slug: string) => integrations.find((i) => i.slug === slug)
export const categoryName = (key: CategoryKey) => categories.find((c) => c.key === key)?.name ?? key
