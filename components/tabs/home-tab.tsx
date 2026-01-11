"use client"

import { motion } from "framer-motion"
import { TrendingUp, ArrowUpRight, Clock, AlertCircle, Sparkles, Wallet } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useAccount, useBalance } from "wagmi"

interface HomeTabProps {
  onTokenSelect: (tokenId: string) => void
}

export function HomeTab({ onTokenSelect }: HomeTabProps) {
  const { address, isConnected } = useAccount()
  const { data: walletBalance } = useBalance({ address })
  
  const [activeSubTab, setActiveSubTab] = useState<"new" | "volume" | "boosted">("new")
  const [winRewards, setWinRewards] = useState(0.000012820)
  const [staked] = useState(690982.0)
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)

  // SAFE BALANCE CHECK: If balance is missing, show "0.00"
  const formattedBalance = walletBalance?.formatted ? walletBalance.formatted.slice(0, 6) : "0.00"

  useEffect(() => {
    const interval = setInterval(() => {
      setWinRewards((prev) => prev + 0.000000095)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4 px-4 pt-4 pb-24 max-w-[500px] mx-auto">
      {/* HEADER SECTION */}
      <Card className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/30 glow-cyan rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black italic text-primary">
            VX
          </div>
          <div className="text-left">
            <h2 className="text-xl font-black font-orbitron text-primary italic uppercase tracking-tighter leading-none">VELOCITY X</h2>
            <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest italic mt-1">Ape · Stake · Earn</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-black/40 border border-white/5 rounded-2xl">
            <div className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Total Staked</div>
            <div className="text-sm font-bold font-mono text-white">{staked.toLocaleString()} B3</div>
          </div>
          <div className="text-center p-3 bg-black/40 border border-white/5 rounded-2xl">
            <div className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Your Wallet</div>
            <div className="text-sm font-bold font-mono text-green-400">
              {isConnected ? `${formattedBalance} ETH` : "0.00 --"}
            </div>
          </div>
        </div>

        <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 mb-4 text-left">
          <div className="flex items-center justify-between mb-1 text-[9px] font-bold text-primary uppercase font-orbitron">
            <span>Live Win Rewards</span>
            <TrendingUp className="w-3 h-3 text-green-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white tracking-tighter">{winRewards.toFixed(9)}</div>
          <div className="text-[8px] font-bold text-green-400 mt-1">+0.000000095 WIN/s</div>
        </div>

        <Button
          onClick={() => setShowWithdrawalModal(true)}
          className="w-full bg-primary hover:bg-primary/90 text-black font-black h-12 rounded-2xl uppercase italic"
        >
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Withdraw Rewards
        </Button>
      </Card>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2">
        {["new", "volume", "boosted"].map((t) => (
          <Button
            key={t}
            onClick={() => setActiveSubTab(t as any)}
            className={`flex-1 h-10 rounded-xl text-[10px] font-black italic uppercase transition-all ${
              activeSubTab === t ? "bg-primary text-black" : "bg-white/5 text-muted-foreground border border-white/10"
            }`}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* EMPTY LIST STATE */}
      <section className="pt-2 text-left">
        <div className="flex items-center gap-2 mb-4 px-1">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-xs font-bold font-orbitron uppercase tracking-widest text-primary">Live Assets</h2>
        </div>

        <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 flex flex-col items-center justify-center">
           <Wallet className="w-8 h-8 text-white/10 mb-3" />
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic opacity-50 text-center">
             Connect Wallet to view Active Streams
           </p>
        </div>
      </section>

      {/* WITHDRAWAL MODAL */}
      {showWithdrawalModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-sm">
            <Card className="p-6 bg-black border-primary/30 rounded-3xl">
              <h3 className="text-lg font-black font-orbitron text-primary mb-6 italic uppercase tracking-tighter text-center">Protocol Exit</h3>
              <div className="space-y-3">
                <Card className="p-4 bg-red-500/10 border-red-500/20 rounded-2xl cursor-pointer hover:bg-red-500/20 transition-all">
                  <h4 className="font-bold text-red-400 text-xs flex items-center gap-2 uppercase italic"><Clock className="w-3 h-3" /> Instant Exit</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">Fee: 10% Protocol Burn</p>
                </Card>
                <Card className="p-4 bg-green-500/10 border-green-500/20 rounded-2xl cursor-pointer hover:bg-green-500/20 transition-all">
                  <h4 className="font-bold text-green-400 text-xs flex items-center gap-2 uppercase italic"><AlertCircle className="w-3 h-3" /> Standard Exit</h4>
                  <p className="text-[10px] text-muted-foreground mt-1">45-Day Yield Lock (0% Fee)</p>
                </Card>
              </div>
              <Button onClick={() => setShowWithdrawalModal(false)} variant="ghost" className="w-full mt-6 text-muted-foreground text-xs uppercase font-bold italic">Cancel</Button>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}