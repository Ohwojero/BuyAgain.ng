import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, TrendingUp } from "lucide-react"

export default function SubscriptionsPage() {
  const subscriptions = [
    {
      id: 1,
      merchant: "Beauty Salon Lagos",
      plan: "Growth",
      amount: 5000,
      status: "active",
      nextBilling: "2025-02-20",
      method: "Card",
    },
    {
      id: 2,
      merchant: "Chicken Republic",
      plan: "Scale",
      amount: 15000,
      status: "active",
      nextBilling: "2025-02-15",
      method: "Card",
    },
    {
      id: 3,
      merchant: "Fashion Store",
      plan: "Growth",
      amount: 5000,
      status: "cancelled",
      nextBilling: null,
      method: "Card",
    },
  ]

  const revenue = {
    mrr: 4360000,
    growth: 15.2,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground mt-1">Monitor subscription and billing</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">₦{(revenue.mrr / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MRR Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">+{revenue.growth}%</div>
            <p className="text-xs text-muted-foreground mt-1">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>All merchant subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{sub.merchant}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{sub.plan} Plan</span>
                    <span>•</span>
                    <span>₦{sub.amount.toLocaleString()}/month</span>
                    {sub.nextBilling && (
                      <>
                        <span>•</span>
                        <span>Next: {new Date(sub.nextBilling).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant={sub.status === "active" ? "default" : "secondary"}>{sub.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
