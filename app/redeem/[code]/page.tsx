"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Store, Tag, CheckCircle2, Share2 } from "lucide-react"
import { useState } from "react"

// This would normally fetch data based on the code param
export default function RedeemPage({ params }: { params: { code: string } }) {
  const [isSaving, setIsSaving] = useState(false)

  // Mock data - will be replaced with API call
  const coupon = {
    code: params.code,
    type: "discount",
    value: 10,
    discountType: "percentage",
    businessName: "My Business",
    expiryDate: "2025-12-31",
    status: "active",
    description: "Welcome back discount",
  }

  const isExpired = new Date(coupon.expiryDate) < new Date()
  const isRedeemed = coupon.status === "redeemed"

  const handleSaveToWhatsApp = () => {
    setIsSaving(true)

    const message =
      `🎉 *Discount Code*\n\n` +
      `${coupon.discountType === "percentage" ? `${coupon.value}%` : `₦${coupon.value}`} OFF\n` +
      `Business: ${coupon.businessName}\n` +
      `Code: ${coupon.code}\n` +
      `Valid until: ${new Date(coupon.expiryDate).toLocaleDateString()}\n\n` +
      `View: ${window.location.href}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {isRedeemed ? <CheckCircle2 className="h-8 w-8 text-primary" /> : <Tag className="h-8 w-8 text-primary" />}
          </div>
          <CardTitle className="text-2xl">
            {isRedeemed ? "Already Redeemed" : isExpired ? "Expired Discount" : "Your Discount"}
          </CardTitle>
          <CardDescription>
            {isRedeemed ? "This discount has already been used" : isExpired ? "This offer has expired" : "Ready to use"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isRedeemed && !isExpired && (
            <div className="text-center py-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/30 shadow-lg">
              <div className="text-6xl font-black text-primary mb-3 drop-shadow-sm">
                {coupon.discountType === "percentage" ? `${coupon.value}%` : `₦${coupon.value}`}
              </div>
              <p className="text-base font-bold text-foreground">OFF your purchase</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Store className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{coupon.businessName}</p>
                <p className="text-muted-foreground">Business name</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{new Date(coupon.expiryDate).toLocaleDateString()}</p>
                <p className="text-muted-foreground">Expires on</p>
              </div>
            </div>

            {coupon.description && (
              <div className="flex items-center gap-3 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{coupon.description}</p>
                  <p className="text-muted-foreground">Offer details</p>
                </div>
              </div>
            )}
          </div>

          {!isRedeemed && !isExpired && (
            <>
              <div className="pt-4 border-t border-border">
                <h3 className="font-bold text-foreground mb-3 text-base">How to use:</h3>
                <ol className="text-sm font-medium text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Show this screen to the merchant</li>
                  <li>Merchant will scan to verify and apply discount</li>
                  <li>Enjoy your savings!</li>
                </ol>
              </div>

              <Button
                className="w-full font-bold text-base bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg"
                size="lg"
                onClick={handleSaveToWhatsApp}
                disabled={isSaving}
              >
                <Share2 className="h-5 w-5 mr-2" />
                {isSaving ? "Saving..." : "Save to WhatsApp"}
              </Button>
            </>
          )}

          {isRedeemed && (
            <div className="text-center py-4">
              <Badge variant="secondary" className="text-sm">
                Used on Dec 15, 2025
              </Badge>
            </div>
          )}

          {isExpired && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Contact the business for a new discount code</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
