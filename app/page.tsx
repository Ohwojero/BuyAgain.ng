import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  QrCode,
  Users,
  TrendingUp,
  Smartphone,
  Printer,
  BarChart3,
  CheckCircle2,
  Zap,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-14">
            <div className="mx-auto max-w-4xl text-center">
              <Badge
                variant="secondary"
                className="mb-6 py-2 px-2 sm:px-4 text-xs sm:text-sm font-medium shadow-sm animate-in fade-in slide-in-from-top-3 duration-700 break-words"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary text-3xl "></span>
                </span>
                Stop Competitors From Stealing Your Customers This Year
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                <span className="block mb-2">Make Every Customer Come Back Again</span>
                
                
              </h1>

              <p className="text-lg leading-relaxed text-muted-foreground text-pretty max-w-3xl mx-auto mb-8 animate-in fade-in slide-in-from-top-6 duration-1000 delay-300">
                Stop losing a huge part of your profit to walk-away customers and nearby competitors. Bring every
                customer back automatically using QR discount cards — no apps, no tech stress.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground mb-10 animate-in fade-in slide-in-from-top-7 duration-1000 delay-400">
                <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">Works on any phone</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="font-medium">Takes under 5 minutes to set up</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full">
                  <CheckCircle2 className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Used by 500+ Nigerian businesses</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 flex-wrap mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <Button
                  size="lg"
                  asChild
                  className="shadow-xl shadow-primary/25 h-14 px-10 text-lg font-semibold group"
                >
                  <Link href="/register">
                    Start FREE - No Card Required
                  
                  </Link>
                </Button>
              </div>

              <p className="text-sm font-medium text-primary animate-in fade-in duration-1000 delay-600">
                (Limited Time Offer)
              </p>
            </div>
          </div>
        </section>

        <section className="py-6 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Bring Customers Back & Watch Your Revenue Grow
                <br />
                <span className="text-primary">in 4 Simple Steps</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600" />
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">Create Your Free Account</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Set up your business in minutes — no technical skills or credit card needed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">Generate Single-Use QR Discount Cards</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Each code works once, so customers must come back to you, not your competitor.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600" />
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">Hand One to Every Customer</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Print on A4 paper, or a POS printer. Hand them over during checkout and see the joy and
                        excitement in their faces.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        Track Who Comes Back & How Much They Spend
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        See real numbers — returning customers, revenue, and growth.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary/5 to-emerald-500/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                  Every Customer Gets a Reason to Return
                </h2>
                <p className="text-xl text-muted-foreground">
                  Give customers a personal discount they can only use once — so they come back to you, not your
                  competitor.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="pt-1">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Unique QR code per customer</h3>
                    <p className="text-muted-foreground text-sm">Each card is one-time use only</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="pt-1">
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Set expiry dates</h3>
                    <p className="text-muted-foreground text-sm">E.g. 7 days, 14 days - creates urgency</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="pt-1">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Prevents abuse & sharing</h3>
                    <p className="text-muted-foreground text-sm">Single-use codes can't be copied</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                  <CardContent className="pt-1">
                    <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                      <Smartphone className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">No app required for customers</h3>
                    <p className="text-muted-foreground text-sm">Just scan with camera - instant access</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Nigerian Businesses Are Already Growing With BuyAgain
              </h2>
            </div>

            {/* Stats Section */}
            <section className="py-16 mb-4 border-y border-border bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center group">
                  <div className="text-3xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                    500+
                  </div>
                    <div className="text-sm font-medium text-muted-foreground">Nigerian Merchants</div>
                  </div>
                  <div className="text-center group">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-emerald-600 to-emerald-500 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                    5000+
                  </div>
                    <div className="text-sm font-medium text-muted-foreground">Discount Codes Generated</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-purple-500 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                      85%
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">Customer Return Rate</div>
                  </div>
                  <div className="text-center group">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2 transition-transform group-hover:scale-110">
                    ₦20M+
                  </div>
                    <div className="text-sm font-medium text-muted-foreground">Repeat Revenue Tracked</div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden border-2 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full" />
                <CardContent className="pt-2 relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 italic">
                    "BuyAgain helped us stop losing customers after their first visit. Our profit margin is finally
                    improving."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Abuja Business Owner</p>
                      <p className="text-xs text-muted-foreground">Restaurant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-bl-full" />
                <CardContent className="pt-2 relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 italic">
                    "Our sales went up by 35% in less than 30 days."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                      L
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Retail Store Owner</p>
                      <p className="text-xs text-muted-foreground">Lagos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-2 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
                <CardContent className="pt-2 relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 italic">
                    "We're saving lots of money from marketing and advertising because of BuyAgain. It's our new
                    retention strategy."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      P
                    </div>
                    <div>
                      <p className="font-semibold text-sm">PH Fashion Brand</p>
                      <p className="text-xs text-muted-foreground">Port Harcourt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button
                  size="lg"
                  asChild
                  className="shadow-xl shadow-primary/25 h-14 px-10 text-lg font-semibold group"
                >
                  <Link href="/register">
                    Start FREE - No Card Required
                  
                  </Link>
                </Button>
              <p className="mt-4 text-sm text-primary font-medium">(Limited Time Offer)</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-11 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Features
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Everything You Need to Retain Customers (The "No-Stress" System)
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built specifically for Nigerian small businesses that want to grow without complexity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-1 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                    <QrCode className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Print & Scan QR Codes</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Generate discount cards on A4 paper or POS receipt. Customers scan to redeem. No app required for
                    customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-1 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Smart Referral System</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Customers refer friends and earn rewards automatically. Track who brought new customers and measure
                    ROI.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-1 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Detailed Analytics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    See returning customers, top performers, referral success rates, and revenue impact in your
                    dashboard.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-1 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Works on Any Phone</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Optimized for cheap Android devices. Works offline, syncs when connected. PWA installable.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-1 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
                    <Printer className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Flexible Printing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Print on A4 paper, POS receipt printer, or save as PDF. Black & white friendly for cost savings.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
                <CardContent className="pt-1 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Multi-Branch Ready</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Manage multiple locations and team members from one account. Perfect for growing businesses.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
               Built specifically for Nigerian Businesses like yours🇳🇬 next
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-2 hover:shadow-lg transition-shadow border-2">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
                  <Zap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold -mb-4">Setup in Minutes</h3>
                <p className="text-muted-foreground">
                  No technical skills needed. Create your account, generate codes, and start printing in under 5
                  minutes.
                </p>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow border-2">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold -mb-4">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Bank-level security with 99% uptime. Your customer data is encrypted and protected.
                </p>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow border-2">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold -mb-4">Local Support</h3>
                <p className="text-muted-foreground">
                  Nigerian-based support team that understands your business. Get help via WhatsApp, email, or phone.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}



        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6">
              Limited Time Offer
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary-foreground">
              Stop Losing Customers to your competitors
            </h2>
            <p className="text-xl mb-4 text-primary-foreground/90 max-w-2xl mx-auto">
              Spending your profit chasing new customers is expensive. Keeping existing customers is smarter.
            </p>
            <p className="text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
              500+ Nigerian businesses already using BuyAgain to increase repeat sales.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" variant="secondary" asChild className="h-12 px-8 text-base shadow-xl">
                <Link href="/register"> Start FREE - No Card Required</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 text-base bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {/* <Link href="/pricing">View Pricing</Link> */}
              </Button>
            </div>
            <p className="mt-6 text-sm text-primary-foreground/80">
             This offer is free for a limited time!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
