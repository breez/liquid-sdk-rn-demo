import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { useNavigation } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { setSend } from "@/store/reducers/send";

import * as liquidSdk from '@breeztech/react-native-breez-sdk-liquid';
import { PayAmountVariant } from "@breeztech/react-native-breez-sdk-liquid";

export default function PrepareSend() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  let [error, setError] = useState(undefined);
  let [amount, setAmount] = useState<number>(0);
  let [destination, setDestination] = useState<string>('');

  const prepareSend = async () => {
    const prepareResponse = await liquidSdk.prepareSendPayment({
      destination,
      amount: {
        type: PayAmountVariant.BITCOIN,
        receiverAmountSat: amount
      }
    })
      .catch((err) => setError(err.message));
    if (!prepareResponse) return;

    dispatch(setSend({ prepareResponse }));
    // @ts-ignore
    navigation.navigate('confirm');
  }

  return (
    <View style={{ gap: 15 }}>
      <View>
        <Text style={{ textAlign: 'center' }}>Destination</Text>
        <TextInput
          style={{
            marginTop: 2,
            maxHeight: 35,
            borderBottomWidth: 1,
            borderBottomColor: '#0184fb',
            textAlign: 'center',
            fontSize: 12
          }}
          value={destination}
          onChangeText={setDestination}
          placeholder="Liquid/Bitcoin address or Lightning invoice"
        />
      </View>
      <View>
        <Text style={{ textAlign: 'center' }}>Amount (sats)</Text>
        <TextInput
          style={{
            marginTop: 2,
            borderBottomWidth: 1,
            borderBottomColor: '#0184fb',
            textAlign: 'center',
            fontSize: 14
          }}
          keyboardType="numeric"
          defaultValue="0"
          onChangeText={(text) => setAmount(+text)}
        />
      </View>
      <Pressable
        onPress={prepareSend}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: '#0184fb',
          borderRadius: 5,
        }}
      >
        <Text style={{ textAlign: 'center', color: 'white' }}>CONTINUE</Text>
      </Pressable>
      {error && <Text style={{ textAlign: 'center', color: 'red' }}>Error: {error}</Text>}
    </View>
  )
}
