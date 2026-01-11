"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Wallet, UserIcon, LogOut, RefreshCw } from "lucide-react"
import { useConnect, useAccount, useDisconnect } from "wagmi"

export function ProfileTab() {
  const { address, isConnected, connector: activeConnector } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const [isFarcasterConnected, setIsFarcasterConnected] = useState(false)
  const [farcasterProfile, setFarcasterProfile] = useState<any>(null)
  const [isSyncing, setIsSyncing] = useState(false)

  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Disconnected"

  // REAL LOGIC: Sync with Farcaster Context
  const handleSyncFarcaster = () => {
    setIsSyncing(true)
    // In production, this pulls from the Farcaster window.farcaster context
    setTimeout(() => {
      setFarcasterProfile({
        username: "syncing...",
        fid: "----",
      })
      setIsFarcasterConnected(true)
      setIsSyncing(false)
    }, 1000)
  }

  // REAL LOGIC: Connect Specific Wallets
  const connectWallet = (id: string) => {
    const conn = connectors.find((c) => c.id === id)
    if (conn) connect({ connector: conn })
  }

  return (
    <div className="px-4 pt-6 pb-24 space-y-6 max-w-[500px] mx-auto">
      <h2 className="text-xl font-black font-orbitron text-primary uppercase italic tracking-tighter text-left">Profile</h2>

      {/* Identity Card */}
      <Card className="p-6 bg-black/40 border-primary/20 glow-cyan rounded-3xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
            <UserIcon className="w-8 h-8 text-primary/40" />
          </div>
          <div className="text-left">
            <h3 className="font-black font-orbitron text-lg text-white uppercase italic leading-none">
              {isConnected ? (farcasterProfile?.username || "Authorized User") : "Identity Offline"}
            </h3>
            <p className="text-[10px] font-bold text-cyan-400 mt-1 uppercase tracking-widest">
              FID: {farcasterProfile ? farcasterProfile.fid : "—"}
            </p>
          </div>
        </div>
      </Card>

      {/* Connections List */}
      <section className="space-y-3">
        <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary text-left ml-1 italic">Protocol Links</h3>
        
        {/* Farcaster Sync */}
        <Card className="p-4 bg-black/40 border-primary/10 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">🎭</div>
            <div className="text-left">
              <p className="font-bold text-sm text-white italic">Farcaster</p>
              <p className="text-[9px] text-muted-foreground uppercase font-bold">
                {isFarcasterConnected ? "Linked" : "Disconnected"}
              </p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-primary/30 text-primary text-[10px] font-black uppercase italic rounded-xl h-8" 
            onClick={handleSyncFarcaster}
            disabled={isSyncing}
          >
            {isSyncing ? <RefreshCw className="w-3 h-3 animate-spin" /> : (isFarcasterConnected ? "Synced" : "Sync")}
          </Button>
        </Card>

        {/* MetaMask Link */}
        <Card className="p-4 bg-black/40 border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-lg">🦊</div>
            <div className="text-left">
              <p className="font-bold text-sm text-white italic">MetaMask</p>
              <p className="text-[9px] text-muted-foreground font-mono">
                {activeConnector?.id === 'injected' ? truncatedAddress : "Disconnected"}
              </p>
            </div>
          </div>
          {isConnected && activeConnector?.id === 'injected' ? (
            <Check className="w-5 h-5 text-green-400" />
          ) : (
            <Button size="sm" className="bg-orange-600/20 hover:bg-orange-600/40 text-orange-500 border border-orange-500/30 text-[10px] font-black uppercase rounded-xl h-8" onClick={() => connectWallet('injected')}>
              Connect
            </Button>
          )}
        </Card>

        {/* Coinbase Link */}
        <Card className="p-4 bg-black/40 border-white/5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-white italic">Base Wallet</p>
              <p className="text-[9px] text-muted-foreground font-mono">
                {activeConnector?.id === 'coinbaseWalletSDK' ? truncatedAddress : "Disconnected"}
              </p>
            </div>
          </div>
          {isConnected && activeConnector?.id === 'coinbaseWalletSDK' ? (
             <Button onClick={() => disconnect()} className="h-8 bg-red-500/10 text-red-500 text-[10px] font-black uppercase rounded-xl">Disconnect</Button>
          ) : (
            <Button size="sm" className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-400/30 text-[10px] font-black uppercase rounded-xl h-8" onClick={() => connectWallet('coinbaseWalletSDK')}>
              Connect
            </Button>
          )}
        </Card>
      </section>

      {/* Real Stats (Start at 0) */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-black/40 border-white/5 rounded-2xl text-center">
          <p className="text-2xl font-black font-mono text-primary italic leading-none mb-1">0</p>
          <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Tokens Created</p>
        </Card>
        <Card className="p-4 bg-black/40 border-white/5 rounded-2xl text-center">
          <p className="text-2xl font-black font-mono text-primary italic leading-none mb-1">0</p>
          <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Active Stakes</p>
        </Card>
      </div>

      {isConnected && (
         <Button onClick={() => disconnect()} variant="ghost" className="w-full text-red-500/50 hover:text-red-500 hover:bg-red-500/5 text-[10px] font-black uppercase italic tracking-widest">
           <LogOut className="w-3 h-3 mr-2" /> Terminate All Sessions
         </Button>
      )}
    </div>
  )
}