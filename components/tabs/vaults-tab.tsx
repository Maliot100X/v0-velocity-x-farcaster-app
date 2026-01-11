"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Vault, TrendingUp, Users, Clock, Lock, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { useAccount } from "wagmi"

export function VaultsTab() {
  const { address, isConnected } = useAccount()
  
  // Real logic: We only keep Velocity X as the platform vault
  // Base and Clanker demo vaults are removed
  const [userStaked] = useState(0.00) 

  return (
    <div className="px-4 pt-6 pb-24 space-y-6 max-w-[500px] mx-auto">
      {/* VAULTS HEADER */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Vault className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-black font-orbitron text-primary uppercase italic tracking-tighter">VAULTS</h2>
        </div>
        {isConnected && (
           <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-primary italic uppercase">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
           </div>
        )}
      </div>

      <div className="space-y-4">
        {/* VELOCITY X PRIMARY VAULT - KEPT AS PLATFORM CORE */}
        <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-primary/10 to-black border-primary/30 rounded-3xl glow-cyan-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black italic text-primary shadow-[0_0_15px_rgba(0,255,255,0.2)]">VX</div>
              <div className="text-left">
                <h3 className="text-base font-black font-orbitron text-white italic uppercase leading-none">Velocity X Vault</h3>
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mt-1">$VX AUTHORITY</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black font-mono text-primary tracking-tighter italic">234%</p>
              <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Target APY</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground uppercase">
                <Lock className="w-2.5 h-2.5" /> Total Value Locked
              </div>
              <p className="text-sm font-mono font-bold text-white tracking-tighter">$8.5M</p>
            </div>
            <div className="space-y-1 text-right">
              <div className="flex items-center gap-1 justify-end text-[8px] font-bold text-muted-foreground uppercase">
                <Users className="w-2.5 h-2.5" /> Active Stakers
              </div>
              <p className="text-sm font-mono font-bold text-white tracking-tighter">3,421</p>
            </div>
          </div>

          {/* DYNAMIC STAKE VIEW */}
          <Card className="p-4 bg-black/60 border-white/5 rounded-2xl mb-4 text-left">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-cyan-300 uppercase font-orbitron tracking-widest mb-1">Your Active Stake</p>
                <p className="text-sm font-mono font-bold text-white italic">
                  {isConnected ? `${userStaked.toFixed(2)} B3` : "----"}
                </p>
              </div>
              <ShieldCheck className={`w-5 h-5 ${isConnected ? "text-primary opacity-50" : "text-white/5"}`} />
            </div>
          </Card>

          <Button className="w-full bg-primary hover:bg-primary/90 text-black font-black h-12 rounded-2xl uppercase italic shadow-lg shadow-primary/20 transition-all active:scale-95">
            <TrendingUp className="w-4 h-4 mr-2" />
            {isConnected ? "Manage Stake" : "Connect to Stake"}
          </Button>
        </Card>

        {/* SCANNING STATE FOR OTHER ON-CHAIN VAULTS */}
        <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center space-y-3">
           <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white/20 animate-spin-slow" />
           </div>
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50 text-center leading-relaxed">
             Syncing Community Vaults...<br/>New protocol rewards appearing soon
           </p>
        </div>
      </div>
    </div>
  )
}