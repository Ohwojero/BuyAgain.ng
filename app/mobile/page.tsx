"use client"

import { useState } from "react"
import { Home, QrCode, ScanLine, BarChart3, Settings, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePlan } from "@/lib/plan-context"

export default function MobileDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const { plan } = usePlan()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#0A6CFF]">BuyAgain</h1>
          <button className="p-2">
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        {/* Primary Stats Card */}
        <Card className="bg-gradient-to-br from-[#0A6CFF] to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="text-sm opacity-90 mb-2">Dashboard</div>
          <div className="text-5xl font-bold mb-1">25</div>
          <div className="text-sm opacity-90">Redemptions this month</div>
        </Card>

        {/* Secondary Stats */}
        <Card className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <div className="text-4xl font-bold text-gray-900 mb-1">10</div>
          <div className="text-sm text-gray-600">Influenced revenue</div>
        </Card>

        {/* Revenue Card */}
        <Card className="bg-white p-6 rounded-2xl shadow-sm border-0">
          <div className="text-4xl font-bold text-gray-900 mb-1">₦420,000</div>
          <div className="text-sm text-gray-600">Net unfed</div>
        </Card>

        {/* CTA Button */}
        <Button
          className="w-full bg-[#0A6CFF] hover:bg-blue-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg"
          onClick={() => setActiveTab("generate")}
        >
          Generate
        </Button>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <Card className="p-4 text-center border-0 bg-gradient-to-br from-green-50 to-green-100">
            <TrendingUp className="w-6 h-6 mx-auto text-[#00C853] mb-2" />
            <div className="text-2xl font-bold text-gray-900">108</div>
            <div className="text-xs text-gray-600 mt-1">Redemptions</div>
          </Card>
          <Card className="p-4 text-center border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <Users className="w-6 h-6 mx-auto text-[#8E24AA] mb-2" />
            <div className="text-2xl font-bold text-gray-900">32</div>
            <div className="text-xs text-gray-600 mt-1">Referrals</div>
          </Card>
          <Card className="p-4 text-center border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <DollarSign className="w-6 h-6 mx-auto text-[#FFC107] mb-2" />
            <div className="text-2xl font-bold text-gray-900">₦230k</div>
            <div className="text-xs text-gray-600 mt-1">Revenue</div>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          <Link
            href="/mobile"
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "home" ? "text-[#0A6CFF]" : "text-gray-500"}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/mobile/generate"
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "generate" ? "text-[#0A6CFF]" : "text-gray-500"}`}
            onClick={() => setActiveTab("generate")}
          >
            <QrCode className="w-6 h-6" />
            <span className="text-xs mt-1">Generate</span>
          </Link>

          <Link
            href="/mobile/scan"
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "scan" ? "text-[#0A6CFF]" : "text-gray-500"}`}
            onClick={() => setActiveTab("scan")}
          >
            <div className="bg-[#0A6CFF] text-white p-3 rounded-full -mt-6 shadow-lg">
              <ScanLine className="w-6 h-6" />
            </div>
            <span className="text-xs mt-1 text-[#0A6CFF]">Scan</span>
          </Link>

          <Link
            href="/mobile/analytics"
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "analytics" ? "text-[#0A6CFF]" : "text-gray-500"}`}
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs mt-1">Analytics</span>
          </Link>

          <Link
            href="/mobile/settings"
            className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "settings" ? "text-[#0A6CFF]" : "text-gray-500"}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
