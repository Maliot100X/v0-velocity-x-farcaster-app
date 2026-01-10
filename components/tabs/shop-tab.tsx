"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Check, Sparkles } from "lucide-react"

const RECIPIENT_ADDRESS = "0x1909b332397144aeb4867B7274a05Dbb25bD1Fec"

export function ShopTab() {
  const eliteFeatures = [
    "0% factory listing fees",
    "24/7 priority indexing",
    "Elite profile badge",
    "Beta access to veVX governance",
    "Priority customer support",
    "Exclusive airdrop eligibility",
  ]

  const handlePurchase = () => {
    console.log("[v0] Initiating payment to:", RECIPIENT_ADDRESS)
    // TODO: Integrate with Base blockchain payment
    alert(`Payment of $10 USD (ETH/USDC on Base) to ${RECIPIENT_ADDRESS}`)
  }

  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="w-5 h-5 text-yellow-400" />
        <h2 className="text-xl font-bold font-orbitron text-yellow-400">SUBSCRIPTION</h2>
      </div>

      <Card className="p-6 bg-gradient-to-br from-yellow-400/20 to-amber-600/10 border-yellow-400/30 glow-cyan relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-yellow-400/20 border-2 border-yellow-400/50 flex items-center justify-center">
              <Crown className="w-7 h-7 text-yellow-400" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl text-yellow-400">Velocity X Elite</h3>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-sm text-yellow-100/80">Premium membership for serious traders</p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {eliteFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-yellow-100/90">
                <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-black/30 rounded-lg mb-4">
            <div className="flex items-baseline gap-2 justify-center">
              <span className="font-bold text-4xl text-yellow-300">$10</span>
              <span className="text-sm text-yellow-100/70">USD / month</span>
            </div>
            <p className="text-xs text-center text-yellow-100/60 mt-2">Paid in ETH or USDC on Base</p>
          </div>

          <Button
            onClick={handlePurchase}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 text-lg"
          >
            Buy Now
          </Button>

          <p className="text-[10px] text-center text-yellow-100/50 mt-3">
            Payment to: {RECIPIENT_ADDRESS.slice(0, 10)}...{RECIPIENT_ADDRESS.slice(-8)}
          </p>
        </div>
      </Card>

      <Card className="p-4 bg-card/30 backdrop-blur border-primary/10">
        <div className="text-xs text-center space-y-1 text-muted-foreground">
          <p className="text-cyan-300/70">Secure payments on Base Network</p>
          <p>
            Sponsored by <span className="text-primary">Farcaster</span> • Powered by{" "}
            <span className="text-accent">MiniApp</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
