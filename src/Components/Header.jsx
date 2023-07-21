import { View, Text, useAnimatedValue } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { useColors } from "./../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "./../Context/Wrapper";

const Header = () => {
  const { data, setdata } = useContext(Store);
  return (
    <View
      style={{
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="location-pin" size={30} color={useColors.primary} />
        <Text
          style={{ fontSize: 17, color: useColors.primary, fontWeight: "600" }}
        >
          {data != null ? data : "Select City"}
        </Text>
      </View>

      <Ionicons
        onPress={() => {
          AsyncStorage.removeItem("login");
        }}
        name="ios-search"
        size={28}
        color={useColors.primary}
      />
    </View>
  );
};

export default Header;
