import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

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
      <FlatList
        data={riders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <Text style={styles.verified}>Insurance Verified ✅</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/ride-confirmation")}>
        <Text style={styles.primaryText}>Join Ride Pool</Text>
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
    backgroundColor: "#111111",
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    color: "#ffffff",
    fontWeight: "700",
  },
  distance: {
    color: "#aaaaaa",
  },
  verified: {
    color: "#72d572",
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  primaryText: {
    color: "#000000",
    fontWeight: "600",
  },
});


