"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Vault, TrendingUp, Users } from "lucide-react"

export function VaultsTab() {
  const vaults = [
    {
      name: "Velocity X Vault",
      symbol: "VX",
      apy: "234%",
      tvl: "$8.5M",
      stakers: 3421,
      userStaked: "690,982.00 B3",
    },
    {
      name: "Base Rewards Vault",
      symbol: "BASE",
      apy: "156%",
      tvl: "$4.2M",
      stakers: 1892,
      userStaked: "0",
    },
    {
      name: "Clanker Vault",
      symbol: "CLNK",
      apy: "189%",
      tvl: "$3.8M",
      stakers: 1423,
      userStaked: "0",
    },
  ]

  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Vault className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold font-orbitron text-primary">VAULTS</h2>
      </div>

      <div className="space-y-3">
        {vaults.map((vault, idx) => (
          <Card
            key={idx}
            className="p-4 bg-card/60 border-primary/20 hover:border-primary/40 transition-all glow-cyan-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-foreground">{vault.name}</h3>
                <p className="text-xs text-muted-foreground">${vault.symbol}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">{vault.apy}</div>
                <div className="text-[10px] text-muted-foreground">APY</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
              <div>
                <div className="text-muted-foreground text-[10px]">TVL</div>
                <div className="font-semibold text-cyan-300">{vault.tvl}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-[10px]">Stakers</div>
                <div className="font-semibold text-cyan-300 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {vault.stakers}
                </div>
              </div>
            </div>

            {vault.userStaked !== "0" && (
              <div className="p-2 bg-primary/10 rounded-lg mb-3">
                <div className="text-[10px] text-muted-foreground">Your Stake</div>
                <div className="font-bold text-sm text-primary">{vault.userStaked}</div>
              </div>
            )}

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              {vault.userStaked === "0" ? "Stake Now" : "Manage Stake"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
