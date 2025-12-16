"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Tag, Store, Calendar, Share2 } from "lucide-react"
import { useState } from "react"

export default function ReferralRedeemPage({ params }: { params: { code: string } }) {
  const [isSaving, setIsSaving] = useState(false)

  // Mock data
  const referral = {
    code: params.code,
    businessName: "My Business",
    referrerReward: 10,
    newCustomerDiscount: 15,
    expiryDate: "2025-12-31",
  }

  const handleSaveToWhatsApp = () => {
    setIsSaving(true)

    const message =
      `🎁 *Referral Discount*\n\n` +
      `${referral.newCustomerDiscount}% OFF your first purchase\n` +
      `Business: ${referral.businessName}\n` +
      `Code: ${referral.code}\n` +
      `Valid until: ${new Date(referral.expiryDate).toLocaleDateString()}\n\n` +
      `Your friend gets ${referral.referrerReward}% reward when you use this!\n\n` +
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
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 shadow-lg">
            <Users className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">You've Been Referred!</CardTitle>
          <CardDescription className="font-medium">Your friend shared a special discount with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/30 shadow-lg">
            <div className="text-6xl font-black text-primary mb-3 drop-shadow-sm">{referral.newCustomerDiscount}%</div>
            <p className="text-base font-bold text-foreground">OFF your first purchase</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Store className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{referral.businessName}</p>
                <p className="text-muted-foreground">Business name</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{new Date(referral.expiryDate).toLocaleDateString()}</p>
                <p className="text-muted-foreground">Valid until</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Your friend gets {referral.referrerReward}% reward</p>
                <p className="text-muted-foreground">When you use this discount</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="font-bold text-foreground mb-3 text-base">How it works:</h3>
            <ol className="text-sm font-medium text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Visit {referral.businessName}</li>
              <li>Show this screen at checkout</li>
              <li>Get {referral.newCustomerDiscount}% off your purchase</li>
              <li>Your friend gets rewarded too!</li>
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
        </CardContent>
      </Card>
    </div>
  )
}
