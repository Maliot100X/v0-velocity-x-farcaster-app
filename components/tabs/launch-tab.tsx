"use client"

import { useState, useRef } from "react"
import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp, Zap, Shield, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useWriteContract, useAccount, useConnect } from "wagmi"

export function LaunchTab() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    initialSupply: "1000000000",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

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
          { name: 'name', type: 'string' }, { name: 'symbol', type: 'string' },
          { name: 'supply', type: 'uint256' }, { name: 'fid', type: 'uint256' },
          { name: 'image', type: 'string' }, { name: 'castHash', type: 'string' }
        ],
        outputs: [{ name: '', type: 'address' }],
      }],
      functionName: 'createToken',
      args: [formData.name, formData.symbol, BigInt(formData.initialSupply), BigInt(0), imagePreview || "", "0x"],
    })
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-3 font-orbitron text-primary uppercase italic">
          <Sparkles className="w-5 h-5" />
          <h2>Cast to Launch</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/20 to-accent/5 border-primary/40">
          <p className="text-xs text-cyan-200 mb-4 font-bold tracking-tighter uppercase">
            Mention @VelocityX in a Farcaster cast. AI deploys instantly.
          </p>
          <Button onClick={() => alert("Ready to cast...")} className="w-full bg-primary font-black shadow-lg">
            PRECLANK VIA @VELOCITYX
          </Button>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3 font-orbitron text-primary uppercase">
          <Rocket className="w-5 h-5" />
          <h2>Create a Clanker</h2>
        </div>
        
        <Card className="p-5 bg-card/80 border-primary/20 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Token Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background border-primary/10 h-10 text-xs" />
            <Input placeholder="Symbol ($)*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background border-primary/10 h-10 text-xs uppercase" />
          </div>

          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-primary/5 cursor-pointer">
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
            {imagePreview ? <img src={imagePreview} className="h-20 mx-auto rounded shadow-lg" /> : <Upload className="w-6 h-6 text-primary mx-auto opacity-70" />}
            <p className="text-[10px] text-primary/80 font-bold mt-2 uppercase tracking-widest">Select Image (1MB Max)</p>
          </div>

          <button onClick={()=>setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase">
            {showAdvanced ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
            Advanced Settings
          </button>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-black/40 rounded-lg border border-primary/10 animate-in fade-in">
              <Input placeholder="Initial Supply" value={formData.initialSupply} onChange={(e)=>setFormData({...formData, initialSupply:e.target.value})} className="bg-black border-primary/20 h-8 text-xs font-mono" />
              <div className="grid grid-cols-2 gap-3">
                 <div className="p-2 rounded bg-primary/5 border border-primary/10 text-center">
                   <p className="text-[8px] text-muted-foreground uppercase">Fee Tier</p>
                   <p className="text-[10px] font-bold text-primary">1% Static</p>
                 </div>
                 <div className="p-2 rounded bg-primary/5 border border-primary/10 text-center">
                   <p className="text-[8px] text-muted-foreground uppercase">LP Lock</p>
                   <p className="text-[10px] font-bold text-green-400">PERMANENT</p>
                 </div>
              </div>
            </div>
          )}

          <div className="pt-4">
            <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-xl h-16 shadow-[0_0_25px_rgba(var(--primary),0.4)]">
              {isConnected ? "DEPLOY ON BASE" : "CONNECT TO DEPLOY"}
            </Button>
            <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest mt-2 font-bold italic">Admin: 0x1909... (10% Fee)</p>
          </div>
        </Card>
      </section>
    </div>
  )
}