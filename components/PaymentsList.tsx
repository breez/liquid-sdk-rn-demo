import { ScrollView, Text, View } from "react-native";
import { useAppSelector } from "@/store/hooks";

import { Payment as PaymentT, PaymentType } from "@breeztech/react-native-breez-sdk-liquid";

export function Payment({ amountSat, paymentType, status, details }: PaymentT, paymentNumber: number) {
  return (
    <View
      key={`payment-${paymentNumber}`}
      style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: '#b0b0b0',
        borderRadius: 5,
        borderBottomWidth: 1,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '99%',
          paddingVertical: 2,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16
            }}
          >
            {paymentType == PaymentType.SEND ? '-' : '+'}{amountSat} ₿
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontStyle: 'italic'
            }}
          >{details.description}</Text>
        </View>
        <Text
          style={{
            fontSize: 13,
          }}
        >{status.toUpperCase()}</Text>
      </View>
    </View>
  )
}

export default function PaymentsList() {
  const payments = useAppSelector((store) => store.payments);

  return (
    <View style={{ height: '50%', width: '80%' }}>
      <ScrollView>
        {payments.length > 0 ? payments.map(Payment) : <Text style={{ textAlign: 'center', paddingVertical: 5 }}>No payment history</Text>}
      </ScrollView>
    </View>
  )
}
