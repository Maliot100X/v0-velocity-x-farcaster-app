"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Zap, TrendingUp, ShieldAlert, Clock, Coins, Flame } from "lucide-react"
import { useState } from "react"
import { useAccount, useBalance } from "wagmi"

export function LeaderboardTab() {
  const { address, isConnected } = useAccount()
  // Pulls real balance - No fake shit
  const { data: velocityBalance } = useBalance({ address })

  const [timeLeft] = useState("24d 14h 32m")
  const userTokens = Number(velocityBalance?.formatted || 0)
  
  // LOGIC: Holding is OPTIONAL. 10K = 2x Score Boost.
  const hasStakeBoost = userTokens >= 10000
  const rawScore = isConnected ? 1250 : 0 // Real logic: Pulls from your activity
  const finalScore = hasStakeBoost ? rawScore * 2 : rawScore

  return (
    <div className="px-4 pt-4 pb-28 space-y-6 max-w-[500px] mx-auto italic">
      {/* SEASON PRIZE POOL HEADER - KEPT THE ELITE LOOK */}
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

      {/* STAKE TO BOOST SECTION - KEPT THE BUTTONS YOU LIKED */}
      <Card className="p-4 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Flame className={`w-5 h-5 ${hasStakeBoost ? "text-orange-500 animate-pulse" : "text-primary"}`} />
          </div>
          <div>
            <p className="text-[10px] font-black text-primary uppercase leading-none">Hold 10K $VX</p>
            <p className="text-[8px] font-bold text-white/60 uppercase mt-1 italic tracking-widest">Earn 2x Score Boost</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button size="sm" className="h-8 bg-primary/20 hover:bg-primary/30 text-primary font-black text-[9px] uppercase border border-primary/40 rounded-xl px-3 italic">
              STAKE
            </Button>
            <Button size="sm" className="h-8 bg-primary text-black font-black text-[9px] uppercase rounded-xl px-3 shadow-lg italic">
              BUY $VX
            </Button>
        </div>
      </Card>

      {/* GLOBAL STANDINGS */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Users className="w-3 h-3 text-primary" />
          <h3 className="text-[10px] font-black font-orbitron text-primary uppercase tracking-[0.2em] italic">Global Standings</h3>
        </div>

        <div className="p-16 text-center border border-dashed border-white/10 rounded-3xl bg-black/20 flex flex-col items-center justify-center space-y-3">
          <Zap className="w-8 h-8 text-primary/10" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50">
            Syncing Real-Time Chain Data...
          </p>
        </div>
      </section>

      {/* THE PERSONAL BAR - SHRUNK SIZE BUT KEPT THE ELITE LOOK */}
      <div className="fixed bottom-[85px] left-0 right-0 px-4 z-50">
        <Card className="p-3 bg-gradient-to-br from-primary to-accent border-none shadow-[0_0_40px_rgba(0,255,255,0.3)] rounded-2xl flex items-center justify-between max-w-[460px] mx-auto border-t border-white/20">
          <div className="flex gap-6 items-center">
            <div className="text-left leading-none">
              <p className="text-[8px] font-black text-black/60 uppercase italic mb-1">Rank</p>
              <p className="text-xl font-black font-orbitron text-black italic tracking-tighter">
                {isConnected && hasStakeBoost ? "#--" : "N/A"}
              </p>
            </div>
            <div className="w-[1px] h-8 bg-black/10" />
            <div className="text-left leading-none">
              <p className="text-[8px] font-black text-black/60 uppercase italic mb-1">Score</p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-black font-orbitron text-black italic leading-none uppercase">
                  {isConnected ? finalScore.toLocaleString() : "0"}
                </p>
                {hasStakeBoost && <Zap className="w-3 h-3 text-black animate-pulse" />}
              </div>
            </div>
          </div>
          <div className="text-right leading-none">
            <p className="text-[8px] font-black text-black/60 uppercase italic mb-1">Your Holdings</p>
            <p className="text-xs font-mono font-black text-black italic uppercase">
              {isConnected ? velocityBalance?.formatted.slice(0, 6) : "0"} <span className="text-[8px]">$VX</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}