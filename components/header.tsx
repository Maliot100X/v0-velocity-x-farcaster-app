"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Header() {
  const [rewardsCount, setRewardsCount] = useState(2847392614)

  useEffect(() => {
    const interval = setInterval(() => {
      setRewardsCount((prev) => prev + Math.floor(Math.random() * 100))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Image
              src="/images/gemini-generated-image-l44ak5l44ak5l44a.png"
              alt="Velocity X"
              width={32}
              height={32}
              className="rounded-full glow-cyan-sm"
            />
            <span className="font-bold text-lg font-[family-name:var(--font-orbitron)] text-cyan-400">Velocity X</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-sm font-bold tracking-wider font-[family-name:var(--font-orbitron)] text-cyan-400 mb-1">
            APE · STAKE · EARN
          </h1>
          <motion.div
            className="text-xs"
            key={rewardsCount}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-cyan-300 font-mono font-bold">{rewardsCount.toLocaleString()}</span>{" "}
            <span className="text-cyan-400">rewards streamed</span>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
