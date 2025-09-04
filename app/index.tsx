import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useVerification } from "@/components/VerificationContext";
import { LinearGradient } from "expo-linear-gradient";
import { GradientButton, Title } from "@/components/ui";
import { USER_PLATE } from "@/constants/Vehicles";

export default function HomeScreen() {
  const router = useRouter();
  const { refresh } = useVerification();
  const [plate, setPlate] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      refresh();
    }, 300);
    return () => clearTimeout(t);
  }, [refresh]);

  const goLookup = () => {
    router.push({ pathname: "/lookup", params: { plate: plate || USER_PLATE } });
  };

  return (
    <LinearGradient colors={["#E0F2FE", "#ffffff"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Title>The fastest way to know if a driver is insured</Title>

        <View style={styles.hero}>
          <Text style={styles.subtitle}>Search by license plate or vehicle ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter plate (e.g., ABC1234)"
            placeholderTextColor="#94a3b8"
            value={plate}
            onChangeText={setPlate}
            autoCapitalize="characters"
          />
          <GradientButton title="Lookup" onPress={goLookup} style={{ width: "100%" }} />
          <GradientButton title="My Coverage" onPress={() => router.push("/identity")} style={{ width: "100%" }} />
        </View>
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
  subtitle: {
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: "#0f172a",
    borderColor: "#e2e8f0",
    borderWidth: 1,
  },
});
