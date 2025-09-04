import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Card, Title } from "@/components/ui";
import { USER_PLATE, findVehicleByPlate } from "@/constants/Vehicles";
import { useVerification } from "@/components/VerificationContext";

export default function LookupScreen() {
  const params = useLocalSearchParams<{ plate?: string }>();
  const userLookupPlate = (params?.plate || USER_PLATE) as string;
  const { isVerified } = useVerification();

  const record = useMemo(() => {
    const r = findVehicleByPlate(userLookupPlate);
    if (!r) return undefined;
    // If the record corresponds to the user plate, use live verification status
    if (r.plate.toUpperCase() === USER_PLATE.toUpperCase()) {
      return { ...r, verified: isVerified };
    }
    return r;
  }, [userLookupPlate, isVerified]);

  return (
    <View style={styles.container}>
      <Title>Lookup Result</Title>
      <Card style={{ width: "100%", marginTop: 16 }}>
        <Text style={styles.label}>Plate</Text>
        <Text style={styles.value}>{userLookupPlate.toUpperCase()}</Text>

        {record ? (
          <>
            <Text style={[styles.badge, record.verified ? styles.badgeOk : styles.badgeWarn]}>
              {record.verified ? "✅ Insurance Verified" : "❌ Not Verified"}
            </Text>
            <View style={{ height: 10 }} />
            <Text style={styles.label}>Coverage</Text>
            <Text style={styles.value}>{record.coverage}</Text>
            {record.owner ? (
              <>
                <Text style={styles.label}>Owner</Text>
                <Text style={styles.value}>{record.owner}</Text>
              </>
            ) : null}
            {record.vehicleId ? (
              <>
                <Text style={styles.label}>Vehicle ID</Text>
                <Text style={styles.value}>{record.vehicleId}</Text>
              </>
            ) : null}
          </>
        ) : (
          <Text style={styles.notFound}>No vehicle found for this plate.</Text>
        )}
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
  label: {
    color: "#64748b",
    fontWeight: "700",
    marginTop: 10,
  },
  value: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 16,
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
  notFound: {
    color: "#7c3aed",
    fontWeight: "700",
    marginTop: 10,
  },
});


