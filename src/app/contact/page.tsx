import type { Metadata } from "next"
import { ContactContent } from "@/components/ContactContent"

export const metadata: Metadata = {
  title: "Contact Support — DigitalHub",
  description:
      "Get in touch with our support team via Telegram. We're available 24/7 to help with your orders and questions.",
  openGraph: {
    title: "Contact Support — DigitalHub",
    description:
        "Get in touch with our support team via Telegram. We're available 24/7.",
  },
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Support",
    description:
        "Get in touch with our support team via Telegram. We're available 24/7.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Contact" },
      ],
    },
  }

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ContactContent />
      </>
  )
}