"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Zap, Crown, Check } from "lucide-react"

export function StoreTab() {
  const boostItems = [
    {
      icon: Clock,
      title: "1 Hour Boost",
      description: "Appear in BOOSTED tab for 1 hour",
      price: "$2",
      priceEth: "~0.001 ETH",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "24 Hour Boost",
      description: "Pinned at top of BOOSTED for 24 hours",
      price: "$5",
      priceEth: "~0.0025 ETH",
      color: "text-primary",
      popular: true,
    },
  ]

  const velocityProFeatures = [
    "0% factory listing fees",
    "24/7 priority indexing",
    "Elite profile badge",
    "Beta access to veVX governance",
  ]

  return (
    <div className="px-4 pt-6 space-y-4">
      <h2 className="text-xl font-bold font-orbitron text-primary mb-6">Boost Your Visibility</h2>

      {boostItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Card
            key={index}
            className={`p-6 bg-card/50 backdrop-blur border-primary/20 ${item.popular ? "glow-cyan" : "glow-cyan-sm"} relative`}
          >
            {item.popular && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full glow-cyan">
                POPULAR
              </div>
            )}
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-secondary/50 border border-primary/40 flex items-center justify-center ${item.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 text-cyan-200">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xl text-cyan-300">{item.price}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.priceEth}</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Purchase</Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}

      <Card className="p-6 bg-gradient-to-br from-yellow-400/20 to-amber-600/10 border-yellow-400/30 glow-cyan mt-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border-2 border-yellow-400/50 flex items-center justify-center">
            <Crown className="w-6 h-6 text-yellow-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-xl text-yellow-400">Velocity Pro</h3>
              <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full font-semibold">
                PREMIUM
              </span>
            </div>

            <p className="text-sm text-yellow-100/80 mb-4">Unlock elite features and maximize your platform benefits</p>

            <div className="space-y-2 mb-4">
              {velocityProFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-yellow-100/90">
                  <Check className="w-4 h-4 text-yellow-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-yellow-400/20">
              <div>
                <span className="font-bold text-2xl text-yellow-300">$11</span>
                <span className="text-sm text-yellow-100/70 ml-2">/ month</span>
              </div>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">Subscribe Now</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card/30 backdrop-blur border-primary/10 mt-8">
        <div className="text-xs text-center space-y-1 text-muted-foreground">
          <p className="text-cyan-300/70">Payments accepted: Base ETH, USDT (Base)</p>
          <p>
            Sponsored by <span className="text-primary">Farcaster</span> • Powered by{" "}
            <span className="text-accent">MiniApp</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
