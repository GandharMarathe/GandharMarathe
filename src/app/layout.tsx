import type { Metadata, Viewport } from "next";
import { Doto, Space_Grotesk, Space_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${doto.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-svh overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
