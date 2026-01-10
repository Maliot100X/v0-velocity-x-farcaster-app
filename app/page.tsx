"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { TabNavigation } from "@/components/tab-navigation"
import { HomeTab } from "@/components/tabs/home-tab"
import { StakeTab } from "@/components/tabs/stake-tab"
import { BuyTab } from "@/components/tabs/buy-tab"
import { EarnTab } from "@/components/tabs/earn-tab"
import { LaunchTab } from "@/components/tabs/launch-tab"
import { LeaderboardTab } from "@/components/tabs/leaderboard-tab"
import { StoreTab } from "@/components/tabs/store-tab"
import { ProfileTab } from "@/components/tabs/profile-tab"
import { TokenDetailPage } from "@/components/token-detail-page"
import { GrowthFundPage } from "@/components/growth-fund-page"

export type TabType = "home" | "stake" | "buy" | "earn" | "launch" | "leaderboard" | "store" | "profile"

declare global {
  interface Window {
    sdk?: {
      actions: {
        ready: () => void
        composeCast: (options: { text: string }) => void
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
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="pb-6">
              {activeTab === "home" && <HomeTab onTokenSelect={handleTokenSelect} />}
              {activeTab === "stake" && <StakeTab onTokenSelect={handleTokenSelect} />}
              {activeTab === "buy" && <BuyTab onTokenSelect={handleTokenSelect} />}
              {activeTab === "earn" && <EarnTab />}
              {activeTab === "launch" && <LaunchTab />}
              {activeTab === "leaderboard" && <LeaderboardTab />}
              {activeTab === "store" && <StoreTab />}
              {activeTab === "profile" && <ProfileTab />}
            </main>
          </>
        )}
      </div>
    </div>
  )
}
