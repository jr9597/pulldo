import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Card, GradientButton, Title } from "@/components/ui";

type Rider = {
  id: string;
  name: string;
  distance: string;
};

export default function PoolingScreen() {
  const router = useRouter();
  const riders = useMemo<Rider[]>(() => (
    [
      { id: "1", name: "Alex", distance: "0.4 mi" },
      { id: "2", name: "Jordan", distance: "0.6 mi" },
      { id: "3", name: "Sam", distance: "0.9 mi" },
    ]
  ), []);

  return (
    <View style={styles.container}>
      <Title>Nearby Riders</Title>

      <FlatList
        style={{ width: "100%" }}
        data={riders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20, marginTop: 16, gap: 12 }}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.row}>
              <Text style={styles.name}>👤 {item.name}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <Text style={styles.verified}>✅ Insurance Verified</Text>
          </Card>
        )}
      />

      <GradientButton title="Join Ride Pool" onPress={() => router.push("/ride-confirmation")} style={{ width: "100%", marginTop: 8 }} />
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    color: "#0f172a",
    fontWeight: "800",
  },
  distance: {
    color: "#64748b",
    fontWeight: "600",
  },
  verified: {
    color: "#16a34a",
    fontWeight: "700",
  },
});


