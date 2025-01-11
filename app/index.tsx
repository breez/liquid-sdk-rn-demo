import { Text, View } from "react-native";

import { useEffect } from "react";

import WalletInfo from "@/components/WalletInfo";
import { Link, useNavigation } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getInfo } from "@breeztech/react-native-breez-sdk-liquid";
import { setInfo } from "@/store/reducers/info";
export default function Index() {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const info = useAppSelector((store) => store.info);

  useEffect(() => {
    navigation.setOptions({
      title: 'Breez Nodeless SDK RN Demo'
    })
  }, [navigation])

  useEffect(() => {
    getInfo()
      .then((info) => dispatch(setInfo(info)))
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {info ? (
        <>
          <WalletInfo info={info.walletInfo} />
        </>
      ) : <Text>Loading wallet information...</Text>
      }
    </View>
  );
}
