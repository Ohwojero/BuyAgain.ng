import { Smartphone, Chrome, Share2, Plus, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function InstallPWAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="text-center mb-8">
          <Image
            src="/images/image.png"
            alt="BuyAgain.ng"
            width={200}
            height={48}
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Install BuyAgain.ng PWA</h1>
          <p className="text-gray-600">Install our app on your phone for quick access and offline functionality</p>
        </div>

        {/* Android Chrome Instructions */}
        <Card className="p-6 mb-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Chrome className="h-8 w-8 text-[#0A6CFF]" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Android (Chrome)</h2>
              <p className="text-sm text-gray-600">Most common for Nigerian users</p>
            </div>
          </div>

          <ol className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Open BuyAgain.ng in Chrome</p>
                <p className="text-sm text-gray-600">Visit buyagain.ng in your Chrome browser</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">Tap the menu (⋮) in the top right</p>
                <p className="text-sm text-gray-600">Three vertical dots in Chrome's toolbar</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">Select "Add to Home screen"</p>
                <p className="text-sm text-gray-600">Or "Install app" if that option appears</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">Confirm installation</p>
                <p className="text-sm text-gray-600">The app will appear on your home screen</p>
              </div>
            </li>
          </ol>
        </Card>

        {/* iPhone Safari Instructions */}
        <Card className="p-6 mb-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="h-8 w-8 text-[#0A6CFF]" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">iPhone (Safari)</h2>
              <p className="text-sm text-gray-600">For iOS users</p>
            </div>
          </div>

          <ol className="space-y-4">
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">Open BuyAgain.ng in Safari</p>
                <p className="text-sm text-gray-600">Must be Safari browser (not Chrome)</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900">Tap the Share button</p>
                <Share2 className="h-4 w-4 text-[#0A6CFF]" />
              </div>
              <p className="text-sm text-gray-600">Square with arrow pointing up at the bottom</p>
            </li>

            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">Scroll and tap "Add to Home Screen"</p>
                  <Plus className="h-4 w-4 text-[#0A6CFF]" />
                </div>
                <p className="text-sm text-gray-600">Look for the plus icon in the list</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0A6CFF] text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <p className="font-medium text-gray-900">Tap "Add" to confirm</p>
                <p className="text-sm text-gray-600">BuyAgain will appear on your home screen</p>
              </div>
            </li>
          </ol>
        </Card>

        {/* Benefits */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[#0A6CFF]/10 to-[#00C853]/10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Why Install as PWA?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Instant Access</p>
                <p className="text-sm text-gray-600">Launch from home screen like a native app</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Works Offline</p>
                <p className="text-sm text-gray-600">Access features even without internet</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Faster Loading</p>
                <p className="text-sm text-gray-600">Cached content loads instantly</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Less Data Usage</p>
                <p className="text-sm text-gray-600">Optimized for low bandwidth</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-[#0A6CFF] hover:bg-[#0A6CFF]/90">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
