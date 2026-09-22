# Seltrax Website: Project Specification

**Status:** Describes the code as of 15 Sep 2026, commit `8ebbc1c`, plus the staged move of product pages into `app/(products)/`.
**Production URL:** https://seltrax.com
**Repository:** `seltrax-website`

---

## 1. Overview

### 1.1 What this is
This repository is the public marketing and documentation site for **Seltrax**, an ecommerce platform for online sellers in Pakistan. The site's job is to explain the product, answer objections (price, cash on delivery, couriers, switching platforms) and send visitors to the Seltrax app to sign up.

The site is **not** the product. Store creation, login and the seller dashboard live in a separate app at `https://admin.seltrax.com`. This site only links to it.

### 1.2 Goals
| Goal | How the site supports it |
|---|---|
| Get sign-ups | Every page has "Start selling" / "Create your store" CTAs that link to `REGISTER_URL`, plus a shared closing CTA and footer |
| Book demos | "Book a demo" links to a Google Calendar booking page (`DEMO_URL`) |
| Rank for search | Per-page metadata and canonicals, a sitemap, robots rules, JSON-LD (Organization, SoftwareApplication, FAQPage), OG/Twitter images |
| Win switchers | `/compare` (with a cost calculator), `/migrate` and `/pricing` |
| Cut support load | Help center at `/help` with 20 step-by-step articles |

### 1.3 Target audience
Small and mid-sized online sellers in Pakistan who:
- take most orders as **cash on delivery (COD)**
- ship with **TCS, Leopards or M&P**
- run the business from a phone and often sell through WhatsApp and Instagram
- are on Shopify or WooCommerce today, or haven't launched yet

### 1.4 Core product messages
The site repeats these consistently, and new copy should follow them:
1. **One plan, everything included.** No apps, plugins, premium themes or per-seat fees.
2. **Priced in rupees.** Rs 1,999/month billed monthly, or Rs 1,349/month billed yearly (Rs 16,188/year, 32% off).
3. **COD-first.** Order confirmation, courier booking, tracking, returns and remittance are built in.
4. **Fast.** One JSON-rendered theme and no plugin scripts.
5. **Launch the same day.** No hosting, code or developer needed.

---

## 2. Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, React Server Components) | 16.1.1 |
| UI runtime | React | 19.2.3 |
| Language | TypeScript (strict) | ^5 |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`; shadcn-style tokens in `app/globals.css` | ^4 |
| Animation | framer-motion | ^12.23 |
| Icons | lucide-react | ^0.562 |
| Class utils | `clsx` + `tailwind-merge` (`cn()` in `lib/utils.ts`) | |
| Database | PostgreSQL through Prisma 7 with the `@prisma/adapter-pg` driver adapter | ^7.2 |
| Email | Resend, with React email templates | ^6.6 |
| Fonts | `next/font/google`: Inter (body/UI), Instrument Serif (display accents) | |
| Analytics | Google Analytics 4 (`G-LD6SF4KEX4`), loaded `afterInteractive` | |
| Lint | ESLint 9 with `eslint-config-next` (core-web-vitals + typescript) | |

**Scripts:** `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
**Path alias:** `@/*` points at the repo root.

---

## 3. Architecture

### 3.1 Directory layout
```
app/
  layout.tsx              Root layout: fonts, metadata, GA4, JSON-LD, TopLoader, MotionProvider
  page.tsx                Homepage
  (products)/             Route group (no URL segment) for product/feature pages
    analytics/ cash-on-delivery/ checkout/ courier-dispatch/ designs/
    integrations/ integrations/[slug]/ launch/ migrate/ mobile-app/
    mobile-first/ orders/ page-builder/ page-speed/ staff-accounts/
  about/ blog/ case-studies/ compare/ help/ help/[slug]/ pricing/ reviews/
  api/health/route.ts     Proxy for the platform health report
  api/waitlist/route.ts   Waitlist sign-up (DB + email)
  sitemap.ts robots.ts opengraph-image.tsx twitter-image.tsx icon.png apple-icon.png
components/
  home/                   Shared chrome and design primitives (navbar, footer, ui.tsx) + homepage sections
  <feature>/sections.tsx  One file of section components per page
  integrations/ help/ designs/ resources/   Data files and listing/detail renderers
  emails/                 Resend email templates
  motion-provider.tsx top-loader.tsx
lib/
  config.ts               External URLs (env-overridable)
  prisma.ts               Prisma client singleton
  utils.ts                cn()
  generated/prisma/       Generated Prisma client (committed)
prisma/
  schema.prisma  migrations/
public/
  landing/ brands/ integrations/ mobile-first-storefront/  Seltrax.png  mobile-screenshot.jpeg
```

