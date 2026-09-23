/* Content for /delete-account — the URL Play Console asks for under
   Data safety → "Do you provide a way for users to request that their data be
   deleted?". It must stay reachable without signing in: a reviewer opens it in
   a logged-out browser, and a login wall is a rejection.

   Everything here describes what purgeAccount() actually does. If the grace
   period or the purge changes, this text changes with it. */

import type { Block } from "./blocks"
import { COMPANY } from "./company"

export type Section = { id: string; title: string; body: Block[] }

export const intro =
    "You can delete your Seltrax account and its data yourself, from the Seltrax Android app. You do not need to contact us."

export const sections: Section[] = [
    {
        id: "how-to-delete",
        title: "How to delete your account",
        body: [
            {
                type: "steps",
                items: [
                    "Open the Seltrax app and sign in.",
                    "Go to **Profile** (the account icon).",
                    "Tap **Delete Account**.",
                    "Read the summary — it lists exactly which of your stores will be deleted and which will be handed to another owner.",
                    "Enter your password if you are asked for one, then confirm.",
                ],
            },
            { type: "p", text: "If you signed in with Google you will not be asked for a password." },
        ],
    },
    {
        id: "what-happens-next",
        title: "What happens next",
        body: [
            { type: "p", text: "Your account is scheduled for deletion and you are signed out on every device." },
            {
                type: "note",
                text: "**Nothing is deleted for 30 days.** During that time you can change your mind: sign back in, go to Profile, and tap **Keep my account**. After 30 days the deletion runs and cannot be undone.",
            },
        ],
    },
    {
        id: "what-gets-deleted",
        title: "What gets deleted",
        body: [
            { type: "p", text: "After the 30 days we permanently delete:" },
            {
                type: "list",
                items: [
                    "your name, email address, password and profile picture",
                    "the link between your Seltrax account and your Google account, if you used Google sign-in",
                    "your push notification tokens, so notifications stop",
                    "your access to every store",
                    "**any store where you were the only owner** — together with its products, collections, orders, customers, uploaded images, settings, blog posts, inventory records and billing history",
                ],
            },
            { type: "note", tone: "warn", text: "Deleting a store takes its storefront offline." },
        ],
    },
    {
        id: "what-stays",
        title: "What does not get deleted",
        body: [
            {
                type: "p",
                text: "A store that has another owner or administrator is **not** deleted. Ownership passes to them and the store keeps trading as normal. The app tells you which of your stores these are before you confirm, so you can hand a store over first if you want it to survive.",
            },
        ],
    },
    {
        id: "no-app-access",
        title: "If you cannot use the app",
        body: [
            {
                type: "p",
                text: `If you have lost access to the app or your account, email us at ${COMPANY.supportEmail} from the address on your Seltrax account and ask us to delete it. We will confirm your identity, then delete it on the same terms as above.`,
            },
        ],
    },
    {
        id: "questions",
        title: "Questions",
        body: [
            {
                type: "p",
                text: `Our full privacy policy is at [seltrax.com/privacy](/privacy). For anything else, write to ${COMPANY.supportEmail}.`,
            },
        ],
    },
]
