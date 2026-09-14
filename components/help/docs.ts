/* Help centre documentation. Sections order the sidebar; each article becomes a
   page at /help/[slug] and a sitemap entry. Add an article by appending it to
   `articles` and listing its slug in a section.

   The steps describe the product as the rest of the site presents it — check
   each menu path against the live dashboard before publishing. */

export type Block =
    | { type: "h2"; text: string }
    | { type: "p"; text: string }
    | { type: "steps"; items: string[] }
    | { type: "list"; items: string[] }
    | { type: "note"; tone: "tip" | "warn"; text: string }

export type Article = {
    slug: string
    title: string
    summary: string
    minutes: number
    body: Block[]
    related?: { label: string; href: string }
}

export const sections: { key: string; title: string; articles: string[] }[] = [
    { key: "start", title: "Getting started", articles: ["welcome", "create-your-store", "add-your-first-product", "choose-a-design", "publish-your-store"] },
    { key: "selling", title: "Selling & orders", articles: ["set-up-cash-on-delivery", "customise-checkout-fields", "manage-orders", "confirm-orders"] },
    { key: "shipping", title: "Shipping", articles: ["connect-a-courier", "book-couriers-and-print-labels", "tracking-and-returns"] },
    { key: "store", title: "Store & design", articles: ["page-builder-basics", "connect-your-domain"] },
    { key: "growth", title: "Growth", articles: ["analytics-overview", "connect-marketing-tools"] },
    { key: "account", title: "Team & account", articles: ["add-staff-accounts", "use-the-mobile-app", "migrate-your-store"] },
]

