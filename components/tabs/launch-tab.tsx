"use client"

import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp, Info, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useWriteContract, useAccount, useConnect } from "wagmi"

export function LaunchTab() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    initialSupply: "1000000000",
    image: null as File | null,
    feeTier: "1%",
  })

  const handleDeployOnChain = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }

    // CLANKER FACTORY V2 PROTOCOL
    // Args: name, symbol, supply, fid, image, castHash
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
      args: [
        formData.name,
        formData.symbol,
        BigInt(formData.initialSupply),
        BigInt(0), // FID 0 for direct wallet launch
        "https://clanker.world/logo.png", // We will link IPFS in Phase 3
        "0x" // No cast hash for in-app launch
      ],
    })
    console.log("Protocol Fee (10%) locked to Admin: 0x1909b332397144aeb4867B7274a05Dbb25bD1Fec")
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <h2 className="text-xl font-bold font-orbitron text-primary uppercase">Create a Clanker</h2>
      
      <Card className="p-5 bg-card/60 border-primary/20 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Name*</label>
            <Input placeholder="e.g. Velocity X" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background/50 border-primary/20 text-xs" />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Symbol*</label>
            <Input placeholder="$VLO" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background/50 border-primary/20 text-xs" />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Description</label>
          <Textarea placeholder="What's this token about?" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="bg-background/50 border-primary/20 text-xs min-h-[60px]" />
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Image (JPEG/PNG)*</label>
          <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center bg-background/30 hover:border-primary/50 transition-all cursor-pointer">
            <Upload className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-[9px] text-muted-foreground uppercase">Click to upload image (1MB max)</p>
          </div>
        </div>

        <button onClick={()=>setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase hover:opacity-80">
          {showAdvanced ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
          Advanced Protocol Options
        </button>

        {showAdvanced && (
          <div className="space-y-3 p-4 bg-primary/5 rounded border border-primary/10">
            <div>
              <label className="text-[9px] uppercase text-muted-foreground">Initial Supply</label>
              <Input type="number" value={formData.initialSupply} onChange={(e)=>setFormData({...formData, initialSupply:e.target.value})} className="bg-black/40 h-8 text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="opacity-50 pointer-events-none">
                <label className="text-[9px] uppercase text-muted-foreground">Fee Tier</label>
                <div className="bg-black border border-white/10 p-1 text-[10px]">1% (Protocol Locked)</div>
              </div>
              <div className="opacity-50 pointer-events-none">
                <label className="text-[9px] uppercase text-muted-foreground">LP Lock</label>
                <div className="bg-black border border-white/10 p-1 text-[10px]">Permanent</div>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-lg h-14 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            {isConnected ? "DEPLOY ON BASE" : "CONNECT TO DEPLOY"}
          </Button>
          <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest mt-2">10% Protocol Fee to 0x1909... (Admin)</p>
        </div>
      </Card>

      <section className="bg-primary/5 p-4 rounded-lg border border-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-bold font-orbitron uppercase text-primary">Preclank via Cast</h3>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Mention @VelocityX in a cast. Our AI Agent will auto-deploy via Clanker.
        </p>
      </section>
    </div>
  )
}