import type { Metadata } from "next"
import { AboutContent } from "@/components/AboutContent"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DigitalHub — your trusted marketplace for premium digital goods delivered instantly.",
}

export default function AboutPage() {
  return <AboutContent />
}
