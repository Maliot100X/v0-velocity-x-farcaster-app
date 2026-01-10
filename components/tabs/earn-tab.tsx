"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Clock, Gift } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export function EarnTab() {
  const [totalRewards, setTotalRewards] = useState(1284.56)
  const [claimableRewards, setClaimableRewards] = useState(42.18)
  const [dailyFlow, setDailyFlow] = useState(18.75)

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = dailyFlow / 86400 // per second
      setTotalRewards((prev) => prev + increment)
      setClaimableRewards((prev) => prev + increment)
    }, 1000)
    return () => clearInterval(interval)
  }, [dailyFlow])

  const claimHistory = [
    { amount: "124.50", token: "VEL", date: "2024-01-08", txHash: "0x1234...5678" },
    { amount: "89.30", token: "CLNK", date: "2024-01-07", txHash: "0x2345...6789" },
    { amount: "156.80", token: "MOON", date: "2024-01-06", txHash: "0x3456...7890" },
    { amount: "98.20", token: "VEL", date: "2024-01-05", txHash: "0x4567...8901" },
  ]

  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold font-orbitron text-foreground">EARN REWARDS</h2>
      </div>

      {/* Rewards Overview */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card/60 border-primary/20 glow-cyan-sm">
          <div className="text-xs text-muted-foreground mb-1">TOTAL REWARDS</div>
          <div className="text-2xl font-mono font-bold text-primary">${totalRewards.toFixed(2)}</div>
        </Card>
        <Card className="p-4 bg-card/60 border-primary/20 glow-cyan-sm">
          <div className="text-xs text-muted-foreground mb-1">CLAIMABLE</div>
          <div className="text-2xl font-mono font-bold text-green-400">${claimableRewards.toFixed(2)}</div>
        </Card>
      </div>

      {/* Daily Flow */}
      <Card className="p-4 bg-card/60 border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">DAILY FLOW RATE</span>
          </div>
          <div className="text-lg font-mono font-bold text-primary">${dailyFlow.toFixed(2)}/day</div>
        </div>
        <div className="h-2 bg-background/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
      </Card>

      {/* Claim Button */}
      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-lg glow-cyan-sm">
        <Gift className="w-5 h-5 mr-2" />
        CLAIM ${claimableRewards.toFixed(2)}
      </Button>

      {/* Claim History */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold font-orbitron text-foreground">CLAIM HISTORY</h3>
        </div>
        <div className="space-y-2">
          {claimHistory.map((claim, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-3 bg-card/40 border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">
                        {claim.amount} {claim.token}
                      </span>
                      <span className="text-xs text-green-400">Claimed</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-mono">{claim.txHash}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{claim.date}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
