import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Free",
    price: "₦0",
    description: "Perfect for testing the system",
    features: [
      "Discount codes only",
      "30 codes per month",
      "Basic analytics",
      "QR code generation",
      "Print on A4/POS",
      "Single user",
    ],
    cta: "Get Started",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₦5,000",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Everything in Free, plus:",
      "400 discount codes/month",
      "400 referral codes/month",
      "Referral tracking",
      "WhatsApp integration",
      "2 team members",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
    href: "/register?plan=growth",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "₦15,000",
    period: "/month",
    description: "For multi-location businesses",
    features: [
      "Everything in Growth, plus:",
      "2,000 discount codes/month",
      "2,000 referral codes/month",
      "Multi-branch support",
      "6 team members",
      "Advanced analytics",
      "Growth reports",
      "Dedicated support",
    ],
    cta: "Start 14-Day Trial",
    href: "/register?plan=scale",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                14-day free trial on all plans
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4 text-balance">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Start free, upgrade as you grow. All paid plans include a risk-free 14-day trial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {tiers.map((tier, index) => (
                <Card
                  key={tier.name}
                  className={`relative transition-all hover:shadow-xl ${
                    tier.highlighted ? "border-primary shadow-lg md:scale-105 bg-card" : "hover:border-primary/50"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">MOST POPULAR</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                    </div>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={tier.highlighted ? "default" : "outline"} size="lg" asChild>
                      <Link href={tier.href}>{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground">
                All prices in Nigerian Naira (₦) • Billed monthly • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">What happens when I exceed my monthly limit?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You'll receive a notification at 80% usage. After hitting the limit, you can upgrade your plan or
                    wait until next month. Your existing codes continue to work.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">Can I change plans at any time?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade anytime. Changes take effect immediately, and we'll prorate the
                    charges fairly.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">Do I need a website or technical knowledge?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No. BuyAgain.ng works entirely on your phone or computer. Just print QR codes and scan them
                    in-store. No coding or technical setup required.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-lg">How do payments work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We accept debit/credit cards via Paystack, Nigeria's most trusted payment processor. All
                    transactions are secure and encrypted.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
