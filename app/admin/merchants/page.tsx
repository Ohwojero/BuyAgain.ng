"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Ban, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function MerchantsPage() {
  const merchants = [
    {
      id: 1,
      name: "Beauty Salon Lagos",
      email: "contact@beautysalon.com",
      plan: "Growth",
      status: "active",
      codesGenerated: 245,
      redemptions: 189,
      joined: "2024-12-01",
    },
    {
      id: 2,
      name: "Chicken Republic",
      email: "admin@chickenrepublic.com",
      plan: "Scale",
      status: "active",
      codesGenerated: 1567,
      redemptions: 1234,
      joined: "2024-11-15",
    },
    {
      id: 3,
      name: "POS Agent Ikeja",
      email: "ikeja@pos.com",
      plan: "Free",
      status: "active",
      codesGenerated: 28,
      redemptions: 22,
      joined: "2025-01-10",
    },
    {
      id: 4,
      name: "Fashion Store",
      email: "info@fashionstore.com",
      plan: "Growth",
      status: "suspended",
      codesGenerated: 156,
      redemptions: 98,
      joined: "2024-10-05",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Merchants</h1>
          <p className="text-muted-foreground mt-1">Manage all merchant accounts</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search merchants by name or email..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Merchants List */}
      <Card>
        <CardHeader>
          <CardTitle>All Merchants</CardTitle>
          <CardDescription>{merchants.length} total merchants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {merchants.map((merchant) => (
              <div key={merchant.id} className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{merchant.name}</p>
                    <Badge
                      variant={merchant.status === "active" ? "default" : "destructive"}
                      className={merchant.status === "active" ? "bg-primary text-primary-foreground" : ""}
                    >
                      {merchant.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{merchant.email}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Plan: {merchant.plan}</span>
                    <span>•</span>
                    <span>Codes: {merchant.codesGenerated}</span>
                    <span>•</span>
                    <span>Redemptions: {merchant.redemptions}</span>
                    <span>•</span>
                    <span>Joined: {new Date(merchant.joined).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/merchants/${merchant.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  {merchant.status === "active" ? (
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Ban className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-primary">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
