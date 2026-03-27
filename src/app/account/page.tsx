import type { Metadata } from "next"
import { AccountContent } from "@/components/AccountContent"

export const metadata: Metadata = {
    title: "My Account — DigitalHub",
    description: "Manage your account settings and view your purchase history.",
}

export default function AccountPage() {
    return <AccountContent />
}