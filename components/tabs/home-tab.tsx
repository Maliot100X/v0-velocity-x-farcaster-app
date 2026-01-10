"use client"

import { motion } from "framer-motion"
import { TrendingUp, ArrowUpRight, Clock, AlertCircle, Sparkles, TrendingDown, Flame } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

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
      <Card className="p-3 bg-card/60 border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:glow-cyan-sm relative">
        {token.boosted && (
          <div className="absolute -top-2 -right-2 z-10">
            <div
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                token.boosted === "24h"
                  ? "bg-primary text-primary-foreground glow-cyan"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              <Clock className="w-3 h-3" />
              {token.boosted === "24h" ? "24H" : "1H"}
            </div>
          </div>
        )}

        <div className="space-y-2">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              {token.id === "velocityx" && (
                <Image
                  src="/images/gemini-generated-image-l44ak5l44ak5l44a.png"
                  alt="Velocity X"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-cyan-100">{token.name}</h3>
                  {token.trending && (
                    <div className="flex items-center gap-0.5 text-[10px] text-primary">
                      <TrendingUp className="w-3 h-3" />
                      <span>HOT</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-cyan-300">${token.symbol}</span>
                  <span className="text-xs text-cyan-400">{token.creator}</span>
                </div>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {token.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(token.change24h)}%
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-cyan-400 text-[10px]">Price</div>
              <div className="font-semibold text-cyan-200">{token.price}</div>
            </div>
            <div>
              <div className="text-cyan-400 text-[10px]">MCap</div>
              <div className="font-semibold text-cyan-200">{token.marketCap}</div>
            </div>
            <div>
              <div className="text-cyan-400 text-[10px]">Volume 24h</div>
              <div className="font-semibold text-cyan-200">{token.volume24h}</div>
            </div>
            <div>
              <div className="text-cyan-400 text-[10px]">Stakers</div>
              <div className="font-semibold text-cyan-200 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {token.stakersCount}
              </div>
            </div>
          </div>

          {/* Live Rewards */}
          <div className="pt-2 border-t border-cyan-500/10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-400 text-[10px]">Rewards Streamed ({token.stakersCount} stakers)</span>
              <span className="font-mono font-bold text-cyan-200 glow-cyan-text">{liveRewards.toLocaleString()}</span>
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
  const [winRewards, setWinRewards] = useState(0.000012345)
  const [balance] = useState(667.5)
  const [staked] = useState(690982.0)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setWinRewards((prev) => prev + 0.000000095)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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
      const boosted = sorted.filter((t) => t.boosted)
      const boosted24h = boosted.filter((t) => t.boosted === "24h")
      const boosted1h = boosted.filter((t) => t.boosted === "1h")
      sorted = [...boosted24h, ...boosted1h]
    }

    return velocityToken ? [velocityToken, ...sorted] : sorted
  }

  const displayTokens = getSortedTokens()

  return (
    <div className="space-y-4 px-4 pt-4">
      <Card className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/30 glow-cyan">
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/images/gemini-generated-image-l44ak5l44ak5l44a.png"
            alt="Velocity X"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="text-base font-bold font-orbitron text-cyan-400">VELOCITY X</h2>
            <p className="text-[9px] text-cyan-300">Official Platform Token</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center p-2 bg-background/50 rounded-lg">
            <div className="text-[9px] text-cyan-400 mb-0.5">STAKED</div>
            <div className="text-xs font-bold font-mono text-cyan-200">{staked.toLocaleString()} B3</div>
          </div>
          <div className="text-center p-2 bg-background/50 rounded-lg">
            <div className="text-[9px] text-cyan-400 mb-0.5">BALANCE</div>
            <div className="text-xs font-bold font-mono text-green-400">${balance.toFixed(2)}</div>
          </div>
        </div>

        <div className="p-2 bg-background/30 rounded-lg border border-cyan-500/20 mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-cyan-400">LIVE WIN REWARDS</span>
            <TrendingUp className="w-3 h-3 text-green-400" />
          </div>
          <div className="text-base font-mono font-bold text-cyan-300 glow-cyan-text">{winRewards.toFixed(9)}</div>
          <div className="text-[8px] text-cyan-400">+0.000000095 WIN/s</div>
        </div>

        <Button
          onClick={() => setShowWithdrawalModal(true)}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-xs py-1.5"
        >
          <ArrowUpRight className="w-3 h-3 mr-1" />
          Withdraw Rewards
        </Button>
      </Card>

      {showWithdrawalModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWithdrawalModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm"
          >
            <Card className="p-6 bg-card border-primary/30">
              <h3 className="text-lg font-bold font-orbitron text-primary mb-4">Choose Withdrawal Method</h3>

              <Card className="p-4 mb-3 bg-red-500/10 border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-red-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Instant Withdrawal
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">Available immediately</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-red-500/20">
                  <span className="text-sm text-red-300">Fee: 10%</span>
                  <span className="font-bold text-red-400">${(balance * 0.9).toFixed(2)}</span>
                </div>
              </Card>

              <Card className="p-4 mb-4 bg-green-500/10 border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-green-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Delayed Withdrawal
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">45-day lock period</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-green-500/20">
                  <span className="text-sm text-green-300">Fee: 0%</span>
                  <span className="font-bold text-green-400">${balance.toFixed(2)}</span>
                </div>
              </Card>

              <Button onClick={() => setShowWithdrawalModal(false)} variant="outline" className="w-full">
                Cancel
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={() => setActiveSubTab("new")}
          variant={activeSubTab === "new" ? "default" : "outline"}
          size="sm"
          className={`flex-1 ${activeSubTab === "new" ? "bg-cyan-500 hover:bg-cyan-600 text-black" : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"}`}
        >
          <Sparkles className="w-3 h-3 mr-1" />
          NEW
        </Button>
        <Button
          onClick={() => setActiveSubTab("volume")}
          variant={activeSubTab === "volume" ? "default" : "outline"}
          size="sm"
          className={`flex-1 ${activeSubTab === "volume" ? "bg-cyan-500 hover:bg-cyan-600 text-black" : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"}`}
        >
          <TrendingUp className="w-3 h-3 mr-1" />
          VOLUME
        </Button>
        <Button
          onClick={() => setActiveSubTab("boosted")}
          variant={activeSubTab === "boosted" ? "default" : "outline"}
          size="sm"
          className={`flex-1 ${activeSubTab === "boosted" ? "bg-cyan-500 hover:bg-cyan-600 text-black" : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"}`}
        >
          <Flame className="w-3 h-3 mr-1" />
          BOOSTED
        </Button>
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
