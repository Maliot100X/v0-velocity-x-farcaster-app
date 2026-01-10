"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { TabNavigation } from "@/components/tab-navigation"
import { HomeTab } from "@/components/tabs/home-tab"
import { LaunchTab } from "@/components/tabs/launch-tab"
import { AssetsTab } from "@/components/tabs/assets-tab"
import { VaultsTab } from "@/components/tabs/vaults-tab"
import { ShopTab } from "@/components/tabs/shop-tab"
import { ProfileTab } from "@/components/tabs/profile-tab"
import { LeaderboardTab } from "@/components/tabs/leaderboard-tab"
import { BoostsTab } from "@/components/tabs/boosts-tab"
import { ClaimTab } from "@/components/tabs/claim-tab"
import { SettingsTab } from "@/components/tabs/settings-tab"
import { TokenDetailPage } from "@/components/token-detail-page"
import { GrowthFundPage } from "@/components/growth-fund-page"

export type TabType =
  | "home"
  | "launch"
  | "assets"
  | "vaults"
  | "shop"
  | "profile"
  | "leaderboard"
  | "boosts"
  | "claim"
  | "settings"

declare global {
  interface Window {
    sdk?: {
      actions: {
        ready: () => void
        composeCast: (options: { text: string }) => void
        signIn: () => Promise<void>
      }
    }
  }
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [showGrowthFund, setShowGrowthFund] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.sdk?.actions?.ready) {
      window.sdk.actions.ready()
    }
  }, [])

  const handleTokenSelect = (tokenId: string) => {
    if (tokenId === "velocityx") {
      setShowGrowthFund(true)
    } else {
      setSelectedToken(tokenId)
    }
  }

  const handleBackToHome = () => {
    setSelectedToken(null)
    setShowGrowthFund(false)
    setActiveTab("home")
  }

  return (
    <div className="min-h-screen bg-background w-full max-w-[424px] mx-auto relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        {showGrowthFund ? (
          <GrowthFundPage onBack={handleBackToHome} />
        ) : selectedToken ? (
          <TokenDetailPage tokenId={selectedToken} onBack={handleBackToHome} />
        ) : (
          <>
            <main className="pb-24">
              {activeTab === "home" && <HomeTab onTokenSelect={handleTokenSelect} />}
              {activeTab === "launch" && <LaunchTab />}
              {activeTab === "assets" && <AssetsTab />}
              {activeTab === "vaults" && <VaultsTab />}
              {activeTab === "shop" && <ShopTab />}
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "leaderboard" && <LeaderboardTab />}
              {activeTab === "boosts" && <BoostsTab />}
              {activeTab === "claim" && <ClaimTab />}
              {activeTab === "settings" && <SettingsTab />}
            </main>

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </>
        )}
      </div>
    </div>
  )
}
