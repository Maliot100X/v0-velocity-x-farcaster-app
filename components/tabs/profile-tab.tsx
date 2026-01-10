"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Wallet, UserIcon } from "lucide-react"
// PHASE 2: Real Wallet Hooks
import { useConnect, useAccount, useDisconnect } from "wagmi"

export function ProfileTab() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const [isFarcasterConnected, setIsFarcasterConnected] = useState(false)
  const [farcasterProfile, setFarcasterProfile] = useState<any>(null)

  // Logic: Check if connected to show real address
  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connected"

  const handleSyncFarcaster = () => {
    // Keep your original Farcaster sync demo for now
    console.log("[v0] Syncing Farcaster profile...")
    setFarcasterProfile({
      username: "demo_user",
      fid: "12345",
      pfp: "https://i.imgur.com/placeholder.png",
    })
    setIsFarcasterConnected(true)
  }

  // REAL LOGIC: Trigger MetaMask
  const handleConnectMetamask = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected")
    if (injectedConnector) {
      connect({ connector: injectedConnector })
    } else {
      alert("MetaMask not found. Please install the extension.")
    }
  }

  // REAL LOGIC: Trigger Coinbase Wallet
  const handleConnectCoinbase = () => {
    const cbConnector = connectors.find((c) => c.id === "coinbaseWalletSDK")
    if (cbConnector) {
      connect({ connector: cbConnector })
    } else {
      alert("Coinbase Wallet not found.")
    }
  }

  return (
    <div className="px-4 pt-6 space-y-6">
      <h2 className="text-xl font-bold font-orbitron text-primary uppercase">Profile</h2>

      {/* Profile Card */}
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 glow-cyan">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary glow-cyan-sm flex items-center justify-center overflow-hidden">
            {farcasterProfile ? (
              <img
                src={farcasterProfile.pfp || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
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
        <h3 className="font-bold mb-3 uppercase text-xs tracking-widest text-primary">Connections</h3>
        <div className="space-y-3">
          {/* Farcaster */}
          <Card className="p-4 bg-card/50 backdrop-blur border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center">
                  <span className="text-lg">🎭</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Farcaster</p>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {isFarcasterConnected ? "Connected" : "Disconnected"}
                  </p>
                </div>
              </div>
              {isFarcasterConnected ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Button size="sm" variant="outline" className="border-primary/50 text-xs" onClick={handleSyncFarcaster}>
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
                  <p className="font-medium text-sm">MetaMask</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {isConnected ? truncatedAddress : "Disconnected"}
                  </p>
                </div>
              </div>
              {isConnected ? (
                <Button size="sm" variant="ghost" className="text-xs text-red-400" onClick={() => disconnect()}>Disconnect</Button>
              ) : (
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs" onClick={handleConnectMetamask}>
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
                  <p className="font-medium text-sm">Coinbase Wallet</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {isConnected ? truncatedAddress : "Disconnected"}
                  </p>
                </div>
              </div>
              {isConnected ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs" onClick={handleConnectCoinbase}>
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
          <p className="text-[10px] uppercase text-muted-foreground">Tokens Created</p>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur border-primary/20 text-center">
          <p className="text-2xl font-bold font-mono text-primary">7</p>
          <p className="text-[10px] uppercase text-muted-foreground">Active Stakes</p>
        </Card>
      </div>
    </div>
  )
}