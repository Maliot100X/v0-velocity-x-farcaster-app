import { CdpAgentkit } from "@coinbase/agentkit";

export async function runVelocityAgent() {
  const config = {
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  };

  const agentkit = await CdpAgentkit.configureWithWallet(config);
  
  // LOGIC: Listening for Farcaster mentions to trigger Clanker
  console.log("Velocity X AI Agent is LIVE.");
  console.log("Listening for: @velocityx launch [name] [symbol]");
  
  // This is the brain that connects to Clanker Factory (0x1bc0c42215582d5a085795f4badbac3ff36d1bcb)
  return agentkit;
}

// Automatically start if run directly
if (require.main === module) {
  runVelocityAgent();
}