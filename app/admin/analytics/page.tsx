import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Users, QrCode, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { adminApi } from "@/lib/api"

interface AdminOverviewData {
  totalMerchants: number
  activeMerchants: number
  totalRevenue: number
  totalRedemptions: number
  totalCodesGenerated: number
  recentMerchants: Array<{
    id: string
    name: string
    plan: string
    joined: string
  }>
  planDistribution: Array<{
    plan: string
    count: number
    percentage: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AdminOverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await adminApi.getOverview()
        if (response.success) {
          setAnalytics(response.data as AdminOverviewData)
        } else {
          setError(response.error || 'Failed to fetch analytics')
        }
      } catch (err) {
        setError('Network error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
          <p className="text-muted-foreground mt-1">System-wide metrics and insights</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading analytics...</div>
        </div>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
          <p className="text-muted-foreground mt-1">System-wide metrics and insights</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error || 'Failed to load analytics'}</div>
        </div>
      </div>
    )
  }

  // Calculate derived metrics
  const redemptionRate = analytics.totalMerchants > 0
    ? Math.round((analytics.totalRedemptions / analytics.totalMerchants) * 100)
    : 0

  // Mock revenue data (can be enhanced with real subscription data later)
  const revenue = {
    free: 0,
    growth: 2485000,
    scale: 1875000,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Analytics</h1>
        <p className="text-muted-foreground mt-1">System-wide metrics and insights</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Merchants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{analytics.totalMerchants.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">{analytics.activeMerchants} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Codes Generated</CardTitle>
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{analytics.totalCodesGenerated.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Redemption Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{redemptionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Platform average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  ₦{(analytics.totalRevenue / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Platform growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Chart visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue by plan tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Growth Plan</span>
                    <span className="text-muted-foreground">₦{(revenue.growth / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${analytics.planDistribution.find(p => p.plan === 'growth')?.percentage || 0}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">Scale Plan</span>
                    <span className="text-muted-foreground">₦{(revenue.scale / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "43%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
              <CardDescription>Code generation and redemption statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Redemptions</span>
                  <span className="font-medium text-foreground">{analytics.totalRedemptions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Redemption Rate</span>
                  <span className="font-medium text-foreground">{redemptionRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Merchants</span>
                  <span className="font-medium text-foreground">{analytics.activeMerchants}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
