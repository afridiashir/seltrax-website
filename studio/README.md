# Seltrax Blog Studio

The editor for the blog at seltrax.com/blog. Posts written here appear on the
site; the website reads them through `lib/blog.ts`.

## One-time setup

1. The Sanity project is `pnhm39kc` (dataset `production`), already set in
   `sanity.config.ts` and `sanity.cli.ts`. Manage it at
   [sanity.io/manage](https://www.sanity.io/manage).
2. `npm install`, then `npm run dev` and open http://localhost:3333.
3. The Studio is live at https://seltrax.sanity.studio. Redeploy after schema
   changes with `npm run deploy` (the appId in `sanity.cli.ts` keeps it on
   the same URL).
4. Invite editors in sanity.io/manage → Members.

## Website environment variables

Set these where the site is hosted (and in the root `.env.local` for local dev):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | the project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | any long random string |

Without the project ID the blog shows its "articles are on their way" state.

## Publish webhook

So new posts go live instantly instead of within the hour, add a webhook in
sanity.io/manage → API → Webhooks:

- **URL:** `https://seltrax.com/api/revalidate`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type in ["post", "author"]`
- **Projection:** `{ "tags": [_type, _type + ":" + slug.current] }`
- **Secret:** the same value as `SANITY_REVALIDATE_SECRET`

## Writing a post

Blog post → fill in title, slug (generate from title), excerpt, category,
cover image with alt text, and the body. A publish date in the future keeps
the post hidden until then. The SEO tab is optional.

Categories are fixed: if you add one in `schemaTypes/post.ts`, add the same key
to `components/resources/blog-data.ts` on the site.
