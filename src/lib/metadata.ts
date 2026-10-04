import type { Metadata } from "next";
import { site } from "@/data/site";

// Setting `openGraph` on a page replaces the root layout's object wholesale,
// including the generated share image, so sub-pages re-attach it here.
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: site.name };

export function pageMetadata(
  title: string,
  description: string,
  type: "article" | "profile" = "article",
): Metadata {
  return {
    title,
    description,
    openGraph: { type, title, description, siteName: site.name, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
