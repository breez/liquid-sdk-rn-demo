import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setReceive } from "@/store/reducers/receive";
import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native"

import * as liquidSdk from '@breeztech/react-native-breez-sdk-liquid';
import { PaymentMethod } from "@breeztech/react-native-breez-sdk-liquid";

export default function ConfirmReceive() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const prepareResponse = useAppSelector((store) => store.receive.prepareResponse);

  if (!prepareResponse) {
    navigation.goBack();
    return;
  }

  const receivePayment = async () => {
    if (!prepareResponse) return;
    const receiveResponse = await liquidSdk.receivePayment({
      prepareResponse
    });
    dispatch(setReceive({ receiveResponse }));
    // @ts-ignore
    navigation.navigate('final');
  }

  return (
    <>
      <Text style={{ textAlign: 'center' }}>Payment fees: {prepareResponse.feesSat} ₿</Text>
      <Text style={{ textAlign: 'center' }}>Are you sure you want to proceed with the payment?</Text>
      <View style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '90%',
      }}>
        <Pressable
          style={{
            backgroundColor: 'green',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 5,
          }}
          onPress={receivePayment}
        >
          <Text style={{ color: 'white' }}>YES</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: 'white' }}>NO</Text>
        </Pressable>
      </View>

    </>
  )
}
