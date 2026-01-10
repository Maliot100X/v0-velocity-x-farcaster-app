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
    image: null as File | null,
    feeTier: "1%",
    poolType: "Static"
  })

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDeployOnChain = () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }

    // OFFICIAL CLANKER V2 CONTRACT CALL
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
        BigInt(0), 
        imagePreview || "", 
        "0x"
      ],
    })
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      {/* SECTION 1: PRECLANK CAST */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase italic">Cast to Launch</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/20 to-accent/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
          <p className="text-xs text-cyan-200 mb-4 leading-relaxed">
            Mention <span className="font-bold text-white">@VelocityX</span> in a Farcaster cast. 
            AI + Clanker deploys your token on Base instantly.
          </p>
          <Button onClick={() => alert("Ready to compose cast...")} className="w-full bg-primary hover:bg-primary/90 font-black tracking-tighter shadow-lg">
            PRECLANK VIA @VELOCITYX
          </Button>
        </Card>
      </section>

      {/* SECTION 2: FULL CLANKER CREATOR */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary uppercase">Create a Clanker</h2>
        </div>
        
        <Card className="p-5 bg-card/80 border-primary/20 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Token Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background border-primary/10 h-10 text-xs" />
            <Input placeholder="Symbol ($)*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background border-primary/10 h-10 text-xs uppercase" />
          </div>

          <Textarea placeholder="Token Metadata / Description (Optional)" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} className="bg-background border-primary/10 text-xs min-h-[60px]" />

          {/* IMAGE UPLOAD BOX */}
          <div onClick={handleImageClick} className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer overflow-hidden">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="h-20 mx-auto rounded-lg shadow-lg border border-primary/50" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-primary mx-auto mb-2 opacity-70" />
                <p className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">Select Image (1MB Max)</p>
              </>
            )}
          </div>

          <button onClick={()=>setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase hover:text-primary transition-colors">
            {showAdvanced ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
            Advanced Protocol Configuration
          </button>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-black/40 rounded-lg border border-primary/10 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="text-[9px] uppercase font-bold text-muted-foreground mb-1 block">Initial Supply</label>
                <Input type="number" value={formData.initialSupply} onChange={(e)=>setFormData({...formData, initialSupply:e.target.value})} className="bg-black border-primary/20 h-8 text-xs font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <div className="p-2 rounded bg-primary/5 border border-primary/10">
                   <p className="text-[8px] text-muted-foreground uppercase">Fee Tier</p>
                   <p className="text-[10px] font-bold text-primary">1% Static</p>
                 </div>
                 <div className="p-2 rounded bg-primary/5 border border-primary/10">
                   <p className="text-[8px] text-muted-foreground uppercase">LP Status</p>
                   <p className="text-[10px] font-bold text-green-400">Locked</p>
                 </div>
              </div>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-xl h-16 shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-transform active:scale-95">
              {isConnected ? "DEPLOY ON BASE" : "CONNECT TO DEPLOY"}
            </Button>
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter text-muted-foreground/60 italic">
              <span>Admin: 0x1909... (10% Fee)</span>
              <span className="flex items-center gap-1 text-primary"><Shield className="w-3 h-3"/> LP Locked on Uniswap</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}