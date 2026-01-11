"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Zap, TrendingUp, Clock, Flame } from "lucide-react"
import { useState, useEffect } from "react"
import { useAccount, useBalance } from "wagmi"

export function LeaderboardTab() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { data: velocityBalance } = useBalance({ address })

  // Fix: Prevent Hydration Error by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const userTokens = Number(velocityBalance?.formatted || 0)
  const hasStakeBoost = userTokens >= 10000
  const rawScore = isConnected ? 1250 : 0 
  const finalScore = hasStakeBoost ? rawScore * 2 : rawScore

  return (
    <div className="px-4 pt-4 pb-32 space-y-5 max-w-[500px] mx-auto italic">
      {/* SEASON PRIZE POOL */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/20 to-black p-4 border border-yellow-500/40 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <h2 className="text-[11px] font-black font-orbitron text-white uppercase tracking-tighter leading-none">Season 1 Prizes</h2>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20">
            <Clock className="w-3 h-3" /> 24d 14h
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {["#1: 1W BOOST", "#2: 1H BOOST", "#3: 10K DROP"].map((prize, i) => (
            <div key={i} className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-center">
              <p className="text-[8px] font-bold text-white uppercase leading-tight">{prize}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STAKE/BUY ACTIONS */}
      <Card className="p-3 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Flame className={`w-4 h-4 ${hasStakeBoost ? "text-orange-500 animate-pulse" : "text-primary"}`} />
          </div>
          <div className="text-left leading-tight">
            <p className="text-[9px] font-black text-primary uppercase">Hold 10K $VX</p>
            <p className="text-[7px] font-bold text-white/50 uppercase italic">Get 2X Score Multiplier</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" className="h-7 px-2.5 bg-primary/20 hover:bg-primary/30 text-primary font-black text-[8px] uppercase border border-primary/40 rounded-lg italic">STAKE</Button>
          <Button size="sm" className="h-7 px-2.5 bg-primary text-black font-black text-[8px] uppercase rounded-lg shadow-lg italic">BUY $VX</Button>
        </div>
      </Card>

      {/* GLOBAL STANDINGS AREA */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Users className="w-3 h-3 text-primary" />
          <h3 className="text-[9px] font-black font-orbitron text-primary uppercase tracking-[0.2em] italic">Global Standings</h3>
        </div>

        <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl bg-black/20">
          <Zap className="w-6 h-6 text-primary/10 mx-auto mb-2" />
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-40">Syncing Chain Data...</p>
        </div>
      </section>

      {/* SHRUNK FOOTER BAR - NO HYDRATION ERROR */}
      <div className="fixed bottom-[84px] left-0 right-0 px-4 z-[100]">
        <div className="p-2.5 bg-primary border-none shadow-[0_0_30px_rgba(0,255,255,0.3)] rounded-xl flex items-center justify-between max-w-[440px] mx-auto">
          <div className="flex gap-4 items-center">
            <div className="text-left leading-none">
              <p className="text-[7px] font-black text-black/50 uppercase italic mb-0.5">Rank</p>
              <p className="text-base font-black font-orbitron text-black italic">
                {isConnected && hasStakeBoost ? "#--" : "N/A"}
              </p>
            </div>
            <div className="w-[1px] h-6 bg-black/10" />
            <div className="text-left leading-none">
              <p className="text-[7px] font-black text-black/50 uppercase italic mb-0.5">Score</p>
              <div className="flex items-center gap-1">
                <p className="text-base font-black font-orbitron text-black italic leading-none uppercase">
                  {isConnected ? finalScore.toLocaleString() : "0"}
                </p>
                {hasStakeBoost && <Zap className="w-2.5 h-2.5 text-black" />}
              </div>
            </div>
          </div>
          <div className="text-right leading-none">
            <p className="text-[7px] font-black text-black/50 uppercase italic mb-0.5">Holdings</p>
            <p className="text-[10px] font-mono font-black text-black italic">
               {userTokens.toLocaleString()} $VX
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}