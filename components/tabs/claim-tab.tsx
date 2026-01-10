"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, TrendingUp, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export function ClaimTab() {
  const [claimableRewards, setClaimableRewards] = useState(42.18)
  const [dailyFlow] = useState(18.75)

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = dailyFlow / 86400
      setClaimableRewards((prev) => prev + increment)
    }, 1000)
    return () => clearInterval(interval)
  }, [dailyFlow])

  const claimHistory = [
    { amount: "124.50", token: "VEL", date: "2024-01-08", txHash: "0x1234...5678" },
    { amount: "89.30", token: "CLNK", date: "2024-01-07", txHash: "0x2345...6789" },
    { amount: "156.80", token: "MOON", date: "2024-01-06", txHash: "0x3456...7890" },
  ]

  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold font-orbitron text-primary">CLAIM REWARDS</h2>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/20 to-green-500/10 border-primary/30 glow-cyan">
        <div className="text-center mb-4">
          <div className="text-sm text-muted-foreground mb-2">CLAIMABLE REWARDS</div>
          <div className="text-4xl font-mono font-bold text-green-400 glow-cyan-text mb-1">
            ${claimableRewards.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground">Across all vaults</div>
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 text-lg">
          <Gift className="w-5 h-5 mr-2" />
          CLAIM ALL REWARDS
        </Button>
      </Card>

      <Card className="p-4 bg-card/60 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">DAILY FLOW RATE</span>
          </div>
          <div className="text-lg font-mono font-bold text-primary">${dailyFlow.toFixed(2)}/day</div>
        </div>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold font-orbitron">CLAIM HISTORY</h3>
        </div>
        <div className="space-y-2">
          {claimHistory.map((claim, idx) => (
            <Card key={idx} className="p-3 bg-card/40 border-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {claim.amount} {claim.token}
                    </span>
                    <span className="text-xs text-green-400">Claimed</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono">{claim.txHash}</div>
                </div>
                <div className="text-xs text-muted-foreground">{claim.date}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
