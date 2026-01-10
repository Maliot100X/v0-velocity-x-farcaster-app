"use client"
import { Wallet, TrendingUp, TrendingDown, Gift, Clock, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface AssetPosition {
  tokenName: string
  tokenSymbol: string
  amount: number
  value: number
  pnl: number
  pnlPercent: number
  stakingRewards: number
}

const mockPositions: AssetPosition[] = [
  {
    tokenName: "Velocity X",
    tokenSymbol: "VEL",
    amount: 690982.0,
    value: 5873.34,
    pnl: 1234.56,
    pnlPercent: 26.6,
    stakingRewards: 45.23,
  },
  {
    tokenName: "Clanker Coin",
    tokenSymbol: "CLNK",
    amount: 125000.0,
    value: 1112.5,
    pnl: 234.5,
    pnlPercent: 26.7,
    stakingRewards: 12.34,
  },
  {
    tokenName: "Base Meme",
    tokenSymbol: "BMEME",
    amount: 50000.0,
    value: 155.0,
    pnl: -23.4,
    pnlPercent: -13.1,
    stakingRewards: 3.45,
  },
]

interface ClaimHistory {
  date: string
  amount: number
  token: string
  txHash: string
}

const mockClaimHistory: ClaimHistory[] = [
  { date: "2024-01-15", amount: 45.23, token: "WIN", txHash: "0x1234...5678" },
  { date: "2024-01-08", amount: 38.91, token: "WIN", txHash: "0x8765...4321" },
  { date: "2024-01-01", amount: 42.15, token: "WIN", txHash: "0xabcd...efgh" },
]

export function AssetsTab() {
  const [totalValue, setTotalValue] = useState(0)
  const [totalPnL, setTotalPnL] = useState(0)
  const [totalRewards, setTotalRewards] = useState(0)
  const [dailyFlow, setDailyFlow] = useState(0.000000095)
  const [liveRewards, setLiveRewards] = useState(105.02)

  useEffect(() => {
    const total = mockPositions.reduce((acc, pos) => acc + pos.value, 0)
    const pnl = mockPositions.reduce((acc, pos) => acc + pos.pnl, 0)
    const rewards = mockPositions.reduce((acc, pos) => acc + pos.stakingRewards, 0)

    setTotalValue(total)
    setTotalPnL(pnl)
    setTotalRewards(rewards)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRewards((prev) => prev + dailyFlow)
    }, 1000)
    return () => clearInterval(interval)
  }, [dailyFlow])

  const handleClaimAllRewards = async () => {
    console.log("[v0] Claim all rewards clicked")
    // TODO: Implement batched Superfluid CFAv1Forwarder calls
    alert("Claim All Rewards will batch Superfluid CFAv1Forwarder calls")
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      {/* Rewards Overview */}
      <Card className="p-5 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/30 glow-cyan">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold font-orbitron text-cyan-400 mb-1">TOTAL REWARDS</h2>
          <div className="text-3xl font-mono font-bold text-cyan-200 glow-cyan-text">{liveRewards.toFixed(6)} WIN</div>
          <p className="text-xs text-cyan-300 mt-1">Live streaming rewards</p>
        </div>

        <Button onClick={handleClaimAllRewards} className="w-full bg-green-500 hover:bg-green-600 font-bold text-black">
          <Gift className="w-4 h-4 mr-2" />
          CLAIM ALL REWARDS
        </Button>
      </Card>

      {/* Daily Flow */}
      <Card className="p-4 bg-card/60 border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-cyan-400 mb-1">Daily Flow Rate</div>
            <div className="text-lg font-mono font-bold text-cyan-200">{dailyFlow.toFixed(9)} WIN/s</div>
          </div>
          <Clock className="w-8 h-8 text-cyan-400" />
        </div>
      </Card>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card/50 border-cyan-500/20">
          <div className="text-xs text-cyan-400 mb-1">Total Value</div>
          <div className="text-xl font-bold font-mono text-cyan-200">${totalValue.toFixed(2)}</div>
        </Card>
        <Card className="p-4 bg-card/50 border-cyan-500/20">
          <div className="text-xs text-cyan-400 mb-1">Total PnL</div>
          <div className={`text-xl font-bold font-mono ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </div>
        </Card>
      </div>

      {/* Positions */}
      <section>
        <h3 className="text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          Your Positions
        </h3>

        <div className="space-y-3">
          {mockPositions.map((position, idx) => (
            <Card key={idx} className="p-4 bg-card/60 border-cyan-500/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-cyan-200">{position.tokenName}</h4>
                  <p className="text-xs text-cyan-400">${position.tokenSymbol}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-cyan-200">${position.value.toFixed(2)}</div>
                  <div
                    className={`text-xs font-semibold flex items-center gap-1 justify-end ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {position.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)} ({position.pnlPercent >= 0 ? "+" : ""}
                    {position.pnlPercent.toFixed(1)}%)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-500/10">
                <div>
                  <div className="text-[10px] text-cyan-400">Amount</div>
                  <div className="text-sm font-mono font-semibold text-cyan-200">
                    {position.amount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-cyan-400">Staking Rewards</div>
                  <div className="text-sm font-mono font-semibold text-green-400">+${position.stakingRewards}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Claim History */}
      <section>
        <h3 className="text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2">
          <Gift className="w-4 h-4" />
          Claim History
        </h3>

        <div className="space-y-2">
          {mockClaimHistory.map((claim, idx) => (
            <Card key={idx} className="p-3 bg-card/50 border-cyan-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-cyan-400">{claim.date}</div>
                  <div className="text-xs font-mono text-cyan-300 mt-0.5">{claim.txHash}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-green-400">
                    +{claim.amount} {claim.token}
                  </div>
                  <button className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    View <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
