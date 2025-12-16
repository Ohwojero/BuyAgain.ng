"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type PlanType = "free" | "growth" | "scale"

interface PlanLimits {
  discountCodes: number
  referralCodes: number
  teamMembers: number
  hasReferrals: boolean
  hasWhatsApp: boolean
  hasMultiBranch: boolean
  hasAdvancedAnalytics: boolean
}

interface PlanContextType {
  currentPlan: PlanType
  planName: string
  planColor: string
  planLimits: PlanLimits
  updatePlan: (plan: PlanType) => void
}

const planDetails: Record<PlanType, { name: string; color: string; limits: PlanLimits }> = {
  free: {
    name: "Free Plan",
    color: "bg-gray-500",
    limits: {
      discountCodes: 30,
      referralCodes: 0,
      teamMembers: 1,
      hasReferrals: false,
      hasWhatsApp: false,
      hasMultiBranch: false,
      hasAdvancedAnalytics: false,
    },
  },
  growth: {
    name: "Growth Plan",
    color: "bg-green-600",
    limits: {
      discountCodes: 400,
      referralCodes: 400,
      teamMembers: 2,
      hasReferrals: true,
      hasWhatsApp: true,
      hasMultiBranch: false,
      hasAdvancedAnalytics: false,
    },
  },
  scale: {
    name: "Scale Plan",
    color: "bg-purple-600",
    limits: {
      discountCodes: 2000,
      referralCodes: 2000,
      teamMembers: 6,
      hasReferrals: true,
      hasWhatsApp: true,
      hasMultiBranch: true,
      hasAdvancedAnalytics: true,
    },
  },
}

const PlanContext = createContext<PlanContextType | undefined>(undefined)

export function PlanProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free")

  useEffect(() => {
    const savedPlan = localStorage.getItem("currentPlan") as PlanType
    console.log("[v0] Loading plan from localStorage:", savedPlan)
    if (savedPlan && planDetails[savedPlan]) {
      setCurrentPlan(savedPlan)
      console.log("[v0] Plan loaded successfully:", savedPlan)
    }
  }, [])

  const updatePlan = (plan: PlanType) => {
    console.log("[v0] Updating plan from", currentPlan, "to", plan)
    setCurrentPlan(plan)
    localStorage.setItem("currentPlan", plan)
    console.log("[v0] Plan updated in state and localStorage:", plan)
    console.log("[v0] New plan details:", planDetails[plan])
  }

  const details = planDetails[currentPlan]

  console.log("[v0] Current plan in context:", currentPlan, details.name)

  return (
    <PlanContext.Provider
      value={{
        currentPlan,
        planName: details.name,
        planColor: details.color,
        planLimits: details.limits,
        updatePlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (!context) {
    throw new Error("usePlan must be used within PlanProvider")
  }
  return context
}
