"use client"

import { useState } from "react"
import { ArrowLeft, Home, QrCode, ScanLine, BarChart3, Settings } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MobileGenerate() {
  const [codeType, setCodeType] = useState("discount")
  const [discountValue, setDiscountValue] = useState("")
  const [discountType, setDiscountType] = useState("percentage")
  const [expiryDate, setExpiryDate] = useState("")
  const [numCodes, setNumCodes] = useState("1")

  const handleGenerate = () => {
    console.log("[v0] Generating codes:", { codeType, discountValue, discountType, expiryDate, numCodes })
    alert("Codes generated successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-4">
        <div className="flex items-center gap-3">
          <Link href="/mobile">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Scan & Redeem</h1>
        </div>
      </header>

      {/* Form */}
      <main className="p-4 space-y-4">
        <Card className="bg-white p-5 rounded-xl shadow-sm border-0">
          <div className="space-y-4">
            {/* Code Type */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Code Type</Label>
              <Select value={codeType} onValueChange={setCodeType}>
                <SelectTrigger className="w-full h-12 rounded-lg border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Discount Value */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Discount Value</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="h-12 pl-8 rounded-lg border-gray-300"
                    value={discountValue}
                    onChange={(e) => {
                      setDiscountValue(e.target.value)
                      setDiscountType("fixed")
                    }}
                  />
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Percent"
                    className="h-12 pr-8 rounded-lg border-gray-300"
                    value={discountType === "percentage" ? discountValue : ""}
                    onChange={(e) => {
                      setDiscountValue(e.target.value)
                      setDiscountType("percentage")
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Expiry Date</Label>
              <Input
                type="date"
                className="h-12 rounded-lg border-gray-300"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            {/* Number of Codes */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Number of Codes</Label>
              <Select value={numCodes} onValueChange={setNumCodes}>
                <SelectTrigger className="w-full h-12 rounded-lg border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">0-10</SelectItem>
                  <SelectItem value="2">11-50</SelectItem>
                  <SelectItem value="3">51-100</SelectItem>
                  <SelectItem value="4">100+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              className="w-full bg-[#0A6CFF] hover:bg-blue-700 text-white h-12 rounded-xl text-base font-semibold mt-2"
            >
              Generate
            </Button>
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
          <Link href="/mobile/generate" className="flex flex-col items-center p-2 text-[#0A6CFF]">
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
