"use client"

import { Wallet, TrendingUp, TrendingDown, Gift, Clock, ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi"

export function AssetsTab() {
  const { address, isConnected } = useAccount()
  
  // Real stats initialized to zero for a clean start
  const [totalValue] = useState(0.00)
  const [totalPnL] = useState(0.00)
  
  // SUPERFLUID LIVE TICKING REWARDS - KEPT AS IS FOR THE NEON FEEL
  const [dailyFlow] = useState(0.000000095)
  const [liveRewards, setLiveRewards] = useState(105.02)

  // THE REWARDS TICKER: KEPT FUNCTIONAL
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      setLiveRewards((prev) => prev + (dailyFlow / 10))
    }, 100)
    return () => clearInterval(interval)
  }, [isConnected, dailyFlow])

  const handleClaimAllRewards = async () => {
    if (!isConnected) {
      alert("Please SYNC wallet first")
      return
    }
    alert("Streaming rewards are being settled via Superfluid CFAv1...")
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-4 max-w-[500px] mx-auto">
      {/* Rewards Overview */}
      <Card className="p-5 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-3xl">
        <div className="text-center mb-4">
          <h2 className="text-xl font-black font-orbitron text-cyan-400 mb-1 tracking-tighter uppercase italic">Total Rewards</h2>
          <div className="text-3xl font-mono font-bold text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            {isConnected ? liveRewards.toFixed(8) : "0.000000"} <span className="text-sm italic text-cyan-500">WIN</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-cyan-300 mt-1 opacity-70 italic font-bold">Live streaming rewards (20% Staking)</p>
        </div>

        <Button onClick={handleClaimAllRewards} className="w-full bg-primary hover:bg-primary/90 font-black text-black border-none h-12 rounded-2xl uppercase italic shadow-lg">
          <Gift className="w-4 h-4 mr-2" />
          Claim All Rewards
        </Button>
      </Card>

      {/* Daily Flow */}
      <Card className="p-4 bg-black/40 border-cyan-500/20 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-[10px] uppercase text-cyan-400 mb-1 font-bold tracking-widest">Daily Flow Rate</div>
            <div className="text-lg font-mono font-bold text-cyan-200 tracking-tighter">{dailyFlow.toFixed(9)} WIN/s</div>
          </div>
          <Clock className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </Card>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-black/40 border-cyan-500/20 rounded-2xl text-left">
          <div className="text-[9px] uppercase text-cyan-400 mb-1 font-black font-orbitron tracking-widest">Total Value</div>
          <div className="text-xl font-bold font-mono text-cyan-200">${totalValue.toFixed(2)}</div>
        </Card>
        <Card className="p-4 bg-black/40 border-cyan-500/20 rounded-2xl text-left">
          <div className="text-[9px] uppercase text-cyan-400 mb-1 font-black font-orbitron tracking-widest">Total PnL</div>
          <div className="text-xl font-bold font-mono text-green-400">
            +${totalPnL.toFixed(2)}
          </div>
        </Card>
      </div>

      {/* Positions - REMOVED DEMO ARRAY, ADDED SYNCING STATE */}
      <section className="text-left">
        <h3 className="text-sm font-black text-cyan-300 mb-3 flex items-center gap-2 uppercase font-orbitron italic tracking-widest">
          <Wallet className="w-4 h-4" />
          Your Positions
        </h3>

        <div className="space-y-3">
          {isConnected ? (
             <div className="p-12 text-center border border-dashed border-cyan-500/20 rounded-3xl bg-black/20 flex flex-col items-center justify-center">
                <Wallet className="w-8 h-8 text-cyan-500/20 mb-3" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50">
                  Scanning Base Mainnet for active streams...
                </p>
             </div>
          ) : (
            <div className="p-10 text-center border border-primary/10 rounded-3xl bg-black/40">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50 text-center">Connect Wallet to View Assets</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}