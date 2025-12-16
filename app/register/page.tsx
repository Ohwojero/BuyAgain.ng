"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Loader2, Building2, Mail, Phone, Lock, User } from "lucide-react"
import { authApi } from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const businessName = formData.get("business-name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const password = formData.get("password") as string

    // Basic validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await authApi.register({
        email,
        password,
        businessName,
        phone,
        businessType: "Retail", // Default business type
        address: "", // Optional field
      })

      if (response.success && response.data) {
        setVerificationSent(true)
        localStorage.setItem("pendingUser", JSON.stringify({ email, businessName, phone, name }))
      } else {
        setError(response.error || "Registration failed. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationSent) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-background">
        <Navbar />

        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md shadow-lg border-border/50 backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
              <CardDescription className="text-center text-base">
                We've sent a verification link to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Please check your email and click the verification link to activate your account. The link will expire
                  in 24 hours.
                </AlertDescription>
              </Alert>

              <div className="text-center text-sm text-muted-foreground">
                <p>Didn't receive the email?</p>
                <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                  Resend verification email
                </Button>
              </div>

              <div className="mt-6 text-center text-sm">
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Back to Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
            <CardDescription className="text-center text-base">
              This is your chance to get all your customers coming back. And it is for free!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Full Name"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="business-name"
                    name="business-name"
                    type="text"
                    placeholder="Your Business Name"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@business.com"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="080 XXX XXX XX"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password (min. 6 chars)"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !agreeToTerms}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
