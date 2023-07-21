import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "./../Utils/Colors";
import { cities } from "./../Utils/Date";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Store } from "../Context/Wrapper";

const SelectCity = () => {
  const [isSelected, setisSelected] = useState();
  const [isClicked, setisClicked] = useState(true);


  const {data,setdata}=useContext(Store)



  const nav = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: useColors.white,
        paddingHorizontal: 20,
        paddingTop: 35,
      }}
    >
      <Text
        style={{ fontSize: 25, color: useColors.secondary, fontWeight: "bold" }}
      >
        Select city
      </Text>

      <View>
        <FlatList
          style={{ marginTop: 40 }}
          numColumns={3}
          data={cities}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setisSelected(index);
                setisClicked(false);
                setdata(item)
               
              }}
              style={{
                borderWidth: isSelected == index ? 2 : 1,
                borderColor:
                  isSelected == index ? useColors.primary : useColors.grey,
                marginLeft: 20,
                marginBottom: 30,
                paddingHorizontal: 18,
                paddingVertical: 9,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  color:
                    isSelected == index ? useColors.primary : useColors.grey,
                  fontSize: 16,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ flex: 0.9, justifyContent: "flex-end" }}>
        <TouchableOpacity
          disabled={isClicked}
          onPress={() => {
            AsyncStorage.setItem("login", "On");
            nav.navigate("Home");
          }}
          style={{
            backgroundColor: isClicked == false ? useColors.primary : "#E3E3E3",
            marginHorizontal: 40,
            height: 55,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: isClicked == false ? "white" : "grey",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectCity;
