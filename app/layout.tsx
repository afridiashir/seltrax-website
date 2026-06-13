import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
  icons: {
    icon: "/favicon.png",
    apple: "/Seltrax.png",
  },
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
    <html lang="en" suppressHydrationWarning>
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
