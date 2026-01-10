"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Search, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface BuyTabProps {
  onTokenSelect: (tokenId: string) => void
}

const ethPresets = ["0.001", "0.01", "0.1", "1"]

const recentBuys = [
  { token: "VEL", amount: "0.05 ETH", received: "12,500 VEL", time: "2m ago", buyer: "@alice" },
  { token: "CLNK", amount: "0.1 ETH", received: "11,200 CLNK", time: "5m ago", buyer: "@bob" },
  { token: "MOON", amount: "0.02 ETH", received: "1,280 MOON", time: "8m ago", buyer: "@charlie" },
  { token: "VEL", amount: "0.15 ETH", received: "37,500 VEL", time: "12m ago", buyer: "@david" },
]

export function BuyTab({ onTokenSelect }: BuyTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedToken, setSelectedToken] = useState("VEL")
  const [ethAmount, setEthAmount] = useState("")
  const [estimatedReceive, setEstimatedReceive] = useState("0")

  const handlePresetClick = (amount: string) => {
    setEthAmount(amount)
    // Mock calculation
    const estimate = (Number.parseFloat(amount) * 250000).toFixed(0)
    setEstimatedReceive(estimate)
  }

  return (
    <div className="space-y-4 px-4 pt-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold font-orbitron text-foreground">BUY TOKENS</h2>
      </div>

      {/* Token Selector */}
      <Card className="p-4 bg-card/60 border-primary/20">
        <div className="space-y-3">
          <label className="text-xs text-muted-foreground font-medium">SELECT TOKEN</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["VEL", "CLNK", "MOON", "BMEME"].map((token) => (
              <Button
                key={token}
                variant={selectedToken === token ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedToken(token)}
                className={selectedToken === token ? "glow-cyan-sm" : ""}
              >
                {token}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Buy Panel */}
      <Card className="p-4 bg-card/60 border-primary/20 glow-cyan-sm">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground font-medium mb-2 block">AMOUNT (ETH)</label>
            <Input
              type="number"
              placeholder="0.0"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="text-lg font-mono bg-background/50 border-primary/20"
            />
          </div>

          {/* ETH Presets */}
          <div className="grid grid-cols-4 gap-2">
            {ethPresets.map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick(preset)}
                className="font-mono"
              >
                {preset}
              </Button>
            ))}
          </div>

          {/* Estimated Receive */}
          <div className="p-3 bg-background/50 rounded-lg border border-primary/10">
            <div className="text-xs text-muted-foreground mb-1">ESTIMATED RECEIVE</div>
            <div className="text-xl font-mono font-bold text-primary">
              {estimatedReceive} {selectedToken}
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Balance</span>
            <span className="font-mono">0.5 ETH</span>
          </div>

          {/* Buy Button */}
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold glow-cyan-sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            BUY {selectedToken}
          </Button>
        </div>
      </Card>

      {/* Recent Buys */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold font-orbitron text-foreground">RECENT BUYS</h3>
        </div>
        <div className="space-y-2">
          {recentBuys.map((buy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-3 bg-card/40 border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{buy.token}</span>
                      <span className="text-xs text-primary/70">{buy.buyer}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {buy.amount} → {buy.received}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{buy.time}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
