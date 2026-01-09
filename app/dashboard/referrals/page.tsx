"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Award, Gift, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { referralsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Referral } from "@/lib/types"

interface ReferralStats {
  totalReferrals: number
  successfulConversions: number
  pendingRewards: number
  totalRewardsPaid: number
}

interface TopReferrer {
  customerId: string
  referrals: number
  rewards: number
}

export default function ReferralsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    successfulConversions: 0,
    pendingRewards: 0,
    totalRewardsPaid: 0,
  })
  const [referralList, setReferralList] = useState<Referral[]>([])
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([])

  // Mock user plan - in real app, get from context or API
  const userPlan = "growth" // or "free" or "scale"
  const hasReferralAccess = userPlan === "growth" || userPlan === "scale"

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true)
        const response = await referralsApi.getAll()
        if (response.success && response.data && Array.isArray(response.data)) {
          const referrals = response.data
          setReferralList(referrals)

          // Calculate stats from referral data
          const totalReferrals = referrals.length
          const successfulConversions = referrals.filter(r => r.isCompleted).length
          const pendingRewards = totalReferrals - successfulConversions
          const totalRewardsPaid = referrals
            .filter(r => r.isCompleted)
            .reduce((sum, r) => sum + r.rewardAmount, 0)

          setReferralStats({
            totalReferrals,
            successfulConversions,
            pendingRewards,
            totalRewardsPaid,
          })

          // Calculate top referrers from referral data
          const referrerMap = new Map<string, { referrals: number; rewards: number }>()
          referrals.forEach((referral: Referral) => {
            const key = referral.referrerName
            const existing = referrerMap.get(key) || { referrals: 0, rewards: 0 }
            referrerMap.set(key, {
              referrals: existing.referrals + 1,
              rewards: existing.rewards + (referral.isCompleted ? referral.rewardAmount : 0),
            })
          })
          const topReferrersData = Array.from(referrerMap.entries())
            .map(([customerId, data]) => ({ customerId, ...data }))
            .sort((a, b) => b.referrals - a.referrals)
            .slice(0, 3)
          setTopReferrers(topReferrersData)
        } else {
          setError(response.error || "Failed to fetch referrals")
          toast({
            title: "Error",
            description: response.error || "Failed to fetch referrals",
            variant: "destructive",
          })
        }
      } catch (err) {
        setError("Network error")
        toast({
          title: "Error",
          description: "Network error while fetching referrals",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (hasReferralAccess) {
      fetchReferrals()
    } else {
      setLoading(false)
    }
  }, [hasReferralAccess, toast])

  if (!hasReferralAccess) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Referrals</h1>
          <p className="text-muted-foreground mt-1">Track customer referrals and rewards</p>
        </div>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-900">
          <CardHeader>
            <CardTitle>Referral System</CardTitle>
            <CardDescription>Grow your business through customer referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
              <Users className="h-12 w-12 mx-auto text-accent mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Upgrade to Access Referrals</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Referral tracking is available on Growth and Scale plans. Track who brought new customers and reward
                them automatically.
              </p>
              <Button asChild>
                <a href="/pricing">View Plans</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Referral System</h1>
          <p className="text-muted-foreground mt-1">Track and reward customers who bring in new business</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading referral codes...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Referral System</h1>
          <p className="text-muted-foreground mt-1">Track and reward customers who bring in new business</p>
        </div>
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">Error loading referrals: {error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Referral System</h1>
        <p className="text-muted-foreground mt-1">Track and reward customers who bring in new business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{referralStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Successful Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{referralStats.successfulConversions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {referralStats.totalReferrals > 0 ? Math.round((referralStats.successfulConversions / referralStats.totalReferrals) * 100) : 0}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Rewards</CardTitle>
            <Gift className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{referralStats.pendingRewards}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting conversion</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rewards Paid</CardTitle>
            <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{referralStats.totalRewardsPaid}</div>
            <p className="text-xs text-muted-foreground mt-1">Total rewards given</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Referrals</TabsTrigger>
          <TabsTrigger value="top">Top Referrers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border-sky-200 dark:border-sky-900">
            <CardHeader>
              <CardTitle>All Referrals</CardTitle>
              <CardDescription>Track all referral activities and conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralList.map((referral: Referral) => (
                  <div key={referral.id} className="flex items-center justify-between border-b border-border pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{referral.referrerName}</p>
                        <Badge variant={referral.isCompleted ? "default" : "secondary"} className="text-xs">
                          {referral.isCompleted ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Referred: {referral.referredName || 'Not specified'}</span>
                        {referral.referredPhone && (
                          <>
                            <span>•</span>
                            <span>{referral.referredPhone}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Created: {new Date(referral.createdAt).toLocaleDateString()}</span>
                        {referral.isCompleted && referral.completedAt && (
                          <>
                            <span>•</span>
                            <span>Completed: {new Date(referral.completedAt).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₦{referral.rewardAmount}</p>
                      <p className="text-xs text-muted-foreground">Reward</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top" className="space-y-6">
          <Card className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/20 dark:to-pink-950/20 border-fuchsia-200 dark:border-fuchsia-900">
            <CardHeader>
              <CardTitle>Top Referrers</CardTitle>
              <CardDescription>Customers who bring in the most business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topReferrers.map((referrer, index) => (
                  <div key={referrer.customerId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{referrer.customerId}</p>
                        <p className="text-sm text-muted-foreground">{referrer.referrals} successful referrals</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">₦{referrer.rewards}</p>
                      <p className="text-xs text-muted-foreground">Total rewards</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* How it Works */}
      <Card className="bg-gradient-to-br from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20 border-lime-200 dark:border-lime-900">
        <CardHeader>
          <CardTitle>How Referral Tracking Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Generate referral QR codes from the Generate Codes page</li>
            <li>Give referral cards to your best customers</li>
            <li>When their friend scans and uses the code, both get rewards</li>
            <li>Track all referrals and conversions in this dashboard</li>
            <li>Reward your top referrers with special offers</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
