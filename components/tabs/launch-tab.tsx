"use client"

import { useState, useRef } from "react"
import { Rocket, Sparkles, Upload, ShieldCheck, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWriteContract, useAccount, useConnect } from "wagmi"

export function LaunchTab() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", symbol: "" })

  const handleDeployOnChain = () => {
    if (!isConnected) { connect({ connector: connectors[0] }); return }
    if (!formData.name || !formData.symbol) { alert("Fill name and symbol!"); return }

    // AUTO-PILOT CONFIGURATION (Hardcoded for 10% Fee & Rewards)
    // Args: name, symbol, supply, fid, image, partnerAddress
    writeContract({
      address: "0x1bc0c42215582d5a085795f4badbac3ff36d1bcb",
      abi: [{
        name: 'createToken',
        type: 'function',
        stateMutability: 'public',
        inputs: [
          { name: 'name', type: 'string' }, { name: 'symbol', type: 'string' },
          { name: 'supply', type: 'uint256' }, { name: 'fid', type: 'uint256' },
          { name: 'image', type: 'string' }, { name: 'partner', type: 'address' }
        ],
        outputs: [{ name: '', type: 'address' }],
      }],
      functionName: 'createToken',
      args: [
        formData.name, 
        formData.symbol, 
        BigInt(1000000000), // 1 Billion Supply
        BigInt(0), 
        imagePreview || "", 
        "0x1909b332397144aeb4867B7274a05Dbb25bD1Fec" // YOUR WALLET GETS THE 10%
      ],
    })
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <div className="text-center py-2 bg-primary/10 rounded-full border border-primary/20">
        <p className="text-[10px] font-mono font-bold text-primary animate-pulse uppercase">Clanker Protocol Active • 10% Partner Rewards</p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-3 font-orbitron text-primary uppercase italic text-sm">
          <Sparkles className="w-5 h-5" />
          <h2>Auto-Launch via Cast</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/20 to-accent/5 border-primary/40 shadow-lg">
          <p className="text-xs text-cyan-200 mb-4 leading-relaxed uppercase font-bold tracking-tighter">Mention @VelocityX in a cast to deploy instantly.</p>
          <Button onClick={() => alert("Launching Farcaster...")} className="w-full bg-primary hover:bg-primary/90 font-black h-12 shadow-lg">CAST TO LAUNCH</Button>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3 font-orbitron text-primary uppercase text-sm">
          <Rocket className="w-5 h-5" />
          <h2>Instant Clanker Creator</h2>
        </div>
        
        <Card className="p-5 bg-card/80 border-primary/20 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Token Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background border-primary/10 h-10 text-xs" />
            <Input placeholder="Symbol ($)*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background border-primary/10 h-10 text-xs uppercase" />
          </div>

          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all">
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImagePreview(URL.createObjectURL(file))
            }} />
            {imagePreview ? <img src={imagePreview} className="h-16 mx-auto rounded shadow-lg" /> : <Upload className="w-6 h-6 text-primary mx-auto opacity-70" />}
            <p className="text-[10px] text-primary/80 font-bold mt-2 uppercase tracking-widest">Select Image</p>
          </div>

          <div className="p-3 bg-black/40 rounded-lg border border-primary/10 space-y-2">
             <div className="flex justify-between items-center text-[9px] uppercase font-bold text-muted-foreground">
               <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-400"/> LP: BURNED</span>
               <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400"/> FEE: 1% STATIC</span>
             </div>
             <p className="text-[8px] text-primary/60 italic">Settings optimized for maximum visibility on Base.</p>
          </div>

          <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-xl h-16 shadow-[0_0_25px_rgba(var(--primary),0.4)]">
            {isConnected ? "DEPLOY ON BASE" : "CONNECT WALLET"}
          </Button>
          <p className="text-[9px] text-center text-muted-foreground uppercase font-bold tracking-widest">Rewards split: 50% WETH / 50% Token</p>
        </Card>
      </section>
    </div>
  )
}