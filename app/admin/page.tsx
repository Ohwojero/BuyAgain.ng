import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Store, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react"

export default function AdminOverviewPage() {
  // Mock data - would come from API
  const stats = {
    totalMerchants: 1247,
    merchantsChange: 12.5,
    activeMerchants: 892,
    activeChange: 8.3,
    totalRevenue: 5420000,
    revenueChange: 15.2,
    totalRedemptions: 45678,
    redemptionsChange: 22.1,
  }

  const recentMerchants = [
    { id: 1, name: "Beauty Salon Lagos", plan: "Growth", joined: "2025-01-20" },
    { id: 2, name: "Chicken Republic", plan: "Scale", joined: "2025-01-19" },
    { id: 3, name: "POS Agent Ikeja", plan: "Free", joined: "2025-01-19" },
    { id: 4, name: "Fashion Store", plan: "Growth", joined: "2025-01-18" },
  ]

  const planDistribution = [
    { plan: "Free", count: 625, percentage: 50 },
    { plan: "Growth", count: 497, percentage: 40 },
    { plan: "Scale", count: 125, percentage: 10 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor platform health and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Merchants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.totalMerchants.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-primary" />
              <span className="text-xs text-primary font-medium">+{stats.merchantsChange}%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Merchants</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.activeMerchants.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-primary" />
              <span className="text-xs text-primary font-medium">+{stats.activeChange}%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-primary" />
              <span className="text-xs text-primary font-medium">+{stats.revenueChange}%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Redemptions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.totalRedemptions.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-4 w-4 text-primary" />
              <span className="text-xs text-primary font-medium">+{stats.redemptionsChange}%</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Merchants */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>Latest merchants to join the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMerchants.map((merchant) => (
                <div key={merchant.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{merchant.name}</p>
                    <p className="text-sm text-muted-foreground">{new Date(merchant.joined).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-primary">{merchant.plan}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Merchants by subscription tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {planDistribution.map((item) => (
                <div key={item.plan} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{item.plan} Plan</span>
                    <span className="text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
