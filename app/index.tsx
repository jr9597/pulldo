import ReclaimComponent from "@/components/ReclaimComponent";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useVerification } from "@/components/VerificationContext";

export default function HomeScreen() {
  const router = useRouter();
  const { isVerified, refresh } = useVerification();

  useEffect(() => {
    // Refresh verification when returning to home
    const t = setTimeout(() => {
      refresh();
    }, 300);
    return () => clearTimeout(t);
  }, [refresh]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Ride Share Demo</Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          This tab provides zero-knowledge proof functionality using Reclaim
          Protocol. You can verify your identity without revealing sensitive
          data. This is a proof of concept and is not production ready.
        </Text>
      </View>

      {isVerified ? (
        <View style={styles.verifiedBadge}>
          <Text style={styles.verifiedText}>Insurance Verified ✅</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/identity") }>
        <Text style={styles.primaryText}>{isVerified ? "View Identity Passport" : "Verify My Insurance"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/pooling") }>
        <Text style={styles.secondaryText}>Find Ride Pool</Text>
      </TouchableOpacity>

      <View style={styles.componentContainer}>
        <ReclaimComponent />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  notConnectedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  notConnectedText: {
    fontSize: 16,
    color: "#cccccc",
    textAlign: "center",
  },
  descriptionContainer: {
    backgroundColor: "#111111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },
  descriptionText: {
    fontSize: 14,
    color: "#cccccc",
    lineHeight: 20,
  },
  componentContainer: {
    backgroundColor: "#111111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },
  verifiedBadge: {
    backgroundColor: "#133a1a",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2e7d32",
    alignItems: "center",
    marginBottom: 16,
  },
  verifiedText: {
    color: "#72d572",
    fontWeight: "600",
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
    marginBottom: 20,
  },
  secondaryText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
