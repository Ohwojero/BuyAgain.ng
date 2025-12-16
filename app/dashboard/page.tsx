import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { QrCode, Users, TrendingUp, ArrowUpRight, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

export default function DashboardOverviewPage() {
  // Mock data - will be replaced with real data from API
  const stats = {
    codesGenerated: 12,
    codesLimit: 30,
    codesRedeemed: 8,
    returningCustomers: 5,
    referrals: 0,
    tier: "Free",
  }

  const usagePercentage = (stats.codesGenerated / stats.codesLimit) * 100

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your loyalty program performance</p>
      </div>

      {usagePercentage >= 80 && (
        <Card className="border-accent bg-accent/5 animate-in slide-in-from-top-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-accent animate-pulse" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">You're running low on codes</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You've used {stats.codesGenerated} of {stats.codesLimit} codes this month. Consider upgrading to
                  generate more.
                </p>
                <Button size="sm" asChild>
                  <Link href="/pricing">Upgrade Plan</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Codes Generated</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {stats.codesGenerated}/{stats.codesLimit}
            </div>
            <Progress value={usagePercentage} className="mt-3" />
            <p className="text-xs text-muted-foreground mt-2">{Math.round(usagePercentage)}% of monthly limit</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Codes Redeemed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.codesRedeemed}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {stats.codesGenerated > 0
                ? `${Math.round((stats.codesRedeemed / stats.codesGenerated) * 100)}% redemption rate`
                : "No codes generated yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Returning Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.returningCustomers}</div>
            <p className="text-xs text-muted-foreground mt-2">Customers who came back</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/generate">
                <QrCode className="h-4 w-4 mr-2" />
                Generate Discount Codes
              </Link>
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
              <Link href="/dashboard/generate?type=referral">
                <Users className="h-4 w-4 mr-2" />
                Generate Referral Codes
              </Link>
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
              <Link href="/dashboard/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest redemptions and referrals</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.codesRedeemed === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No activity yet</p>
                <p className="text-xs text-muted-foreground mt-1">Generate and distribute codes to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-foreground">10% discount redeemed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="secondary">
                    <ArrowUpRight className="h-3 w-3" />
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-foreground">15% discount redeemed</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                  <Badge variant="secondary">
                    <ArrowUpRight className="h-3 w-3" />
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-foreground">20% discount redeemed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Badge variant="secondary">
                    <ArrowUpRight className="h-3 w-3" />
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {stats.tier === "Free" && (
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-primary">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="text-xl font-bold">Unlock More Features</h3>
                </div>
                <p className="text-primary-foreground/90">
                  Upgrade to Growth plan for referral tracking, WhatsApp integration, and 400 codes/month
                </p>
              </div>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
