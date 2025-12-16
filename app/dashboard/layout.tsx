import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { OnlineStatus } from "@/components/online-status"
import { PlanProvider } from "@/lib/plan-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlanProvider>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/30 pb-20 md:pb-4">{children}</main>
        </div>
        <OnlineStatus />
      </div>
      <BottomNav />
    </PlanProvider>
  )
}
