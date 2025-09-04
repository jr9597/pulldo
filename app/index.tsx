import ReclaimComponent from "@/components/ReclaimComponent";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useVerification } from "@/components/VerificationContext";
import { LinearGradient } from "expo-linear-gradient";
import { GradientButton, Title, Card } from "@/components/ui";

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
    <LinearGradient colors={["#E0F2FE", "#ffffff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Title>Insurance-Verified Ride Sharing</Title>

        <View style={styles.hero}>
          <GradientButton
            title={isVerified ? "View Identity Passport" : "Verify My Insurance"}
            onPress={() => router.push("/identity")}
            style={{ width: "100%" }}
          />
          {isVerified ? (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>Insurance Verified ✅</Text>
            </View>
          ) : null}
          <TouchableOpacity style={styles.findPoolBtn} onPress={() => router.push("/pooling") }>
            <Text style={styles.findPoolText}>Find Ride Pool</Text>
          </TouchableOpacity>
        </View>

        {/* Verification flow moved to My Coverage screen */}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: "center",
  },
  hero: {
    width: "100%",
    marginTop: 20,
    gap: 14,
    alignItems: "center",
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
    backgroundColor: "#e8f5e9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 0,
    alignItems: "center",
    marginTop: 6,
  },
  verifiedText: {
    color: "#2e7d32",
    fontWeight: "700",
  },
  findPoolBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: "center",
    width: "100%",
  },
  findPoolText: {
    color: "#ffffff",
    fontWeight: "800",
  },
});
