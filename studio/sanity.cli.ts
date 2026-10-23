import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
    api: {
        projectId: process.env.SANITY_STUDIO_PROJECT_ID || "pnhm39kc",
        dataset: process.env.SANITY_STUDIO_DATASET || "production",
    },
    deployment: {
        autoUpdates: true,
        // seltrax.sanity.studio
        appId: "fakdm04vgo1suukj8ninbyoo",
    },
})
