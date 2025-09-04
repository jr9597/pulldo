import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAbstraxionAccount, useAbstraxionSigningClient } from "@burnt-labs/abstraxion-react-native";

type VerificationContextValue = {
  isVerified: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
};

const VerificationContext = createContext<VerificationContextValue | undefined>(undefined);

const RUM_CONTRACT_ADDRESS = process.env.EXPO_PUBLIC_RUM_CONTRACT_ADDRESS ?? "";

export function VerificationProvider({ children }: { children: React.ReactNode }) {
  const { client } = useAbstraxionSigningClient();
  const { data: account } = useAbstraxionAccount();

  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!client || !account?.bech32Address || !RUM_CONTRACT_ADDRESS) {
      setIsVerified(false);
      return;
    }
    try {
      setIsLoading(true);
      const queryMsg = {
        get_value_by_user: {
          address: account.bech32Address,
        },
      };
      const result: string = await client.queryContractSmart(RUM_CONTRACT_ADDRESS, queryMsg);
      const cleanResult = result.replace(/"/g, "");
      const parsed = parseInt(cleanResult, 10);
      setIsVerified(!isNaN(parsed) && parsed > 0);
    } catch (e) {
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  }, [client, account?.bech32Address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ isVerified, isLoading, refresh }), [isVerified, isLoading, refresh]);

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
}

export function useVerification() {
  const ctx = useContext(VerificationContext);
  if (!ctx) throw new Error("useVerification must be used within VerificationProvider");
  return ctx;
}


