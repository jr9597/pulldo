# Insurance-Verified Ride Lookup (XION + Reclaim)

“The fastest way to know if a driver is insured.”

This React Native app demonstrates insurance verification using Reclaim Protocol with XION. Drivers verify coverage (personal or commercial) and associate it with a plate/vehicle ID. Anyone can look up a plate to see verification status. Your own plate uses live verification via Reclaim/XION; all other records use dummy data.

## Features

- Verify insurance via Reclaim (functional)
- Associate coverage to a plate/vehicle ID
- Lookup screen to check any plate (dummy data for others)
- “My Coverage” screen shows wallet connect, your plate, coverage, and the verification flow
- Modern UI: gradients, cards, bold CTAs

## Screens

- Home: plate input + buttons for Lookup and My Coverage
- Lookup: shows status, coverage type, and owner/vehicle info
- My Coverage: connect wallet, run Reclaim verification, see live status and your plate

## Requirements

- Node 18+
- Android Studio (for Android builds)
- .env with the following:

```bash
EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS=
EXPO_PUBLIC_RPC_ENDPOINT=
EXPO_PUBLIC_REST_ENDPOINT=
EXPO_PUBLIC_CODE_ID=
EXPO_PUBLIC_VERIFICATION_CONTRACT_ADDRESS=
EXPO_PUBLIC_RUM_CONTRACT_ADDRESS=
EXPO_PUBLIC_RECLAIM_APP_ID=
EXPO_PUBLIC_RECLAIM_PROVIDER_ID=
EXPO_PUBLIC_RECLAIM_APP_SECRET=
```

## Install and Run (Dev)

```bash
npm install
npx expo run:android
```

## Build a Public APK (Release)

Universal APK (no ABI splits):

```bash
cd android
./gradlew assembleRelease -x lint -x lintVitalAnalyzeRelease
```

Output:

```
android/app/build/outputs/apk/release/app-release.apk
```

Optionally publish to GitHub Releases with a tag (example):

```bash
git tag v0.1.0
git push origin v0.1.0
```

Add SHA-256 to the release notes for integrity verification:

```bash
shasum -a 256 android/app/build/outputs/apk/release/app-release.apk
```

## Configuration

- Your plate is defined in `constants/Vehicles.ts` as `USER_PLATE` (default: `ABC1234`).
- Dummy vehicle records live in `constants/Vehicles.ts`.

## Tech Stack

- React Native / Expo Router
- XION Abstraxion SDK (@burnt-labs/abstraxion-react-native)
- Reclaim Protocol In-App SDK (@reclaimprotocol/inapp-rn-sdk)
- expo-linear-gradient for UI

## License

This project is licensed under the MIT License. See `LICENSE` for details.
