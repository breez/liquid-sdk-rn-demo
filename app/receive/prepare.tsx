import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { useNavigation } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { setReceive } from "@/store/reducers/receive";

import * as liquidSdk from '@breeztech/react-native-breez-sdk-liquid';
import { PaymentMethod, ReceiveAmount } from "@breeztech/react-native-breez-sdk-liquid";

export default function PrepareReceive() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  let [error, setError] = useState(undefined);
  let [payerAmount, setPayerAmount] = useState<number | undefined>(undefined);
  let [paymentMethod, setPaymentMethod] = useState(PaymentMethod.LIQUID_ADDRESS);

  const PAYMENT_METHODS = {
    'LIQUID': PaymentMethod.LIQUID_ADDRESS,
    'LIGHTNING': PaymentMethod.LIGHTNING,
    'BITCOIN': PaymentMethod.BITCOIN_ADDRESS,
  };

  const prepareReceive = async () => {
    if (!payerAmount) return;
    const prepareResponse = await liquidSdk.prepareReceivePayment({
      amount: {
        type: liquidSdk.ReceiveAmountVariant.BITCOIN,
        payerAmountSat: payerAmount
      },
      paymentMethod
    })
      .catch((err) => setError(err.message));
    if (!prepareResponse) return;

    dispatch(setReceive({ prepareResponse }));
    // @ts-ignore
    navigation.navigate('confirm');
  }

  return (
    <View style={{ gap: 15 }}>
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
          onChangeText={(text) => setPayerAmount(+text)}
        />
      </View>
      <View>
        <Text style={{ textAlign: 'center', marginBottom: 5 }}>Payment Method</Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 'auto',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'gray'
          }}
        >
          {Object.entries(PAYMENT_METHODS).map(([name, method], i) => (
            <Pressable
              key={`payment-method-${name}`}
              onPress={() => setPaymentMethod(method)}
              style={[
                { paddingHorizontal: 8, paddingVertical: 5, borderColor: 'gray' },
                i < Object.entries(PAYMENT_METHODS).length - 1 && { borderRightWidth: 1 },
                paymentMethod == method && { backgroundColor: '#0184fb' },
              ]}
            >
              <Text
                style={[
                  { textAlign: 'center' },
                  paymentMethod == method && { color: 'white' },
                ]}
              >{name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <Pressable
        onPress={prepareReceive}
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
