import { UserIcon } from "@sanity/icons/User"
import { defineField, defineType } from "sanity"

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({ name: "name", type: "string", validation: (r) => r.required() }),
        defineField({ name: "role", type: "string", description: "Shown under the name, e.g. \"Growth, Seltrax\"." }),
        defineField({ name: "image", type: "image", options: { hotspot: true } }),
    ],
    preview: { select: { title: "name", subtitle: "role", media: "image" } },
})
