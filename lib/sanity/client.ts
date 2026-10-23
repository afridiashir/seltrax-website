import { createClient } from "next-sanity";

/* The blog's content lives in Sanity (Studio in /studio). Until the project ID
   is set, the client is null and the blog renders its empty state, so builds
   work without Sanity configured. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-02-01";

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;
