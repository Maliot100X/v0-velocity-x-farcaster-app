"use client"

import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp, ShieldCheck, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useWriteContract, useAccount, useConnect } from "wagmi"

export function LaunchTab() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "", symbol: "", initialSupply: "1000000000", feeTier: "1%", poolType: "Static"
  })

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <h2 className="text-xl font-bold font-orbitron text-primary uppercase">Create a Clanker</h2>
      
      <Card className="p-5 bg-card/60 border-primary/20 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background/50 border-primary/20" />
          <Input placeholder="Symbol*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background/50 border-primary/20" />
        </div>

        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center bg-background/30">
          <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-[10px] text-muted-foreground uppercase">Select file (JPEG / PNG, 1MB max)</p>
        </div>

        <button onClick={()=>setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
          {showAdvanced ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
          Fee & Pool Configuration (Optional)
        </button>

        {showAdvanced && (
          <div className="space-y-4 p-4 bg-primary/5 rounded border border-primary/10">
            <div className="grid grid-cols-2 gap-3">
               <div>
                 <label className="text-[9px] uppercase text-muted-foreground">Fee Tier</label>
                 <select className="w-full bg-black border border-primary/20 text-xs p-1 rounded"><option>1%</option><option>2%</option><option>3% (Dynamic)</option></select>
               </div>
               <div>
                 <label className="text-[9px] uppercase text-muted-foreground">Pool Type</label>
                 <select className="w-full bg-black border border-primary/20 text-xs p-1 rounded"><option>Static</option><option>Unichain</option></select>
               </div>
            </div>
            <Input placeholder="Reward Recipient (0x1909...)" className="bg-black text-[10px] h-8 border-primary/10" />
          </div>
        )}

        <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-lg h-14">
          {isConnected ? "DEPLOY TOKEN" : "CONNECT WALLET"}
        </Button>
      </Card>

      <section className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-bold font-orbitron text-primary uppercase">Extensions</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-black/40 border-primary/10 text-[10px] text-center opacity-60">Creator Vault (Soon)</Card>
          <Card className="p-3 bg-black/40 border-primary/10 text-[10px] text-center opacity-60">Airdrop Tool (Soon)</Card>
        </div>
      </section>
    </div>
  )
}

const handleDeployOnChain = () => { /* Logic as defined in Step 1 */ }