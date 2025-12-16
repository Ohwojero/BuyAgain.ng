"use client"

import { useEffect } from "react"

export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register service worker for offline functionality
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[v0] Service Worker registered successfully:", registration.scope)

          // Check for updates periodically
          setInterval(() => {
            registration.update()
          }, 60000) // Check every minute
        })
        .catch((error) => {
          console.log("[v0] Service Worker registration failed:", error)
        })

      // Listen for service worker updates
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[v0] Service Worker updated, reloading page")
        window.location.reload()
      })
    } else {
      console.log("[v0] Service Workers not supported in this browser")
    }
  }, [])

  return null
}
