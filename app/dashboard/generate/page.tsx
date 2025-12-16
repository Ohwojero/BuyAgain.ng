"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, Printer, Percent, Clock, Maximize2, Share2, Palette } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { usePlan } from "@/lib/plan-context"
import QRCode from "react-qr-code"
import jsPDF from "jspdf"


export default function GenerateCodesPage() {
  const router = useRouter()
  const { currentPlan, planLimits } = usePlan()
  const [codeType, setCodeType] = useState<"single" | "referral" | "promo" | "multiple">("single")
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [generated, setGenerated] = useState(false)
  const [discountValue, setDiscountValue] = useState("100")
  const [quantity, setQuantity] = useState("10")
  const [users, setUsers] = useState("1")
  const [expiryDate, setExpiryDate] = useState("")
  const [terms, setTerms] = useState("")
  const [cardColor, setCardColor] = useState("#87CEEB")
  const [printMode, setPrintMode] = useState<"a4" | "pos">("a4")
  const cardRef = useRef<HTMLDivElement>(null)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setGenerated(true)
  }

  const isFeatureAvailable = (feature: string) => {
    if (feature === "referral" || feature === "promo" || feature === "multiple") {
      return currentPlan !== "free"
    }
    // Allow basic features on free plan
    if (feature === "colorChange" || feature === "shareOnSocials") {
      return true
    }
    return true
  }

  const handlePrintNow = () => {
    setPrintMode("a4")

    // Create a print-specific stylesheet
    const printStyle = document.createElement('style')
    printStyle.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        .print-card, .print-card * { visibility: visible; }
        .print-card {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
        }
      }
    `
    document.head.appendChild(printStyle)

    // Add print class to card
    if (cardRef.current) {
      cardRef.current.classList.add('print-card')
    }

    window.print()

    // Cleanup
    setTimeout(() => {
      document.head.removeChild(printStyle)
      if (cardRef.current) {
        cardRef.current.classList.remove('print-card')
      }
    }, 1000)
  }

  const handleDownloadPDF = async () => {
    console.log('handleDownloadPDF called')

    // Show loading indicator
    const loadingButton = (document.querySelector('button:has(.lucide-download)') as HTMLButtonElement) ||
                         (Array.from(document.querySelectorAll('button')).find(btn =>
                           btn.textContent?.includes('Download PDF')
                         ) as HTMLButtonElement) || null

    let originalText = ''
    if (loadingButton) {
      originalText = loadingButton.textContent || 'Download PDF (A4)'
      loadingButton.textContent = 'Generating PDF...'
      loadingButton.disabled = true

      // Reset button after 10 seconds as fallback
      setTimeout(() => {
        if (loadingButton && loadingButton.textContent === 'Generating PDF...') {
          loadingButton.textContent = originalText
          loadingButton.disabled = false
        }
      }, 10000)
    }

    try {
      // Create PDF directly without canvas
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Card dimensions (roughly matching the preview)
      const cardWidth = 180
      const cardHeight = 100
      const cardX = (pageWidth - cardWidth) / 2
      const cardY = (pageHeight - cardHeight) / 2

      // Draw card background
      pdf.setFillColor(255, 255, 255)
      pdf.rect(cardX, cardY, cardWidth, cardHeight, 'F')

      // Draw border
      pdf.setDrawColor(200, 200, 200)
      pdf.setLineWidth(1)
      pdf.rect(cardX, cardY, cardWidth, cardHeight)

      // Left side content (centered, matching updated preview)
      const leftX = cardX + 10
      const leftY = cardY + 15
      const leftWidth = cardWidth * 0.58 - 20 // Account for padding

      // Business name - uppercase, tracking-wide, centered
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      const businessName = '(Name of Business)'
      const businessNameWidth = pdf.getTextWidth(businessName)
      pdf.text(businessName, leftX + (leftWidth - businessNameWidth) / 2, leftY)

      // Thank you message - large, bold, black, centered
      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      const thankYouText = 'Thank you for your patronage!'
      const thankYouWidth = pdf.getTextWidth(thankYouText)
      pdf.text(thankYouText, leftX + (leftWidth - thankYouWidth) / 2, leftY + 10)

      // Description - smaller, medium weight, centered
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(51, 51, 51) // text-black/80
      const descriptionText = 'Here\'s a special Discount for your next visit'
      const descriptionWidth = pdf.getTextWidth(descriptionText)
      pdf.text(descriptionText, leftX + (leftWidth - descriptionWidth) / 2, leftY + 20)

      // Terms - italic, smaller text, centered
      const termsText = terms || '(discount terms / conditions)'
      pdf.setFontSize(6)
      pdf.setTextColor(102, 102, 102) // text-black/60
      const termsWidth = pdf.getTextWidth(termsText)
      pdf.text(termsText, leftX + (leftWidth - termsWidth) / 2, leftY + 30)

      // Business phone - positioned at bottom, centered
      pdf.setFontSize(6)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      const phoneText = 'Business Phone: NO'
      const phoneWidth = pdf.getTextWidth(phoneText)
      pdf.text(phoneText, leftX + (leftWidth - phoneWidth) / 2, cardY + cardHeight - 15)

      // Right side colored background
      const rightX = cardX + cardWidth * 0.58
      const rightWidth = cardWidth * 0.42

      // Convert hex color to RGB
      const hexColor = cardColor.replace('#', '')
      const r = parseInt(hexColor.substr(0, 2), 16)
      const g = parseInt(hexColor.substr(2, 2), 16)
      const b = parseInt(hexColor.substr(4, 2), 16)

      pdf.setFillColor(r, g, b)
      pdf.rect(rightX, cardY, rightWidth, cardHeight, 'F')

      // Icons (matching preview: Percent, Maximize2, Clock)
      pdf.setFontSize(8)
      pdf.setTextColor(0, 0, 0)
      pdf.text('%', rightX + 5, cardY + 8)
      pdf.text('🔍', rightX + rightWidth - 15, cardY + 8) // Maximize2 icon
      pdf.text('⏰', rightX + rightWidth - 8, cardY + 8)   // Clock icon

      // Discount text (matching preview exactly)
      const discountText = `Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off.`
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      const textWidth = pdf.getTextWidth(discountText)
      pdf.text(discountText, rightX + (rightWidth - textWidth) / 2, cardY + 30)

      // QR Code (matching preview: white background, black border)
      const qrSize = 25
      const qrX = rightX + (rightWidth - qrSize) / 2
      const qrY = cardY + 35

      // White background for QR
      pdf.setFillColor(255, 255, 255)
      pdf.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, 'F')

      // Black border
      pdf.setDrawColor(0, 0, 0)
      pdf.setLineWidth(1)
      pdf.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4)

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`https://buyagain.ng/redeem/ABCD-1234`)}`

      try {
        // Add QR code image to PDF
        pdf.addImage(qrUrl, 'PNG', qrX, qrY, qrSize, qrSize)
      } catch (error) {
        console.warn('Could not add QR code image, using placeholder')
        // Fallback: draw a simple placeholder
        pdf.setFillColor(255, 255, 255)
        pdf.rect(qrX, qrY, qrSize, qrSize, 'F')
        pdf.setDrawColor(0, 0, 0)
        pdf.setLineWidth(0.5)
        pdf.rect(qrX, qrY, qrSize, qrSize)
        pdf.setFontSize(6)
        pdf.setTextColor(0, 0, 0)
        pdf.text('QR Code', qrX + qrSize/2 - 8, qrY + qrSize/2 + 2)
      }

      // Code text (matching preview: small, bold, black)
      pdf.setFontSize(6)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text('ABCD-1234', rightX + rightWidth/2 - 10, qrY + qrSize + 8)

      // Validity text (matching preview: small, medium weight)
      const expiryText = `Valid until ${expiryDate ? new Date(expiryDate).toLocaleDateString() : "(Expiring date)"}`
      pdf.setFontSize(6)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(38, 38, 38) // text-black/90
      pdf.text(expiryText, rightX + rightWidth/2 - pdf.getTextWidth(expiryText)/2, qrY + qrSize + 18)

      // Footer (matching preview: small, bold, centered)
      pdf.setFontSize(6)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text('© buyagain.ng', rightX + rightWidth/2 - 12, qrY + qrSize + 25)

      pdf.save('discount-card.pdf')

      // Reset button
      if (loadingButton) {
        loadingButton.textContent = originalText
        loadingButton.disabled = false
      }
    } catch (error) {
      console.error('Error generating PDF:', error)

      // Reset button on error
      if (loadingButton) {
        loadingButton.textContent = originalText
        loadingButton.disabled = false
      }

      alert('Error generating PDF. Please try again.')
    }
  }

  const handlePrintPOS = () => {
    setPrintMode("pos")
    // Create a temporary POS-style receipt
    const posWindow = window.open('', '_blank', 'width=300,height=600')
    if (!posWindow) return

    const posContent = `
      <html>
        <head>
          <title>POS Receipt</title>
          <style>
            body { font-family: 'Courier New', monospace; font-size: 12px; margin: 0; padding: 10px; }
            .receipt { max-width: 250px; margin: 0 auto; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .divider { border-top: 1px dashed #000; margin: 5px 0; }
            .qr-container { text-align: center; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="center bold">(Name of Business)</div>
            <div class="center">Thank you for your patronage!</div>
            <div class="center">Here's a special Discount for your next visit</div>
            <div class="center">${terms || "(discount terms / conditions)"}</div>
            <div class="divider"></div>
            <div class="center bold">Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off.</div>
            <div class="qr-container">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://buyagain.ng/redeem/ABCD-1234" alt="QR Code" style="width: 100px; height: 100px;" />
            </div>
            <div class="center bold">ABCD-1234</div>
            <div class="center">Valid until ${expiryDate ? new Date(expiryDate).toLocaleDateString() : "(Expiring date)"}</div>
            <div class="center bold">© buyagain.ng</div>
            <div class="center">Business Phone: NO</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 1000);
            }
          </script>
        </body>
      </html>
    `

    posWindow.document.write(posContent)
    posWindow.document.close()
  }

  const handleShareOnSocial = async () => {
    const shareData = {
      title: 'Discount Card',
      text: `Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off at (Name of Business)! Scan the QR code: https://buyagain.ng/redeem/ABCD-1234`,
      url: 'https://buyagain.ng/redeem/ABCD-1234'
    }

    const isPWA = window.matchMedia('(display-mode: standalone)').matches

    if (!isPWA && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
        fallbackShare()
      }
    } else {
      fallbackShare()
    }

    function fallbackShare() {
      const url = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`
      window.open(url, '_blank')
    }
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Set up your discount code</h1>
        <p className="text-muted-foreground mt-1">Choose code type and configure your discount</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Form - Left Side */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Select Your code type</CardTitle>
            </CardHeader>
            <CardContent className="-pt-4 -mt-3">
              <form onSubmit={handleGenerate} className="space-y-3">
                {/* Code Type Selector */}
                <div className="space-y-2">
                  <Select value={codeType} onValueChange={(value: any) => setCodeType(value)}>
                    <SelectTrigger className="bg-primary text-white font-semibold w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Use Discount Code</SelectItem>
                      <SelectItem value="referral" disabled={!isFeatureAvailable("referral")}>
                        Referral Codes {!isFeatureAvailable("referral") && "(Tier 2+)"}
                      </SelectItem>
                      <SelectItem value="promo" disabled={!isFeatureAvailable("promo")}>
                        Special Promo Codes {!isFeatureAvailable("promo") && "(Tier 2+)"}
                      </SelectItem>
                      <SelectItem value="multiple" disabled={!isFeatureAvailable("multiple")}>
                        Multiple User Discount Code {!isFeatureAvailable("multiple") && "(Tier 2+)"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {currentPlan === "free" && (
                    <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      <strong>NOTE:</strong> Multiple user codes, referral codes, and special promo codes are only
                      available to tier 2 customers
                    </p>
                  )}
                </div>

                {/* Discount Type Radio */}
                <div className="space-y-3">
                  <Label className="font-semibold">Choose your discount type</Label>
                  <RadioGroup value={discountType} onValueChange={(val: "percentage" | "fixed") => setDiscountType(val)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage" className="font-normal cursor-pointer">
                        Percentage off (%)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed" className="font-normal cursor-pointer">
                        Fixed Amount off (₦)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Discount Value */}
                <div className="space-y-2">
                  <Label htmlFor="discount-value" className="font-semibold">
                    Discount value
                  </Label>
                  <Input
                    id="discount-value"
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="10"
                    required
                  />
                </div>

                {/* How many codes */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="font-semibold">
                    How many codes do you want?
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
                    min="1"
                    placeholder="10"
                    required
                  />
                </div>

                {/* How many users (for multiple user codes) */}
                {codeType === "multiple" && (
                  <div className="space-y-2">
                    <Label htmlFor="users" className="font-semibold">
                      How many users
                    </Label>
                    <Input
                      id="users"
                      type="number"
                      value={users}
                      onChange={(e) => setUsers(e.target.value)}
                      min="1"
                      placeholder="1"
                      required
                    />
                  </div>
                )}

                {/* Expiry Date */}
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="font-semibold">
                    Code is valid till?
                  </Label>
                  <Input
                    id="expiry"
                    type="date"
                    value={expiryDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpiryDate(e.target.value)}
                    required
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-2">
                  <Label htmlFor="terms" className="font-semibold">
                    Code Terms & conditions (optional)
                  </Label>
                  <Input
                    id="terms"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    placeholder="Enter terms and conditions..."
                  />
                </div>

                <Button type="submit" className="w-full font-bold text-base" size="lg">
                  Generate Code
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Actions - Right Side */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">Discount QR Preview</CardTitle>
              {generated && <CardDescription>Here's how your discount code will look</CardDescription>}
            </CardHeader>
            <CardContent>
              {generated ? (
                <div className="space-y-4">
                  {/* QR Card Preview */}
                  <div
                    ref={cardRef}
                    className="bg-white rounded-2xl p-0 border-4 border-gray-300 shadow-2xl overflow-hidden"
                  >
                    <div className="grid grid-cols-[58%_42%]">
                      {/* Left Side - White Background */}
                      <div className="bg-white p-5 space-y-3">
                        <div className="space-y-1.5">
                          <p className="text-xs font-bold text-black uppercase tracking-wide">(Name of Business)</p>
                          <h2 className="text-lg font-black text-black leading-tight">Thank you for your patronage!</h2>
                          <p className="text-xs text-black/80 font-medium">
                            Here's a special Discount for your next visit
                          </p>
                          <p className="text-[10px] text-black/60 italic mt-1">
                            {terms || "(discount terms / conditions)"}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-black/20">
                          <p className="text-[10px] font-bold text-black uppercase tracking-wide">Business Phone: NO</p>
                        </div>
                      </div>

                      {/* Right Side - Colored Background */}
                      <div
                        className="p-3 flex flex-col items-center justify-between"
                        style={{ backgroundColor: cardColor }}
                      >
                        <div className="flex items-start justify-between w-full gap-1">
                          <Percent className="h-5 w-5 text-black" />
                          <Maximize2 className="h-5 w-5 text-black" />
                          <Clock className="h-5 w-5 text-black" />
                        </div>

                        <div className="text-center space-y-1.5">
                          <p className="text-xs font-bold text-black">
                            Get {discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off.
                          </p>
                          {/* QR Code */}
                          <div className="bg-white p-2.5 rounded-lg border-4 border-black">
                            <QRCode value={`https://buyagain.ng/redeem/ABCD-1234`} size={80} level="M" />
                          </div>
                          <p className="text-[10px] font-bold text-black">ABCD-1234</p>
                        </div>

                        <div className="space-y-0.5 w-full">
                          <p className="text-[10px] text-black/90 font-medium text-center">
                            Valid until {expiryDate ? new Date(expiryDate).toLocaleDateString() : "(Expiring date)"}
                          </p>
                          <div className="flex items-center justify-center">
                            <p className="text-[10px] font-bold text-black">© buyagain.ng</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Change Card Color */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 font-semibold bg-transparent"
                    onClick={() => {
                      const colors = ["#87CEEB", "#FFB6C1", "#98FB98", "#FFD700", "#DDA0DD"]
                      const currentIndex = colors.indexOf(cardColor)
                      const nextIndex = (currentIndex + 1) % colors.length
                      setCardColor(colors[nextIndex])
                    }}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Change card Colour
                  </Button>

                  {/* Code Info */}
                  <div className="text-sm font-medium text-foreground space-y-1 bg-muted/50 p-3 rounded-lg border">
                    <p>• {quantity} codes generated</p>
                    <p>
                      • {discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} discount
                    </p>
                    <p>
                      • Valid til:{" "}
                      {expiryDate
                        ? new Date(expiryDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Dec 31, 2025"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      className="w-full font-bold text-base bg-primary hover:bg-primary/90"
                      size="lg"
                      onClick={handlePrintNow}
                    >
                      <Printer className="h-5 w-5 mr-2" />
                      Print Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold text-base bg-transparent"
                      size="lg"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download PDF (A4)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold text-base bg-transparent"
                      size="lg"
                      onClick={handlePrintPOS}
                    >
                      <Printer className="h-5 w-5 mr-2" />
                      Print with POS machine
                    </Button>

                    {/* Share on Socials */}
                    <Button
                      className="w-full font-bold text-base bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                      onClick={handleShareOnSocial}
                    >
                      <Share2 className="h-5 w-5 mr-2" />
                      Share On Socials
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-muted/30 rounded-lg">
                    <QRCode value="https://buyagain.ng" size={64} level="L" fgColor="#999999" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Fill the form and click "Generate Code" to see preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Print Tips */}
          {generated && (
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-sm">Print Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs font-medium text-muted-foreground space-y-1">
                <p>• Use black & white printing to save ink</p>
                <p>• A4 paper fits 8 codes per sheet</p>
                <p>• POS format prints one code per receipt</p>
                <p>• Test scan before distributing</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Info Note */}
      {currentPlan === "free" && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm">
              <p className="font-bold text-blue-900">NOTE</p>
              <p className="text-blue-800">
                <strong>Multiple user codes</strong> are the big ones that can be place at checkout points or payment
                point in-store so customers can scan
              </p>
              <p className="text-blue-800 mt-3">
                <strong>All 3 options</strong> (Referral codes, Special Promo Codes, Multiple user Discount Code) are
                only available to tier 2 customers
              </p>
              <Button size="sm" className="mt-3">
                Upgrade to Growth Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
