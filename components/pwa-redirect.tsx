"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function PWARedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if running as PWA
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isIOSStandalone = (window.navigator as any).standalone === true

    if (isStandalone || isIOSStandalone) {
      console.log("[v0] Running as PWA, redirecting to mobile interface")
      // Only redirect if on dashboard pages
      if (window.location.pathname.startsWith("/dashboard")) {
        router.push("/mobile")
      }
    }
  }, [router])

  return null
}
