import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Award, ArrowRight, Gift } from "lucide-react"

export default function ReferralsPage() {
  // Mock data - would come from API based on user's plan
  const userPlan = "growth" // or "free" or "scale"
  const hasReferralAccess = userPlan === "growth" || userPlan === "scale"

  const referralStats = {
    totalReferrals: 24,
    successfulConversions: 18,
    pendingRewards: 6,
    totalRewardsPaid: 12,
  }

  const referralList = [
    {
      id: 1,
      referrerCode: "REF001",
      referredCustomer: "Customer #045",
      status: "converted",
      referrerReward: 10,
      dateReferred: "2025-01-10",
      dateConverted: "2025-01-12",
    },
    {
      id: 2,
      referrerCode: "REF002",
      referredCustomer: "Customer #046",
      status: "pending",
      referrerReward: 10,
      dateReferred: "2025-01-15",
      dateConverted: null,
    },
    {
      id: 3,
      referrerCode: "REF001",
      referredCustomer: "Customer #047",
      status: "converted",
      referrerReward: 10,
      dateReferred: "2025-01-18",
      dateConverted: "2025-01-20",
    },
  ]

  const topReferrers = [
    { customerId: "Customer #001", referrals: 8, rewards: 80 },
    { customerId: "Customer #012", referrals: 5, rewards: 50 },
    { customerId: "Customer #023", referrals: 3, rewards: 30 },
  ]

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
              {Math.round((referralStats.successfulConversions / referralStats.totalReferrals) * 100)}% conversion rate
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
              <CardTitle>Referral Activity</CardTitle>
              <CardDescription>Track all customer referrals and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralList.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between border-b border-border pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{referral.referredCustomer}</p>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">via {referral.referrerCode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Referred: {new Date(referral.dateReferred).toLocaleDateString()}</span>
                        {referral.dateConverted && (
                          <>
                            <span>•</span>
                            <span>Converted: {new Date(referral.dateConverted).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {referral.status === "converted" ? (
                        <Badge className="bg-primary text-primary-foreground">Reward: {referral.referrerReward}%</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
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
                      <p className="text-lg font-bold text-foreground">{referrer.rewards}%</p>
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
