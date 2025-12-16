"use client"

import { ArrowLeft, Home, QrCode, ScanLine, BarChart3, Settings, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function MobileAnalytics() {
  const recentRedemptions = [
    { customer: "Customer A", date: "11 Feb" },
    { customer: "Customer A", date: "12 Feb" },
    { customer: "Customer B", date: "12 Feb" },
    { customer: "Customer C", date: "13 Feb" },
  ]

  const topReferrers = [
    { customer: "Customer A", count: 4 },
    { customer: "Customer B", count: 3 },
    { customer: "Customer C", count: 2 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/mobile">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0A6CFF]" />
            Analytics
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 space-y-4">
        {/* Key Metrics */}
        <Card className="bg-white p-6 rounded-xl shadow-sm border-0">
          <div className="flex items-end gap-2 mb-4">
            <div className="text-5xl font-bold text-gray-900">7</div>
            <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
          </div>
          <div className="text-sm text-gray-600">Redemptions</div>
        </Card>

        <Card className="bg-white p-6 rounded-xl shadow-sm border-0">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            25<span className="text-3xl">%</span>
          </div>
          <div className="text-sm text-gray-600">Return rate</div>
        </Card>

        {/* Recent Redemptions */}
        <Card className="bg-white p-5 rounded-xl shadow-sm border-0">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Redemptions</h3>
          <div className="space-y-3">
            {recentRedemptions.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm text-gray-700">{item.customer}</span>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Referrers */}
        <Card className="bg-white p-5 rounded-xl shadow-sm border-0">
          <h3 className="font-semibold text-gray-900 mb-4">Top Referrers</h3>
          <div className="space-y-3">
            {topReferrers.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="text-sm text-gray-700">{item.customer}</span>
                <span className="text-sm font-semibold text-[#0A6CFF]">{item.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          <Link href="/mobile" className="flex flex-col items-center p-2 text-gray-500">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/mobile/generate" className="flex flex-col items-center p-2 text-gray-500">
            <QrCode className="w-6 h-6" />
            <span className="text-xs mt-1">Generate</span>
          </Link>
          <Link href="/mobile/scan" className="flex flex-col items-center p-2">
            <div className="bg-[#0A6CFF] text-white p-3 rounded-full -mt-6 shadow-lg">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1 text-[#0A6CFF]">Scan</span>
          </Link>
          <Link href="/mobile/analytics" className="flex flex-col items-center p-2 text-[#0A6CFF]">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs mt-1">Analytics</span>
          </Link>
          <Link href="/mobile/settings" className="flex flex-col items-center p-2 text-gray-500">
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
