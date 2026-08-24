import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // UptimeRobot refuses to be framed, so /health hands off to the hosted
      // status page instead. Temporary so we can point it elsewhere later.
      {
        source: "/health",
        destination: "https://stats.uptimerobot.com/rzpRy9ZAoR",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
