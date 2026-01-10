"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Users, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface TokenDetailPageProps {
  tokenId: string
  onBack: () => void
}

export function TokenDetailPage({ tokenId, onBack }: TokenDetailPageProps) {
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy")
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [totalRewardsDist, setTotalRewardsDist] = useState(124500)

  // Live ticking total rewards distributed
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRewardsDist((prev) => prev + 15)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const token = {
    name: "Moon Token",
    symbol: "MOON",
    creator: "@cryptowhale",
    farcasterProfile: "https://warpcast.com/cryptowhale",
    price: "$10.24",
    change24h: 24.5,
    volume: "$340K",
    marketCap: "$2.4M",
    stakers: 234,
  }

  const presetAmounts = [0.001, 0.01, 0.1, 1]

  const topStakers = [
    { handle: "@whale1", farcaster: "https://warpcast.com/whale1", amount: "12,450", rewards: 1234 },
    { handle: "@diamond_joe", farcaster: "https://warpcast.com/diamond_joe", amount: "8,920", rewards: 892 },
    { handle: "@moon_lover", farcaster: null, wallet: "0x1234...5678", amount: "6,780", rewards: 678 },
    { handle: "@crypto_king", farcaster: "https://warpcast.com/crypto_king", amount: "5,340", rewards: 534 },
    { handle: "@hodl_master", farcaster: "https://warpcast.com/hodl_master", amount: "4,120", rewards: 412 },
    { handle: "@base_builder", farcaster: null, wallet: "0xabcd...ef12", amount: "3,890", rewards: 389 },
    { handle: "@token_lord", farcaster: "https://warpcast.com/token_lord", amount: "3,240", rewards: 324 },
    { handle: "@stake_pro", farcaster: "https://warpcast.com/stake_pro", amount: "2,980", rewards: 298 },
    { handle: "@yield_farmer", farcaster: null, wallet: "0x9876...4321", amount: "2,560", rewards: 256 },
    { handle: "@moon_bag", farcaster: "https://warpcast.com/moon_bag", amount: "2,340", rewards: 234 },
  ]

  const [stakerRewards, setStakerRewards] = useState(topStakers.map((s) => s.rewards))

  useEffect(() => {
    const interval = setInterval(() => {
      setStakerRewards((prev) => prev.map((r) => r + Math.floor(Math.random() * 3)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleTrade = () => {
    console.log(`[v0] ${tradeMode === "buy" ? "Buying" : "Selling"} ${selectedAmount} ETH worth of ${token.symbol}`)
  }

  return (
    <div className="min-h-screen pb-6">
      <div className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-xl border-b border-primary/20 px-4 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Token Header - Enhanced with Farcaster profile link */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 glow-cyan">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary glow-cyan-sm" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold font-orbitron text-cyan-200">{token.name}</h1>
              <p className="text-primary font-mono">{token.symbol}</p>
              <a
                href={token.farcasterProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-1"
              >
                {token.creator}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="text-xl font-bold text-cyan-300">{token.price}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">24h Change</p>
              <p className="text-xl font-bold text-green-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />+{token.change24h}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Volume (24h)</p>
              <p className="text-lg font-semibold text-cyan-300">{token.volume}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
              <p className="text-lg font-semibold text-cyan-300">{token.marketCap}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">{token.stakers} stakers</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Rewards Distributed</p>
              <p className="text-sm font-bold text-accent font-mono">{totalRewardsDist.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Chart Placeholder */}
        <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
          <div className="h-48 bg-secondary/30 rounded-lg flex items-center justify-center border border-primary/10">
            <p className="text-sm text-muted-foreground">Price Chart (DEXScreener-style)</p>
          </div>
        </Card>

        {/* BUY/SELL Panel */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 glow-cyan-sm space-y-4">
          <h3 className="font-bold text-lg font-orbitron text-primary">Trade</h3>

          <div className="flex gap-2">
            <Button
              variant={tradeMode === "buy" ? "default" : "outline"}
              onClick={() => setTradeMode("buy")}
              className="flex-1"
            >
              BUY
            </Button>
            <Button
              variant={tradeMode === "sell" ? "default" : "outline"}
              onClick={() => setTradeMode("sell")}
              className="flex-1"
            >
              SELL
            </Button>
          </div>

          <div className="p-3 bg-secondary/30 rounded-lg border border-primary/10">
            <p className="text-xs text-muted-foreground mb-1">Your Balance</p>
            <p className="text-sm font-semibold text-cyan-300">1.24 ETH</p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Amount (ETH)</label>
            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  onClick={() => setSelectedAmount(amount)}
                  className="text-xs"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          {selectedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-secondary/50 rounded-lg border border-primary/10"
            >
              <p className="text-xs text-muted-foreground mb-1">You will {tradeMode === "buy" ? "receive" : "pay"}</p>
              <p className="text-xl font-bold font-mono text-primary">
                ~{(selectedAmount * 1000).toFixed(0)} {token.symbol}
              </p>
            </motion.div>
          )}

          <Button
            onClick={handleTrade}
            disabled={!selectedAmount}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan disabled:opacity-50"
          >
            {tradeMode === "buy" ? "BUY & STAKE" : "SELL"} {token.symbol}
          </Button>
        </Card>

        {/* My Staked Balance */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 space-y-4">
          <h3 className="font-bold text-lg font-orbitron text-cyan-200">My Staked Balance</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Staked</p>
              <p className="font-bold font-mono text-cyan-300">500</p>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Pool Share</p>
              <p className="font-bold font-mono text-cyan-300">2.1%</p>
            </div>
            <div className="text-center p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Flow Rate/day</p>
              <p className="font-bold font-mono text-accent">45.2</p>
            </div>
          </div>
        </Card>

        {/* Top 10 Stakers Leaderboard - Enhanced with Farcaster and live rewards */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 space-y-4">
          <h3 className="font-bold text-lg font-orbitron text-cyan-200">Top 10 Stakers</h3>

          <div className="space-y-2">
            {topStakers.map((staker, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span
                    className={`text-lg font-bold font-mono w-8 ${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                          ? "text-gray-300"
                          : index === 2
                            ? "text-amber-600"
                            : "text-muted-foreground"
                    }`}
                  >
                    #{index + 1}
                  </span>
                  {staker.farcaster ? (
                    <a
                      href={staker.farcaster}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      {staker.handle}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground font-mono">{staker.wallet}</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-cyan-300 font-mono">{staker.amount}</p>
                  <p className="text-xs text-accent font-mono">+{stakerRewards[index]}/day</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
