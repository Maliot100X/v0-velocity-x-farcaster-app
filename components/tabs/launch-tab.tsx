"use client"

import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp, Info } from "lucide-react"
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
  })

  const handleDeployOnChain = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }

    if (!formData.name || !formData.symbol) {
      alert("Token Name and Symbol are required!")
      return
    }

    console.log("[Velocity X] Deploying to Clanker Factory...")
    // This triggers the REAL Clanker Contract with your 10% logic included in the backend agent
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
        BigInt(formData.initialSupply)
      ],
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      {/* SECTION 1: CAST TO LAUNCH */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase">Cast to Launch</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30">
          <p className="text-xs text-cyan-300 mb-4 italic leading-relaxed">
            Mention <span className="text-primary font-bold">@VelocityX</span> in a cast with name/symbol. 
            Our AI + Clanker deploys it. You keep the rewards.
          </p>
          <Button onClick={() => alert("Compose cast logic ready.")} className="w-full bg-primary hover:bg-primary/90 font-bold">
            PRE-CLANK VIA CAST
          </Button>
        </Card>
      </section>

      {/* SECTION 2: FULL IN-APP DEPLOYMENT */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase">Create a Clanker</h2>
        </div>
        
        <Card className="p-5 bg-card/60 border-primary/20 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Name*</label>
              <Input placeholder="e.g. Velocity X" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-background/50 border-primary/20" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Symbol*</label>
              <Input placeholder="$SYMBOL" value={formData.symbol} onChange={(e) => setFormData({ ...formData, symbol: e.target.value })} className="bg-background/50 border-primary/20" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-primary mb-1 block">Image (JPEG/PNG)*</label>
            <div className="relative border-2 border-dashed border-primary/20 rounded-lg p-4 text-center hover:border-primary/40 transition-all cursor-pointer bg-background/30">
              <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-[10px] text-muted-foreground">{formData.image ? formData.image.name : "Select file (1MB max)"}</p>
            </div>
          </div>

          <div className="pt-2">
            <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase hover:opacity-80">
              {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              Advanced Settings & Extensions
            </button>
            
            {showAdvanced && (
              <div className="mt-4 p-4 rounded bg-primary/5 border border-primary/10 space-y-3">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Initial Supply</label>
                <Input type="number" value={formData.initialSupply} onChange={(e) => setFormData({ ...formData, initialSupply: e.target.value })} className="bg-background/40 h-8 text-xs" />
                <p className="text-[9px] text-muted-foreground italic flex items-center gap-1">
                  <Info className="w-3 h-3" /> Optional: Fee config & Recipients are locked to protocol defaults.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 space-y-3">
            <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-lg h-14 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              {isConnected ? "DEPLOY ON BASE" : "CONNECT TO DEPLOY"}
            </Button>
            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-muted-foreground font-bold px-1">
              <span>Fee: 10% to Admin</span>
              <span>Network: Base</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}