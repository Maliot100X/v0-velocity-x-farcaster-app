"use client"

import { motion } from "framer-motion"
import type { TabType } from "@/app/page"
import { Home, Layers, ShoppingCart, DollarSign, Rocket, Trophy, Store, User } from "lucide-react"

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: "home" as TabType, label: "Home", icon: Home },
  { id: "stake" as TabType, label: "Stake", icon: Layers },
  { id: "buy" as TabType, label: "Buy", icon: ShoppingCart },
  { id: "earn" as TabType, label: "Earn", icon: DollarSign },
  { id: "launch" as TabType, label: "Launch", icon: Rocket },
  { id: "leaderboard" as TabType, label: "Board", icon: Trophy },
  { id: "store" as TabType, label: "Store", icon: Store },
  { id: "profile" as TabType, label: "Profile", icon: User },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="sticky top-[73px] z-40 bg-card/80 backdrop-blur-xl border-b border-primary/20">
      <div className="grid grid-cols-8">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative px-1 py-2.5 text-[10px] font-medium transition-colors"
            >
              <div className="flex flex-col items-center gap-0.5">
                <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`leading-tight ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
                  {tab.label}
                </span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-cyan-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
