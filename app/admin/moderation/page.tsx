import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Ban, CheckCircle } from "lucide-react"

export default function ModerationPage() {
  const flaggedAccounts = [
    {
      id: 1,
      merchant: "Suspicious Store",
      reason: "Unusual redemption pattern",
      severity: "high",
      flaggedDate: "2025-01-20",
      codesGenerated: 500,
      redemptions: 498,
    },
    {
      id: 2,
      merchant: "Test Business",
      reason: "Rapid code generation",
      severity: "medium",
      flaggedDate: "2025-01-19",
      codesGenerated: 200,
      redemptions: 5,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Moderation</h1>
        <p className="text-muted-foreground mt-1">Review flagged accounts and suspicious activity</p>
      </div>

      {/* Flagged Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Flagged Accounts</CardTitle>
          <CardDescription>Merchants requiring review</CardDescription>
        </CardHeader>
        <CardContent>
          {flaggedAccounts.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 mx-auto text-primary mb-3" />
              <p className="text-sm text-muted-foreground">No flagged accounts at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {flaggedAccounts.map((account) => (
                <div key={account.id} className="flex items-start justify-between border-b border-border pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`h-4 w-4 ${account.severity === "high" ? "text-destructive" : "text-accent"}`}
                      />
                      <p className="font-medium text-foreground">{account.merchant}</p>
                      <Badge variant={account.severity === "high" ? "destructive" : "secondary"}>
                        {account.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{account.reason}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Flagged: {new Date(account.flaggedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Codes: {account.codesGenerated}</span>
                      <span>•</span>
                      <span>Redemptions: {account.redemptions}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
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
