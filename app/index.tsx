import { Text, View } from "react-native";

import { useEffect } from "react";

import { Link } from "expo-router";
import WalletInfo from "@/components/WalletInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getInfo } from "@breeztech/react-native-breez-sdk-liquid";
import { setInfo } from "@/store/reducers/info";

export default function Index() {
  const dispatch = useAppDispatch();
  const info = useAppSelector((store) => store.info);

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
          <View style={{ paddingVertical: 5, flexDirection: 'row', gap: 5 }}>
            <Link href="/receive/prepare" style={{
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderColor: 'lightgray',
              borderWidth: 1,
              borderRadius: 20,
              color: '#0184fb'
            }}>
              Add funds
            </Link>
          </View>
        </>
      ) : <Text>Loading wallet information...</Text>
      }
    </View>
  );
}
