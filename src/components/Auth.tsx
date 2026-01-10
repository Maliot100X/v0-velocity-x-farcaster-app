"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";

export function FarcasterAuth() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button 
        onClick={() => disconnect()}
        style={{background: '#22c55e', color: 'white', padding: '10px', borderRadius: '8px'}}
      >
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      style={{background: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '99px', fontWeight: 'bold'}}
    >
      SYNC WITH FARCASTER
    </button>
  );
}