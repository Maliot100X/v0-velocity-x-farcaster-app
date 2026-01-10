import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";

export async function runVelocityAgent() {
  const walletProvider = await CdpWalletProvider.configureWithWallet({
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  });

  const agentkit = await AgentKit.from({
    walletProvider,
    actionProviders: [], 
  });

  console.log("VELOCITY X BOT: ONLINE");
  return agentkit;
}

if (require.main === module) {
  runVelocityAgent().catch(console.error);
}