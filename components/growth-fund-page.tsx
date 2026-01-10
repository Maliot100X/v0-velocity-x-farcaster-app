"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, FileText, ExternalLink } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface GrowthFundPageProps {
  onBack: () => void
}

export function GrowthFundPage({ onBack }: GrowthFundPageProps) {
  const [pooledAmount, setPooledAmount] = useState(42_340_567_890)
  const [flowRate, setFlowRate] = useState(1_234_567)

  // Live ticking for pooled amount and flow rate
  useEffect(() => {
    const interval = setInterval(() => {
      setPooledAmount((prev) => prev + Math.floor(Math.random() * 1000))
      setFlowRate((prev) => prev + Math.floor(Math.random() * 100))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen pb-6">
      {/* Sticky header */}
      <div className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-xl border-b border-primary/20 px-4 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Hero section */}
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30 glow-cyan">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/30 border-2 border-primary glow-cyan-sm flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-orbitron text-cyan-300">Velocity X Growth Fund</h1>
              <p className="text-xs text-cyan-400/80">Platform Growth Initiative</p>
            </div>
          </div>

          <p className="text-sm text-cyan-100/90 leading-relaxed mb-4">
            Help Velocity X grow through marketing and dev initiatives. Deposit your staked $VELOCITYX to earn rewards.
          </p>

          <Button className="w-full bg-primary hover:bg-primary/90 glow-cyan text-primary-foreground font-semibold">
            Deposit stVELOCITYX
          </Button>
        </Card>

        {/* Metrics section */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 space-y-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Total Pooled So Far</p>
            <p className="text-3xl font-bold font-mono text-cyan-300 glow-cyan-text">{pooledAmount.toLocaleString()}</p>
            <p className="text-sm text-cyan-400/70 mt-1">VELOCITYX</p>
          </div>
        </Card>

        {/* Crowdfund Stats */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 space-y-4">
          <h3 className="font-bold text-lg font-orbitron text-cyan-300">Crowdfund Stats</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary/30 rounded-lg border border-primary/10">
              <p className="text-xs text-muted-foreground mb-2">stVELOCITYX Deposited</p>
              <p className="text-xl font-bold font-mono text-cyan-300">{pooledAmount.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg border border-primary/10">
              <p className="text-xs text-muted-foreground mb-2">Flow Rate / day</p>
              <p className="text-xl font-bold font-mono text-accent">{flowRate.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* FAQ section */}
        <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
          <h3 className="font-bold text-lg font-orbitron text-cyan-300 mb-4">Frequently Asked Questions</h3>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border-primary/20">
              <AccordionTrigger className="text-sm text-cyan-200 hover:text-cyan-100">
                How do Velocity X crowdfunds work?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Velocity X crowdfunds allow community members to pool their staked VELOCITYX tokens to fund platform
                growth initiatives. Your staked tokens continue to earn rewards while contributing to the growth fund.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-primary/20">
              <AccordionTrigger className="text-sm text-cyan-200 hover:text-cyan-100">
                Is this sufficiently decentralized?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Yes. The Growth Fund operates on-chain with transparent smart contracts. All transactions are verifiable
                on Base, and fund allocation is governed by community voting through veVX tokens.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-primary/20">
              <AccordionTrigger className="text-sm text-cyan-200 hover:text-cyan-100">
                Can I withdraw my staked Velocity X?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Yes, you can withdraw your stVELOCITYX at any time. There's a 7-day cooldown period for security
                purposes. Your rewards will continue accruing during the cooldown period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-primary/20">
              <AccordionTrigger className="text-sm text-cyan-200 hover:text-cyan-100">
                How do I know how much I'm contributing?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Your dashboard displays your deposited amount, current flow rate, and total contribution over time. All
                metrics update in real-time and are verifiable on-chain.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-primary/20">
              <AccordionTrigger className="text-sm text-cyan-200 hover:text-cyan-100">
                I topped up my stake — how do I deposit?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                Simply click "Deposit stVELOCITYX" and select the amount you want to add. Your new tokens will be
                automatically added to your existing position, and your flow rate will update accordingly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Footer */}
        <Card className="p-4 bg-card/30 backdrop-blur border-primary/10">
          <div className="flex items-center justify-between text-xs">
            <a href="#" className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
              <FileText className="w-3 h-3" />
              <span>Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <p className="text-muted-foreground">
              Powered by <span className="text-primary font-semibold">Velocity X</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
