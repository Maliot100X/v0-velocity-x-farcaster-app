import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";

export async function initializeVelocityBot() {
  try {
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
    console.log("🚀 VELOCITY X AI BOT: INITIALIZED");
    console.log("📍 ADMIN WALLET: 0x1909...5bD1Fec");
    console.log("-----------------------------------------");
    
    return agentkit;
  } catch (error) {
    console.error("Bot Initialization Failed:", error);
  }
}

if (require.main === module) {
  initializeVelocityBot();
}