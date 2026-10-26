import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/* Sanity webhook: refreshes cached blog pages and the homepage logo strip when
   a post, author or the Homepage logos document is published, edited or
   deleted. Configure it in sanity.io/manage → API →
   Webhooks with
     URL:        https://seltrax.com/api/revalidate
     Filter:     _type in ["post", "author", "trustedBrands"]
     Projection: { "tags": [_type, _type + ":" + slug.current] }
     Secret:     the same value as SANITY_REVALIDATE_SECRET */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ tags?: string[] }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // wait for the Sanity CDN to catch up before refetching
    );
    if (!isValidSignature) return new Response("Invalid signature", { status: 401 });

    const tags = (body?.tags ?? []).filter((t): t is string => typeof t === "string" && !t.endsWith(":"));
    if (!tags.length) return new Response("Missing tags", { status: 400 });

    tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
    return NextResponse.json({ revalidated: tags });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
