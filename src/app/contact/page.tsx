import type { Metadata } from "next"
import { ContactContent } from "@/components/ContactContent"

export const metadata: Metadata = {
  title: "Contact Support",
  description:
    "Get in touch with our support team via Telegram. We're available 24/7 to help with your orders and questions.",
}

export default function ContactPage() {
  return <ContactContent />
}
