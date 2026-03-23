import type { Metadata } from "next"
import { TopUpContent } from "@/components/TopUpContent"

export const metadata: Metadata = {
    title: "Top Up Balance — DigitalHub",
    description:
        "Top up your DigitalHub balance using USDT TRC20, USDT BEP20, or Binance ID. Fast and secure crypto payments.",
    openGraph: {
        title: "Top Up Balance — DigitalHub",
        description:
            "Top up your DigitalHub balance using USDT TRC20, USDT BEP20, or Binance ID.",
    },
}

export default function TopUpPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Top Up Balance",
        description:
            "Top up your DigitalHub balance using USDT TRC20, USDT BEP20, or Binance ID. Fast and secure crypto payments.",
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: "Top Up" },
            ],
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <TopUpContent />
        </>
    )
}