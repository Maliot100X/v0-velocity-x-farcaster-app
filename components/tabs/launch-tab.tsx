"use client"

import { useState } from "react"
import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp, Info, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useWriteContract, useAccount, useConnect } from "wagmi"

export function LaunchTab() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    initialSupply: "1000000000",
    feeTier: "1%",
    image: null as File | null
  })

  // REAL LOGIC: Farcaster "Cast to Launch" Trigger
  const handleCastToLaunch = async () => {
    const text = `@velocityx launch ${formData.name} $${formData.symbol}`
    if (typeof window !== "undefined" && (window as any).sdk?.actions?.composeCast) {
      (window as any).sdk.actions.composeCast({ 
        text,
        embeds: ["https://v0-velocity-x-farcaster-app.vercel.app"] 
      })
    } else {
      alert(`Farcaster Action: ${text}`)
    }
  }

  // REAL LOGIC: In-App Clanker Deployment
  const handleDeployOnChain = () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }
    
    writeContract({
      address: "0x1bc0c42215582d5a085795f4badbac3ff36d1bcb",
      abi: [{
        name: 'createToken',
        type: 'function',
        stateMutability: 'public',
        inputs: [
          { name: 'name', type: 'string' },
          { name: 'symbol', type: 'string' },
          { name: 'supply', type: 'uint256' },
          { name: 'fid', type: 'uint256' },
          { name: 'image', type: 'string' },
          { name: 'castHash', type: 'string' }
        ],
        outputs: [{ name: '', type: 'address' }],
      }],
      functionName: 'createToken',
      args: [formData.name, formData.symbol, BigInt(formData.initialSupply), BigInt(0), "", "0x"],
    })
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      {/* SECTION 1: CAST TO LAUNCH (PRECLANK) */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase">CAST TO LAUNCH</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30">
          <p className="text-xs text-cyan-300 mb-4 leading-relaxed">
            Mention <span className="font-bold text-primary">@VelocityX</span> in a Farcaster cast with name and symbol. 
            AI + Clanker deploys automatically.
          </p>
          <ul className="space-y-2 text-[10px] text-muted-foreground mb-4">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"/> Include token name and symbol</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full"/> Attach an image for your token</li>
          </ul>
          <Button onClick={handleCastToLaunch} className="w-full bg-primary hover:bg-primary/90 font-bold">
            CAST TO LAUNCH
          </Button>
        </Card>
      </section>

      {/* SECTION 2: IN-APP CLANKER CREATION */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase text-sm">Create a Clanker</h2>
        </div>
        <Card className="p-5 bg-card/60 border-primary/20 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background/50 border-primary/20" />
            <Input placeholder="Symbol*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background/50 border-primary/20" />
          </div>
          <Textarea placeholder="Description" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="bg-background/50 border-primary/20 min-h-[60px]" />
          
          <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center bg-background/30">
            <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-[10px] text-muted-foreground">Click to upload image (1MB max)</p>
          </div>

          <button onClick={()=>setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
            {showAdvanced ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
            Advanced Protocol Options
          </button>

          {showAdvanced && (
            <div className="space-y-3 p-4 bg-primary/5 rounded border border-primary/10">
              <Input placeholder="Initial Supply" value={formData.initialSupply} onChange={(e)=>setFormData({...formData, initialSupply:e.target.value})} className="bg-black/40 h-8 text-xs" />
              <div className="flex justify-between text-[9px] uppercase font-bold text-muted-foreground">
                <span>Fee Tier: 1% (Locked)</span>
                <span>LP Lock: Permanent</span>
              </div>
            </div>
          )}

          <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-lg h-14 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            DEPLOY ON BASE
          </Button>
          <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest mt-2">10% Protocol Fee to 0x1909... (Admin)</p>
        </Card>
      </section>
    </div>
  )
}