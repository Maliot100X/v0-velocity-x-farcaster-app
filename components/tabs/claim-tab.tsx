"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, TrendingUp, Clock, History, Wallet, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi"

export function ClaimTab() {
  const { isConnected, address } = useAccount()
  
  // REAL STATE: Starts at 0. No more hardcoded 42.18.
  const [claimableRewards, setClaimableRewards] = useState(0.00)
  const [dailyFlow, setDailyFlow] = useState(0.00)

  // This will tick once we wire the real flow rate from the contract
  useEffect(() => {
    if (!isConnected || dailyFlow <= 0) return
    const interval = setInterval(() => {
      const increment = dailyFlow / 86400
      setClaimableRewards((prev) => prev + increment)
    }, 1000)
    return () => clearInterval(interval)
  }, [dailyFlow, isConnected])

  return (
    <div className="px-4 pt-6 pb-24 space-y-4 max-w-[500px] mx-auto text-left">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-black font-orbitron text-primary italic uppercase tracking-tighter">CLAIM REWARDS</h2>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/20 to-black border-primary/30 glow-cyan rounded-3xl">
        <div className="text-center mb-6">
          <div className="text-[10px] font-bold text-cyan-300 mb-2 uppercase tracking-widest italic">Claimable Rewards</div>
          <div className="text-4xl font-mono font-black text-white tracking-tighter mb-1 leading-none">
            ${claimableRewards.toFixed(2)}
          </div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase italic">Across all protocol vaults</div>
        </div>

        <Button 
          disabled={!isConnected || claimableRewards <= 0}
          className="w-full bg-primary hover:bg-primary/90 text-black font-black py-6 text-lg rounded-2xl uppercase italic shadow-lg"
        >
          <Gift className="w-5 h-5 mr-2" />
          CLAIM ALL REWARDS
        </Button>
      </Card>

      <Card className="p-4 bg-black/40 border-primary/20 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-cyan-400 uppercase italic">DAILY FLOW RATE</span>
          </div>
          <div className="text-lg font-mono font-bold text-white italic tracking-tighter">
            ${dailyFlow.toFixed(2)}<span className="text-[10px] text-muted-foreground">/day</span>
          </div>
        </div>
      </Card>

      <div className="pt-2">
        <div className="flex items-center gap-2 mb-3 px-1">
          <History className="w-4 h-4 text-primary" />
          <h3 className="text-[10px] font-black font-orbitron text-primary uppercase tracking-widest italic">CLAIM HISTORY</h3>
        </div>
        
        <div className="space-y-2">
          {isConnected ? (
             <div className="p-10 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center">
                <Clock className="w-6 h-6 text-white/10 mb-2" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50">
                  No claim history found on Base
                </p>
             </div>
          ) : (
            <div className="p-10 text-center border border-primary/10 rounded-3xl bg-black/40 flex flex-col items-center">
               <Wallet className="w-6 h-6 text-primary/20 mb-2" />
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50">
                 Connect Wallet to view rewards history
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}