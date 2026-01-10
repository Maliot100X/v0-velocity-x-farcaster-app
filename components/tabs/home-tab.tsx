"use client"

import { motion } from "framer-motion"
import { TrendingUp, ArrowUp, ArrowDown, Users, Flame, BarChart3, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface HomeTabProps {
  onTokenSelect: (tokenId: string) => void
}

interface Token {
  id: string
  name: string
  symbol: string
  creator: string
  price: string
  marketCap: string
  volume24h: string
  change24h: number
  rewardsStreamed: string
  stakersCount: number
  trending?: boolean
  boosted?: "1h" | "24h" | null
}

const mockTokens: Token[] = [
  {
    id: "velocityx",
    name: "Velocity X",
    symbol: "VEL",
    creator: "@velocityx",
    price: "$0.0085",
    marketCap: "$8.5M",
    volume24h: "$2.1M",
    change24h: 34.2,
    rewardsStreamed: "5,234,567",
    stakersCount: 3421,
    trending: true,
    boosted: "24h",
  },
  {
    id: "2",
    name: "Clanker Coin",
    symbol: "CLNK",
    creator: "@clanker",
    price: "$0.0089",
    marketCap: "$8.9M",
    volume24h: "$1.2M",
    change24h: 18.2,
    rewardsStreamed: "2,345,678",
    stakersCount: 1423,
    trending: true,
    boosted: "24h",
  },
  {
    id: "3",
    name: "Base Meme",
    symbol: "BMEME",
    creator: "@basememes",
    price: "$0.0031",
    marketCap: "$3.1M",
    volume24h: "$567K",
    change24h: -5.3,
    rewardsStreamed: "987,654",
    stakersCount: 634,
    trending: true,
    boosted: "1h",
  },
  {
    id: "4",
    name: "Moon Shot",
    symbol: "MOON",
    creator: "@moonboi",
    price: "$0.0156",
    marketCap: "$15.6M",
    volume24h: "$2.8M",
    change24h: 42.1,
    rewardsStreamed: "3,456,789",
    stakersCount: 2134,
  },
  {
    id: "5",
    name: "Pepe Based",
    symbol: "PEPEBASE",
    creator: "@pepebased",
    price: "$0.0023",
    marketCap: "$2.3M",
    volume24h: "$423K",
    change24h: 12.7,
    rewardsStreamed: "765,432",
    stakersCount: 487,
  },
  {
    id: "6",
    name: "Degen Token",
    symbol: "DEGEN",
    creator: "@degentips",
    price: "$0.0067",
    marketCap: "$6.7M",
    volume24h: "$934K",
    change24h: -8.4,
    rewardsStreamed: "1,543,210",
    stakersCount: 1092,
  },
]

function TokenCard({ token, onSelect }: { token: Token; onSelect: () => void }) {
  const [liveRewards, setLiveRewards] = useState(Number.parseInt(token.rewardsStreamed.replace(/,/g, "")))

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRewards((prev) => prev + Math.floor(Math.random() * 10) + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={onSelect} className="cursor-pointer">
      <Card className="p-3 bg-card/60 border-primary/20 hover:border-primary/40 transition-all hover:glow-cyan-sm relative">
        {token.boosted && (
          <div className="absolute -top-2 -right-2 z-10">
            <div
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                token.boosted === "24h"
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              <Zap className="w-3 h-3" />
              {token.boosted === "24h" ? "24H" : "1H"}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-foreground">{token.name}</h3>
                {token.trending && (
                  <div className="flex items-center gap-0.5 text-[10px] text-primary">
                    <TrendingUp className="w-3 h-3" />
                    <span>HOT</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">${token.symbol}</span>
                <span className="text-xs text-primary/70">{token.creator}</span>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {token.change24h >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(token.change24h)}%
            </div>
          </div>

          {/* Stats Grid - Fixed color contrast */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground text-[10px]">Price</div>
              <div className="font-semibold text-cyan-300">{token.price}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[10px]">MCap</div>
              <div className="font-semibold text-cyan-300">{token.marketCap}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[10px]">Volume 24h</div>
              <div className="font-semibold text-cyan-300">{token.volume24h}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[10px]">Stakers</div>
              <div className="font-semibold text-cyan-300 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {token.stakersCount}
              </div>
            </div>
          </div>

          {/* Live Rewards - Enhanced contrast */}
          <div className="pt-2 border-t border-primary/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground text-[10px]">Rewards Streamed ({token.stakersCount} stakers)</span>
              <span className="font-mono font-bold text-cyan-300 glow-cyan-text">{liveRewards.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

type SubTab = "new" | "volume" | "boosted"

export function HomeTab({ onTokenSelect }: HomeTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("new")

  const getSortedTokens = () => {
    const velocityToken = mockTokens.find((t) => t.id === "velocityx")
    const otherTokens = mockTokens.filter((t) => t.id !== "velocityx")

    let sorted = [...otherTokens]

    if (activeSubTab === "volume") {
      sorted.sort((a, b) => {
        const aVol = Number.parseFloat(a.volume24h.replace(/[$KM]/g, ""))
        const bVol = Number.parseFloat(b.volume24h.replace(/[$KM]/g, ""))
        return bVol - aVol
      })
    } else if (activeSubTab === "boosted") {
      // Sort by boost type: 24h first, then 1h
      const boosted = sorted.filter((t) => t.boosted)
      const boosted24h = boosted.filter((t) => t.boosted === "24h")
      const boosted1h = boosted.filter((t) => t.boosted === "1h")
      sorted = [...boosted24h, ...boosted1h]
    }

    // Always pin Velocity X first
    return velocityToken ? [velocityToken, ...sorted] : sorted
  }

  const displayTokens = getSortedTokens()

  return (
    <div className="space-y-4 px-4 pt-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveSubTab("new")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubTab === "new"
              ? "bg-primary text-primary-foreground glow-cyan"
              : "bg-card/50 text-muted-foreground hover:text-foreground border border-primary/20"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          NEW
        </button>
        <button
          onClick={() => setActiveSubTab("volume")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubTab === "volume"
              ? "bg-primary text-primary-foreground glow-cyan"
              : "bg-card/50 text-muted-foreground hover:text-foreground border border-primary/20"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          VOLUME
        </button>
        <button
          onClick={() => setActiveSubTab("boosted")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubTab === "boosted"
              ? "bg-primary text-primary-foreground glow-cyan"
              : "bg-card/50 text-muted-foreground hover:text-foreground border border-primary/20"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          BOOSTED
        </button>
      </div>

      {/* Tokens List */}
      <section>
        <div className="space-y-2">
          {displayTokens.map((token) => (
            <TokenCard key={token.id} token={token} onSelect={() => onTokenSelect(token.id)} />
          ))}
        </div>
      </section>
    </div>
  )
}
