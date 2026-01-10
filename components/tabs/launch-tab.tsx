"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, Sparkles, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"

export function LaunchTab() {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenDesc, setTokenDesc] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleDeployOnChain = () => {
    console.log("[v0] Deploy on-chain clicked")
    // Direct Base transaction logic here
  }

  const handleCastToLaunch = () => {
    console.log("[v0] Cast to launch clicked")
    if (typeof window !== "undefined" && window.sdk?.actions?.composeCast) {
      const castText = `@velocityx launch ${tokenName} $${tokenSymbol} - ${tokenDesc}`
      window.sdk.actions.composeCast({ text: castText })
    } else {
      console.log("[v0] SDK not available, would cast:", `@velocityx launch ${tokenName} $${tokenSymbol}`)
    }
  }

  return (
    <div className="px-4 pt-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Rocket className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold font-orbitron text-foreground">LAUNCH TOKEN</h2>
      </div>

      {/* SECTION 1: CAST TO LAUNCH */}
      <Card className="p-5 bg-card/60 border-primary/20 glow-cyan-sm space-y-3">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">CAST TO LAUNCH</h3>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">Launch your token with a simple Farcaster cast:</p>
          <ul className="space-y-1.5 text-xs text-muted-foreground pl-4">
            <li>
              • Mention <span className="text-primary font-medium">@VelocityX</span> in your cast
            </li>
            <li>• Include token name, symbol, and image</li>
            <li>• AI + Clanker deploys automatically to Base</li>
          </ul>
        </div>

        <div className="p-3 bg-background/50 rounded-lg border border-primary/10">
          <p className="text-xs text-muted-foreground mb-1">Example:</p>
          <p className="text-xs font-mono text-foreground">@VelocityX launch "Moon Rocket" $MOON 🚀</p>
        </div>

        <Button
          onClick={handleCastToLaunch}
          variant="outline"
          className="w-full border-primary/30 bg-transparent hover:bg-primary/10"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          COMPOSE CAST
        </Button>
      </Card>

      {/* SECTION 2: IN-APP LAUNCH */}
      <Card className="p-5 bg-card/60 border-primary/20 space-y-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-foreground">IN-APP LAUNCH</h3>
        </div>

        <div className="space-y-3">
          {/* Name */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-muted-foreground">Token Name</label>
            <Input
              placeholder="e.g., Moon Token"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="bg-background/50 border-primary/20"
            />
          </div>

          {/* Symbol */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-muted-foreground">Token Symbol</label>
            <Input
              placeholder="e.g., MOON"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="bg-background/50 border-primary/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-muted-foreground">Description</label>
            <Textarea
              placeholder="Describe your token..."
              value={tokenDesc}
              onChange={(e) => setTokenDesc(e.target.value)}
              className="bg-background/50 border-primary/20 min-h-[60px] text-sm"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-xs font-medium mb-1.5 block text-muted-foreground">Token Image</label>
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Sparkles className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Click to upload or drag image</p>
            </div>
          </div>

          {/* Advanced Options (Collapsed) */}
          <div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full p-3 bg-background/50 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <span className="text-xs font-medium text-muted-foreground">Advanced Options</span>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-3 p-3 bg-background/30 rounded-lg border border-primary/10">
                <div>
                  <label className="text-xs font-medium mb-1.5 block text-muted-foreground">Initial Supply</label>
                  <Input placeholder="1,000,000" className="bg-background/50 border-primary/20 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block text-muted-foreground">
                    Liquidity Lock (days)
                  </label>
                  <Input placeholder="365" type="number" className="bg-background/50 border-primary/20 text-sm" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Allocation Info */}
        <Card className="p-3 bg-background/30 border-primary/10">
          <p className="text-xs font-bold mb-2 text-primary">Token Allocation</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• 20% Rewards Pool (Superfluid streaming)</p>
            <p>• 80% Liquidity Pool (Locked on Base)</p>
          </div>
        </Card>

        {/* Deploy Button */}
        <Button
          onClick={handleDeployOnChain}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-sm py-5 text-sm font-bold"
        >
          <Rocket className="w-4 h-4 mr-2" />
          DEPLOY TO BASE (via Clanker)
        </Button>
      </Card>

      {/* Footer */}
      <Card className="p-3 bg-card/30 border-primary/10">
        <div className="text-xs text-center text-muted-foreground">
          <p className="font-bold text-foreground">Powered by Clanker • Built on Base</p>
        </div>
      </Card>
    </div>
  )
}
