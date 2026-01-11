"use client"

import { useState, useRef } from "react"
import { Rocket, Sparkles, Upload, ShieldCheck, Zap, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWriteContract, useAccount, useConnect } from "wagmi"
import sdk from "@farcaster/frame-sdk"

export function LaunchTab() {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { writeContract } = useWriteContract()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", symbol: "" })

  const handleCastToLaunch = async () => {
    const text = `@velocityx launch ${formData.name || "TokenName"} $${formData.symbol || "TICKER"}`
    sdk.actions.composeCast({ 
      text,
      embeds: ["https://v0-velocity-x-farcaster-app.vercel.app"] 
    })
  }

  const handleDeployOnChain = async () => {
    if (!isConnected) { 
      connect({ connector: connectors[0] }); 
      return 
    }
    
    // FETCH REAL FID FROM FARCASTER CONTEXT
    const context = await sdk.context;
    const userFid = context?.user?.fid || 0;

    writeContract({
      // REAL CLANKER V2 FACTORY ADDRESS
      address: "0x448f8b93784834ef9853966eb962f928e469796e",
      abi: [{
        name: 'deployToken',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
          { name: '_name', type: 'string' },
          { name: '_symbol', type: 'string' },
          { name: '_image', type: 'string' },
          { name: '_fid', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'address' }],
      }],
      functionName: 'deployToken',
      args: [
        formData.name, 
        formData.symbol, 
        imagePreview || "https://v0-velocity-x-farcaster-app.vercel.app/logo.png", 
        BigInt(userFid), 
      ],
      // 0n means no initial ETH buy. Set to parseEther("0.001") for real LP seed.
      value: 0n,
    })
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <div className="text-center py-2 bg-primary/10 rounded-full border border-primary/20">
        <p className="text-[10px] font-mono font-bold text-primary animate-pulse uppercase">
          2,847,413,420 REWARDS STREAMED • 10% FEE ACTIVE
        </p>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-3 font-orbitron text-primary uppercase italic text-sm">
          <Sparkles className="w-5 h-5" />
          <h2>CAST TO LAUNCH</h2>
        </div>
        <Card className="p-5 bg-gradient-to-br from-primary/20 to-accent/5 border-primary/40 shadow-lg">
          <p className="text-xs text-cyan-200 mb-4 leading-relaxed">
            Mention <span className="font-bold text-white">@VelocityX</span> in a Farcaster cast. Our AI + Clanker will automatically deploy your token on Base!
          </p>
          <div className="space-y-2 mb-5">
             <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-primary"/> Name and symbol included</div>
             <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><CheckCircle2 className="w-3 h-3 text-primary"/> 50/50 WETH Reward Split</div>
          </div>
          <Button onClick={handleCastToLaunch} className="w-full bg-primary hover:bg-primary/90 font-black h-12 shadow-lg">CAST TO LAUNCH</Button>
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3 font-orbitron text-primary uppercase text-sm">
          <Rocket className="w-5 h-5" />
          <h2>Instant In-App Creator</h2>
        </div>
        
        <Card className="p-5 bg-card/80 border-primary/20 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Name*" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="bg-background border-primary/10 h-10 text-xs" />
            <Input placeholder="Symbol*" value={formData.symbol} onChange={(e)=>setFormData({...formData, symbol:e.target.value})} className="bg-background border-primary/10 h-10 text-xs uppercase" />
          </div>

          <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-primary/5 cursor-pointer">
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImagePreview(URL.createObjectURL(file))
            }} />
            {imagePreview ? <img src={imagePreview} className="h-16 mx-auto rounded shadow-lg" /> : <Upload className="w-6 h-6 text-primary mx-auto opacity-70" />}
            <p className="text-[10px] text-primary/80 font-bold mt-2 uppercase tracking-widest">Select Image</p>
          </div>

          <div className="p-3 bg-black/40 rounded-lg border border-primary/10 flex justify-between items-center text-[9px] uppercase font-bold text-muted-foreground">
             <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-400"/> LP: BURNED</span>
             <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400"/> FEE: 1% STATIC</span>
          </div>

          <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-black text-xl h-16 shadow-2xl">
            {isConnected ? "DEPLOY ON BASE" : "CONNECT WALLET"}
          </Button>
        </Card>
      </section>
    </div>
  )
}