import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
// Logic: Importing the Providers we need to stop the crash
import { Providers } from "./providers"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Velocity X - APE · STAKE · EARN",
  description: "Farcaster Base Mini App for token trading and staking",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${orbitron.variable} font-sans antialiased bg-black text-white`}>
        {/* Logic: Wrapped children in Providers so Wagmi works */}
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}