### 3.2 Page composition pattern
Every page file in `app/` is a thin **server component** that:
1. exports a `metadata` object (title, description, `alternates.canonical`), and
2. renders a `<main>` holding an ordered list of section components, ending with `<CTAFooter />`.

Section components are **client components** (`"use client"`) because nearly all of them animate or are interactive. Each page's sections live together in `components/<feature>/sections.tsx`.

Most product pages follow the same section order:

> **Hero** → **Interactive demo** → **Explanatory sections** → **Spec sheet** → **Comparison table** → **FAQ** → **CTAFooter**

The page hero renders the navbar (`HomeNavbar`) itself, over a full-bleed background photo that fades to white. There is no global header in the root layout.

### 3.3 Content-as-data
Content that repeats as a collection lives in typed TypeScript data files. The listing page, the detail pages and the sitemap all read from the same data:

| Collection | File | Drives |
|---|---|---|
| Integrations (11) | `components/integrations/data.ts` | `/integrations`, `/integrations/[slug]`, sitemap |
| Help articles (20 in 6 sections) | `components/help/docs.ts` | `/help`, `/help/[slug]`, sitemap, prev/next order |
| Store designs (12 categories, 0 designs) | `components/designs/data.ts` | `/designs` |
| Blog posts (5 categories, 0 posts) | `components/resources/blog-data.ts` | `/blog` |
| Case studies (6 categories, 0 entries) | `components/resources/case-studies-data.ts` | `/case-studies` |
| Navigation | `components/home/nav-data.ts` | Desktop mega menu and mobile menu |

There is no CMS. Publishing content means editing these files and deploying.

### 3.4 Dynamic routes
`/integrations/[slug]` and `/help/[slug]` use `generateStaticParams()` with `dynamicParams = false`, so every page is statically generated at build time and unknown slugs return 404. `generateMetadata()` builds the title, description and canonical from the data entry.

### 3.5 Configuration and environment
`lib/config.ts` holds every external URL, and each can be overridden by an environment variable:

| Constant | Env var | Default |
|---|---|---|
| `APP_URL` | `NEXT_PUBLIC_APP_URL` | `https://admin.seltrax.com` |
| `LOGIN_URL` | `NEXT_PUBLIC_LOGIN_URL` | `${APP_URL}/login` |
| `REGISTER_URL` | `NEXT_PUBLIC_REGISTER_URL` | `${APP_URL}/register` |
| `ANDROID_APP_URL` | `NEXT_PUBLIC_ANDROID_APP_URL` | `""` (buttons show "Coming soon to Android") |
| `HEALTH_URL` | `HEALTH_URL` | `https://api.seltrax.com/health/all` |

Server-only secrets:

| Env var | Used by |
|---|---|
| `DATABASE_URL` | `lib/prisma.ts`, `prisma.config.ts` |
| `RESEND_API_KEY` | `app/api/waitlist/route.ts` |

Other hard-coded values:
- `DEMO_URL`, the Google Calendar booking link, is exported from `nav-data.ts` but also redeclared as a local constant in about 10 section files.
- `siteUrl = "https://seltrax.com"` appears in `layout.tsx`, `sitemap.ts` and `robots.ts`.

`next.config.ts` has one redirect: `/health` → the UptimeRobot status page (`permanent: false`).

---

## 4. Sitemap and page inventory

