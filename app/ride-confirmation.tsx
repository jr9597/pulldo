import React from "react";
import { Alert, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useVerification } from "@/components/VerificationContext";

const uberDeepLink = Platform.select({
  ios: "uber://?action=setPickup&pickup=my_location",
  android: "uber://?action=setPickup&pickup=my_location",
  default: "https://m.uber.com/ul/?action=setPickup&pickup=my_location",
});

export default function RideConfirmationScreen() {
  const { isVerified } = useVerification();

  const callRide = async () => {
    if (!isVerified) {
      Alert.alert("Verification required ❌", "Please verify your insurance to call a ride.");
      return;
    }
    const url = uberDeepLink as string;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Robotaxi called", "Opening fallback link.");
      await Linking.openURL("https://m.uber.com");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, isVerified ? styles.verified : styles.unverified]}>
        <Text style={styles.title}>{isVerified ? "Ride Pool Created 🚖" : "Verification required ❌"}</Text>
        <Text style={styles.subtitle}>
          {isVerified ? "You're good to go." : "Verify insurance to continue."}
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={callRide}>
        <Text style={styles.primaryText}>Call Ride</Text>
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
  subtitle: {
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
});


