"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Store, Tag, CheckCircle2, Share2, Users, Gift, Loader2 } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useParams } from "next/navigation"
import { referralsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

function LoadingFallback() {
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

export default function ReferralDashboardPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReferralDashboardContent />
    </Suspense>
  )
}

function ReferralDashboardContent() {
  const { toast } = useToast()
  const params = useParams()
  const code = params.code as string

  const [isRedeeming, setIsRedeeming] = useState(false)
  const [referral, setReferral] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")

  useEffect(() => {
    const fetchReferral = async () => {
      if (!code) {
        setError("No referral code provided")
        setLoading(false)
        return
      }

      try {
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

  const handleRedeemReferral = async () => {
    if (!code || !userName || !userPhone) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and phone number to redeem the referral",
        variant: "destructive",
      })
      return
    }

    setIsRedeeming(true)
    try {
      const response = await referralsApi.redeem(code, {
        referredName: userName,
        referredPhone: userPhone
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

  const handleShareReferral = () => {
    const referralLink = window.location.href
    const message = `🎉 Check out this referral offer! ${referralLink}`

    if (navigator.share) {
      navigator.share({
        title: 'Referral Offer',
        text: message,
        url: referralLink
      })
    } else {
      navigator.clipboard.writeText(message)
      toast({
        title: "Link Copied!",
        description: "Referral link has been copied to your clipboard",
      })
    }
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

  const isCompleted = referral.isCompleted
  const isExpired = false // Add expiry logic if needed

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {isCompleted ? <CheckCircle2 className="h-8 w-8 text-primary" /> : <Users className="h-8 w-8 text-primary" />}
          </div>
          <CardTitle className="text-2xl">
            {isCompleted ? "Referral Completed!" : isExpired ? "Referral Expired" : "Referral Dashboard"}
          </CardTitle>
          <CardDescription>
            {isCompleted ? "This referral has been successfully completed" : isExpired ? "This referral offer has expired" : "Welcome! Complete this referral to earn rewards"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isCompleted && !isExpired && (
            <div className="text-center py-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-lg">
              <Gift className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2 drop-shadow-sm">
                ₦{referral.rewardAmount}
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
                <p className="font-medium text-foreground">{referral.businessName || "Business Name"}</p>
                <p className="text-muted-foreground">Business</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{referral.referrerName}</p>
                <p className="text-muted-foreground">Referred by</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{new Date(referral.createdAt).toLocaleDateString()}</p>
                <p className="text-muted-foreground">Created on</p>
              </div>
            </div>

            {referral.referredName && (
              <div className="flex items-center gap-3 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{referral.referredName}</p>
                  <p className="text-muted-foreground">Redeemed by</p>
                </div>
              </div>
            )}
          </div>

          {!isCompleted && !isExpired && (
            <>
              <div className="pt-4 border-t border-border">
                <h3 className="font-bold text-foreground mb-3 text-base">Complete Your Referral</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Your Name</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Your Phone Number</label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                <ol className="text-sm font-medium text-muted-foreground space-y-2 mt-4">
                  <li>Enter your details to redeem this referral</li>
                  <li>Both you and the referrer will receive ₦{referral.rewardAmount} reward</li>
                  <li>Rewards will be credited to your accounts</li>
                </ol>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full font-bold text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                  size="lg"
                  onClick={handleRedeemReferral}
                  disabled={isRedeeming || !userName || !userPhone}
                >
                  {isRedeeming ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Redeeming...
                    </>
                  ) : (
                    "Redeem Referral"
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-bold text-base"
                  size="lg"
                  onClick={handleShareReferral}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share This Offer
                </Button>
              </div>
            </>
          )}

          {isCompleted && (
            <div className="text-center py-4">
              <Badge variant="default" className="text-sm">
                Completed on {new Date(referral.completedAt || referral.createdAt).toLocaleDateString()}
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
