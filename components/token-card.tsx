"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface TokenCardProps {
  token: {
    id: string
    name: string
    symbol: string
    creator: string
    marketCap: string
    volume: string
    change24h: number
    rewardsDistributed: string
    stakers: number
  }
  onClick: (tokenId: string) => void
}

export function TokenCard({ token, onClick }: TokenCardProps) {
  const [rewardsCount, setRewardsCount] = useState(Number.parseInt(token.rewardsDistributed.replace(/,/g, "")))
  const isPositive = token.change24h >= 0

  useEffect(() => {
    const interval = setInterval(() => {
      setRewardsCount((prev) => prev + Math.floor(Math.random() * 10))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className="p-4 cursor-pointer bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all glow-cyan-sm hover:glow-cyan"
        onClick={() => onClick(token.id)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">{token.creator}</div>
            <h3 className="font-bold text-foreground">{token.name}</h3>
            <div className="text-sm text-primary font-mono">{token.symbol}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 glow-cyan-sm" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs text-muted-foreground">Market Cap</div>
            <div className="text-sm font-semibold">{token.marketCap}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Volume</div>
            <div className="text-sm font-semibold">{token.volume}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? "+" : ""}
            {token.change24h}%
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{token.stakers} stakers</span>
          </div>
        </div>

        <motion.div
          className="mt-2 pt-2 border-t border-primary/10 text-xs text-accent font-mono"
          key={rewardsCount}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
        >
          {rewardsCount.toLocaleString()} rewards
        </motion.div>
      </Card>
    </motion.div>
  )
}
