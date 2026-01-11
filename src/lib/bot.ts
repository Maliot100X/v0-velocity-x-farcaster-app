import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";

export async function initializeVelocityBot() {
  // Use the provider-first initialization
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME || "",
    apiKeyPrivateKey: (process.env.CDP_API_KEY_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  });

  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [], 
  });

  console.log("-----------------------------------------");
  console.log("🚀 VELOCITY X AI BOT: ONLINE");
  console.log("-----------------------------------------");
  
  return agentkit;
}