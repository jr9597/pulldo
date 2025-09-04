import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useVerification } from "@/components/VerificationContext";
import { useRouter } from "expo-router";

export default function IdentityPassportScreen() {
  const router = useRouter();
  const { isVerified, isLoading, refresh } = useVerification();

  return (
    <View style={styles.container}>
      <View style={[styles.card, isVerified ? styles.verified : styles.unverified]}>
        <Text style={styles.title}>Identity Passport</Text>
        <Text style={styles.statusText}>
          {isLoading ? "Checking status…" : isVerified ? "Insurance Verified ✅" : "Not Verified ❌"}
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={refresh}>
        <Text style={styles.primaryText}>Refresh Status</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/pooling") }>
        <Text style={styles.secondaryText}>Go to Pooling</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
    paddingTop: 60,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  verified: {
    backgroundColor: "#133a1a",
    borderColor: "#2e7d32",
  },
  unverified: {
    backgroundColor: "#2a1212",
    borderColor: "#7f1d1d",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  statusText: {
    color: "#cccccc",
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryText: {
    color: "#000000",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#222222",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444444",
  },
  secondaryText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});