### 4.1 Navigation structure
**Header** (`components/home/navbar.tsx`, data in `nav-data.ts`):
- **Product** mega menu, in four groups:
  - *Storefront:* Designs, Mobile-first, Page speed, Page builder
  - *Selling:* Cash on Delivery, Courier dispatch, Checkout, Orders
  - *Manage:* Analytics, Staff accounts, Mobile app
  - *Grow:* Migrate, Integrations, Launch in minutes
  - CTA card: "Create your store"
- **Company** mega menu:
  - *About Seltrax:* About, Compare, Reviews
  - *Get in touch:* Book a demo, Login, Create your store
- **Resources** list: Blog, Case studies, Help & demo, Platform status (external)
- **Pricing** (direct link)
- Right side: **Login** and **Start selling**

Mega menus open on hover or focus with a 160 ms close delay and close on Escape. On mobile the nav becomes an accordion sheet.

**Footer** (`components/home/cta-footer.tsx`): a "Your store could be live tonight" CTA card containing a white footer with Product, Get started and Compare link columns (the Compare links deep-link to `/compare#shopify` and `/compare#woocommerce`).

### 4.2 Pages

#### Core
| Route | Purpose | Sections |
|---|---|---|
| `/` | Homepage | Hero (3 interactive tilt cards + brand logos) → BuiltIn `#features` → Steps `#how-it-works` → Mobile → Testimonial → FAQ `#faq` (with FAQPage JSON-LD) → CTAFooter |
| `/pricing` | Single plan, monthly/yearly toggle | PricingHero (plan card, billing toggle) → Included (9 feature groups) → NeverPay (plus third-party costs not included) → CompareTeaser → PricingFAQ |
| `/compare` | Seltrax vs Shopify vs WooCommerce | CompareHero (tabs synced to the URL hash) → HeadToHead → FullComparison (scored feature table) → TwelveMonthCost `#cost` (slider calculator) → HonestFit → CompareFAQ |
| `/about` | Company story | AboutHero → Story → Mission (facts) → Values → AboutCTA. *A `Team` component exists but is not rendered.* |
| `/reviews` | Seller reviews | Featured review plus a masonry grid filterable by topic |

#### Product and feature pages (`app/(products)/`)
| Route | Headline feature | Interactive element |
|---|---|---|
| `/designs` | Ready-made designs by category | Category rail (URL hash), empty state until designs are added |
| `/mobile-first` | 360px-first storefronts | DeviceSimulator |
| `/page-speed` | Faster load times | Load race in the hero; revenue Calculator |
| `/page-builder` | Build any page from sections | LiveBuilder |
| `/cash-on-delivery` | COD order lifecycle | Lifecycle hero; Reconciliation board |
| `/courier-dispatch` | TCS / Leopards / M&P booking | Dispatch console; LabelPreview; Tracking timeline |
| `/checkout` | One-page, phone-first checkout | FieldConfigurator (required/optional/hidden) |
| `/orders` | COD-staged order inbox | OrdersInbox |
| `/analytics` | Sales, funnel, delivered revenue | Interactive Dashboard |
| `/staff-accounts` | Unlimited staff, per-area permissions | TeamBuilder; per-seat CostCompare |
| `/mobile-app` | Android app | AndroidButton (env-gated), features, 3 steps |
| `/migrate` | Move from Shopify/WooCommerce | Migration Wizard; CostAfter |
| `/launch` | Go live in minutes | LaunchSimulator |
| `/integrations` | Integration directory | Search + category rail (URL hash) |
| `/integrations/[slug]` | Integration detail | Overview, features, setup steps, spec table, related integrations |

**Integrations available:** Facebook Pixel, Google Analytics, Microsoft Clarity, Google Search Console, TCS, Leopards Courier, M&P, WhatsApp order updates, SMS notifications, Mailchimp, Trusted Badges.
**Categories:** Marketing & ads, Analytics, Shipping & couriers, Customer messaging, Email marketing, Trust & conversion.

