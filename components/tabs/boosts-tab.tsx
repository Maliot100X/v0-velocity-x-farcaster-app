"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Rocket, Sparkles } from "lucide-react"

const RECIPIENT_ADDRESS = "0x1909b332397144aeb4867B7274a05Dbb25bD1Fec"

export function BoostsTab() {
  const boosts = [
    {
      icon: Zap,
      name: "Lucky Boost",
      multiplier: "x2",
      description: "Double your rewards for the next hour",
      price: "$3",
      color: "from-cyan-500/20 to-blue-600/10",
      borderColor: "border-cyan-400/30",
      iconColor: "text-cyan-400",
    },
    {
      icon: Rocket,
      name: "Hyper Velocity",
      multiplier: "x3",
      description: "Triple rewards for maximum gains",
      price: "$3",
      color: "from-purple-500/20 to-pink-600/10",
      borderColor: "border-purple-400/30",
      iconColor: "text-purple-400",
    },
  ]

  const handlePurchaseBoost = (boostName: string, price: string) => {
    console.log("[v0] Purchasing boost:", boostName, "for", price, "to:", RECIPIENT_ADDRESS)
    // TODO: Integrate with Base blockchain payment
    alert(`Payment of ${price} to ${RECIPIENT_ADDRESS} for ${boostName}`)
  }

  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold font-orbitron text-primary">GAMING BOOSTS</h2>
      </div>

      <div className="space-y-3">
        {boosts.map((boost, idx) => {
          const Icon = boost.icon
          return (
            <Card
              key={idx}
              className={`p-6 bg-gradient-to-br ${boost.color} ${boost.borderColor} border glow-cyan-sm relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-black/30 border ${boost.borderColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${boost.iconColor}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold text-lg ${boost.iconColor}`}>{boost.name}</h3>
                      <span className={`text-xs font-bold ${boost.iconColor} bg-black/30 px-2 py-0.5 rounded-full`}>
                        {boost.multiplier}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80">{boost.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className={`font-bold text-2xl ${boost.iconColor}`}>{boost.price}</span>
                    <span className="text-xs text-muted-foreground ml-2">ETH/USDC on Base</span>
                  </div>
                  <Button
                    onClick={() => handlePurchaseBoost(boost.name, boost.price)}
                    className={`bg-gradient-to-r ${boost.color} ${boost.borderColor} border hover:opacity-90`}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-4 bg-card/30 backdrop-blur border-primary/10 mt-6">
        <div className="text-xs text-center space-y-1 text-muted-foreground">
          <p className="text-cyan-300/70">All payments processed on Base Network</p>
          <p className="font-mono text-[10px]">
            {RECIPIENT_ADDRESS.slice(0, 16)}...{RECIPIENT_ADDRESS.slice(-10)}
          </p>
        </div>
      </Card>
    </div>
  )
}
