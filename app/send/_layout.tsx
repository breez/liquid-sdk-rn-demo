import { Stack, useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideInUp, SlideOutDown } from "react-native-reanimated";

export default function ReceiveModal() {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000040'
      }}
    >
      <Pressable onPress={() => navigation.goBack()} style={StyleSheet.absoluteFill} />
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={{
          flex: 1,
          padding: 20,
          maxHeight: '60%',
          marginTop: 'auto',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginBottom: 10 }}>Send Payment</Text>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              width: '80%',
              marginHorizontal: 'auto',
              backgroundColor: 'transparent',
            },
          }}>
          <Stack.Screen
            name="prepare"
          />
          <Stack.Screen
            name="confirm"
          />
          <Stack.Screen
            name="final"
          />
        </Stack>
      </Animated.View>
    </Animated.View >
  )
}
