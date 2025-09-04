import React from "react";
import { Alert, Linking, Platform, StyleSheet, Text, View } from "react-native";
import { useVerification } from "@/components/VerificationContext";
import { Card, GradientButton, Title } from "@/components/ui";

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
      <Title>{isVerified ? "Ride Pool Created 🚖" : "Verification required ❌"}</Title>

      <Card style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
        <Text style={styles.subtitle}>
          {isVerified ? "You're good to go." : "Verify insurance to continue."}
        </Text>
      </Card>

      <GradientButton title="🚗 Call Ride" onPress={callRide} style={{ width: "100%", marginTop: 16 }} />
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
  subtitle: {
    color: "#334155",
    fontWeight: "700",
  },
});


