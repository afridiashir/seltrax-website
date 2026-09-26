/* The integrations directory. Each entry renders a card on /integrations and its
   own page at /integrations/[slug]. To add one, append to `integrations` — the
   directory, the detail page and the sitemap pick it up automatically.
   `logo` is a 96×96 badge in /public/integrations; entries without one render a
   monogram so we never ship another company's logo we don't have.

   This file mirrors the Integrations page in the admin: the settings tables are
   the real fields, in the real order, with the real requirements. If a setting
   is added, renamed or made optional in the product, change it here too — the
   detail pages are read as setup instructions. Entries marked `comingSoon` have
   no page of their own and are left out of the sitemap and llms.txt. */

export type CategoryKey =
    | "analytics"
    | "marketing"
    | "checkout"
    | "communication"
    | "merchandising"
    | "shipping"

export const categories: { key: CategoryKey; name: string; blurb: string }[] = [
    { key: "analytics", name: "Analytics", blurb: "See where visitors come from and what they buy." },
    { key: "marketing", name: "Ads & pixels", blurb: "Point your ad spend at what actually sells." },
    { key: "checkout", name: "Checkout", blurb: "Fewer steps between wanting it and ordering it." },
    { key: "communication", name: "Customer chat", blurb: "Answer questions before the customer leaves." },
    { key: "merchandising", name: "Merchandising", blurb: "Make your offers do more of the work." },
    { key: "shipping", name: "Couriers", blurb: "Book, track and label parcels from the order." },
]

/* One row of an integration's settings table. `required` marks the fields the
   admin marks with an asterisk. */
export type Setting = { name: string; required?: boolean; enter: string; where?: string }

export type Note = { tone: "note" | "tip" | "warn"; text: string }

export type Integration = {
    slug: string
    name: string
    category: CategoryKey
    comingSoon?: boolean
    logo?: string
    monogram: { text: string; bg: string; fg: string }
    tagline: string
    overview: string
    features: { title: string; desc: string }[]
    setup: string[]
    settings?: Setting[]
    code?: { caption: string; body: string }
    notes?: Note[]
    specs: { k: string; v: string }[]
    related: string[]
}

/* Courier booking is identical whichever courier you use, so the flow and its
   current limits are written once and shown on every shipping page. */
export const bookingSteps = [
    "Open the order. When it's Processing, click Mark as Shipped.",
    "Choose “Book with …”. Your connected couriers appear at the top with their logos.",
    "Check the form. Name, phone, address, city, weight and the cash-on-delivery amount are already filled in.",
    "Click Book. The parcel is booked and the tracking number comes back.",
    "Print the airway bill from the Shipment card on the order.",
]

export const bookingAutofill: { k: string; v: string }[] = [
    { k: "City", v: "Matched to the courier's own city list. If it doesn't match, search and pick it." },
    { k: "Weight", v: "Added up from the weights on your products." },
    { k: "Cash on delivery", v: "The order total if payment is still due, or 0 if it's already paid." },
]

export const courierLimits = [
    "Delivery status is marked by hand: click Mark as Delivered when it arrives, or Mark as Returning and then Return Received if it comes back.",
    "Cancelling an order doesn't cancel the courier booking — cancel that in the courier's own portal.",
    "Orders are booked one at a time. Booking several in one click is coming soon.",
]

export const courierNotes: Note[] = [
    { tone: "tip", text: "Put a weight on your products, or you'll type it in for every booking. Make your first booking with a new courier on a test order." },
    { tone: "note", text: "Courier passwords show as •••••••• in the admin, only the store owner can change them, and they are never sent to your storefront." },
]

