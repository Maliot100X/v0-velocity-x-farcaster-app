import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";

export async function runVelocityAgent() {
  // Logic: Configure the Wallet Provider first
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  });

  // Logic: Initialize AgentKit with that provider
  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [], // We will add Clanker action provider in Phase 3
  });

  console.log("Velocity X AI Agent is LIVE.");
  console.log("Listening for Farcaster mentions...");
  return agentkit;
}

if (require.main === module) {
  runVelocityAgent().catch(console.error);
}