export const articles: Article[] = [
    {
        slug: "welcome",
        title: "Welcome to Seltrax",
        summary: "What Seltrax is, what's included, and how to find your way around these docs.",
        minutes: 2,
        body: [
            { type: "p", text: "Seltrax is an ecommerce platform for sellers in Pakistan. Your storefront, a cash-on-delivery checkout, courier booking, order management, analytics and team access are all part of one plan — there are no apps or plugins to install." },
            { type: "h2", text: "What's included" },
            { type: "list", items: ["Hosting, SSL, backups and updates", "Ready-made store designs and a page builder", "A one-page, COD-first checkout", "TCS, Leopards and M&P courier integrations", "Analytics, including delivered revenue", "Unlimited staff accounts and the Android app"] },
            { type: "h2", text: "How these docs are organised" },
            { type: "p", text: "Start with Getting started to set up and publish your store. The other sections follow the life of an order — selling, shipping, then growing and running the business with your team." },
            { type: "note", tone: "tip", text: "Prefer a walkthrough? Book a demo and the team will set up a sample store with you." },
        ],
    },
    {
        slug: "create-your-store",
        title: "Create your store",
        summary: "Sign up, name your store and get your free store address.",
        minutes: 2,
        body: [
            { type: "p", text: "Creating a store takes a couple of minutes and doesn't need a credit card." },
            { type: "h2", text: "Sign up" },
            { type: "steps", items: ["Go to the sign-up page and enter your phone number or email and a password.", "Enter your store name. This is what customers see in the header and in messages.", "Upload a logo if you have one — you can add or change it later.", "Your store gets a free address straight away, so you can preview it and share it before connecting a domain."] },
            { type: "h2", text: "Next steps" },
            { type: "p", text: "With the store created, add your first product and choose a design. You can publish as soon as both are done." },
        ],
        related: { label: "Launch in minutes", href: "/launch" },
    },
    {
        slug: "add-your-first-product",
        title: "Add your first product",
        summary: "Add photos, price, variants and stock for a product.",
        minutes: 3,
        body: [
            { type: "h2", text: "Create a product" },
            { type: "steps", items: ["Open Products and choose Add product.", "Enter a title and description.", "Upload photos. Images are resized and optimised automatically, so upload the best quality you have.", "Set the price, and a compare-at price if the item is on sale.", "Add stock quantity and a SKU if you track them.", "Save. The product appears on your store once it's published."] },
            { type: "h2", text: "Add variants" },
            { type: "p", text: "If a product comes in sizes or colours, add them as options. Each combination can have its own price, SKU and stock." },
            { type: "note", tone: "tip", text: "Use square (1:1) or portrait (4:5) photos so product grids line up neatly on phones." },
            { type: "h2", text: "Adding many products" },
            { type: "p", text: "For a large catalogue, import products from a CSV file, or bring them across from Shopify or WooCommerce instead of adding them one by one." },
        ],
        related: { label: "Migrate your store", href: "/help/migrate-your-store" },
    },
    {
        slug: "choose-a-design",
        title: "Choose a design",
        summary: "Pick a ready-made design and change its colours, fonts and sections.",
        minutes: 2,
        body: [
            { type: "h2", text: "Pick a starting point" },
            { type: "steps", items: ["Open Store design.", "Browse the designs by category and preview any of them.", "Apply the one closest to your brand."] },
            { type: "h2", text: "Make it yours" },
            { type: "p", text: "Every design is a starting point. Change colours and fonts, then use the page builder to add, reorder or remove sections on any page." },
            { type: "note", tone: "tip", text: "Switching designs keeps your products, orders and settings — only the look changes." },
        ],
        related: { label: "Browse designs", href: "/designs" },
    },
    {
        slug: "publish-your-store",
        title: "Publish your store",
        summary: "Check the essentials, go live and share your link.",
        minutes: 2,
        body: [
            { type: "h2", text: "Before you publish" },
            { type: "list", items: ["At least one product with a photo and price", "Delivery fees set up", "A courier connected, if you want to book from Seltrax", "Your contact details and policies filled in"] },
            { type: "h2", text: "Go live" },
            { type: "steps", items: ["Preview your store on your phone.", "Place a test order using cash on delivery.", "Choose Publish.", "Share your store link on Instagram, WhatsApp and Facebook."] },
            { type: "note", tone: "tip", text: "You can keep using the free store address, or connect your own domain at any time." },
        ],
        related: { label: "Connect your domain", href: "/help/connect-your-domain" },
    },
    {
        slug: "set-up-cash-on-delivery",
        title: "Set up cash on delivery",
        summary: "Turn on COD, set delivery and COD fees, and choose payment options.",
        minutes: 3,
        body: [
            { type: "p", text: "Cash on delivery is switched on by default for new stores, so you can start taking orders straight away." },
            { type: "h2", text: "Set delivery and COD fees" },
            { type: "steps", items: ["Open Settings → Payments & delivery.", "Choose a flat delivery fee, or set fees per city.", "Optionally add a separate COD fee, or free delivery above an order value.", "Save. Fees are shown in the checkout total before the customer places the order."] },
            { type: "h2", text: "Online payments" },
            { type: "p", text: "You can offer online payment alongside COD. Cash on delivery stays the default selection unless you change it." },
            { type: "note", tone: "warn", text: "Showing all fees up front reduces refused parcels — customers who are surprised by the total at the door are more likely to refuse." },
        ],
        related: { label: "How cash on delivery works", href: "/cash-on-delivery" },
    },
    {
        slug: "customise-checkout-fields",
        title: "Customise checkout fields",
        summary: "Make fields required, optional or hidden, and add your own.",
        minutes: 2,
        body: [
            { type: "h2", text: "Change a field" },
            { type: "steps", items: ["Open Settings → Checkout.", "For each field, choose Required, Optional or Hidden.", "Save, then preview the checkout on your phone."] },
            { type: "note", tone: "tip", text: "Name and phone are always required — a COD order can't be delivered without them." },
            { type: "h2", text: "Add a custom field" },
            { type: "p", text: "Add a text field, dropdown or checkbox — for example a delivery time or a gift message — and mark it required or optional. The answer is saved on the order." },
        ],
        related: { label: "Frictionless checkout", href: "/checkout" },
    },
    {
        slug: "manage-orders",
        title: "Manage orders",
        summary: "Order stages, the order record, and bulk actions.",
        minutes: 3,
        body: [
            { type: "h2", text: "Order stages" },
            { type: "list", items: ["New — placed, waiting for confirmation", "Confirmed — verified and ready to dispatch", "Dispatched — booked with a courier", "Delivered — handed over and cash collected", "Returned — refused or undeliverable, item restocked", "Cancelled — cancelled before dispatch"] },
            { type: "h2", text: "Work in bulk" },
            { type: "steps", items: ["Open Orders and pick a stage tab.", "Tick the orders you want.", "Choose an action: confirm, dispatch, print or cancel."] },
            { type: "h2", text: "The order record" },
            { type: "p", text: "Open any order to see the customer, items, totals, courier, cash status and a full history of every change and who made it." },
        ],
        related: { label: "Orders", href: "/orders" },
    },
    {
        slug: "confirm-orders",
        title: "Confirm orders before dispatch",
        summary: "Use confirmation to stop fake and impulse COD orders from shipping.",
        minutes: 2,
        body: [
            { type: "p", text: "Confirming an order before you ship it is the most effective way to cut refused parcels." },
            { type: "h2", text: "Ways to confirm" },
            { type: "list", items: ["Call the customer from the order", "Send a WhatsApp or SMS confirmation link the customer taps", "Confirm in bulk after checking a batch"] },
            { type: "h2", text: "Flagged customers" },
            { type: "p", text: "Customers who have refused parcels before are flagged on new orders, so you can confirm more carefully or decline." },
            { type: "note", tone: "tip", text: "Set unconfirmed orders to cancel automatically after a set time so they don't pile up." },
        ],
    },
    {
        slug: "connect-a-courier",
        title: "Connect a courier",
        summary: "Add your TCS, Leopards or M&P account to book from Seltrax.",
        minutes: 2,
        body: [
            { type: "p", text: "You use your own courier account and rates. Connect it once and bookings go through it from Seltrax." },
            { type: "h2", text: "Connect your account" },
            { type: "steps", items: ["Open Settings → Couriers.", "Choose TCS, Leopards or M&P.", "Enter your courier account details and save.", "Set a default courier, or add rules by city or weight if you use more than one."] },
            { type: "note", tone: "tip", text: "Book a test order after connecting to confirm the details are correct." },
        ],
        related: { label: "Courier integrations", href: "/integrations#shipping" },
    },
    {
        slug: "book-couriers-and-print-labels",
        title: "Book couriers and print labels",
        summary: "Book confirmed orders in bulk and print labels with the COD amount.",
        minutes: 3,
        body: [
            { type: "h2", text: "Book orders" },
            { type: "steps", items: ["Open Orders → Confirmed.", "Select the orders to ship.", "Choose Dispatch and pick the courier.", "Consignment numbers are saved on each order and sent to the customer."] },
            { type: "h2", text: "Print labels" },
            { type: "p", text: "Print labels for the booked orders in thermal or A4 format. Each label shows the customer's address and phone, the COD amount and the consignment barcode." },
            { type: "note", tone: "warn", text: "If a booking fails — for example a city the courier doesn't serve — the reason shows on that order. Fix it and retry; the rest of the batch isn't held up." },
        ],
        related: { label: "Courier dispatch", href: "/courier-dispatch" },
    },
    {
        slug: "tracking-and-returns",
        title: "Tracking and returns",
        summary: "Follow parcels to delivery and handle refused or returned orders.",
        minutes: 2,
        body: [
            { type: "h2", text: "Tracking" },
            { type: "p", text: "Courier scans update the order automatically. The customer gets a tracking link, and you see every parcel's stage on the orders screen." },
            { type: "h2", text: "Exceptions" },
            { type: "p", text: "Attempted deliveries and refused parcels raise an alert, so you can call the customer before the courier returns the parcel." },
            { type: "h2", text: "Returns" },
            { type: "steps", items: ["A returned parcel moves the order to Returned.", "The items go back into stock.", "The customer's refusal count increases, and future orders are flagged."] },
        ],
    },
    {
        slug: "page-builder-basics",
        title: "Page builder basics",
        summary: "Add, reorder and edit sections on any page.",
        minutes: 3,
        body: [
            { type: "h2", text: "Edit a page" },
            { type: "steps", items: ["Open Store design → Pages and choose a page, or create a new one.", "Add a section from the library, or start from a pre-designed section.", "Drag sections to reorder them.", "Select a section to change its content, colours, spacing and layout.", "Preview on phone and desktop, then publish."] },
            { type: "h2", text: "Per-device settings" },
            { type: "p", text: "Show or hide a section on phones or desktop, and set different column counts for each." },
            { type: "note", tone: "tip", text: "Duplicate a page to create a campaign landing page quickly." },
        ],
        related: { label: "Page builder", href: "/page-builder" },
    },
    {
        slug: "connect-your-domain",
        title: "Connect your domain",
        summary: "Point your own domain at your Seltrax store.",
        minutes: 3,
        body: [
            { type: "steps", items: ["Open Settings → Domains and enter your domain.", "Copy the DNS records shown.", "Add them at your domain registrar.", "Wait for DNS to update — usually minutes, sometimes a few hours.", "SSL is set up automatically once the domain connects."] },
            { type: "note", tone: "warn", text: "If you're moving from another platform, connect the domain last, after you've checked your imported store." },
        ],
        related: { label: "Migrate your store", href: "/help/migrate-your-store" },
    },
    {
        slug: "analytics-overview",
        title: "Analytics overview",
        summary: "Understand sales, conversion and delivered revenue.",
        minutes: 3,
        body: [
            { type: "h2", text: "The overview" },
            { type: "p", text: "The dashboard shows total sales, sessions, conversion rate and average order for today, 7, 30 or 90 days, compared with the previous period." },
            { type: "h2", text: "The funnel" },
            { type: "p", text: "Follow visitors from session to product view, cart, checkout, order and delivery, and see where they drop off." },
            { type: "h2", text: "Delivery and cash" },
            { type: "list", items: ["Delivered rate and return rate", "Breakdowns by city and courier", "Cash collected but not yet remitted"] },
            { type: "note", tone: "tip", text: "Delivered revenue will be lower than sales for a COD store — the gap is your return rate." },
        ],
        related: { label: "Analytics", href: "/analytics" },
    },
    {
        slug: "connect-marketing-tools",
        title: "Connect marketing tools",
        summary: "Add Facebook Pixel, Google Analytics, Clarity and more.",
        minutes: 2,
        body: [
            { type: "steps", items: ["Open Settings → Integrations.", "Choose the tool — for example Facebook Pixel.", "Paste the ID from that tool's dashboard and save.", "Use the tool's own test or real-time view to confirm data arrives."] },
            { type: "p", text: "Integrations load after your page is usable, so they don't slow your store down." },
        ],
        related: { label: "All integrations", href: "/integrations" },
    },
    {
        slug: "add-staff-accounts",
        title: "Add staff accounts",
        summary: "Invite your team and control what each person can access.",
        minutes: 2,
        body: [
            { type: "h2", text: "Invite someone" },
            { type: "steps", items: ["Open Settings → Staff and choose Invite.", "Enter their phone number or email.", "Pick a role — Manager, Packer, Support or Marketing — or set custom permissions.", "They set their own password when they accept."] },
            { type: "h2", text: "Permissions" },
            { type: "p", text: "Each area of the dashboard can be set to no access, view or edit. For example, give a packer dispatch access without showing revenue." },
            { type: "note", tone: "tip", text: "Removing a staff member signs them out of the dashboard and the mobile app immediately." },
        ],
        related: { label: "Staff accounts", href: "/staff-accounts" },
    },
    {
        slug: "use-the-mobile-app",
        title: "Use the mobile app",
        summary: "Manage orders and see sales from the Android app.",
        minutes: 2,
        body: [
            { type: "steps", items: ["Install the Seltrax app on your Android phone.", "Sign in with your store login.", "Turn on notifications to hear about new orders."] },
            { type: "p", text: "The app shows sales, sessions, conversion and the funnel, and lets you confirm and dispatch orders on the go. Staff see only what their role allows." },
        ],
        related: { label: "Mobile app", href: "/mobile-app" },
    },
    {
        slug: "migrate-your-store",
        title: "Migrate from Shopify or WooCommerce",
        summary: "Import products, customers and orders and switch without downtime.",
        minutes: 4,
        body: [
            { type: "h2", text: "Import your data" },
            { type: "steps", items: ["Create your Seltrax store.", "Open Settings → Import and choose Shopify or WooCommerce.", "Connect your old store with read-only access, or upload its CSV exports.", "Choose what to import: products, images, customers, orders, pages and redirects.", "Start the import. Your old store keeps selling while it runs."] },
            { type: "h2", text: "Check and switch" },
            { type: "steps", items: ["Spot-check products, prices and stock.", "Pick a design and set up checkout and couriers.", "Place a test COD order.", "Connect your domain — redirects go live so old links keep working."] },
            { type: "note", tone: "warn", text: "Themes and app settings don't transfer. Rebuild pages with a design and the page builder." },
        ],
        related: { label: "Migration overview", href: "/migrate" },
    },
]

export const bySlug = (slug: string) => articles.find((a) => a.slug === slug)
export const sectionOf = (slug: string) => sections.find((s) => s.articles.includes(slug))

/* Reading order across all sections, for previous / next links. */
export const ordered = sections.flatMap((s) => s.articles.map(bySlug).filter(Boolean) as Article[])

export const headingId = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
