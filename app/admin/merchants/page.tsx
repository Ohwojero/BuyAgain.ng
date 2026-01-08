"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Ban, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { merchantsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface Merchant {
  id: string
  businessName: string
  email: string
  tier: string
  isActive: boolean
  createdAt: string
  coupons: any[]
  redemptions: any[]
}

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await merchantsApi.getAll() as { success: boolean; data?: Merchant[]; error?: string }
        if (response.success && response.data) {
          setMerchants(response.data)
        } else {
          setError(response.error || "Failed to fetch merchants")
          toast({
            title: "Error",
            description: response.error || "Failed to fetch merchants",
            variant: "destructive",
          })
        }
      } catch (err) {
        setError("Network error")
        toast({
          title: "Error",
          description: "Network error while fetching merchants",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMerchants()
  }, [toast])

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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading merchants...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-destructive">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          ) : merchants.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No merchants found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {merchants.map((merchant) => (
                <div key={merchant.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{merchant.businessName}</p>
                      <Badge
                        variant={merchant.isActive ? "default" : "destructive"}
                        className={merchant.isActive ? "bg-primary text-primary-foreground" : ""}
                      >
                        {merchant.isActive ? "active" : "inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{merchant.email}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Plan: {merchant.tier}</span>
                      <span>•</span>
                      <span>Codes: {merchant.coupons.length}</span>
                      <span>•</span>
                      <span>Redemptions: {merchant.redemptions.length}</span>
                      <span>•</span>
                      <span>Joined: {new Date(merchant.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/merchants/${merchant.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    {merchant.isActive ? (
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
