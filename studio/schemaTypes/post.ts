import { DocumentTextIcon } from "@sanity/icons/DocumentText"
import { defineArrayMember, defineField, defineType } from "sanity"

/* Must match blogCategories in components/resources/blog-data.ts on the site;
   the blog filters on these keys. */
const categories = [
    { value: "guides", title: "Selling guides" },
    { value: "cod", title: "COD & couriers" },
    { value: "growth", title: "Marketing & growth" },
    { value: "stores", title: "Store design" },
    { value: "updates", title: "Product updates" },
]

const alt = defineField({
    name: "alt",
    title: "Alt text",
    type: "string",
    description: "Describe the image for screen readers and Google.",
    validation: (r) => r.required(),
})

export const post = defineType({
    name: "post",
    title: "Blog post",
    type: "document",
    icon: DocumentTextIcon,
    groups: [
        { name: "content", title: "Content", default: true },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required().max(110) }),
        defineField({
            name: "slug",
            type: "slug",
            group: "content",
            description: "The post's URL: seltrax.com/blog/<slug>. Don't change it after publishing.",
            options: { source: "title", maxLength: 80 },
            validation: (r) => r.required(),
        }),
        defineField({
            name: "excerpt",
            type: "text",
            rows: 3,
            group: "content",
            description: "One or two sentences shown on the blog card and under the title.",
            validation: (r) => r.required().max(220),
        }),
        defineField({
            name: "category",
            type: "string",
            group: "content",
            options: { list: categories, layout: "radio" },
            validation: (r) => r.required(),
        }),
        defineField({ name: "author", type: "reference", to: [{ type: "author" }], group: "content" }),
        defineField({
            name: "publishedAt",
            title: "Publish date",
            type: "datetime",
            group: "content",
            description: "A future date schedules the post: it stays hidden on the site until then.",
            initialValue: () => new Date().toISOString(),
            validation: (r) => r.required(),
        }),
        defineField({
            name: "mainImage",
            title: "Cover image",
            type: "image",
            group: "content",
            description: "Shown on the blog card and at the top of the post. 16:9 works best.",
            options: { hotspot: true },
            fields: [alt],
        }),
        defineField({
            name: "body",
            type: "array",
            group: "content",
            validation: (r) => r.required(),
            of: [
                defineArrayMember({
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading", value: "h2" },
                        { title: "Subheading", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    lists: [
                        { title: "Bullets", value: "bullet" },
                        { title: "Numbered", value: "number" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Bold", value: "strong" },
                            { title: "Italic", value: "em" },
                            { title: "Code", value: "code" },
                        ],
                        annotations: [
                            defineField({
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    defineField({
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                        validation: (r) => r.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                                    }),
                                ],
                            }),
                        ],
                    },
                }),
                defineArrayMember({
                    type: "image",
                    options: { hotspot: true },
                    fields: [alt, defineField({ name: "caption", type: "string" })],
                }),
            ],
        }),
        defineField({
            name: "seoTitle",
            title: "SEO title",
            type: "string",
            group: "seo",
            description: "Optional. Replaces \"<title> | Seltrax Blog\" in Google results.",
            validation: (r) => r.max(60).warning("Google cuts titles off around 60 characters."),
        }),
        defineField({
            name: "seoDescription",
            title: "SEO description",
            type: "text",
            rows: 3,
            group: "seo",
            description: "Optional. Falls back to the excerpt.",
            validation: (r) => r.max(160).warning("Google cuts descriptions off around 160 characters."),
        }),
    ],
    orderings: [{ title: "Publish date, newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
    preview: {
        select: { title: "title", date: "publishedAt", author: "author.name", media: "mainImage" },
        prepare: ({ title, date, author, media }) => ({
            title,
            subtitle: [author, date && new Date(date).toLocaleDateString("en-GB")].filter(Boolean).join(" · "),
            media,
        }),
    },
})
