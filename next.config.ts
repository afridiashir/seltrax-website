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
      // Integration pages that were published before the directory was rebuilt
      // from the real product. These URLs are already in Search Console, so
      // they redirect rather than 404. Permanent, so the old ones drop out of
      // the index.
      { source: "/integrations/whatsapp", destination: "/integrations/whatsapp-checkout", permanent: true },
      { source: "/integrations/microsoft-clarity", destination: "/integrations", permanent: true },
      { source: "/integrations/google-search-console", destination: "/integrations", permanent: true },
      { source: "/integrations/sms", destination: "/integrations", permanent: true },
      { source: "/integrations/mailchimp", destination: "/integrations", permanent: true },
      { source: "/integrations/trusted-badges", destination: "/integrations", permanent: true },
    ];
  },
};

export default nextConfig;
