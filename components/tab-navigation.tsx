"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { TabType } from "@/app/page"
import {
  Home,
  Rocket,
  Wallet,
  Vault,
  ShoppingBag,
  User,
  MoreHorizontal,
  Trophy,
  Zap,
  Gift,
  Settings,
  X,
} from "lucide-react"
import { useState } from "react"

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const primaryTabs = [
  { id: "home" as TabType, label: "Home", icon: Home },
  { id: "launch" as TabType, label: "Launch", icon: Rocket },
  { id: "assets" as TabType, label: "Assets", icon: Wallet },
  { id: "shop" as TabType, label: "Shop", icon: ShoppingBag },
]

const moreTabs = [
  { id: "vaults" as TabType, label: "Vaults", icon: Vault },
  { id: "profile" as TabType, label: "Profile", icon: User },
  { id: "leaderboard" as TabType, label: "Leaderboard", icon: Trophy },
  { id: "boosts" as TabType, label: "Boosts", icon: Zap },
  { id: "claim" as TabType, label: "Claim", icon: Gift },
  { id: "settings" as TabType, label: "Settings", icon: Settings },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const handleTabClick = (tabId: TabType) => {
    onTabChange(tabId)
    setShowMoreMenu(false)
  }

  const isMoreTabActive = moreTabs.some((tab) => tab.id === activeTab)

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-primary/20 max-w-[424px] mx-auto">
        <div className="grid grid-cols-5 px-2 py-3">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative flex flex-col items-center gap-1 text-[10px] font-medium transition-colors"
              >
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`leading-tight ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary glow-cyan-sm rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            )
          })}

          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="relative flex flex-col items-center gap-1 text-[10px] font-medium transition-colors"
          >
            <MoreHorizontal
              className={`w-5 h-5 ${isMoreTabActive || showMoreMenu ? "text-primary" : "text-muted-foreground"}`}
            />
            <span
              className={`leading-tight ${isMoreTabActive || showMoreMenu ? "text-primary" : "text-muted-foreground"}`}
            >
              More
            </span>
            {isMoreTabActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary glow-cyan-sm rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {showMoreMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-primary/20 max-w-[424px] mx-auto rounded-t-3xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">More Options</h3>
                  <button
                    onClick={() => setShowMoreMenu(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {moreTabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border transition-all ${
                          activeTab === tab.id
                            ? "bg-primary/20 border-primary text-primary glow-cyan-sm"
                            : "bg-card/50 border-primary/10 text-foreground hover:border-primary/30"
                        }`}
                      >
                        <Icon className="w-6 h-6 mb-2 mx-auto" />
                        <div className="text-sm font-semibold">{tab.label}</div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