#### Resources
| Route | Purpose | Notes |
|---|---|---|
| `/blog` | Article listing | Shared `Listing` component: category rail in the URL hash, newest first, empty state |
| `/case-studies` | Case-study listing | Same `Listing` component; cards can show a `highlight` result badge |
| `/help` | Help center home | `DocsShell`: sticky sidebar, client-side title/summary search, "Browse topics" toggle on mobile |
| `/help/[slug]` | Help article | Breadcrumb, read time, block renderer (`h2`/`p`/`steps`/`list`/`note`), "On this page" TOC (xl+), related link, prev/next, demo CTA |
| `/health` | Platform status | Redirects to UptimeRobot |

**Help sections:** Getting started (5), Selling & orders (4), Shipping (3), Store & design (2), Growth (2), Team & account (3).

---

## 5. Backend

### 5.1 Data model
`prisma/schema.prisma` has a single model. The client is generated to `lib/generated/prisma`.

```prisma
model User {
  id             Int      @id @default(autoincrement())
  email          String   @unique
  name           String?
  whatsappNumber String?  @unique
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```
Migration: `20251231090235_emails`. The table stores **waitlist sign-ups**, not platform users.

### 5.2 `POST /api/waitlist`
- **Body:** `{ "email": string }`
- **Flow:**
  1. Look up the user by email. If found, return `200 { message: "You are already on the #<id> in line!..." }`.
  2. Otherwise create the `User` row.
  3. Send the "You're on the waitlist!" email via Resend from `hello@seltrax.com`, using `EmailTemplate` with `line = user.id`.
  4. Return `201 { message: "You are #<id> in line!..." }`, or `500` if the send fails.
- **Current state:** no page in the site calls this endpoint. It is left over from the pre-launch waitlist.

### 5.3 `GET /api/health`
- Fetches `HEALTH_URL` with `no-store` and a 12 s timeout.
- Passes the upstream JSON report through with status 200, even when the upstream answered 503.
- Returns `502 { status: "error", message }` if the upstream is unreachable, times out or returns no readable JSON.
- Always `force-dynamic`, with `cache-control: no-store`.
- **Current state:** `/health` redirects to UptimeRobot, so no page uses this route.

---

## 6. SEO and discoverability

| Item | Implementation |
|---|---|
| Default metadata | `app/layout.tsx`: title, description, keywords, OpenGraph, Twitter `summary_large_image`, `robots: index, follow`, `metadataBase` |
| Per-page metadata | Every `page.tsx` sets its title, description and `alternates.canonical` |
| Structured data | Organization + SoftwareApplication (Offer: 1349 PKR / MONTH) in the root layout; FAQPage on the homepage FAQ |
| Sitemap | `app/sitemap.ts`: 23 static routes plus every integration and help article; priorities 0.5–1.0 |
| Robots | Allow `/`, disallow `/api/`, sitemap reference |
| Social images | `opengraph-image.tsx` generates a 1200×630 image with `next/og`; `twitter-image.tsx` re-exports it |
| Icons | File convention (`app/icon.png`, `app/apple-icon.png`). **Don't** add `metadata.icons`, because it overrides the file-based icons. |
| Rules for honest content | Don't add Review structured data until the reviews are real. Don't show logos of companies we have no rights to (integrations without a logo use a monogram). |

---

## 7. Design system

### 7.1 Tokens
| Token | Value | Where |
|---|---|---|
| Brand accent | `#2B7FFF` (`ACCENT`), soft `#5B9CFF` | `components/home/ui.tsx`, `--primary` |
| Ink | `#171717` | Primary buttons, headings |
| Body text | `#3A3D37`; muted `#5C6058` / `#6B6F66` / `#8A8E84` | |
| Surfaces | White; tinted panels `#F6F7F3` / `#F3F4F0`; borders `#E4E6DF` / `#EEF0EA` | |
| Success | `#0F9D58` / `#0F7A44` | Savings badges, "Included" pills |
| Radius | Pills (`rounded-full`) for buttons/chips; `rounded-2xl` cards; `--radius: 0.625rem` | |
| Shadow | `shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)]` (`shadow`) | |

