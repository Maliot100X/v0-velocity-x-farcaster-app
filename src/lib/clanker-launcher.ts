import { initializeBot, CLANKER_CONFIG } from "./bot";

export async function deployNewToken(name: string, symbol: string) {
  try {
    const bot = await initializeBot();
    
    // This is the call to the Clanker Factory on Base
    const tx = await bot.invokeContract({
      contractAddress: CLANKER_CONFIG.address,
      method: "createToken",
      args: {
        name: name,
        symbol: symbol,
        supply: "1000000000" // 1 Billion tokens
      }
    });

    console.log("Token Deployed! TX Hash:", tx);
    return tx;
  } catch (error) {
    console.error("Clanker Deployment Failed:", error);
    throw error;
  }
}