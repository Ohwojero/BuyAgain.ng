"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, Keyboard, CheckCircle2, XCircle, CameraOff } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { BrowserQRCodeReader } from "@zxing/library"
import { redemptionsApi } from "@/lib/api"

type ScanResult = {
  success: boolean
  coupon?: {
    code: string
    type: string
    value: number
    discountType: string
    customer?: string
  }
  error?: string
}

export default function ScanPage() {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera")
  const [manualCode, setManualCode] = useState("")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [redeeming, setRedeeming] = useState(false)
  const [redeemError, setRedeemError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const codeReaderRef = useRef<BrowserQRCodeReader | null>(null)

  const enableCamera = async () => {
    try {
      setCameraError(null)
      setScanning(true)

      const codeReader = new BrowserQRCodeReader()
      codeReaderRef.current = codeReader

      // Get video devices
      const videoInputDevices = await codeReader.listVideoInputDevices()

      if (videoInputDevices.length === 0) {
        throw new Error("No camera devices found")
      }

      // Use the first available camera (or back camera if available)
      const selectedDeviceId =
        videoInputDevices.find((device) => device.label.toLowerCase().includes("back"))?.deviceId ||
        videoInputDevices[0].deviceId

      await codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current!, (result, error) => {
        if (result) {
          // Successfully scanned a QR code
          const scannedCode = result.getText()

          // Mock validation - will be replaced with API call
          setScanResult({
            success: true,
            coupon: {
              code: scannedCode,
              type: "discount",
              value: 15,
              discountType: "percentage",
              customer: "Customer #002",
            },
          })

          // Stop scanning after successful scan
          setScanning(false)
        }

        if (error && error.name !== "NotFoundException") {
          console.error("[v0] QR scan error:", error)
        }
      })

      setCameraEnabled(true)
    } catch (error) {
      console.error("[v0] Camera error:", error)
      setCameraError("Unable to access camera. Please check permissions.")
      setScanning(false)
    }
  }

  const disableCamera = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset()
      codeReaderRef.current = null
    }

    setCameraEnabled(false)
    setScanning(false)
  }

  useEffect(() => {
    return () => {
      disableCamera()
    }
  }, [])

  useEffect(() => {
    if (scanMode !== "camera") {
      disableCamera()
    }
  }, [scanMode])

  const handleManualScan = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock validation - will be replaced with API call
    if (manualCode.length > 0) {
      setScanResult({
        success: true,
        coupon: {
          code: manualCode,
          type: "discount",
          value: 10,
          discountType: "percentage",
          customer: "Customer #001",
        },
      })
    }
  }

  const handleRedeem = async () => {
    if (!scanResult?.coupon?.code) return

    setRedeeming(true)
    setRedeemError(null)

    try {
      const response = await redemptionsApi.redeem({
        code: scanResult.coupon.code,
        customerName: scanResult.coupon.customer,
        // Add other optional fields as needed
      })

      if (response.success) {
        // Success - show confirmation and reset
        alert("Discount applied successfully!")
        setScanResult(null)
        setManualCode("")
        // Restart scanning if in camera mode
        if (scanMode === "camera" && cameraEnabled) {
          setScanning(true)
        }
      } else {
        setRedeemError(response.error || "Failed to redeem coupon")
      }
    } catch (error) {
      setRedeemError("Network error occurred")
    } finally {
      setRedeeming(false)
    }
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Scan & Redeem</h1>
        <p className="text-muted-foreground mt-1">Verify and apply customer discounts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Scan QR Code
            </CardTitle>
            <CardDescription>Use camera or enter code manually</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={scanMode === "camera" ? "default" : "outline"}
                onClick={() => setScanMode("camera")}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Camera
              </Button>
              <Button
                variant={scanMode === "manual" ? "default" : "outline"}
                onClick={() => setScanMode("manual")}
                className="flex-1"
              >
                <Keyboard className="h-4 w-4 mr-2" />
                Manual
              </Button>
            </div>

            {scanMode === "camera" && (
              <div className="bg-black/90 rounded-lg overflow-hidden min-h-[300px] relative">
                {!cameraEnabled ? (
                  <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
                    <Camera className="h-16 w-16 text-white/70 mb-4" />
                    <p className="text-sm text-white/70 text-center mb-4">Camera access needed to scan QR codes</p>
                    {cameraError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
                        {cameraError}
                      </div>
                    )}
                    <Button onClick={enableCamera} className="bg-white text-black hover:bg-gray-100">
                      <Camera className="h-4 w-4 mr-2" />
                      Enable Camera
                    </Button>
                  </div>
                ) : (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full min-h-[300px] object-cover" />
                    <div className="absolute inset-0 border-2 border-dashed border-white/50 m-8 rounded-lg pointer-events-none" />
                    {scanning && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                        Scanning for QR codes...
                      </div>
                    )}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <Button onClick={disableCamera} variant="secondary" size="sm">
                        <CameraOff className="h-4 w-4 mr-2" />
                        Disable Camera
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {scanMode === "manual" && (
              <form onSubmit={handleManualScan} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Enter Code</Label>
                  <Input
                    id="code"
                    placeholder="Enter the QR code manually"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Verify Code
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Redemption Status
            </CardTitle>
            <CardDescription>Review discount details before applying</CardDescription>
          </CardHeader>
          <CardContent>
            {!scanResult ? (
              <div className="text-center py-12">
                <QrCode className="h-16 w-16 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">Scan a code to see details</p>
              </div>
            ) : scanResult.success && scanResult.coupon ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Valid Code</span>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {scanResult.coupon.discountType === "percentage"
                      ? `${scanResult.coupon.value}%`
                      : `₦${scanResult.coupon.value}`}
                  </div>
                  <p className="text-sm text-muted-foreground">Discount to apply</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Code:</span>
                    <span className="font-mono font-medium text-foreground">{scanResult.coupon.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="secondary">{scanResult.coupon.type}</Badge>
                  </div>
                  {scanResult.coupon.customer && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium text-foreground">{scanResult.coupon.customer}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-2">
                  {redeemError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
                      {redeemError}
                    </div>
                  )}
                  <Button onClick={handleRedeem} className="w-full" size="lg" disabled={redeeming}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    {redeeming ? "Applying..." : "Apply Discount"}
                  </Button>
                  <Button
                    onClick={() => {
                      setScanResult(null)
                      setManualCode("")
                      setRedeemError(null)
                      // Restart scanning if in camera mode
                      if (scanMode === "camera" && cameraEnabled) {
                        setScanning(true)
                      }
                    }}
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled={redeeming}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <XCircle className="h-8 w-8 text-destructive" />
                  <span className="text-lg font-semibold text-foreground">Invalid Code</span>
                </div>

                <p className="text-sm text-center text-muted-foreground">{scanResult.error || "Code not found"}</p>

                <Button
                  onClick={() => {
                    setScanResult(null)
                    setManualCode("")
                  }}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-green-600 dark:text-green-400" />
            How to Redeem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Customer shows their QR code on their phone or printed card</li>
            <li>Use camera to scan or enter code manually</li>
            <li>Review discount details and verify customer</li>
            <li>Click "Apply Discount" to redeem and mark as used</li>
            <li>Customer gets their discount applied to purchase</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
