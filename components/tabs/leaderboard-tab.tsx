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

  // Real Stats initialized at ZERO
  const [globalPlayers] = useState(0)
  const [globalStaked] = useState(0)
  const [globalPaid] = useState(0)
  const [userRank] = useState("N/A")
  const [taskScore] = useState(0) // START AT ZERO - NO FAKE 1250

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const userTokens = Number(velocityBalance?.formatted || 0)
  const hasBoost = userTokens >= 10000
  // Score only exists if user has done tasks (currently 0)
  const finalScore = hasBoost ? taskScore * 2 : taskScore

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

      {/* STATS CARDS - REAL ZERO DATA */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 bg-black/40 border-primary/20 text-center rounded-2xl">
          <Users className="w-4 h-4 text-primary mx-auto mb-1 opacity-50" />
          <div className="text-sm font-black font-mono text-white">{globalPlayers}</div>
          <div className="text-[8px] font-bold text-muted-foreground uppercase">Players</div>
        </Card>
        <Card className="p-3 bg-black/40 border-primary/20 text-center rounded-2xl">
          <TrendingUp className="w-4 h-4 text-accent mx-auto mb-1 opacity-50" />
          <div className="text-sm font-black font-mono text-white">${globalStaked}</div>
          <div className="text-[8px] font-bold text-muted-foreground uppercase">Staked</div>
        </Card>
        <Card className="p-3 bg-black/40 border-primary/20 text-center rounded-2xl">
          <Zap className="w-4 h-4 text-green-400 mx-auto mb-1 opacity-50" />
          <div className="text-sm font-black font-mono text-green-400">${globalPaid}</div>
          <div className="text-[8px] font-bold text-muted-foreground uppercase">Paid Out</div>
        </Card>
      </div>

      {/* ACTIONS */}
      <Card className="p-3 bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Flame className={`w-4 h-4 ${hasBoost ? "text-orange-500 animate-pulse" : "text-primary"}`} />
          </div>
          <div className="text-left leading-tight">
            <p className="text-[9px] font-black text-primary uppercase">2X SCORE BOOST</p>
            <p className="text-[7px] font-bold text-white/50 uppercase italic tracking-tighter">Hold 10K $VX (Optional)</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" className="h-7 px-2.5 bg-primary/20 hover:bg-primary/30 text-primary font-black text-[8px] uppercase border border-primary/40 rounded-lg italic">STAKE</Button>
          <Button size="sm" className="h-7 px-2.5 bg-primary text-black font-black text-[8px] uppercase rounded-lg shadow-lg italic">BUY $VX</Button>
        </div>
      </Card>

      {/* SYNCING DATA */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1 text-left">
          <Users className="w-3 h-3 text-primary" />
          <h3 className="text-[9px] font-black font-orbitron text-primary uppercase tracking-[0.2em] italic">Live Standings</h3>
        </div>
        <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl bg-black/20">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-40 italic">Scanning Base Mainnet...</p>
        </div>
      </section>

      {/* SHRUNK FOOTER - DYNAMIC DATA */}
      <div className="fixed bottom-[84px] left-0 right-0 px-4 z-[100]">
        <div className="p-2.5 bg-primary border-none shadow-[0_0_30px_rgba(0,255,255,0.3)] rounded-xl flex items-center justify-between max-w-[440px] mx-auto">
          <div className="flex gap-4 items-center">
            <div className="text-left leading-none">
              <p className="text-[7px] font-black text-black/50 uppercase italic mb-0.5 tracking-tighter">Rank</p>
              <p className="text-base font-black font-orbitron text-black italic">
                {isConnected ? userRank : "N/A"}
              </p>
            </div>
            <div className="w-[1px] h-6 bg-black/10" />
            <div className="text-left leading-none">
              <p className="text-[7px] font-black text-black/50 uppercase italic mb-0.5 tracking-tighter">Score</p>
              <div className="flex items-center gap-1">
                <p className="text-base font-black font-orbitron text-black italic leading-none uppercase">
                  {isConnected ? finalScore : 0}
                </p>
                {hasBoost && <Zap className="w-2.5 h-2.5 text-black" />}
              </div>
            </div>
          </div>
          <div className="text-right leading-none">
            <p className="text-[7px] font-black text-black/50 uppercase italic mb-0.5 tracking-tighter">Holdings</p>
            <p className="text-[10px] font-mono font-black text-black italic">
               {isConnected ? (velocityBalance?.formatted.slice(0, 6) || "0") : "0"} <span className="text-[7px]">$VX</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}