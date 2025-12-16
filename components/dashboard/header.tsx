"use client"

import { Button } from "@/components/ui/button"
import { Bell, LogOut, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

export function DashboardHeader() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isInstalled = window.matchMedia("(display-mode: standalone)").matches
      setShowInstallButton(!isInstalled)
    }
  }, [])

  const handleLogout = () => {
    setIsLoggingOut(true)

    localStorage.removeItem("authToken")
    localStorage.removeItem("userSession")
    localStorage.removeItem("merchantData")
    sessionStorage.clear()

    setTimeout(() => {
      router.push("/login")
      setIsLoggingOut(false)
    }, 500)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {showInstallButton && (
            <Link href="/install-pwa" className="hidden md:block">
              <Button variant="outline" size="sm" className="text-[#0A6CFF] border-[#0A6CFF] bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Install App
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
            <LogOut className={`h-4 w-4 mr-2 ${isLoggingOut ? "animate-spin" : ""}`} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </header>
  )
}
