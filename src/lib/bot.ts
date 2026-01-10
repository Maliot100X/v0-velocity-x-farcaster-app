import { CdpAgentkit } from "@coinbase/agentkit";

export async function initializeBot() {
  const config = {
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    networkId: "base-mainnet",
  };
  const agentkit = await CdpAgentkit.configureWithWallet(config);
  console.log("Velocity X Bot Initialized:", await agentkit.getAddress());
  return agentkit;
}

export const CLANKER_CONFIG = {
  address: "0x1bc0c42215582d5a085795f4badbac3ff36d1bcb",
  abi: ["function createToken(string name, string symbol, uint256 supply) public returns (address)"]
};