import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "../Utils/Colors";
import NowShowing from "../Components/NowShowing";
import ComingSoon from "../Components/ComingSoon";

const Home = ({route}) => {
  
  const [Option, setOption] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, gap: 15 }}>
      <Header />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setOption(0);
          }}
        >
          <Text
            style={{
              color: Option == 0 ? useColors.primary : "grey",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Now Showing
          </Text>
          {Option == 0 && (
            <View
              style={{
                backgroundColor: "red",
                width: 31,
                height: 2.5,
                alignSelf: "center",
                marginTop: 5,
              }}
            ></View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setOption(1);
          }}
        >
          <Text
            style={{
              color: Option == 1 ? useColors.primary : "grey",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Coming Soon
          </Text>
          {Option == 1 && (
            <View
              style={{
                backgroundColor: "red",
                width: 31,
                height: 2.5,
                alignSelf: "center",
                marginTop: 5,
              }}
            ></View>
          )}
        </TouchableOpacity>
      </View>

      {Option == 0 ? <NowShowing /> : <ComingSoon />}
    </SafeAreaView>
  );
};

export default Home;
