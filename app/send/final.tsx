import { useAppSelector } from "@/store/hooks"
import { useNavigation } from "expo-router";
import { Text } from "react-native"

export default function SendFinal() {
  const navigation = useNavigation();

  const sendResponse = useAppSelector((store) => store.send.sendResponse);

  if (!sendResponse) {
    navigation.goBack();
    return;
  }

  return (
    <>
      <Text style={{ textAlign: 'center' }}>Successfully sent the payment</Text>
      <Text style={{ textAlign: 'center' }}>You can now close this window.</Text>
    </>
  )
}
