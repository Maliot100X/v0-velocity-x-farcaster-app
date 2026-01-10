"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Header() {
  const [rewardsCount, setRewardsCount] = useState(2847392614)

  useEffect(() => {
    const interval = setInterval(() => {
      setRewardsCount((prev) => prev + Math.floor(Math.random() * 100))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary glow-cyan-sm flex items-center justify-center">
              <span className="text-sm font-bold font-[family-name:var(--font-orbitron)]">VX</span>
            </div>
            <span className="font-bold text-lg font-[family-name:var(--font-orbitron)] text-primary">Velocity X</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-sm font-bold tracking-wider font-[family-name:var(--font-orbitron)] text-primary mb-1">
            APE · STAKE · EARN
          </h1>
          <motion.div
            className="text-xs text-muted-foreground"
            key={rewardsCount}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-accent font-mono">{rewardsCount.toLocaleString()}</span> rewards streamed
          </motion.div>
        </div>
      </div>
    </header>
  )
}
