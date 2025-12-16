"use client"

import {
  Home,
  QrCode,
  ScanLine,
  BarChart3,
  Settings,
  ChevronRight,
  Building2,
  CreditCard,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function MobileSettings() {
  const menuItems = [
    { icon: Building2, label: "Business Profile", href: "/dashboard/settings" },
    { icon: CreditCard, label: "Subscriptions", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help & Support", href: "/dashboard/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          <button className="p-2">
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 space-y-6">
        {/* Business Profile Section */}
        <Card className="bg-white rounded-xl shadow-sm border-0 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            )
          })}
        </Card>

        {/* Settings Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">Settings</h2>
          <Card className="bg-white rounded-xl shadow-sm border-0 overflow-hidden">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              )
            })}
          </Card>
        </div>
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
          <Link href="/mobile/analytics" className="flex flex-col items-center p-2 text-gray-500">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs mt-1">Analytics</span>
          </Link>
          <Link href="/mobile/settings" className="flex flex-col items-center p-2 text-[#0A6CFF]">
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
