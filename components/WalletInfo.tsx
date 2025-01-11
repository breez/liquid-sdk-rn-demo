import { View, Text } from "react-native";
import { WalletInfo as WalletInfoT } from "@breeztech/react-native-breez-sdk-liquid";


export default function WalletInfo({ info }: { info: WalletInfoT }) {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    }}>
      <Text style={{ fontSize: 28, color: '#0184fb' }}>{info.balanceSat} ₿</Text>
      {info.pendingReceiveSat > 0 && <Text style={{ color: '#606060', fontStyle: 'italic' }}>Pending inward balance: {info.pendingReceiveSat} ₿</Text>}
      {info.pendingSendSat > 0 && <Text style={{ color: '#606060', fontStyle: 'italic' }}>Pending outward balance: {info.pendingSendSat} ₿</Text>}
    </View>
  )
}
