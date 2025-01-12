import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";

import { store } from "@/store";
import { setInfo } from "@/store/reducers/info";
import { setPayments } from "@/store/reducers/payments";

import * as liquidSdk from "@breeztech/react-native-breez-sdk-liquid";
import { defaultConfig, LiquidNetwork, SdkEvent, SdkEventVariant } from "@breeztech/react-native-breez-sdk-liquid";

async function onEvent(e: SdkEvent) {
  console.log("RECEIVED NEW EVENT", e)
  switch (e.type) {
    case SdkEventVariant.SYNCED:
      liquidSdk.getInfo()
        .then((info) => store.dispatch(setInfo(info)))
        .catch(console.error)
      liquidSdk.listPayments({ limit: undefined })
        .then((payments) => store.dispatch(setPayments(payments)))
        .catch(console.error)
      break;
  }
}

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
  await liquidSdk.addEventListener(onEvent)
    .catch(console.error)
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
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Breez Nodeless SDK RN Demo'
          }}
        />
        <Stack.Screen
          name="receive"
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            headerShown: false
          }}
        />
      </Stack>
    </Provider>
  )
}
