import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";

export async function initializeVelocityBot() {
  try {
    const config = {
      apiKeyName: process.env.CDP_API_KEY_NAME || "",
      apiKeyPrivateKey: (process.env.CDP_API_KEY_PRIVATE_KEY || "").replace(/\\n/g, '\n'),
      networkId: "base-mainnet",
    };

    const walletProvider = await CdpWalletProvider.configureWithWallet(config);

    const agentkit = await AgentKit.from({
      walletProvider,
      actionProviders: [], 
    });

    console.log("-----------------------------------------");
    console.log("🚀 VELOCITY X AI BOT: INITIALIZED");
    console.log("🤖 IDENTITY: Velocity X Clanker Agent");
    console.log("📍 ADMIN RECIPIENT: 0x1909...5bD1Fec");
    console.log("-----------------------------------------");
    
    return agentkit;
  } catch (error) {
    console.error("FAILED TO START BOT:", error);
  }
}

if (require.main === module) {
  initializeVelocityBot();
}