export const integrations: Integration[] = [
    {
        slug: "google-analytics",
        name: "Google Analytics 4",
        category: "analytics",
        logo: "/integrations/google-analytics.svg",
        monogram: { text: "GA", bg: "#E8710A", fg: "#fff" },
        tagline: "Send every visit and shopping event to your own GA4 property.",
        overview:
            "Paste one Measurement ID and Seltrax starts sending visits and the whole shopping sequence — product viewed, added to cart, order placed — to the Google Analytics property you already own. There is no tag to install and no code to touch.",
        features: [
            { title: "Where your visitors come from", desc: "Daily visits split by Google, Facebook, Instagram or direct." },
            { title: "Which products actually sell", desc: "See what gets viewed most, and what turns into orders." },
            { title: "Where checkout leaks", desc: "How many shoppers reach the cart and leave, so you know what to fix." },
        ],
        setup: [
            "Create a GA4 property at analytics.google.com.",
            "Open Admin → Data Streams and select your Web stream.",
            "Copy the Measurement ID.",
            "In Seltrax, open Integrations → Google Analytics 4 → Connect, paste the ID, leave Active on and save.",
        ],
        settings: [
            {
                name: "Measurement ID",
                required: true,
                enter: "Starts with G- — for example G-XXXXXXXXXX.",
                where: "GA4 → Admin → Data Streams",
            },
        ],
        specs: [
            { k: "Sends", v: "Visits, product views, add to cart, orders" },
            { k: "You need", v: "A free GA4 property" },
            { k: "Setup", v: "One field" },
        ],
        related: ["facebook-pixel", "tiktok-pixel"],
    },
    {
        slug: "facebook-pixel",
        name: "Meta Pixel",
        category: "marketing",
        logo: "/integrations/facebook-pixel.svg",
        monogram: { text: "f", bg: "#1877F2", fg: "#fff" },
        tagline: "Track and retarget your Facebook and Instagram ad traffic.",
        overview:
            "Seltrax sends ViewContent, AddToCart, InitiateCheckout and Purchase to your Meta Pixel, so Meta can optimise for people who buy rather than people who click — and Ads Manager can tell you which ad brought the order in.",
        features: [
            { title: "Ads that find buyers", desc: "Meta optimises delivery towards people likely to order, not just click." },
            { title: "Bring back the near-misses", desc: "Retarget shoppers who viewed a product and didn't buy." },
            { title: "Real numbers in Ads Manager", desc: "See how many sales each ad and each campaign produced." },
        ],
        setup: [
            "Open Meta Events Manager.",
            "Under Data Sources, choose your Pixel or create a new one.",
            "Copy the Pixel ID.",
            "In Seltrax, open Integrations → Meta Pixel → Connect, paste the ID and save.",
        ],
        settings: [
            {
                name: "Pixel ID",
                required: true,
                enter: "15–16 digits — for example 1234567890123456.",
                where: "Events Manager → Data Sources",
            },
        ],
        specs: [
            { k: "Events", v: "ViewContent, AddToCart, InitiateCheckout, Purchase" },
            { k: "Works with", v: "Facebook and Instagram ads" },
            { k: "Setup", v: "One field" },
        ],
        related: ["tiktok-pixel", "google-analytics"],
    },
    {
        slug: "tiktok-pixel",
        name: "TikTok Pixel",
        category: "marketing",
        monogram: { text: "TT", bg: "#010101", fg: "#fff" },
        tagline: "Optimise TikTok ads for orders, not views.",
        overview:
            "ViewContent, AddToCart, InitiateCheckout and CompletePayment go to your TikTok Pixel, so campaigns are optimised towards buyers and you can see which videos actually sold something.",
        features: [
            { title: "Optimise for buyers", desc: "TikTok learns who orders, instead of who watches." },
            { title: "See which video sold", desc: "Attribute orders back to the ad that earned them." },
        ],
        setup: [
            "Open TikTok Ads Manager → Assets → Events → Web Events.",
            "Create a Pixel and copy its Pixel ID.",
            "In Seltrax, open Integrations → TikTok Pixel → Connect, paste it and save.",
        ],
        settings: [
            {
                name: "Pixel ID",
                required: true,
                enter: "For example CXXXXXXXXXXXXXXXXXXX.",
                where: "Ads Manager → Assets → Events → Web Events",
            },
        ],
        specs: [
            { k: "Events", v: "ViewContent, AddToCart, InitiateCheckout, CompletePayment" },
            { k: "Works with", v: "TikTok ads" },
            { k: "Setup", v: "One field" },
        ],
        related: ["facebook-pixel", "google-analytics"],
    },
    {
        slug: "one-click-checkout",
        name: "One-Click Checkout",
        category: "checkout",
        monogram: { text: "1", bg: "#2B7FFF", fg: "#fff" },
        tagline: "A Buy Now button that takes the whole COD order in one popup.",
        overview:
            "Adds a Buy Now button to your product pages. It opens a short popup where the customer types their name, phone, address and city and the order is placed there and then — no cart page, no checkout page. Nothing is required to switch it on: left alone it uses your theme's colours and English labels.",
        features: [
            { title: "Fewer steps, more orders", desc: "Especially cash-on-delivery orders taken on a phone." },
            { title: "Urdu, or any language", desc: "Rename every field in the popup to whatever your customers read." },
            { title: "Matches your brand", desc: "Set the button text, its colours and the popup heading — or inherit the theme." },
            { title: "Only asks what you need", desc: "Email is off by default, since many COD customers don't have one to give." },
        ],
        setup: [
            "Open Integrations → One-Click Checkout → Connect. No setting is required.",
            "Optionally change the button text, the colours and the popup heading.",
            "Save, then try the button on any product page of your store.",
        ],
        settings: [
            { name: "Button Label", enter: "The button's text. Defaults to “Buy Now”." },
            { name: "Popup Heading", enter: "The popup's title — for example “Quick Checkout”." },
            { name: "Button / Text / Border Color", enter: "Hex colours such as #16a34a. Left blank, your theme colour is used." },
            { name: "Require Email", enter: "Makes email mandatory. Usually best left off for COD." },
            { name: "Collect State & Postal Code", enter: "Also asks for province and postal code." },
            { name: "Field Names (JSON)", enter: "Your own labels for the popup's fields. Only the fields you list are renamed; name, phone, address and city always show." },
            { name: "Custom CSS", enter: "For design changes beyond the colour settings. Usually not needed." },
        ],
        code: {
            caption: "Field Names (JSON) — Urdu labels",
            body: `{
  "firstName": { "fieldName": "نام", "fieldPlaceholder": "اپنا نام لکھیں" },
  "phone":     { "fieldName": "فون نمبر", "fieldPlaceholder": "مثلاً 03001234567" },
  "address":   { "fieldName": "پتہ" },
  "city":      { "fieldName": "شہر" }
}`,
        },
        specs: [
            { k: "Required setting", v: "None — works as soon as it's on" },
            { k: "Appears on", v: "Product pages" },
            { k: "Best for", v: "Cash on delivery on mobile" },
        ],
        related: ["whatsapp-checkout", "free-gift"],
    },
    {
        slug: "whatsapp-checkout",
        name: "WhatsApp Checkout",
        category: "checkout",
        monogram: { text: "WA", bg: "#25D366", fg: "#fff" },
        tagline: "An Order on WhatsApp button, pre-filled with the product.",
        overview:
            "Adds an Order on WhatsApp button to your product pages. It opens a chat with you already filled in with the product name, the size or colour, the quantity, the price and a link back to the page — so you never have to ask which product they mean.",
        features: [
            { title: "For customers who'd rather talk", desc: "Shoppers who won't fill in a form will still send a message." },
            { title: "Every detail already in the message", desc: "Product, variant, quantity, price and link, written for them." },
            { title: "Your number, your wording", desc: "Change the button text and the message's first line." },
        ],
        setup: [
            "Enter your WhatsApp number with the country code.",
            "Optionally change the button text and the first line of the message.",
            "Save, then check the button on a product page.",
        ],
        settings: [
            {
                name: "WhatsApp Number",
                required: true,
                enter: "Digits only, starting with the country code: 923001234567. No plus sign, spaces or dashes.",
            },
            { name: "Button Label", enter: "The button's text. Defaults to “Order on WhatsApp”." },
            { name: "Message Intro", enter: "The message's first line — for example “Hi! I'd like to order:”." },
            { name: "Button / Text Color", enter: "Hex colours. Left blank, WhatsApp green is used." },
            { name: "Custom CSS", enter: "For further design changes." },
        ],
        notes: [
            {
                tone: "note",
                text: "This opens a chat — it does not create the order in Seltrax. Once you've agreed it on WhatsApp, add the order in the admin under Orders → Create.",
            },
        ],
        specs: [
            { k: "Appears on", v: "Product pages" },
            { k: "Message includes", v: "Product, variant, quantity, price, link" },
            { k: "Creates the order", v: "No — you add it after agreeing" },
        ],
        related: ["whatsapp-chat", "one-click-checkout"],
    },
    {
        slug: "whatsapp-chat",
        name: "WhatsApp Chat",
        category: "communication",
        monogram: { text: "WA", bg: "#25D366", fg: "#fff" },
        tagline: "A floating WhatsApp button on every page of your store.",
        overview:
            "Puts a WhatsApp button in the corner of every page so a customer can message you in one tap — without leaving to find your number.",
        features: [
            { title: "Questions answered before they leave", desc: "Size, delivery time or price, asked and answered on the spot." },
            { title: "Proof there are people behind the store", desc: "A reachable number does a lot of the trust work for a new store." },
        ],
        setup: [
            "Enter your WhatsApp number.",
            "Optionally add a message that's already typed when the chat opens, and a short greeting beside the button.",
            "Save and check the button on your storefront.",
        ],
        settings: [
            { name: "WhatsApp Number", required: true, enter: "Digits only, with the country code: 923001234567." },
            { name: "Prefilled Message", enter: "Already typed when the chat opens — for example “Hi! I have a question about your store.”" },
            { name: "Greeting Tooltip", enter: "A short line beside the button — for example “Need help? Chat with us”." },
        ],
        specs: [
            { k: "Appears on", v: "Every page" },
            { k: "Setup", v: "One required field" },
        ],
        related: ["whatsapp-checkout", "one-click-checkout"],
    },
    {
        slug: "free-gift",
        name: "Automatic Free Gift",
        category: "merchandising",
        monogram: { text: "FG", bg: "#7C3AED", fg: "#fff" },
        tagline: "Adds the Buy X Get Y gift to the cart by itself.",
        overview:
            "When a customer qualifies for one of your Buy X Get Y offers, the free product drops into their cart automatically. They don't have to go and find it, so the offer does the work you designed it to do.",
        features: [
            { title: "The reward shows up immediately", desc: "The customer sees what they've earned while they're still deciding." },
            { title: "Fewer “where's my gift?” messages", desc: "Nothing to claim means nothing to miss." },
            { title: "Let them pick the variant", desc: "Or hand out the cheapest one in stock and keep it simple." },
        ],
        setup: [
            "Create a Buy X Get Y offer under Discounts first — this integration works with that offer.",
            "Open Integrations → Automatic Free Gift → Connect.",
            "Choose whether the customer picks the variant and whether they can decline it.",
        ],
        settings: [
            {
                name: "Let the customer choose the variant",
                enter: "On: they pick the gift's size or colour. Off: they get the cheapest variant in stock.",
            },
            { name: "Show a “No thanks” option", enter: "On: the customer can decline the gift." },
            { name: "Gift Label", enter: "The badge shown on the gift in the cart — for example “Free”." },
        ],
        notes: [
            {
                tone: "note",
                text: "Buy X Get Y works without this. Turned off, the customer simply adds both products to the cart themselves — the same as on Shopify.",
            },
        ],
        specs: [
            { k: "Needs", v: "A Buy X Get Y discount" },
            { k: "Variant choice", v: "Customer's, or cheapest in stock" },
            { k: "Declinable", v: "Optional" },
        ],
        related: ["one-click-checkout", "whatsapp-checkout"],
    },
    {
        slug: "leopards",
        name: "Leopards Courier",
        category: "shipping",
        monogram: { text: "LCS", bg: "#171717", fg: "#fff" },
        tagline: "Book Leopards parcels from the order and get the tracking number back.",
        overview:
            "Books through the Leopards merchant API. Every booking returns a tracking number onto the order and a link to the airway bill, so you never open the Leopards portal to ship an order. Pickup and shipper details come from your Leopards account.",
        features: [
            { title: "No retyping addresses", desc: "The booking form arrives already filled in from the order." },
            { title: "Airway bill in one click", desc: "Print airway bill on the order opens it as a link." },
            { title: "Test before you ship", desc: "Staging credentials let you make a booking that isn't a real parcel." },
            { title: "Never booked twice", desc: "An order can't be double-booked, even if the button is clicked twice." },
        ],
        setup: [
            "Get your API key and API password from API settings in the Leopards merchant portal.",
            "Open Integrations → Leopards Courier → Connect.",
            "Start on Test (staging) with your test credentials and make one booking.",
            "Switch Environment to Live once the test booking works.",
        ],
        settings: [
            { name: "Environment", required: true, enter: "Live, or Test (staging) — test bookings aren't real parcels." },
            { name: "API key", required: true, enter: "Your Leopards API key.", where: "Merchant portal → API settings" },
            { name: "API password", required: true, enter: "Your Leopards API password.", where: "Merchant portal → API settings" },
        ],
        specs: [
            { k: "Airway bill", v: "Opens as a link" },
            { k: "Test mode", v: "Yes — staging credentials" },
            { k: "Returns", v: "Tracking number onto the order" },
            { k: "Account", v: "Your own Leopards account" },
        ],
        related: ["tcs", "mp"],
    },
    {
        slug: "tcs",
        name: "TCS",
        category: "shipping",
        monogram: { text: "TCS", bg: "#171717", fg: "#fff" },
        tagline: "Book TCS parcels and download the airway bill as a PDF.",
        overview:
            "Books through the TCS e-commerce API and returns the consignment number onto the order. Every booking uses the service and cost center from your settings, and the airway bill downloads as a PDF from the order page.",
        features: [
            { title: "Consignment number on the order", desc: "Booked, numbered and marked Shipped without leaving Seltrax." },
            { title: "Airway bill as a PDF", desc: "Print airway bill downloads it, ready to stick on the parcel." },
            { title: "UAT first", desc: "TCS issues test credentials so you can prove it works before going live." },
        ],
        setup: [
            "Request API access from TCS. They issue UAT (test) credentials first, then Live access once testing succeeds.",
            "Open Integrations → TCS → Connect.",
            "Fill in every setting below — TCS provides all of them except your own pickup details.",
            "Book a test order on UAT, then switch Environment to Live.",
        ],
        settings: [
            { name: "Environment", required: true, enter: "Live, or Test (UAT).", where: "TCS tells you which credentials are which" },
            { name: "Client ID", required: true, enter: "Your API client ID.", where: "TCS" },
            { name: "Client secret", required: true, enter: "Your API client secret.", where: "TCS" },
            { name: "API username", required: true, enter: "Your API username.", where: "TCS" },
            { name: "API password", required: true, enter: "Your API password.", where: "TCS" },
            { name: "TCS account number", required: true, enter: "For example 04011K1.", where: "TCS" },
            { name: "Cost center code", required: true, enter: "Your account's cost center.", where: "TCS" },
            { name: "Service code", required: true, enter: "For example O for overnight.", where: "TCS" },
            { name: "Shipper name", required: true, enter: "The sender's name on the parcel.", where: "Your store" },
            { name: "Pickup address", required: true, enter: "Where parcels are collected from.", where: "Your store" },
            { name: "Pickup city", required: true, enter: "For example Karachi.", where: "Your store" },
            { name: "Shipper mobile", required: true, enter: "11 digits, for example 03001234567.", where: "Your store" },
        ],
        notes: [
            { tone: "note", text: "TCS has a minimum weight of 0.5 kg. Anything lighter is booked as 0.5 kg." },
        ],
        specs: [
            { k: "Airway bill", v: "Downloads as a PDF" },
            { k: "Test mode", v: "Yes — UAT credentials" },
            { k: "Minimum weight", v: "0.5 kg" },
            { k: "Account", v: "Your own TCS account" },
        ],
        related: ["leopards", "mp"],
    },
    {
        slug: "mp",
        name: "M&P",
        category: "shipping",
        monogram: { text: "M&P", bg: "#171717", fg: "#fff" },
        tagline: "Book M&P COD parcels straight from your orders.",
        overview:
            "Books through the M&P COD API and returns the tracking number onto the order. The destination city is picked from M&P's own city list, so the address goes across the way they expect it.",
        features: [
            { title: "Booked from the order", desc: "No portal, no copying addresses, no transcribing tracking numbers." },
            { title: "Their city list, not yours", desc: "The destination is matched to M&P's cities so bookings don't bounce." },
            { title: "A third courier to route to", desc: "Use M&P where it delivers best and keep the others for the rest." },
        ],
        setup: [
            "Get your API username, password and account number from M&P.",
            "Ask them for your pickup location ID as well.",
            "Open Integrations → M&P → Connect and fill them in.",
        ],
        settings: [
            { name: "API username", required: true, enter: "Your API username.", where: "M&P" },
            { name: "API password", required: true, enter: "Your API password.", where: "M&P" },
            { name: "Account number", required: true, enter: "Your M&P account number.", where: "M&P" },
            { name: "Pickup location ID", required: true, enter: "The ID of the location parcels are collected from.", where: "M&P" },
            { name: "Service", required: true, enter: "For example Overnight.", where: "M&P" },
        ],
        notes: [
            {
                tone: "warn",
                text: "M&P airway bills can't be printed from Seltrax yet. After booking, print it from the M&P portal using the tracking number.",
            },
            { tone: "note", text: "The minimum weight sent is 0.5 kg." },
        ],
        specs: [
            { k: "Airway bill", v: "From the M&P portal" },
            { k: "Minimum weight", v: "0.5 kg" },
            { k: "Returns", v: "Tracking number onto the order" },
            { k: "Account", v: "Your own M&P account" },
        ],
        related: ["leopards", "tcs"],
    },
    {
        slug: "flaship",
        name: "Flaship",
        category: "shipping",
        comingSoon: true,
        monogram: { text: "FS", bg: "#5C6058", fg: "#fff" },
        tagline: "One account that books Leopards, TCS, M&P, Daewoo, Trax and Daak.",
        overview:
            "An aggregator, so you can ship with six couriers from a single account instead of applying to each of them. In development.",
        features: [],
        setup: [],
        specs: [],
        related: [],
    },
]

/* Everything that has a page of its own — what the directory links to, and what
   the sitemap and llms.txt list. */
export const livePages = integrations.filter((i) => !i.comingSoon)

export const bySlug = (slug: string) => livePages.find((i) => i.slug === slug)
export const categoryName = (key: CategoryKey) => categories.find((c) => c.key === key)?.name ?? key
