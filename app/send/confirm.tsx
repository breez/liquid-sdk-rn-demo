import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native"
import { setSend } from "@/store/reducers/send";

import * as liquidSdk from '@breeztech/react-native-breez-sdk-liquid';

export default function ConfirmSend() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const prepareResponse = useAppSelector((store) => store.send.prepareResponse);

  if (!prepareResponse) {
    navigation.goBack();
    return;
  }

  const sendPayment = async () => {
    if (!prepareResponse) return;
    const sendResponse = await liquidSdk.sendPayment({
      prepareResponse
    });
    dispatch(setSend({ sendResponse }));
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
          onPress={sendPayment}
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
