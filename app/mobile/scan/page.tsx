"use client"

import { useState } from "react"
import { ArrowLeft, Home, QrCode, ScanLine, BarChart3, Settings, Camera } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MobileScan() {
  const [scanning, setScanning] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/mobile">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Scan QR Code</h1>
        </div>
      </header>

      {/* Scanner */}
      <main className="p-4">
        <Card className="bg-white p-8 rounded-2xl shadow-sm border-0">
          <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Scanner Frame */}
            <div className="absolute inset-8 border-4 border-[#0A6CFF] rounded-2xl">
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#0A6CFF] rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#0A6CFF] rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#0A6CFF] rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#0A6CFF] rounded-br-lg"></div>
            </div>

            <div className="text-center z-10">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aiming camera at QR code</p>
            </div>
          </div>

          <Button
            onClick={() => setScanning(!scanning)}
            className="w-full bg-[#0A6CFF] hover:bg-blue-700 text-white h-12 rounded-xl text-base font-semibold mt-6"
          >
            {scanning ? "Stop Scanning" : "Enable Camera"}
          </Button>
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
          <Link href="/mobile/analytics" className="flex flex-col items-center p-2 text-gray-500">
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
