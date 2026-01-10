"use client"

import { motion } from "framer-motion"
import { Trophy, TrendingUp, Users, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface LeaderEntry {
  rank: number
  handle: string
  totalStaked: string
  tokensCreated: number
  rewardsEarned: string
  score: number
}

const mockLeaderboard: LeaderEntry[] = [
  {
    rank: 1,
    handle: "@velocityking",
    totalStaked: "$142,500",
    tokensCreated: 12,
    rewardsEarned: "$8,420",
    score: 9850,
  },
  { rank: 2, handle: "@moonwhale", totalStaked: "$128,300", tokensCreated: 8, rewardsEarned: "$7,120", score: 9340 },
  { rank: 3, handle: "@basebuilder", totalStaked: "$98,750", tokensCreated: 15, rewardsEarned: "$6,890", score: 8920 },
  { rank: 4, handle: "@cryptolord", totalStaked: "$87,200", tokensCreated: 6, rewardsEarned: "$5,340", score: 8150 },
  { rank: 5, handle: "@stakepro", totalStaked: "$76,400", tokensCreated: 9, rewardsEarned: "$4,820", score: 7680 },
  { rank: 6, handle: "@yieldmaster", totalStaked: "$65,100", tokensCreated: 7, rewardsEarned: "$4,120", score: 7240 },
  { rank: 7, handle: "@tokenking", totalStaked: "$58,900", tokensCreated: 11, rewardsEarned: "$3,890", score: 6890 },
  { rank: 8, handle: "@degenape", totalStaked: "$52,300", tokensCreated: 5, rewardsEarned: "$3,450", score: 6520 },
  { rank: 9, handle: "@hodlgod", totalStaked: "$47,800", tokensCreated: 8, rewardsEarned: "$3,120", score: 6180 },
  { rank: 10, handle: "@moonfarmer", totalStaked: "$43,200", tokensCreated: 6, rewardsEarned: "$2,890", score: 5920 },
]

export function LeaderboardTab() {
  const [liveScores, setLiveScores] = useState(mockLeaderboard.map((e) => e.score))

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveScores((prev) => prev.map((score) => score + Math.floor(Math.random() * 5)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-foreground">LEADERBOARD</h2>
        </div>
        <div className="text-xs text-muted-foreground">Live Rankings</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 bg-card/60 border-primary/20 text-center">
          <Users className="w-4 h-4 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold font-mono">1,234</div>
          <div className="text-[10px] text-muted-foreground">Players</div>
        </Card>
        <Card className="p-3 bg-card/60 border-primary/20 text-center">
          <DollarSign className="w-4 h-4 text-accent mx-auto mb-1" />
          <div className="text-lg font-bold font-mono">$2.4M</div>
          <div className="text-[10px] text-muted-foreground">Total Staked</div>
        </Card>
        <Card className="p-3 bg-card/60 border-primary/20 text-center">
          <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold font-mono">$420K</div>
          <div className="text-[10px] text-muted-foreground">Rewards Paid</div>
        </Card>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {mockLeaderboard.map((entry, idx) => {
          const getRankColor = (rank: number) => {
            if (rank === 1) return "text-yellow-400"
            if (rank === 2) return "text-gray-300"
            if (rank === 3) return "text-amber-600"
            return "text-muted-foreground"
          }

          return (
            <motion.div
              key={entry.handle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className={`p-4 bg-card/60 border-primary/20 hover:border-primary/40 transition-all ${
                  entry.rank <= 3 ? "glow-cyan-sm" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className={`text-2xl font-bold font-mono ${getRankColor(entry.rank)}`}>#{entry.rank}</div>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground truncate">{entry.handle}</h3>
                      <div className="text-right ml-2">
                        <div className="text-sm font-bold text-primary font-mono">{liveScores[idx]}</div>
                        <div className="text-[10px] text-muted-foreground">Score</div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground text-[10px]">Staked</div>
                        <div className="font-medium text-foreground">{entry.totalStaked}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-[10px]">Created</div>
                        <div className="font-medium text-foreground">{entry.tokensCreated} tokens</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-[10px]">Rewards</div>
                        <div className="font-medium text-accent">{entry.rewardsEarned}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Your Rank Card */}
      <Card className="p-4 bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30 glow-cyan-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-1">YOUR RANK</div>
            <div className="text-2xl font-bold font-mono text-primary">#142</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">YOUR SCORE</div>
            <div className="text-2xl font-bold font-mono text-accent">3,450</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
