import { CdpWalletProvider, AgentKit } from "@coinbase/agentkit";

export async function runVelocityAgent() {
  // Logic: Configure the Wallet Provider correctly
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  });

  // Logic: Initialize AgentKit with the provider
  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [], // Clanker actions added here in Phase 3
  });

  console.log("VELOCITY X AI AGENT: ONLINE");
  console.log("LISTENING ON BASE MAINNET...");
  return agentkit;
}

if (require.main === module) {
  runVelocityAgent().catch(console.error);
}