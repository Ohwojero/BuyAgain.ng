"use client"

import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { usePlan } from "@/lib/plan-context"
import { Check } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    id: "free" as const,
    name: "Free Plan",
    price: "₦0",
    color: "bg-gray-500",
    features: ["30 discount codes per month", "Basic analytics", "Single user", "QR code generation"],
  },
  {
    id: "growth" as const,
    name: "Growth Plan",
    price: "₦5,000/month",
    color: "bg-green-600",
    features: [
      "400 discount codes per month",
      "400 referral codes per month",
      "WhatsApp integration",
      "2 team members",
      "Priority support",
    ],
  },
  {
    id: "scale" as const,
    name: "Scale Plan",
    price: "₦15,000/month",
    color: "bg-purple-600",
    features: [
      "2,000 discount codes per month",
      "2,000 referral codes per month",
      "Multi-branch support",
      "6 team members",
      "Advanced analytics",
      "Dedicated support",
    ],
  },
]

export default function SettingsPage() {
  const { currentPlan, planName, updatePlan, planLimits } = usePlan()
  const [isChangingPlan, setIsChangingPlan] = useState(false)

  const handlePlanChange = (planId: "free" | "growth" | "scale") => {
    console.log("[v0] Plan change clicked:", planId)
    console.log("[v0] Current plan before change:", currentPlan)
    setIsChangingPlan(true)

    updatePlan(planId)
    console.log("[v0] UpdatePlan called with:", planId)

    setTimeout(() => {
      setIsChangingPlan(false)
      console.log("[v0] Plan change complete")
    }, 500)
  }

  console.log("[v0] Settings page - Current plan:", currentPlan, planName)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList>
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="My Business" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="business@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="080 XXX XXX XX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" placeholder="Enter your business address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Business Category</Label>
                  <Input id="category" placeholder="e.g., Salon, Restaurant, Retail" />
                </div>
                <Button>Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-foreground">{planName}</p>
                  <p className="text-sm text-muted-foreground">
                    {planLimits.discountCodes} discount codes per month
                    {planLimits.hasReferrals && ` + ${planLimits.referralCodes} referral codes`}
                  </p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Team Members</span>
                  <span className="font-medium">1 / {planLimits.teamMembers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Referrals</span>
                  <span className="font-medium">{planLimits.hasReferrals ? "Enabled" : "Not Available"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">WhatsApp Integration</span>
                  <span className="font-medium">{planLimits.hasWhatsApp ? "Enabled" : "Not Available"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Plan</CardTitle>
              <CardDescription>Upgrade or downgrade your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`relative transition-all cursor-pointer hover:shadow-lg ${
                      currentPlan === plan.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
                    }`}
                  >
                    {currentPlan === plan.id && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-primary">Current</Badge>
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <Badge className={`${plan.color} text-white border-0 w-fit`}>{plan.name}</Badge>
                      <CardTitle className="text-2xl mt-2">{plan.price}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full mt-4"
                        variant={currentPlan === plan.id ? "secondary" : "default"}
                        disabled={currentPlan === plan.id || isChangingPlan}
                        onClick={() => handlePlanChange(plan.id)}
                      >
                        {currentPlan === plan.id ? "Active Plan" : isChangingPlan ? "Updating..." : "Select Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount Codes</span>
                  <span className="font-medium text-foreground">12 / {planLimits.discountCodes}</span>
                </div>
                {planLimits.hasReferrals && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Referral Codes</span>
                    <span className="font-medium text-foreground">5 / {planLimits.referralCodes}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Redemptions</span>
                  <span className="font-medium text-foreground">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Control who has access to your BuyAgain.ng account and what they can do.
                </p>
                <Button asChild>
                  <Link href="/dashboard/team">Manage Team Members</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="redemption-alerts">Redemption Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when codes are redeemed</p>
                </div>
                <Switch id="redemption-alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="usage-warnings">Usage Warnings</Label>
                  <p className="text-sm text-muted-foreground">Alert when approaching usage limits</p>
                </div>
                <Switch id="usage-warnings" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="whatsapp-notifications">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via WhatsApp (Growth+ only)</p>
                </div>
                <Switch id="whatsapp-notifications" disabled />
              </div>

              <div className="pt-4 border-t border-border">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
