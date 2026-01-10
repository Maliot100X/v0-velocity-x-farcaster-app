"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Crown, Wallet } from "lucide-react"

export function ProfileTab() {
  const [isFarcasterConnected, setIsFarcasterConnected] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)

  return (
    <div className="px-4 pt-6 space-y-6">
      <h2 className="text-xl font-bold font-[family-name:var(--font-orbitron)] text-primary">Profile</h2>

      {/* Profile Card */}
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 glow-cyan">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary glow-cyan-sm" />
          <div>
            <h3 className="font-bold text-lg">@demo_user</h3>
            <p className="text-xs text-muted-foreground">FID: Not Connected</p>
          </div>
        </div>
      </Card>

      {/* Connections */}
      <section>
        <h3 className="font-bold mb-3">Connections</h3>
        <div className="space-y-3">
          {/* Farcaster */}
          <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center">
                  <span className="text-lg">🎭</span>
                </div>
                <div>
                  <p className="font-medium">Farcaster</p>
                  <p className="text-xs text-muted-foreground">
                    {isFarcasterConnected ? "Connected" : "Not Connected"}
                  </p>
                </div>
              </div>
              {isFarcasterConnected ? (
                <Check className="w-5 h-5 text-success" />
              ) : (
                <Button size="sm" onClick={() => setIsFarcasterConnected(true)}>
                  Sync
                </Button>
              )}
            </div>
          </Card>

          {/* Base Wallet */}
          <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Base Wallet</p>
                  <p className="text-xs text-muted-foreground">
                    {isWalletConnected ? "0x1234...5678" : "Not Connected"}
                  </p>
                </div>
              </div>
              {isWalletConnected ? (
                <Check className="w-5 h-5 text-success" />
              ) : (
                <Button size="sm" onClick={() => setIsWalletConnected(true)}>
                  Connect
                </Button>
              )}
            </div>
          </Card>

          {/* MetaMask */}
          <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center">
                  <span className="text-lg">🦊</span>
                </div>
                <div>
                  <p className="font-medium">MetaMask</p>
                  <p className="text-xs text-muted-foreground">
                    {isMetamaskConnected ? "0xabcd...ef01" : "Not Connected"}
                  </p>
                </div>
              </div>
              {isMetamaskConnected ? (
                <Check className="w-5 h-5 text-success" />
              ) : (
                <Button size="sm" onClick={() => setIsMetamaskConnected(true)}>
                  Link
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Subscription */}
      <section>
        <h3 className="font-bold mb-3">Active Boosts & Subscription</h3>
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur border-primary/30">
          <div className="flex items-start gap-4">
            <Crown className={`w-10 h-10 ${hasSubscription ? "text-yellow-400" : "text-muted-foreground"}`} />
            <div className="flex-1">
              <p className="font-bold mb-1">{hasSubscription ? "Premium Active" : "Free Tier"}</p>
              <p className="text-xs text-muted-foreground mb-3">
                {hasSubscription ? "You have access to all premium features" : "Upgrade to unlock exclusive benefits"}
              </p>
              {!hasSubscription && (
                <Button size="sm" onClick={() => setHasSubscription(true)} className="bg-primary hover:bg-primary/90">
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card/50 backdrop-blur border-primary/20 text-center">
          <p className="text-2xl font-bold font-mono">3</p>
          <p className="text-xs text-muted-foreground">Tokens Created</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur border-primary/20 text-center">
          <p className="text-2xl font-bold font-mono">7</p>
          <p className="text-xs text-muted-foreground">Active Stakes</p>
        </Card>
      </div>

      {/* Footer */}
      <Card className="p-4 bg-card/30 backdrop-blur border-primary/10">
        <div className="text-xs text-center space-y-1 text-muted-foreground">
          <p className="font-bold text-foreground">Sponsors: Base.Dev | Farcaster</p>
        </div>
      </Card>
    </div>
  )
}
