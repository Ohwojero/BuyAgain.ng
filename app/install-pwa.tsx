"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Smartphone } from "lucide-react"
import Link from "next/link"

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    console.log("[v0] InstallPWA component mounted")

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("[v0] App is already installed")
      return
    }

    const handler = (e: Event) => {
      console.log("[v0] beforeinstallprompt event fired!")
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Show manual prompt after 3 seconds if event hasn't fired
    const timer = setTimeout(() => {
      if (!isInstallable) {
        console.log("[v0] beforeinstallprompt didn't fire, showing manual prompt")
        setShowInstallButton(true)
      }
    }, 3000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
      clearTimeout(timer)
    }
  }, [isInstallable])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("[v0] No deferred prompt available, redirecting to guide")
      window.location.href = "/install-pwa"
      return
    }

    console.log("[v0] Showing install prompt")
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log("[v0] User choice:", outcome)

    if (outcome === "accepted") {
      setShowInstallButton(false)
    }

    setDeferredPrompt(null)
  }

  if (!showInstallButton) return null

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border shadow-lg rounded-lg p-4 z-50 animate-in slide-in-from-bottom-5">
      <button
        onClick={() => setShowInstallButton(false)}
        className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3">
        <div className="bg-[#0A6CFF]/10 p-2 rounded-lg">
          {isInstallable ? (
            <Download className="h-5 w-5 text-[#0A6CFF]" />
          ) : (
            <Smartphone className="h-5 w-5 text-[#0A6CFF]" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install BuyAgain.ng</h3>
          <p className="text-xs text-muted-foreground mb-3">
            {isInstallable
              ? "Install our app for quick access and offline features"
              : "Add BuyAgain.ng to your home screen for easy access"}
          </p>
          <div className="flex gap-2">
            <Button onClick={handleInstallClick} size="sm" className="flex-1 bg-[#0A6CFF] hover:bg-[#0A6CFF]/90">
              {isInstallable ? "Install Now" : "How to Install"}
            </Button>
            {!isInstallable && (
              <Link href="/install-pwa">
                <Button size="sm" variant="outline">
                  Guide
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
