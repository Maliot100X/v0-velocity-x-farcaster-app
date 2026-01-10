"use client"

import { Card } from "@/components/ui/card"
import { Settings, Bell, Shield, Globe } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function SettingsTab() {
  return (
    <div className="px-4 pt-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold font-orbitron text-primary">SETTINGS</h2>
      </div>

      <Card className="p-4 bg-card/60 border-primary/20">
        <div className="flex items-center justify-between py-3 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Get alerts for rewards</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Transaction Confirmation</p>
              <p className="text-xs text-muted-foreground">Require confirmation</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Auto-compound Rewards</p>
              <p className="text-xs text-muted-foreground">Reinvest automatically</p>
            </div>
          </div>
          <Switch />
        </div>
      </Card>

      <Card className="p-4 bg-card/30 backdrop-blur border-primary/10">
        <div className="text-xs text-center space-y-1 text-muted-foreground">
          <p className="font-bold text-foreground">Velocity X v1.0.0</p>
          <p>Built on Base • Powered by Farcaster MiniApp</p>
        </div>
      </Card>
    </div>
  )
}
