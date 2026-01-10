"use client";

import { useEffect, useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";

// Logic: We define the config here
const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Logic: Dynamic import to prevent build errors if SDK is missing during pre-render
    const initSdk = async () => {
      try {
        const { default: sdk } = await import("@farcaster/frame-sdk");
        sdk.actions.ready();
      } catch (e) {
        console.error("SDK Load Error", e);
      }
      setIsReady(true);
    };
    initSdk();
  }, []);

  // During SSR/Initial load, we still want to show the UI
  if (!isReady) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}