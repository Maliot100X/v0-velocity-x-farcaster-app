"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Wallet, UserIcon } from "lucide-react"

export function ProfileTab() {
  const [isFarcasterConnected, setIsFarcasterConnected] = useState(false)
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false)
  const [isCoinbaseConnected, setIsCoinbaseConnected] = useState(false)
  const [farcasterProfile, setFarcasterProfile] = useState<any>(null)

  const handleSyncFarcaster = () => {
    // Simulate Farcaster profile fetch
    console.log("[v0] Syncing Farcaster profile...")
    setFarcasterProfile({
      username: "demo_user",
      fid: "12345",
      pfp: "https://i.imgur.com/placeholder.png",
    })
    setIsFarcasterConnected(true)
  }

  const handleConnectMetamask = () => {
    console.log("[v0] Connecting MetaMask...")
    setIsMetamaskConnected(true)
  }

  const handleConnectCoinbase = () => {
    console.log("[v0] Connecting Coinbase Wallet...")
    setIsCoinbaseConnected(true)
  }

  return (
    <div className="px-4 pt-6 space-y-6">
      <h2 className="text-xl font-bold font-orbitron text-primary">Profile</h2>

      {/* Profile Card */}
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 glow-cyan">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary glow-cyan-sm flex items-center justify-center">
            {farcasterProfile ? (
              <img
                src={farcasterProfile.pfp || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
            ) : (
              <UserIcon className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {farcasterProfile ? `@${farcasterProfile.username}` : "Not Connected"}
            </h3>
            <p className="text-xs text-muted-foreground">FID: {farcasterProfile ? farcasterProfile.fid : "—"}</p>
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
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Button size="sm" onClick={handleSyncFarcaster}>
                  Sync
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
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Button size="sm" onClick={handleConnectMetamask}>
                  Connect
                </Button>
              )}
            </div>
          </Card>

          {/* Coinbase Wallet */}
          <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Coinbase Wallet</p>
                  <p className="text-xs text-muted-foreground">
                    {isCoinbaseConnected ? "0x1234...5678" : "Not Connected"}
                  </p>
                </div>
              </div>
              {isCoinbaseConnected ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Button size="sm" onClick={handleConnectCoinbase}>
                  Connect
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card/50 backdrop-blur border-primary/20 text-center">
          <p className="text-2xl font-bold font-mono text-primary">3</p>
          <p className="text-xs text-muted-foreground">Tokens Created</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur border-primary/20 text-center">
          <p className="text-2xl font-bold font-mono text-primary">7</p>
          <p className="text-xs text-muted-foreground">Active Stakes</p>
        </Card>
      </div>
    </div>
  )
}
