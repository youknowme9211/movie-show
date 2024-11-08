import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useColors } from "./../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const nav = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem("login").then((value) => {
        value != null ? nav.replace("Home") : nav.replace("Login");
      });
    }, 5000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: useColors.primary }}>
      <Image
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        source={{
          uri:'./movie.jpg',
        }}

      />
    </View>
  );
};

export default Splash;
