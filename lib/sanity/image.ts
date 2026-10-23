import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });

/* Respects the hotspot/crop editors set in the Studio. */
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format").fit("max");