The site uses a light theme only.

### 7.2 Typography
- **Inter** (`--font-home-sans`) for all UI and body text.
- **Instrument Serif italic** (`--font-home-serif`) through the `<Serif>` component, used as the accent line in almost every heading. Standard pattern: serif line on top, semibold sans line below.
- Section H2s share `h2Class` (centered, 26 → 34 → 42 px).
- Text is small by design, around 11–13 px on mobile and 13–15 px on desktop.

### 7.3 Shared primitives (`components/home/ui.tsx`)
- `Container`: centered column, max 1200 px, responsive side padding.
- `Reveal`: fade-up on scroll, runs once.
- `Serif`, `Logo` (Zap icon + wordmark), `Flag`, `Face`, `Avatar`, `shadow`, `h2Class`.

### 7.4 Recurring UI patterns
- **Hero:** full-bleed photo (`/landing/scenery.jpg`, `bluish.jpg` or `mist.jpg`), white wash at the top, eased fade to white at the bottom, dark kicker pill with an accent icon, headline, subcopy, CTAs.
- **Category rail + grid:** used on designs, integrations, blog and case studies. Horizontal chips on phones, a sticky vertical list from `md`, the selected category stored in the URL hash, counts, and an `aria-live` results area with a designed empty state.
- **FAQ accordion:** numbered rows with a "+" that rotates to "×"; the first item starts open.
- **Dark CTA band:** a `#171717` panel with a white primary button and an outline secondary button.
- **Comparison tables:** Seltrax column highlighted `#F5F9FF`; yes/partial/no icons.

### 7.5 Motion and accessibility
- `MotionProvider` wraps the app in `MotionConfig reducedMotion="user"`. If the OS has reduced motion on, transform and layout animations are skipped and opacity fades still run.
- `TopLoader`: a 3 px accent progress bar on route changes. Same-origin, pathname-changing clicks only; it ignores modifier-key clicks, hash links and new tabs, and gives up after 8 s.
- ARIA in use: `role="tablist"`/`tab` with `aria-selected`, `aria-expanded` on accordions and menus, `aria-current` on the active rail item or article, `aria-label` on navs, star ratings and the breadcrumb.
- Images use `next/image`. Decorative backgrounds have `alt=""`.

---

## 8. Non-functional requirements

| Area | Requirement / current approach |
|---|---|
| Responsiveness | Mobile-first; every section must work at 360 px. Breakpoints `sm`/`md`/`lg`/`xl`. |
| Performance | Static rendering for every page except `/api/*`. GA and heavy work load `afterInteractive`. Hero photos use `priority` + `sizes="100vw"`. Fonts use `display: swap`. |
| Rendering | Pages are server components; sections are client components. Anything that holds icon components (e.g. listing configs) must be built in a client wrapper, because functions can't cross the server/client boundary. |
| Links | Internal links use `next/link`; external links use `target="_blank" rel="noopener noreferrer"`. Don't render a dead link; show a disabled "coming soon" state instead (see `AndroidButton`). |
| Honesty of copy | Competitor comparisons avoid printing competitor prices (they change often) and include "Which one fits you". Placeholder testimonials must be replaced with real, attributable reviews before launch. |
| Browser support | Modern evergreen browsers (Next 16 defaults). |

---

## 9. Content operations

| To… | Do this |
|---|---|
| Add an integration | Append to `integrations` in `components/integrations/data.ts`; optionally add a 96×96 badge to `public/integrations/`. The directory, detail page and sitemap pick it up automatically. |
| Add a help article | Append to `articles` in `components/help/docs.ts` **and** list its slug in a `sections` entry. Check the menu paths against the live dashboard first. |
| Add a store design | Append to `designs` in `components/designs/data.ts` with a category slug, a screenshot under `public/designs/` and an optional live `preview` URL. |
| Publish a blog post / case study | Append a `ListingEntry` to the data file. Set `href` only once a detail page exists (none exist yet). Case studies must be real and approved by the seller. |
| Change pricing | Update `MONTHLY` / `YEARLY_PER_MONTH` in `components/pricing/sections.tsx` **and** every hard-coded "Rs 1,349" (see §10). |
| Change nav | Edit `NAV` in `components/home/nav-data.ts`. |
| Add a page | Create `app/<route>/page.tsx` (feature pages go in `app/(products)/`) with `metadata` + `alternates.canonical`, put sections in `components/<feature>/sections.tsx`, end with `<CTAFooter />`, and add the route to `app/sitemap.ts` and, if needed, to `NAV`. |

