import { useAppSelector } from "@/store/hooks"
import { useNavigation } from "expo-router";
import { Text } from "react-native"

export default function ReceiveFinal() {
  const navigation = useNavigation();

  const receiveResponse = useAppSelector((store) => store.receive.receiveResponse);

  if (!receiveResponse) {
    navigation.goBack();
    return;
  }

  return (
    <>
      <Text style={{ textAlign: 'center' }}>Please pay the following destination:</Text>
      <Text selectable style={{ textAlign: 'center' }}>{receiveResponse.destination}</Text>
    </>
  )
}
