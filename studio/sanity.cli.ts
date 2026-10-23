import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
    api: {
        projectId: process.env.SANITY_STUDIO_PROJECT_ID,
        dataset: process.env.SANITY_STUDIO_DATASET || "production",
    },
    deployment: {
        autoUpdates: true,
        // After the first `npm run deploy`, paste the appId it prints here so
        // later deploys go to the same studio URL without asking.
    },
})
