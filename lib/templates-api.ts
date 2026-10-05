/* Client for the public Templates API (https://api.seltrax.com/public/templates).
   Read-only, no auth. Server-side only: /designs fetches on the server so the
   gallery is in the HTML and cached for five minutes, matching the API's own
   Cache-Control. */

export type PublicTemplate = {
    slug: string
    name: string
    category: string | null
    description: string | null
    /* Portrait 1920 x 2480 (24:31) screenshots, first is the main image. */
    previewImages: string[]
    demoUrl: string | null
    pages: string[]
    sampleProductCount: number
    collectionCount: number
    updatedAt: string
}

export type TemplatesResult = { templates: PublicTemplate[]; categories: string[]; failed: boolean }

const API = "https://api.seltrax.com"

/* A failed request returns an empty result with `failed: true` instead of
   throwing, so a hiccup in the API shows a "try again" state on /designs
   rather than failing the build or the page. */
export async function getTemplates(): Promise<TemplatesResult> {
    try {
        const res = await fetch(`${API}/public/templates`, { next: { revalidate: 300 } })
        if (!res.ok) throw new Error(`Templates request failed: ${res.status}`)
        const data = (await res.json()) as { templates: PublicTemplate[]; categories: string[] }
        return { templates: data.templates, categories: data.categories, failed: false }
    } catch {
        return { templates: [], categories: [], failed: true }
    }
}

/* One template by slug. Returns null for an unknown or unpublished slug (the
   API answers 404) so the page can call notFound(); any other failure throws,
   so a stale cached page is kept instead of a good URL turning into a 404. */
export async function getTemplate(slug: string): Promise<PublicTemplate | null> {
    const res = await fetch(`${API}/public/templates/${encodeURIComponent(slug)}`, { next: { revalidate: 300 } })
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Template request failed: ${res.status}`)
    return ((await res.json()) as { template: PublicTemplate }).template
}
