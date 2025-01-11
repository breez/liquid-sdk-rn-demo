import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import * as liquidSdk from "@breeztech/react-native-breez-sdk-liquid";
import { defaultConfig, LiquidNetwork, SdkEvent, SdkEventVariant } from "@breeztech/react-native-breez-sdk-liquid";
async function initSdk(): Promise<void> {
  const config = await defaultConfig(LiquidNetwork.TESTNET, process.env.EXPO_PUBLIC_BREEZ_API_KEY);
  // TODO: DO NOT use the following lines in production.
  // Storing the mnemonic in this way will bundle the plain mnemonic within your application.
  // Please replace them with your own mnemonic logic instead.
  // For example, you can use the `bip39-expo` package to generate a mnemonic:
  // ```lang=js
  // import bip39 from "@dawar2151/bip39-expo";
  // const mnemonic = bip39.generateMnemonic();
  // ```
  // And then persist the generated mnemonic in the app's local storage
  const mnemonic = process.env.EXPO_PUBLIC_MNEMONIC;
  if (!mnemonic) throw Error('No mnemonic found');

  await liquidSdk.connect({ config, mnemonic });
}

export default function RootLayout() {
  let [connected, setConnected] = useState(false);

  useEffect(() => {
    initSdk()
      .then(() => setConnected(true))

    return () => {
      liquidSdk.disconnect();
      setConnected(false);
    }
  }, [])

  if (!connected) return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{ textAlign: 'center' }}>Loading...</Text>
    </View>
  );

  return (
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
  )
}
