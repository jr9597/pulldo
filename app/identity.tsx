import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useVerification } from "@/components/VerificationContext";
import { useRouter } from "expo-router";
import { GradientButton, Card, Title } from "@/components/ui";

export default function IdentityPassportScreen() {
  const router = useRouter();
  const { isVerified, isLoading, refresh } = useVerification();

  return (
    <View style={styles.container}>
      <Title>Identity Passport</Title>

      <Card style={styles.passportCard}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.status}>
          {isLoading ? "Checking status…" : isVerified ? "Verified Insurance ✅" : "Not Verified ❌"}
        </Text>
      </Card>

      <GradientButton title="Refresh Status" onPress={refresh} style={{ width: "100%", marginTop: 12 }} />
      <GradientButton title="Find Ride Pool" onPress={() => router.push("/pooling")} style={{ width: "100%", marginTop: 12 }} />
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
});


