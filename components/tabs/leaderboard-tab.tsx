"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Zap, TrendingUp, ShieldAlert, Clock, Coins, Flame } from "lucide-react"
import { useState, useEffect } from "react"
import { useAccount, useBalance } from "wagmi"

export function LeaderboardTab() {
  const { address, isConnected } = useAccount()
  // Replace with real VelocityX Token Address in the next step
  const { data: velocityBalance } = useBalance({ address })

  const [timeLeft, setTimeLeft] = useState("24d 14h 32m")
  const userTokens = Number(velocityBalance?.formatted || 0)
  
  // LOGIC: 10K Hold = Rank Eligibility | Staking = 2x Score Boost
  const isEligible = userTokens >= 10000
  const hasStakeBoost = userTokens >= 20000 // Example: higher threshold for boost
  const rawScore = isConnected ? Math.floor(userTokens / 10) : 0
  const finalScore = hasStakeBoost ? rawScore * 2 : rawScore

  return (
    <div className="px-4 pt-4 pb-32 space-y-6 max-w-[500px] mx-auto italic">
      {/* SEASON PRIZE POOL HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500/20 to-black p-5 border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h2 className="text-sm font-black font-orbitron text-white uppercase tracking-tighter">Season 1 Prize Pool</h2>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
            <Clock className="w-3 h-3" /> {timeLeft}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[7px] font-black text-muted-foreground uppercase">Top 1</p>
            <p className="text-[9px] font-bold text-white">1W BOOST</p>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[7px] font-black text-muted-foreground uppercase">Top 2</p>
            <p className="text-[9px] font-bold text-white">1H BOOST</p>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
            <p className="text-[7px] font-black text-muted-foreground uppercase">Top 3</p>
            <p className="text-[9px] font-bold text-white">10K DROP</p>
          </div>
        </div>
      </section>

      {/* STAKE TO BOOST SECTION - Real Button */}
      <Card className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Flame className={`w-5 h-5 ${hasStakeBoost ? "text-orange-500 animate-pulse" : "text-primary"}`} />
          </div>
          <div>
            <p className="text-[10px] font-black text-primary uppercase leading-none">Stake 10K $VX</p>
            <p className="text-[8px] font-bold text-white/60 uppercase mt-1 italic">Earn 2x Daily Score</p>
          </div>
        </div>
        <Button className="h-9 px-4 bg-primary text-black font-black text-[10px] uppercase italic rounded-xl shadow-lg">
          {userTokens >= 10000 ? "Stake Now" : "Buy $VX"}
        </Button>
      </Card>

      {/* RANKINGS LIST */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-black font-orbitron text-primary uppercase tracking-widest italic flex items-center gap-2">
            <Users className="w-3 h-3" /> Global Standings
          </h3>
          {!isEligible && isConnected && (
             <p className="text-[8px] font-bold text-red-500 uppercase animate-pulse flex items-center gap-1">
               <ShieldAlert className="w-2 h-2" /> Minimum 10K required
             </p>
          )}
        </div>

        <div className="p-16 text-center border border-dashed border-white/10 rounded-3xl bg-black/20 flex flex-col items-center justify-center space-y-3">
          <Zap className="w-8 h-8 text-primary/10" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50">
            Syncing Real-Time Chain Data...
          </p>
        </div>
      </section>

      {/* YOUR RANK - FIXED BAR */}
      <div className="fixed bottom-[85px] left-0 right-0 px-4 z-50">
        <Card className="p-4 bg-gradient-to-br from-primary to-accent border-none shadow-[0_0_40px_rgba(0,255,255,0.3)] rounded-2xl flex items-center justify-between max-w-[468px] mx-auto">
          <div className="flex gap-8">
            <div className="text-left">
              <p className="text-[8px] font-black text-black/60 uppercase italic">Your Rank</p>
              <p className="text-2xl font-black font-orbitron text-black italic leading-none">
                {isConnected && isEligible ? "#--" : "N/A"}
              </p>
            </div>
            <div className="text-left">
              <p className="text-[8px] font-black text-black/60 uppercase italic">Your Score</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-black font-orbitron text-black italic leading-none">
                  {isConnected ? finalScore.toLocaleString() : "0"}
                </p>
                {hasStakeBoost && <span className="text-[10px] font-black bg-black text-primary px-1 rounded">2X</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[8px] font-black text-black/60 uppercase italic">Holdings</p>
            <p className="text-xs font-mono font-black text-black">{userTokens.toLocaleString()} $VX</p>
          </div>
        </Card>
      </div>
    </div>
  )
}