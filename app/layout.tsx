import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { InstallPWA } from "./install-pwa"
import { RegisterServiceWorker } from "./register-sw"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BuyAgain.ng - Customer Loyalty Made Simple",
  description:
    "Digital loyalty and referral system for Nigerian retail businesses. Print QR codes, reward customers, grow your business.",
  generator: "v0.app",
  applicationName: "BuyAgain.ng",
  keywords: ["loyalty", "customer retention", "QR codes", "Nigerian business", "retail", "referral system"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BuyAgain.ng",
  },
  icons: {
    icon: [
      {
        url: "/icon-192x192.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        url: "/icon-512x512.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A6CFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BuyAgain" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <InstallPWA />
        <RegisterServiceWorker />
        <Analytics />
      </body>
    </html>
  )
}
