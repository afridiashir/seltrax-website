import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { TopLoader } from "@/components/top-loader";
import "./globals.css";
import Script from "next/script";

// Inter for UI/body, Instrument Serif italic for display accents (see globals.css).
const homeSans = Inter({
  subsets: ["latin"],
  variable: "--font-home-sans",
  display: "swap",
});
const homeSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-home-serif",
  display: "swap",
});
const siteUrl = "https://seltrax.com";
const title =
  "Seltrax — Launch Your Online Store in Minutes | Shopify & WooCommerce Alternative";
const description =
  "Build your online store with Seltrax for a flat Rs 1,349/month. Themes, payments, analytics, and hosting built in — no plugins, no code, no surprise fees.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Seltrax",
  keywords: [
    "Seltrax",
    "online store builder",
    "ecommerce platform",
    "Shopify alternative",
    "WooCommerce alternative",
    "build online store",
    "ecommerce Pakistan",
  ],
  alternates: {
    canonical: "/",
  },
  // Icons come from the file conventions app/icon.png and app/apple-icon.png.
  // Don't add an `icons` field here: Next drops file-based icons whenever
  // metadata.icons is set (see lib/metadata/resolve-metadata.js).
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Seltrax",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Seltrax",
      url: siteUrl,
      logo: `${siteUrl}/Seltrax.png`,
    },
    {
      "@type": "SoftwareApplication",
      name: "Seltrax",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description,
      offers: {
        "@type": "Offer",
        price: "1349",
        priceCurrency: "PKR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1349",
          priceCurrency: "PKR",
          unitText: "MONTH",
        },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LD6SF4KEX4"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LD6SF4KEX4');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${homeSans.variable} ${homeSerif.variable} antialiased bg-background text-foreground`}
      >
        {/* The homepage carries its own header inside the hero card (components/home/navbar.tsx). */}
        <TopLoader />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
