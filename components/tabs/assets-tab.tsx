"use client"

import { Wallet, TrendingUp, TrendingDown, Gift, Clock, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
// PHASE 2: Superfluid Integration
import { useAccount, useReadContract } from "wagmi"

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
]

export function AssetsTab() {
  const { address, isConnected } = useAccount()
  const [totalValue, setTotalValue] = useState(0)
  const [totalPnL, setTotalPnL] = useState(0)
  
  // SUPERFLUID LIVE TICKING REWARDS
  // 0.000000095 is your daily flow rate per second
  const [dailyFlow, setDailyFlow] = useState(0.000000095)
  const [liveRewards, setLiveRewards] = useState(105.02)

  useEffect(() => {
    const total = mockPositions.reduce((acc, pos) => acc + pos.value, 0)
    const pnl = mockPositions.reduce((acc, pos) => acc + pos.pnl, 0)
    setTotalValue(total)
    setTotalPnL(pnl)
  }, [])

  // THE REWARDS TICKER: Increases every 100ms for that "Live Money" feel
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      // Divide dailyFlow by 10 to match the 100ms interval
      setLiveRewards((prev) => prev + (dailyFlow / 10))
    }, 100)
    return () => clearInterval(interval)
  }, [isConnected, dailyFlow])

  const handleClaimAllRewards = async () => {
    if (!isConnected) {
      alert("Please SYNC wallet first")
      return
    }
    console.log("[Velocity X] Claiming Superfluid Stream for:", address)
    alert("Streaming rewards are being settled via Superfluid CFAv1...")
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-4">
      {/* Rewards Overview */}
      <Card className="p-5 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold font-orbitron text-cyan-400 mb-1 tracking-tighter">TOTAL REWARDS</h2>
          <div className="text-3xl font-mono font-bold text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            {isConnected ? liveRewards.toFixed(8) : "0.000000"} <span className="text-sm italic text-cyan-500">WIN</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-cyan-300 mt-1 opacity-70 italic">Live streaming rewards (20% Staking)</p>
        </div>

        <Button onClick={handleClaimAllRewards} className="w-full bg-green-500 hover:bg-green-600 font-bold text-black border-none transition-all hover:scale-[1.02]">
          <Gift className="w-4 h-4 mr-2" />
          CLAIM ALL REWARDS
        </Button>
      </Card>

      {/* Daily Flow */}
      <Card className="p-4 bg-card/60 border-cyan-500/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase text-cyan-400 mb-1 font-bold">Daily Flow Rate</div>
            <div className="text-lg font-mono font-bold text-cyan-200 tracking-tighter">{dailyFlow.toFixed(9)} WIN/s</div>
          </div>
          <Clock className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </Card>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card/50 border-cyan-500/20">
          <div className="text-[10px] uppercase text-cyan-400 mb-1 font-bold">Total Value</div>
          <div className="text-xl font-bold font-mono text-cyan-200">${totalValue.toFixed(2)}</div>
        </Card>
        <Card className="p-4 bg-card/50 border-cyan-500/20">
          <div className="text-[10px] uppercase text-cyan-400 mb-1 font-bold">Total PnL</div>
          <div className={`text-xl font-bold font-mono ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </div>
        </Card>
      </div>

      {/* Positions */}
      <section>
        <h3 className="text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2 uppercase font-orbitron">
          <Wallet className="w-4 h-4" />
          Your Positions
        </h3>

        <div className="space-y-3">
          {mockPositions.map((position, idx) => (
            <Card key={idx} className="p-4 bg-card/60 border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-cyan-200">{position.tokenName}</h4>
                  <p className="text-xs text-cyan-400 italic">${position.tokenSymbol}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-cyan-200">${position.value.toFixed(2)}</div>
                  <div className={`text-xs font-semibold flex items-center gap-1 justify-end ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {position.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {position.pnlPercent.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-500/10">
                <div>
                  <div className="text-[10px] uppercase text-cyan-400 opacity-60 font-bold tracking-tighter">Amount</div>
                  <div className="text-sm font-mono font-semibold text-cyan-200">{position.amount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-cyan-400 opacity-60 font-bold tracking-tighter">Staking Rewards</div>
                  <div className="text-sm font-mono font-semibold text-green-400">+${position.stakingRewards}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}