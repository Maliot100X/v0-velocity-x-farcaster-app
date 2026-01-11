"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Zap, Clock, Flame, Info } from "lucide-react"
import { useState } from "react"
import { useAccount, useBalance } from "wagmi"

export function LeaderboardTab() {
  const { address, isConnected } = useAccount()
  const { data: tokenBalance } = useBalance({ address })

  const userTokens = Number(tokenBalance?.formatted || 0)
  
  // LOGIC: Holding 10k is OPTIONAL for a 2x boost. 
  // Base score comes from "Doing Tasks" (placeholder rawScore)
  const [rawTaskScore] = useState(1250) 
  const hasBoost = userTokens >= 10000
  const finalScore = hasBoost ? rawTaskScore * 2 : rawTaskScore

  return (
    <div className="px-4 pt-4 pb-28 space-y-5 max-w-[500px] mx-auto italic">
      {/* COMPACT PRIZE POOL */}
      <section className="rounded-2xl bg-gradient-to-br from-yellow-500/10 to-black p-4 border border-yellow-500/20">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <h2 className="text-[10px] font-black font-orbitron text-white uppercase tracking-tighter">Season 1 Prizes</h2>
          </div>
          <div className="text-[9px] font-mono font-bold text-yellow-500 flex items-center gap-1">
            <Clock className="w-3 h-3" /> 24d 14h
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[8px] font-bold uppercase">
          <div className="py-1 bg-white/5 rounded-lg border border-white/5">#1: 1W Boost</div>
          <div className="py-1 bg-white/5 rounded-lg border border-white/5">#2: 1H Boost</div>
          <div className="py-1 bg-white/5 rounded-lg border border-white/5">#3: 10K Drop</div>
        </div>
      </section>

      {/* OPTIONAL BOOST BAR */}
      <div className="flex items-center justify-between px-3 py-2 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex items-center gap-2">
          <Flame className={`w-4 h-4 ${hasBoost ? "text-orange-500 animate-pulse" : "text-primary/40"}`} />
          <p className="text-[9px] font-bold text-white/80 uppercase tracking-tighter">
            {hasBoost ? "2X BOOST ACTIVE" : "Hold 10K $VX for 2x Score"}
          </p>
        </div>
        <button className="text-[9px] font-black text-primary uppercase underline decoration-primary/30">
          {hasBoost ? "Staked" : "Get Boost"}
        </button>
      </div>

      {/* RANKINGS LIST */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Users className="w-3 h-3 text-primary" />
          <h3 className="text-[10px] font-black font-orbitron text-primary uppercase tracking-widest italic">Live Standings</h3>
        </div>

        <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-black/20">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-40">
            Syncing Global Users...
          </p>
        </div>
      </section>

      {/* SMALLER PERSONAL BAR */}
      <div className="fixed bottom-[82px] left-0 right-0 px-4 z-50">
        <Card className="p-3 bg-primary border-none shadow-xl rounded-xl flex items-center justify-between max-w-[450px] mx-auto">
          <div className="flex gap-5 items-center">
            <div className="text-left leading-none">
              <p className="text-[7px] font-black text-black/50 uppercase italic mb-1">Rank</p>
              <p className="text-lg font-black font-orbitron text-black">#--</p>
            </div>
            <div className="w-[1px] h-6 bg-black/10" />
            <div className="text-left leading-none">
              <p className="text-[7px] font-black text-black/50 uppercase italic mb-1">Score</p>
              <div className="flex items-center gap-1">
                <p className="text-lg font-black font-orbitron text-black">{isConnected ? finalScore : 0}</p>
                {hasBoost && <Zap className="w-3 h-3 text-black animate-pulse" />}
              </div>
            </div>
          </div>
          <div className="text-right leading-none">
            <p className="text-[7px] font-black text-black/50 uppercase italic mb-1">Holdings</p>
            <p className="text-[10px] font-mono font-black text-black italic">{userTokens.toLocaleString()} $VX</p>
          </div>
        </Card>
      </div>
    </div>
  )
}