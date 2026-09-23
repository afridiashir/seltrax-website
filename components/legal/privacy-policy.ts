/* Content for /privacy. Kept as data so the page renders itself from one
   source and the on-page index can never drift from the headings.

   The policy describes what the platform actually does. If any of these
   change, the text here has to change with them:
     - the 30-day deletion grace period (section 7)
     - the sub-processor list (section 4)
     - what the mobile app collects and which permissions it asks for (section 1)
*/

import type { Block } from "./blocks"
import { COMPANY } from "./company"

export { COMPANY }

export const LAST_UPDATED = "22 September 2026"

export type Section = { id: string; title: string; body: Block[] }

export const intro: Block[] = [
    {
        type: "p",
        text: `${COMPANY.legalEntity} ("Seltrax", "we", "us") runs the Seltrax ecommerce platform: a web dashboard, a storefront service that serves merchants' own online shops, and the Seltrax Android app. This policy explains what we collect, why, who else sees it, and how to get rid of it.`,
    },
    {
        type: "p",
        text: "It covers people who hold a Seltrax account — merchants and their staff. Section 6 explains how we handle data about **your** customers, which is a different relationship.",
    },
]

export const sections: Section[] = [
    {
        id: "what-we-collect",
        title: "What we collect",
        body: [
            {
                type: "p",
                lead: "Account information.",
                text: "When you register we store your name and email address. If you set a password we store only a bcrypt hash of it, never the password itself. If you sign in with Google we receive your name, email address and profile picture URL from Google, and store a record linking your Seltrax account to your Google account. We never receive your Google password.",
            },
            {
                type: "p",
                lead: "Device information for notifications.",
                text: 'If you allow notifications, the app registers a push token (an Expo push token) along with the platform name ("android" or "ios") so we can send you alerts about new orders. It is tied to your account so we can stop sending when you sign out or delete your account.',
            },
            {
                type: "p",
                lead: "Content you create.",
                text: "Products, collections, prices, stock levels, blog posts, discount codes, supplier and purchase records, store settings, and any images you upload. Images are stored in object storage and served from a public URL, so treat anything you upload as publicly reachable by anyone with the link.",
            },
            {
                type: "p",
                lead: "Photo library access.",
                text: "The app asks for permission to read your photo library only when you choose to add a product image, and only reads the images you pick. It does not scan your library, and it does not use the camera or the microphone.",
            },
            {
                type: "p",
                lead: "Technical data.",
                text: "Our servers keep ordinary request logs — IP address, time, path, user agent — for security and debugging.",
            },
            {
                type: "p",
                text: "We do **not** collect your location, contacts, calendar, messages, or audio.",
            },
        ],
    },
    {
        id: "what-we-use-it-for",
        title: "What we use it for",
        body: [
            {
                type: "list",
                items: [
                    "To sign you in and keep your session valid",
                    "To show your stores, orders, products and analytics",
                    "To send push notifications about orders in your stores",
                    "To send transactional email: verifying your address, resetting your password",
                    "To operate, secure and debug the service, and to prevent abuse",
                    "To meet legal and tax obligations",
                ],
            },
            {
                type: "p",
                text: "We do not sell your personal information, and we do not use it for advertising or share it with advertising networks.",
            },
        ],
    },
    {
        id: "legal-basis",
        title: "Legal basis",
        body: [
            {
                type: "p",
                text: `Where the law of ${COMPANY.jurisdiction} applies, we process your data to perform our contract with you (running your store), on the basis of your consent (push notifications and photo access, each of which you can withdraw in your device settings), and for our legitimate interests in keeping the service secure.`,
            },
        ],
    },
    {
        id: "who-else-sees-it",
        title: "Who else sees it",
        body: [
            { type: "p", text: "We use these providers, and only for the purposes listed:" },
            {
                type: "table",
                head: ["Provider", "What they receive", "Why"],
                rows: [
                    ["Google", "Your Google account identity, if you use Google sign-in", "Authentication"],
                    ["Google Analytics", "Store traffic statistics we read on your behalf", "Your store analytics"],
                    ["Expo (Expo push service)", "Your push token and notification contents", "Delivering order alerts"],
                    ["Cloudflare R2 or Amazon S3", "Images you upload", "Media storage"],
                    ["Resend", "Your email address and message contents", "Transactional email"],
                    ["Vercel", "Storefront hosting and domain provisioning", "Serving your store"],
                ],
            },
            {
                type: "p",
                text: "We may also disclose information where the law requires it, or to protect the rights and safety of our users.",
            },
            { type: "p", text: "All traffic between the app and our API travels over HTTPS." },
        ],
    },
    {
        id: "how-long-we-keep-it",
        title: "How long we keep it",
        body: [
            {
                type: "p",
                text: "We keep your account data for as long as your account exists. Request logs are kept for a short operational period. When you delete your account we follow section 7. We may retain billing and invoice records for as long as tax law requires, even after deletion.",
            },
        ],
    },
    {
        id: "data-about-your-customers",
        title: "Data about your customers",
        body: [
            {
                type: "p",
                text: "When you use Seltrax to run a store, the orders, customer names, addresses and contact details in that store are **your** data. You decide what is collected and why; we hold and process it on your instructions in order to provide the service. You are responsible for having your own privacy policy covering your shoppers, and for answering their requests about their data.",
            },
            {
                type: "p",
                text: "If you delete a store, or your account deletion removes a store, that store's customer and order records are deleted with it.",
            },
        ],
    },
    {
        id: "deleting-your-account",
        title: "Deleting your account",
        body: [
            {
                type: "p",
                text: "You can delete your Seltrax account yourself, from the app: **Profile → Delete Account**. You will be asked to confirm, and to re-enter your password if your account has one.",
            },
            {
                type: "note",
                text: 'Deletion is **not immediate**. We schedule it and carry it out **30 days later**. During those 30 days you can sign back in and choose "Keep my account" to call it off. This window exists because deletion is irreversible and can take a live storefront offline — it protects you against a mistaken tap or someone else getting hold of your unlocked phone.',
            },
            { type: "p", text: "Requesting deletion signs you out on every device straight away." },
            { type: "p", text: "When the 30 days elapse we permanently delete:" },
            {
                type: "list",
                items: [
                    "your name, email address, password hash and profile picture reference",
                    "your linked Google account record",
                    "your push notification tokens",
                    "your access to every store",
                    "**any store where you were the only owner**, together with its products, orders, customers, media, settings and history",
                ],
            },
            {
                type: "p",
                text: "A store that has another owner or administrator is **not** deleted. Ownership passes to them and the store keeps running.",
            },
            {
                type: "p",
                text: "Before deleting, the app shows you exactly which stores will be destroyed and which will be handed over, so you can transfer a store first if you want it to survive.",
            },
            {
                type: "p",
                text: `You can also ask us to delete your account by writing to ${COMPANY.privacyEmail}. We may keep invoices and similar financial records where the law requires it.`,
            },
        ],
    },
    {
        id: "your-rights",
        title: "Your rights",
        body: [
            {
                type: "p",
                text: `Depending on where you live, you may have the right to access, correct, export or delete your personal data, to object to or restrict processing, and to complain to your data protection authority. Write to ${COMPANY.privacyEmail} and we will respond within the period the law allows.`,
            },
        ],
    },
    {
        id: "security",
        title: "Security",
        body: [
            {
                type: "p",
                text: "Passwords are hashed with bcrypt. Sessions use signed tokens that we can revoke, and changing your password or requesting deletion signs out every existing session. Traffic is encrypted in transit with TLS. No system is perfectly secure, but we take reasonable measures appropriate to the risk.",
            },
        ],
    },
    {
        id: "children",
        title: "Children",
        body: [
            {
                type: "p",
                text: `Seltrax is a business tool and is not directed at children. We do not knowingly collect data from anyone under 18. If you believe a child has given us data, write to ${COMPANY.privacyEmail} and we will delete it.`,
            },
        ],
    },
    {
        id: "international-transfers",
        title: "International transfers",
        body: [
            {
                type: "p",
                text: `Our providers operate internationally, so your data may be processed outside ${COMPANY.jurisdiction}. Where required, we rely on appropriate safeguards such as standard contractual clauses.`,
            },
        ],
    },
    {
        id: "changes",
        title: "Changes",
        body: [
            {
                type: "p",
                text: "We will post any changes on this page and update the date at the top. If a change materially affects you, we will tell you in the app or by email.",
            },
        ],
    },
]

/* Section 13 (Contact) is rendered as a card from COMPANY, not as a block. */
export const contactSection = { id: "contact", title: "Contact" } as const
