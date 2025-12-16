import type React from "react"
import { PlanProvider } from "@/lib/plan-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BuyAgain - Mobile",
  description: "BuyAgain.ng mobile loyalty system",
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlanProvider>
      <div className="mobile-app min-h-screen bg-gray-50">{children}</div>
    </PlanProvider>
  )
}
