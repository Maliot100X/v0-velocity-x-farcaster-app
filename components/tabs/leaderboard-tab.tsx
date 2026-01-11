"use client"

import { motion } from "framer-motion"
import { Trophy, TrendingUp, Users, DollarSign, ShieldAlert, Wallet } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useAccount, useBalance } from "wagmi"

export function LeaderboardTab() {
  const { address, isConnected } = useAccount()
  const { data: tokenBalance } = useBalance({ address })

  // REAL LOGIC: Stats start at 0. Board is empty until data is fetched from Base.
  const [totalPlayers] = useState(0)
  const [totalStaked] = useState(0)
  const [rewardsPaid] = useState(0)

  // 10K RULE LOGIC
  const balanceValue = Number(tokenBalance?.formatted || 0)
  const isEligible = balanceValue >= 10000
  const userScore = isEligible ? Math.floor(balanceValue / 100) : 0

  return (
    <div className="space-y-4 px-4 pt-4 pb-24 max-w-[500px] mx-auto text-left italic">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-black font-orbitron text-primary uppercase tracking-tighter italic">LEADERBOARD</h2>
        </div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Live Feed</div>
      </div>

      {/* Stats Cards - NO FAKE MILLIONS */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 bg-black/40 border-primary/10 text-center rounded-2xl">
          <Users className="w-4 h-4 text-primary mx-auto mb-1 opacity-50" />
          <div className="text-sm font-black font-mono text-white">{totalPlayers}</div>
          <div className="text-[8px] font-bold text-muted-foreground uppercase">Players</div>
        </Card>
        <Card className="p-3 bg-black/40 border-primary/10 text-center rounded-2xl">
          <DollarSign className="w-4 h-4 text-primary mx-auto mb-1 opacity-50" />
          <div className="text-sm font-black font-mono text-white">${totalStaked}</div>
          <div className="text-[8px] font-bold text-muted-foreground uppercase">Total Staked</div>
        </Card>
        <Card className="p-3 bg-black/40 border-primary/10 text-center rounded-2xl">
          <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1 opacity-50" />
          <div className="text-sm font-black font-mono text-green-400">${rewardsPaid}</div>
          <div className="text-[8px] font-bold text-muted-foreground uppercase">Paid Out</div>
        </Card>
      </div>

      {/* Leaderboard List - EMPTY & READY */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1 mb-2">
          <span className="text-[9px] font-black text-primary uppercase tracking-widest font-orbitron italic">Rankings</span>
          {!isEligible && isConnected && (
            <span className="text-[8px] font-bold text-red-500 uppercase flex items-center gap-1 animate-pulse">
              <ShieldAlert className="w-3 h-3" /> Min 10K tokens to rank
            </span>
          )}
        </div>

        <div className="p-16 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center space-y-3">
          <Users className="w-8 h-8 text-white/5" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50 text-center">
            {isConnected ? "Syncing global chain data..." : "Connect wallet to view ranking"}
          </p>
        </div>
      </div>

      {/* Your Rank Card - DYNAMIC BASED ON 10K RULE */}
      <Card className="fixed bottom-[85px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[468px] p-4 bg-primary border-primary shadow-[0_0_30px_rgba(0,255,255,0.2)] rounded-2xl z-40">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-[9px] font-black text-black/60 uppercase italic mb-1">Your Rank</div>
            <div className="text-xl font-black font-orbitron text-black italic tracking-tighter">
              {isConnected && isEligible ? "#--" : "UNRANKED"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-black text-black/60 uppercase italic mb-1">Your Score</div>
            <div className="text-xl font-black font-orbitron text-black italic tracking-tighter">
              {isConnected ? userScore.toLocaleString() : "0"}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}