---

## 10. Known gaps and open issues

### Content not ready for launch
1. **Testimonials and reviews are placeholders.** `components/home/testimonial.tsx` and `components/reviews/sections.tsx` show "Seller name / Store name" filler, and `/reviews` is in the sitemap.
2. **Team section is placeholder** and currently hidden on `/about`.
3. **Designs, blog and case studies are empty.** These pages only show empty states, but `/designs`, `/blog` and `/case-studies` are all in the sitemap and nav.
4. **Blog and case-study detail pages don't exist.** `ListingEntry.href` has nothing to point to.
5. **"Trusted brands working with us" logos** on the homepage (trüke, GOVO, Lemonade, uppercase) need confirmation that these are real customers who agreed to be shown.
6. **Marketing claims need backing:** "about 2x faster than Shopify" (nav), "most sellers launch in under an hour", and the comparison table scores.

### Inconsistencies
7. **Price messaging conflicts.** `/pricing` says Rs 1,999 monthly or Rs 1,349 billed yearly. The homepage FAQ ("Rs 1,349/month, flat"), CTA footer, nav CTA card, about page, reviews CTA, root metadata description, OG image and SoftwareApplication JSON-LD all state Rs 1,349/month with no yearly-billing qualifier. The `/compare` calculator uses 1,349 × 12.
8. **"Start Free Trial"** (homepage hero) implies a trial; everywhere else says "No credit card needed to start" with no trial terms.
9. **Stale comments** reference `components/landing/*`, which no longer exists, and `lib/config.ts` says `/api/health` is "rendered on /health", but `/health` now redirects to UptimeRobot.

### Engineering
10. **Unused API routes.** Nothing calls `/api/waitlist` or `/api/health`. Decide whether to remove them, or wire them up again (e.g. a self-hosted status page).
11. **Waitlist route hardening, if kept:**
    - no email validation
    - `request.json()` is outside the `try`, so malformed JSON causes an unhandled error
    - the DB row is created before the email is sent, so a failed send returns 500 but the user is already saved
    - no rate limiting
    - `AlreadyWaitlistTemplate` is imported but never used
12. **Duplicated constants.** `DEMO_URL` is redeclared in about 10 files; `siteUrl` in 3; price figures in many. Import them from `nav-data.ts` / `lib/config.ts` and a shared pricing module instead.
13. **No custom `not-found.tsx` or `error.tsx`.** Unknown routes get the default Next.js 404.
14. **No automated tests.** Only `eslint` runs.
15. **README is still the create-next-app boilerplate.** It should document env vars, Prisma setup (`prisma migrate`, `prisma generate`) and the content operations in §9.
16. **Uncommitted route-group move.** The move of 15 product pages into `app/(products)/` is staged but not committed. URLs are unchanged because route groups add no path segment.

---

## 11. Local development

```bash
npm install
# .env.local
#   DATABASE_URL=postgresql://...        (only needed for /api/waitlist)
#   RESEND_API_KEY=re_...                (only needed for /api/waitlist)
#   NEXT_PUBLIC_ANDROID_APP_URL=...      (optional)
npx prisma generate                      # regenerate lib/generated/prisma after schema changes
npx prisma migrate dev                   # apply migrations locally
npm run dev                              # http://localhost:3000
npm run lint
npm run build
```

The marketing pages have no runtime dependency on the database or Resend. Without those env vars, only `/api/waitlist` breaks.
