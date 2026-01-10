"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

const config = createConfig({
  chains: [base],
  connectors: [
    injected(), 
    coinbaseWallet({ appName: 'Velocity X' }),
  ],
  transports: { [base.id]: http() },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {mounted && children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}