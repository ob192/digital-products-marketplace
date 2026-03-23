import { getCategories } from "@/lib/categories"
import { HomeContent } from "@/components/HomeContent"

export const revalidate = 3600

export default async function HomePage() {
  const categories = await getCategories()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DigitalHub",
    url: baseUrl,
    description:
        "Your trusted marketplace for premium digital goods. Instant delivery, competitive prices.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HomeContent categories={categories} />
      </>
  )
}