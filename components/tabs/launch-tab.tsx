"use client"

import { motion } from "framer-motion"
import { Rocket, Sparkles, Upload, ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function LaunchTab() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    description: "",
    image: null as File | null,
    initialSupply: "",
    maxSupply: "",
  })

  const handleDeployOnChain = async () => {
    console.log("[v0] Deploy on-chain clicked", formData)
    // TODO: Implement Wagmi useWriteContract for Clanker Factory
    alert(
      "Deploy on-chain functionality will use Wagmi useWriteContract for 0x1bc0c42215582d5a085795f4badbac3ff36d1bcb",
    )
  }

  const handleCastToLaunch = async () => {
    console.log("[v0] Cast to launch clicked", formData)
    const text = `@velocityx launch ${formData.name} $${formData.symbol}`
    if (typeof window !== "undefined" && window.sdk?.actions?.composeCast) {
      window.sdk.actions.composeCast({ text })
    } else {
      alert(`Would open compose cast with: ${text}`)
    }
  }

  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      {/* Section 1: Cast to Launch */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary">CAST TO LAUNCH</h2>
        </div>

        <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30">
          <p className="text-sm text-cyan-300 mb-4 leading-relaxed">
            Mention <span className="font-bold text-primary">@VelocityX</span> in a Farcaster cast with your token name,
            symbol, and image. Our AI + Clanker will automatically deploy your token on Base!
          </p>

          <div className="space-y-2 text-xs text-muted-foreground mb-4">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Include token name and symbol</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>Attach an image for your token</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
              <span>AI + Clanker deploys automatically</span>
            </div>
          </div>

          <Button onClick={handleCastToLaunch} className="w-full bg-primary hover:bg-primary/90 font-bold">
            <Sparkles className="w-4 h-4 mr-2" />
            CAST TO LAUNCH
          </Button>
        </Card>
      </section>

      {/* Section 2: In-App Launch */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold font-orbitron text-primary">IN-APP LAUNCH</h2>
        </div>

        <Card className="p-5 bg-card/60 border-primary/20">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-cyan-300 mb-1.5 block">Token Name</label>
              <Input
                placeholder="e.g., Velocity Moon"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cyan-300 mb-1.5 block">Symbol</label>
              <Input
                placeholder="e.g., VMOON"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="bg-background/50 border-primary/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cyan-300 mb-1.5 block">Description</label>
              <Textarea
                placeholder="Describe your token..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background/50 border-primary/20 min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-cyan-300 mb-1.5 block">Image</label>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/30">
                <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Advanced Options */}
            <div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                Advanced Options
              </button>

              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 space-y-3"
                >
                  <div>
                    <label className="text-xs font-semibold text-cyan-300 mb-1.5 block">Initial Supply</label>
                    <Input
                      type="number"
                      placeholder="e.g., 1000000"
                      value={formData.initialSupply}
                      onChange={(e) => setFormData({ ...formData, initialSupply: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-cyan-300 mb-1.5 block">Max Supply</label>
                    <Input
                      type="number"
                      placeholder="e.g., 10000000"
                      value={formData.maxSupply}
                      onChange={(e) => setFormData({ ...formData, maxSupply: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <Button onClick={handleDeployOnChain} className="w-full bg-primary hover:bg-primary/90 font-bold">
                <Rocket className="w-4 h-4 mr-2" />
                DEPLOY ON-CHAIN
              </Button>
              <p className="text-[10px] text-center text-muted-foreground">Via Clanker Factory on Base</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
