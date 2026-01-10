import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";

export async function runVelocityAgent() {
  // Logic: Initialize the Wallet Provider correctly for 2026 SDK
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  });

  // Logic: Create AgentKit instance
  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [], 
  });

  console.log("VELOCITY X AI AGENT: ONLINE AND LISTENING...");
  return agentkit;
}

if (require.main === module) {
  runVelocityAgent().catch(console.error);
}