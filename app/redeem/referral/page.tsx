"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Store, Tag, CheckCircle2, Share2, Users, Gift } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { referralsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function RedeemReferralPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isSaving, setIsSaving] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [referral, setReferral] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const code = searchParams.get('code')

  useEffect(() => {
    const fetchReferral = async () => {
      if (!code) {
        setError("No referral code provided")
        setLoading(false)
        return
      }

      try {
        // For now, we'll simulate fetching referral data
        // In a real implementation, you'd have an API endpoint to validate the referral code
        const response = await referralsApi.getByCode(code)
        if (response.success && response.data) {
          setReferral(response.data)
        } else {
          setError(response.error || "Invalid referral code")
        }
      } catch (err) {
        setError("Failed to load referral")
      } finally {
        setLoading(false)
      }
    }

    fetchReferral()
  }, [code])

  // Mock data for demonstration - replace with actual API call
  const mockReferral = {
    id: "ref-123",
    referrerName: "John Doe",
    referrerPhone: "+1234567890",
    referredName: null,
    referredPhone: null,
    rewardAmount: 500,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    businessName: "My Business",
  }

  const displayReferral = referral || mockReferral

  const isCompleted = displayReferral.isCompleted
  const isExpired = false // Add expiry logic if needed

  const handleRedeemReferral = async () => {
    if (!code) return

    setIsRedeeming(true)
    try {
      const response = await referralsApi.redeem(code, {
        referredName: "Customer Name", // This would come from a form
        referredPhone: "+1234567890" // This would come from a form
      })

      if (response.success) {
        toast({
          title: "Success!",
          description: "Referral redeemed successfully. Both you and the referrer will receive rewards!",
        })
        // Refresh the page or update state
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to redeem referral",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error while redeeming referral",
        variant: "destructive",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  const handleSaveToWhatsApp = () => {
    setIsSaving(true)

    const message =
      `🎉 *Referral Reward*\n\n` +
      `Bring a friend and both get ₦${displayReferral.rewardAmount} reward!\n` +
      `Business: ${displayReferral.businessName}\n` +
      `Referral Code: ${code}\n\n` +
      `Share this code with friends to earn rewards together!\n\n` +
      `View: ${window.location.href}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    setTimeout(() => setIsSaving(false), 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading referral...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Tag className="h-8 w-8 text-red-600" />
            </div>
          <CardTitle className="text-2xl text-red-600">Invalid Referral Code</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {isCompleted ? <CheckCircle2 className="h-8 w-8 text-primary" /> : <Users className="h-8 w-8 text-primary" />}
          </div>
          <CardTitle className="text-2xl">
            {isCompleted ? "Referral Completed!" : isExpired ? "Referral Expired" : "Referral Reward"}
          </CardTitle>
          <CardDescription>
            {isCompleted ? "This referral has been successfully completed" : isExpired ? "This referral offer has expired" : "Bring a friend and both earn rewards!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isCompleted && !isExpired && (
            <div className="text-center py-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-lg">
              <Gift className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2 drop-shadow-sm">
                ₦{displayReferral.rewardAmount}
              </div>
              <p className="text-base font-bold text-foreground">Reward for you and your friend!</p>
              <p className="text-sm text-muted-foreground mt-1">Complete this referral to earn</p>
            </div>
          )}

          {isCompleted && (
            <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
              <CheckCircle2 className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-2">
                Referral Complete!
              </div>
              <p className="text-sm text-muted-foreground">Rewards have been credited to both accounts</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Store className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{displayReferral.businessName}</p>
                <p className="text-muted-foreground">Business name</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{displayReferral.referrerName}</p>
                <p className="text-muted-foreground">Referred by</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{new Date(displayReferral.createdAt).toLocaleDateString()}</p>
                <p className="text-muted-foreground">Created on</p>
              </div>
            </div>

            {displayReferral.referredName && (
              <div className="flex items-center gap-3 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{displayReferral.referredName}</p>
                  <p className="text-muted-foreground">Redeemed by</p>
                </div>
              </div>
            )}
          </div>

          {!isCompleted && !isExpired && (
            <>
              <div className="pt-4 border-t border-border">
                <h3 className="font-bold text-foreground mb-3 text-base">How it works:</h3>
                <ol className="text-sm font-medium text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Enter your details to redeem this referral</li>
                  <li>Both you and the referrer will receive ₦{displayReferral.rewardAmount} reward</li>
                  <li>Rewards will be credited to your accounts</li>
                </ol>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  size="lg"
                  onClick={handleRedeemReferral}
                  disabled={isRedeeming}
                >
                  {isRedeeming ? "Redeeming..." : "Redeem Referral"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-bold text-base"
                  size="lg"
                  onClick={handleSaveToWhatsApp}
                  disabled={isSaving}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  {isSaving ? "Saving..." : "Share Referral"}
                </Button>
              </div>
            </>
          )}

          {isCompleted && (
            <div className="text-center py-4">
              <Badge variant="default" className="text-sm">
                Completed on {new Date(displayReferral.completedAt || displayReferral.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          )}

          {isExpired && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Contact the business for a new referral code</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
