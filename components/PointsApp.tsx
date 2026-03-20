"use client";
import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import { CONTRACT_ABI } from "@/lib/abi";

const CONTRACT_ADDRESS = "0x84ebc6d0a64e2e0fc6bd2df2765417e46989008b" as const;

export default function PointsApp() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, isPending } = useWriteContract();
  const [referrer, setReferrer] = useState("");

  const { data: pendingReward } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "pendingReward",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: userInfo } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "users",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const handleStake = () => {
    // dataSuffix (bc_stoezdid) is auto-appended via wagmi config
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "stake",
      args: [referrer as `0x${string}` || "0x0000000000000000000000000000000000000000"],
    });
  };

  const handleClaim = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "claim",
    });
  };

  const referralLink = address ? `${typeof window !== "undefined" ? window.location.origin : ""}?ref=${address}` : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">⚡ PointsIncentive</h1>
          <p className="text-blue-300 mt-2 text-sm">Zero-Cost Entry · Onchain Points · Referral Growth</p>
        </div>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            className="w-full py-4 bg-blue-500 hover:bg-blue-400 rounded-2xl font-bold text-lg transition"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="bg-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Address</span>
                <span className="font-mono text-xs">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">My Points</span>
                <span className="font-bold text-yellow-300">
                  {userInfo ? (Number(BigInt(userInfo[2]?.toString() || "0")) / 1e18).toFixed(4) : "0"} PTS
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-300">Claimable</span>
                <span className="font-bold text-green-300">
                  {pendingReward ? (Number(BigInt(pendingReward.toString())) / 1e18).toFixed(6) : "0"} PTS
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <input
                placeholder="Referrer address (optional)"
                value={referrer}
                onChange={(e) => setReferrer(e.target.value)}
                className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm placeholder-blue-300 outline-none border border-white/20 focus:border-blue-400"
              />
              <button
                onClick={handleStake}
                disabled={isPending}
                className="w-full py-4 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 rounded-2xl font-bold transition"
              >
                {isPending ? "Processing..." : "🚀 Stake & Earn"}
              </button>
              <button
                onClick={handleClaim}
                disabled={isPending}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 rounded-2xl font-bold transition"
              >
                🎁 Claim Points
              </button>
            </div>

            {referralLink && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-blue-300 mb-2">📣 Your Referral Link</p>
                <p className="text-xs font-mono break-all text-white">{referralLink}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(referralLink)}
                  className="mt-2 text-xs text-blue-400 hover:text-blue-300"
                >
                  Copy Link
                </button>
              </div>
            )}

            <button onClick={() => disconnect()} className="w-full py-2 text-sm text-blue-400 hover:text-blue-300">
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
}
