"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, Printer, Percent, Clock, Maximize2, Share2, Palette, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePlan } from "@/lib/plan-context"
import QRCode from "react-qr-code"
import jsPDF from "jspdf"
import { couponsApi, authApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"


export default function GenerateCodesPage() {
  const router = useRouter()
  const { currentPlan, planLimits } = usePlan()
  const { toast } = useToast()
  const [codeType, setCodeType] = useState<"single" | "referral" | "promo" | "multiple">("single")
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [generated, setGenerated] = useState(false)
  const [generatedCoupons, setGeneratedCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [printingPOS, setPrintingPOS] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const [discountValue, setDiscountValue] = useState("100")
  const [quantity, setQuantity] = useState("10")
  const [users, setUsers] = useState("1")
  const [expiryDate, setExpiryDate] = useState("")
  const [terms, setTerms] = useState("")
  const [cardColor, setCardColor] = useState("#87CEEB")
  const [referrerName, setReferrerName] = useState("")
  const [referrerPhone, setReferrerPhone] = useState("")
  const [printMode, setPrintMode] = useState<"a4" | "pos">("a4")
  const [businessName, setBusinessName] = useState("(Name of Business)")
  const [businessPhone, setBusinessPhone] = useState("NO")
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMerchantProfile = async () => {
      try {
        const response = await authApi.getProfile()
        if (response.success && response.data) {
          const { merchant } = response.data
          setBusinessName(merchant.businessName || "(Name of Business)")
          setBusinessPhone(merchant.phone || "NO")
        }
      } catch (error) {
        console.error('Failed to fetch merchant profile:', error)
      }
    }

    fetchMerchantProfile()
  }, [])

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Map frontend values to backend API values
      const couponTypeMap = {
        single: "DISCOUNT",
        referral: "REFERRAL",
        promo: "DISCOUNT",
        multiple: "DISCOUNT"
      }

      const discountTypeMap = {
        percentage: "PERCENTAGE",
        fixed: "FIXED"
      }

      const payload = {
        type: couponTypeMap[codeType as keyof typeof couponTypeMap],
        value: parseInt(discountValue),
        valueType: discountTypeMap[discountType as keyof typeof discountTypeMap],
        quantity: parseInt(quantity),
        expiryDate: expiryDate || undefined,
        title: `${discountValue}${discountType === "percentage" ? "%" : "NGN"} off discount`,
        description: `Get ${discountValue}${discountType === "percentage" ? "%" : "NGN"} off your next purchase`,
        terms: terms || undefined,
        ...(codeType === "referral" && {
          referrerName: referrerName || undefined,
          referrerPhone: referrerPhone || undefined,
        }),
      }

      const response = await couponsApi.generate(payload)

      if (response.success) {
        setGeneratedCoupons((response.data as any).coupons || [response.data])
        setGenerated(true)
        toast({
          title: "Success",
          description: `Generated ${quantity} coupon(s) successfully!`,
        })
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to generate coupons",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error occurred while generating coupons",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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

  const generateCardHtml = async (coupon: any) => {
    const couponCode = coupon?.code || 'ABCD-1234'

    // Generate QR code client-side using react-qr-code
    const qrValue = `https://buyagain.ng/redeem/${couponCode}`

    // Create a temporary div to render the QR code
    const tempDiv = document.createElement('div')
    tempDiv.style.display = 'inline-block'
    tempDiv.style.width = '50px'
    tempDiv.style.height = '40px'

    // Use ReactDOM to render the QR code component
    const React = (await import('react')).default
    const ReactDOM = (await import('react-dom/client')).default
    const QRCode = (await import('react-qr-code')).default

    const root = ReactDOM.createRoot(tempDiv)
    root.render(React.createElement(QRCode, {
      value: qrValue,
      size: 48,
      level: 'M'
    }))

    // Wait for the QR code to render
    await new Promise(resolve => setTimeout(resolve, 100))

    // Get the SVG content
    const svgElement = tempDiv.querySelector('svg')
    const qrHtml = svgElement ? svgElement.outerHTML : `<svg width="60" height="60" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#ffffff" stroke="#000000" stroke-width="1"/><text x="10" y="12" font-size="8" fill="#000000" text-anchor="middle">QR</text><text x="10" y="18" font-size="6" fill="#000000" text-anchor="middle">FAIL</text></svg>`

    // Clean up
    root.unmount()

    return `
      <div class="print-card" style="
        background: white;
        border-radius: 16px;
        border: 4px solid #d1d5db;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        display: grid;
        grid-template-columns: 58% 42%;
        width: 100%;
        max-width: 100mm;
        height: 50mm;
        font-size: 8px;
      ">
        <div style="background: white; padding: 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <p style="font-weight: bold; color: black; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${businessName}</p>
            <h2 style="font-weight: 900; color: black; line-height: 1.1; margin-bottom: 2px;">Thank you for your patronage!</h2>
            <p style="color: rgba(0,0,0,0.8); font-weight: 500; margin-bottom: 2px;">Here's a special Discount for your next visit</p>
            <p style="color: rgba(0,0,0,0.6); font-style: italic; margin-bottom: 4px;">${terms || "(discount terms / conditions)"}</p>
          </div>
          <p style="font-weight: bold; color: black; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid rgba(0,0,0,0.2); padding-top: 2px;">Business Phone: ${businessPhone}</p>
        </div>
        <div style="padding: 3px; display: flex; flex-direction: column; justify-content: space-between; background-color: ${cardColor};">
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span style="font-size: 8px;">%</span>
            <span style="font-size: 8px;">🔍</span>
            <span style="font-size: 8px;">⏰</span>
          </div>
          <div style="text-align: center;">
            <p style="font-weight: bold; color: black; margin-bottom: 2px;">Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off.</p>
            <div style="background: white; padding: 2px 2px 2px 2px; border-radius: 4px; border: 2px solid black; display: inline-block; margin-bottom: 2px;">
              ${qrHtml}
            </div>
            <p style="font-weight: bold; color: black; margin-bottom: 2px;">${couponCode}</p>
          </div>
          <div>
            <p style="color: rgba(0,0,0,0.9); font-weight: 500; text-align: center; margin-bottom: 1px;">Valid until ${expiryDate ? new Date(expiryDate).toLocaleDateString() : "(Expiring date)"}</p>
            <p style="font-weight: bold; color: black; text-align: center;">© buyagain.ng</p>
          </div>
        </div>
      </div>
    `
  }

  const handlePrintNow = async () => {
    setPrintMode("a4")

    if (!generatedCoupons || generatedCoupons.length === 0) {
      alert('No coupons generated to print.')
      return
    }

    // Create a print-specific stylesheet
    const printStyle = document.createElement('style')
    printStyle.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        .print-cards, .print-cards * { visibility: visible; }
        .print-cards {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          max-width: 210mm;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5mm;
          padding: 5mm;
        }
      }
    `
    document.head.appendChild(printStyle)

    // Create print container
    const printContainer = document.createElement('div')
    printContainer.className = 'print-cards'

    // Add cards for each coupon
    for (const coupon of generatedCoupons) {
      try {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = await generateCardHtml(coupon)
        printContainer.appendChild(cardDiv.firstElementChild!)
      } catch (error) {
        console.error(`Failed to generate card for coupon ${coupon?.code}:`, error)
        // Create a fallback card with placeholder QR
        const fallbackCard = document.createElement('div')
        fallbackCard.innerHTML = `
          <div class="print-card" style="
            background: white;
            border-radius: 16px;
            border: 4px solid #d1d5db;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            display: grid;
            grid-template-columns: 58% 42%;
            width: 100%;
            max-width: 100mm;
            height: 50mm;
            font-size: 8px;
          ">
            <div style="background: white; padding: 4px; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <p style="font-weight: bold; color: black; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${businessName}</p>
                <h2 style="font-weight: 900; color: black; line-height: 1.1; margin-bottom: 2px;">Thank you for your patronage!</h2>
                <p style="color: rgba(0,0,0,0.8); font-weight: 500; margin-bottom: 2px;">Here's a special Discount for your next visit</p>
                <p style="color: rgba(0,0,0,0.6); font-style: italic; margin-bottom: 4px;">${terms || "(discount terms / conditions)"}</p>
              </div>
              <p style="font-weight: bold; color: black; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid rgba(0,0,0,0.2); padding-top: 2px;">Business Phone: ${businessPhone}</p>
            </div>
            <div style="padding: 3px; display: flex; flex-direction: column; justify-content: space-between; background-color: ${cardColor};">
              <div style="display: flex; justify-content: space-between; width: 100%;">
                <span style="font-size: 8px;">%</span>
                <span style="font-size: 8px;">🔍</span>
                <span style="font-size: 8px;">⏰</span>
              </div>
              <div style="text-align: center;">
                <p style="font-weight: bold; color: black; margin-bottom: 2px;">Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off.</p>
                <div style="background:white; padding: 2px 6px 2px 2px; border-radius: 4px; border: 6px solid black; display: inline-block; margin-bottom: 2px;">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPgo8dGV4dCB4PSIxMCIgeT0iMTIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UTwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjE4IiBmb250LXNpemU9IjYiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkM8L3RleHQ+Cjwvc3ZnPg==" alt="QR Code" style="width: 60px; height: 60px;" />
                </div>
                <p style="font-weight: bold; color: black; margin-bottom: 2px;">${coupon?.code || 'ERROR'}</p>
              </div>
              <div>
                <p style="color: rgba(0,0,0,0.9); font-weight: 500; text-align: center; margin-bottom: 1px;">Valid until ${expiryDate ? new Date(expiryDate).toLocaleDateString() : "(Expiring date)"}</p>
                <p style="font-weight: bold; color: black; text-align: center;">© buyagain.ng</p>
              </div>
            </div>
          </div>
        `
        printContainer.appendChild(fallbackCard.firstElementChild!)
      }
    }

    document.body.appendChild(printContainer)

    window.print()

    // Cleanup
    setTimeout(() => {
      document.head.removeChild(printStyle)
      document.body.removeChild(printContainer)
    }, 1000)
  }

  const handleDownloadPDF = async () => {
    console.log('handleDownloadPDF called')
    setDownloadingPDF(true)

    try {
      const couponCode = generatedCoupons[0]?.code || 'ABCD-1234'
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
      const businessNameWidth = pdf.getTextWidth(businessName.toUpperCase())
      pdf.text(businessName.toUpperCase(), leftX + (leftWidth - businessNameWidth) / 2, leftY)

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
      const phoneText = `Business Phone: ${businessPhone}`
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

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(`https://buyagain.ng/redeem/${couponCode}`)}`

      try {
        // Fetch QR code image and convert to base64
        const response = await fetch(qrUrl)
        const blob = await response.blob()
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result)
            } else {
              reject(new Error('Failed to read QR code as string'))
            }
          }
          reader.onerror = () => reject(new Error('FileReader error'))
          reader.readAsDataURL(blob)
        })

        // Add QR code image to PDF
        pdf.addImage(base64, 'PNG', qrX, qrY, qrSize, qrSize)
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
      pdf.text(couponCode, rightX + rightWidth/2 - 10, qrY + qrSize + 8)

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
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setDownloadingPDF(false)
    }
  }

  const handlePrintPOS = async () => {
    setPrintMode("pos")
    setPrintingPOS(true)

    try {
      const couponCode = generatedCoupons[0]?.code || 'ABCD-1234'

      // Fetch QR code and convert to base64
      let qrDataUrl = ''
      try {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://buyagain.ng/redeem/${couponCode}`)}`
        const response = await fetch(qrUrl)
        const blob = await response.blob()
        qrDataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
      } catch (error) {
        console.warn(`Could not generate QR code for POS print, using placeholder:`, error)
        qrDataUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPgo8dGV4dCB4PSIxMCIgeT0iMTIiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UTwvdGV4dD4KPHRleHQgeD0iMTAiIHk9IjE4IiBmb250LXNpemU9IjYiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkM8L3RleHQ+Cjwvc3ZnPg=='
      }

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
              <div class="center bold">${businessName}</div>
              <div class="center">Thank you for your patronage!</div>
              <div class="center">Here's a special Discount for your next visit</div>
              <div class="center">${terms || "(discount terms / conditions)"}</div>
              <div class="divider"></div>
              <div class="center bold">Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off.</div>
              <div class="qr-container">
                <img src="${qrDataUrl}" alt="QR Code" style="width: 100px; height: 100px;" />
              </div>
              <div class="center bold">${couponCode}</div>
              <div class="center">Valid until ${expiryDate ? new Date(expiryDate).toLocaleDateString() : "(Expiring date)"}</div>
              <div class="center bold">© buyagain.ng</div>
              <div class="center">Business Phone: ${businessPhone}</div>
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
    } catch (error) {
      console.error('Error generating POS receipt:', error)
      alert('Error generating POS receipt. Please try again.')
    } finally {
      setPrintingPOS(false)
    }
  }

  const handleShareOnSocial = async () => {
    setSharing(true)
    try {
      const couponCode = generatedCoupons[0]?.code || 'ABCD-1234'
      const shareData = {
        title: 'Discount Card',
        text: `Get ${discountType === "percentage" ? `${discountValue}%` : `₦${discountValue}`} off at (Name of Business)! Scan the QR code: https://buyagain.ng/redeem/${couponCode}`,
        url: `https://buyagain.ng/redeem/${couponCode}`
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
    } finally {
      setSharing(false)
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

                {/* Referrer Information (for referral codes) */}
                {codeType === "referral" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="referrer-name" className="font-semibold">
                        Referrer Name
                      </Label>
                      <Input
                        id="referrer-name"
                        value={referrerName}
                        onChange={(e) => setReferrerName(e.target.value)}
                        placeholder="Enter referrer's name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referrer-phone" className="font-semibold">
                        Referrer Phone
                      </Label>
                      <Input
                        id="referrer-phone"
                        value={referrerPhone}
                        onChange={(e) => setReferrerPhone(e.target.value)}
                        placeholder="Enter referrer's phone number"
                        required
                      />
                    </div>
                  </>
                )}

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

                <Button type="submit" className="w-full font-bold text-base" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Code'
                  )}
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
                          <p className="text-xs font-bold text-black uppercase tracking-wide">{businessName}</p>
                          <h2 className="text-lg font-black text-black leading-tight">Thank you for your patronage!</h2>
                          <p className="text-xs text-black/80 font-medium">
                            Here's a special Discount for your next visit
                          </p>
                          <p className="text-[10px] text-black/60 italic mt-1">
                            {terms || "(discount terms / conditions)"}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-black/20">
                          <p className="text-[10px] font-bold text-black uppercase tracking-wide">Business Phone: {businessPhone}</p>
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
                          <div className="bg-white p-0.5 rounded border border-black max-w-fit mx-auto">
                            <QRCode
                              value={`https://buyagain.ng/redeem/${generatedCoupons[0]?.code || 'ABCD-1234'}`}
                              size={30}
                              level="M"
                            />
                          </div>
                          <p className="text-[10px] font-bold text-black">
                            {generatedCoupons[0]?.code || 'ABCD-1234'}
                          </p>
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
                    <p>• {generatedCoupons.length} codes generated</p>
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
                    {generatedCoupons.length > 0 && (
                      <div className="mt-2">
                        <p className="font-semibold">Generated Codes:</p>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {generatedCoupons.map((coupon, index) => (
                            <p key={index} className="font-mono text-xs bg-white px-2 py-1 rounded">
                              {coupon.code}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
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
                      disabled={printingPOS}
                    >
                      {printingPOS ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Printing...
                        </>
                      ) : (
                        <>
                          <Printer className="h-5 w-5 mr-2" />
                          Print with POS machine
                        </>
                      )}
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
