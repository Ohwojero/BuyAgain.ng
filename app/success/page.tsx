import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Discount Applied!</CardTitle>
          <CardDescription>Your loyalty discount has been successfully redeemed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">You saved</p>
            <div className="text-4xl font-bold text-primary">₦500</div>
            <p className="text-sm text-muted-foreground mt-2">on this purchase</p>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-foreground font-medium">Thank you for your loyalty!</p>
            <p className="text-sm text-muted-foreground">Come back again for more exclusive discounts</p>
          </div>

          <Button className="w-full" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
