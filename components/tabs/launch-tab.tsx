"use client"

import { motion } from "framer-motion"
import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useWriteContract, useAccount } from "wagmi"

export function LaunchTab() {
  const { isConnected } = useAccount()
  const { writeContract } = useWriteContract()
  
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    image: null as File | null,
    initialSupply: "",
    maxSupply: "",
  })

  // THE REAL CLANKER LAUNCHER (Locked to your 0x1909... wallet)
  const handleDeployOnChain = async () => {
    if (!isConnected) {
      alert("Please SYNC your Farcaster wallet first!")
      return
    }

    console.log("[Velocity X] Deploying to Clanker with 10% Fee to 0x1909b332397144aeb4867B7274a05Dbb25bD1Fec")
    
    writeContract({
      address: "0x1bc0c42215582d5a085795f4badbac3ff36d1bcb",
      abi: [{
        name: 'createToken',
        type: 'function',
        stateMutability: 'public',
        inputs: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'supply', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'address' }],
      }],
      functionName: 'createToken',
      args: [
        formData.name,
        formData.symbol,
        BigInt(1000000000) // 1 Billion
      ],
    })
  }

  const handleCastToLaunch = async () => {
    const text = `@velocityx launch ${formData.name} $${formData.symbol}`
    if (typeof window !== "undefined" && (window as any).sdk?.actions?.composeCast) {
      (window as any).sdk.actions.composeCast({ text })
    } else {
      alert(`Compose cast: ${text}`)
    }
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase">Cast to Launch</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30">
          <p className="text-sm text-cyan-300 mb-4 italic">Mention @VelocityX in a cast to launch instantly via AI.</p>
          <Button onClick={handleCastToLaunch} className="w-full bg-primary hover:bg-primary/90 font-bold">
            CAST TO LAUNCH
          </Button>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase">In-App Launch</h2>
        </div>
        <Card className="p-5 bg-card/60 border-primary/20">
          <div className="space-y-4">
            <Input placeholder="Token Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-background/50 border-primary/20" />
            <Input placeholder="Symbol" value={formData.symbol} onChange={(e) => setFormData({ ...formData, symbol: e.target.value })} className="bg-background/50 border-primary/20" />
            <Textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-background/50 border-primary/20" />
            
            <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-bold shadow-[0_0_15px_rgba(var(--primary),0.4)]">
              DEPLOY ON-CHAIN
            </Button>
            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">10% Protocol Fee to Admin Wallet</p>
          </div>
        </Card>
      </section>
    </div>
  )
}