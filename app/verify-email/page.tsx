"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { authApi } from "@/lib/api"

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Loading...</CardTitle>
            <CardDescription className="text-center text-base">
              Please wait while we load the page.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    </div>
  )
}

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')

      if (!token) {
        setError("Invalid verification link. No token provided.")
        setIsLoading(false)
        return
      }

      try {
        const response = await authApi.verifyEmail(token)

        if (response.success) {
          setIsSuccess(true)
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login")
          }, 3000)
        } else {
          setError(response.error || "Failed to verify email. The link may be expired or invalid.")
        }
      } catch (err) {
        setError("Network error. Please check your connection and try again.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/20 to-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              {isLoading ? (
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              ) : isSuccess ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {isLoading ? "Verifying Email..." : isSuccess ? "Email Verified!" : "Verification Failed"}
            </CardTitle>
            <CardDescription className="text-center text-base">
              {isLoading
                ? "Please wait while we verify your email address."
                : isSuccess
                ? "Your email has been successfully verified. You can now log in to your account."
                : "We couldn't verify your email address."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSuccess && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Redirecting to login page in a few seconds...
                </AlertDescription>
              </Alert>
            )}

            <div className="text-center space-y-2">
              {!isLoading && (
                <Button asChild className="w-full">
                  <Link href="/login">
                    {isSuccess ? "Continue to Login" : "Go to Login"}
                  </Link>
                </Button>
              )}
              <p className="text-sm text-muted-foreground">
                Need help? <Link href="/contact" className="text-primary hover:underline">Contact support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  )
}
