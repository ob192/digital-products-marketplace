import type { Metadata } from "next"
import { AboutContent } from "@/components/AboutContent"

export const metadata: Metadata = {
  title: "About Us — DigitalHub",
  description:
      "Learn about DigitalHub — your trusted marketplace for premium digital goods delivered instantly.",
  openGraph: {
    title: "About Us — DigitalHub",
    description:
        "Learn about DigitalHub — your trusted marketplace for premium digital goods delivered instantly.",
  },
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DigitalHub",
    description:
        "Learn about DigitalHub — your trusted marketplace for premium digital goods.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "About" },
      ],
    },
  }

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AboutContent />
      </>
  )
}