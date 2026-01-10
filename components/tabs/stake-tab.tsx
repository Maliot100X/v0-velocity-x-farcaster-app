"use client"

import { motion } from "framer-motion"
import { Layers, TrendingUp, Users, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface StakeTabProps {
  onTokenSelect: (tokenId: string) => void
}

const stakingPools = [
  {
    id: "1",
    name: "Velocity Token",
    symbol: "VEL",
    apy: "142%",
    tvl: "$2.4M",
    stakers: 892,
    myStake: "12,500",
    myRewards: "284.50",
  },
  {
    id: "2",
    name: "Clanker Coin",
    symbol: "CLNK",
    apy: "98%",
    tvl: "$4.1M",
    stakers: 1423,
    myStake: "0",
    myRewards: "0",
  },
  {
    id: "3",
    name: "Moon Shot",
    symbol: "MOON",
    apy: "215%",
    tvl: "$1.8M",
    stakers: 2134,
    myStake: "5,000",
    myRewards: "142.80",
  },
]

export function StakeTab({ onTokenSelect }: StakeTabProps) {
  const [selectedPool, setSelectedPool] = useState<string | null>(null)

  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold font-orbitron text-foreground">STAKING POOLS</h2>
      </div>

      {/* Pools */}
      <div className="space-y-3">
        {stakingPools.map((pool) => {
          const isStaked = Number.parseFloat(pool.myStake) > 0

          return (
            <motion.div key={pool.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Card
                className={`p-4 bg-card/60 border-primary/20 hover:border-primary/40 transition-all cursor-pointer ${
                  isStaked ? "glow-cyan-sm" : ""
                }`}
                onClick={() => onTokenSelect(pool.id)}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{pool.name}</h3>
                      <span className="text-sm text-muted-foreground">${pool.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary font-mono">{pool.apy}</div>
                      <div className="text-xs text-muted-foreground">APY</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>TVL</span>
                      </div>
                      <div className="font-medium text-foreground mt-0.5">{pool.tvl}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Stakers</span>
                      </div>
                      <div className="font-medium text-foreground mt-0.5">{pool.stakers}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>My Stake</span>
                      </div>
                      <div className="font-medium text-foreground mt-0.5">{isStaked ? pool.myStake : "Not staked"}</div>
                    </div>
                  </div>

                  {/* Rewards */}
                  {isStaked && (
                    <div className="pt-3 border-t border-primary/10">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Claimable Rewards</span>
                        <span className="text-sm font-mono font-bold text-primary">
                          {pool.myRewards} {pool.symbol}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      <Card className="p-8 bg-card/40 border-primary/10 text-center">
        <Layers className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-sm text-muted-foreground">Click on a pool to stake your tokens</p>
      </Card>
    </div>
  )
}
