"use client"

import { useState, useRef, useEffect } from "react"
import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp, Wallet, Percent, ShieldCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useWriteContract, useAccount, useConnect } from "wagmi"
import sdk from "@farcaster/frame-sdk"

export function LaunchTab() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: "", symbol: "", description: "", supply: "1000000000",
    feeTier: "1%", rewardRecipient: "0x1909b332397144aeb4867B7274a05Dbb25bD1Fec"
  })

  // LOGIC: Intelligent Connection (Farcaster vs Browser)
  const handleConnect = () => {
    const isFrame = typeof window !== "undefined" && (window as any).farcaster
    if (isFrame) {
      sdk.actions.signIn({})
    } else {
      connect({ connector: connectors[0] })
    }
  }

  const handleDeployOnChain = () => {
    if (!isConnected) { handleConnect(); return }
    
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
      args: [formData.name, formData.symbol, BigInt(formData.supply), BigInt(0), imagePreview || "", "0x"],
    })
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <h2 className="text-xl font-bold font-orbitron text-primary uppercase">Create a Clanker</h2>
      
      <Card className="p-5 bg-card/60 border-primary/20 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background border-primary/10 h-10 text-xs" />
          <Input placeholder="Symbol*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background border-primary/10 h-10 text-xs uppercase" />
        </div>

        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-primary/5 cursor-pointer">
          <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImagePreview(URL.createObjectURL(file))
          }} />
          {imagePreview ? <img src={imagePreview} className="h-16 mx-auto rounded" /> : <Upload className="w-6 h-6 text-primary mx-auto opacity-70" />}
          <p className="text-[10px] text-primary/80 font-bold mt-2">IMAGE (JPEG/PNG)</p>
        </div>

        <button onClick={()=>setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-[10px] font-bold text-primary/60 uppercase">
          {showAdvanced ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>}
          Advanced: Fees & Rewards (Optional)
        </button>

        {showAdvanced && (
          <div className="space-y-4 p-4 bg-black/40 rounded-lg border border-primary/10">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-bold text-muted-foreground">Fee Tier</label>
              <div className="flex gap-2">
                {["1%", "2%", "3%"].map(f => (
                  <button key={f} className={`px-3 py-1 text-[10px] border ${formData.feeTier === f ? 'border-primary bg-primary/20' : 'border-white/10'}`} onClick={()=>setFormData({...formData, feeTier: f})}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[9px] uppercase font-bold text-muted-foreground">Protocol Recipient</label>
              <Input disabled value="0x1909...5bD1Fec" className="bg-black/40 h-8 text-[10px] opacity-60" />
            </div>
          </div>
        )}

        <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-xl h-16 shadow-[0_0_25px_rgba(var(--primary),0.4)]">
          {isConnected ? "DEPLOY ON BASE" : "CONNECT WALLET"}
        </Button>
      </Card>

      <Card className="p-4 bg-primary/5 border border-primary/10">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-xs font-bold font-orbitron uppercase">Preclank via Cast</h3>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed italic">
          Mention @VelocityX in a cast with name and symbol. Our AI bot listens and deploys via Clanker.
        </p>
      </section>
    </div>
  )
}