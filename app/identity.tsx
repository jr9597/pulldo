import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useVerification } from "@/components/VerificationContext";
import { useRouter } from "expo-router";
import { GradientButton, Card, Title } from "@/components/ui";
import ReclaimComponent from "@/components/ReclaimComponent";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion-react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function IdentityPassportScreen() {
  const router = useRouter();
  const { isVerified, isLoading, refresh } = useVerification();
  const { isConnected, isConnecting, login } = useAbstraxionAccount();

  // Auto-refresh when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <Title>My Coverage</Title>

      {!isConnected ? (
        <Card style={[styles.passportCard, { alignItems: "center" }]}>
          <Text style={styles.label}>Wallet</Text>
          <Text style={styles.status}>Connect to check coverage</Text>
          <GradientButton title={isConnecting ? "Connecting…" : "Connect Wallet"} onPress={login} style={{ width: "100%", marginTop: 12 }} />
        </Card>
      ) : (
        <Card style={styles.passportCard}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.badge, isVerified ? styles.badgeOk : styles.badgeWarn]}>
            {isLoading ? "Checking status…" : isVerified ? "✅ Insurance Verified" : "❌ Not Verified"}
          </Text>
          <View style={{ height: 8 }} />
          <Text style={styles.label}>Plate</Text>
          <Text style={styles.statusValue}>ABC1234</Text>
          <Text style={styles.label}>Coverage</Text>
          <Text style={styles.statusValue}>{isVerified ? "personal" : "unknown"}</Text>
        </Card>
      )}

      <Card style={{ width: "100%", marginTop: 16 }}>
        <ReclaimComponent />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  passportCard: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
  },
  status: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 18,
  },
  statusValue: {
    color: "#0f172a",
    fontWeight: "800",
  },
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignSelf: "flex-start",
    fontWeight: "800",
  },
  badgeOk: {
    color: "#166534",
    backgroundColor: "#dcfce7",
  },
  badgeWarn: {
    color: "#7f1d1d",
    backgroundColor: "#fee2e2",
  },
});


