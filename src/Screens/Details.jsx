import { View, Text, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Feather } from "@expo/vector-icons";
import { Theaters, dates } from "../Utils/Date";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Details = ({ route }) => {
  const [date, setdate] = useState();
  const nav = useNavigation();
  const { title,img } = route.params.item;

  const [isSelected, setisSelected] = useState();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", gap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: responsiveHeight(6),

          borderBottomColor: "#E3E3E3",
          borderBottomWidth: 2,
          paddingHorizontal: 13,
          justifyContent: "space-between",
        }}
      >
        {/* 
        ChildBox 1 */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => {
              nav.goBack();
            }}
            name="chevron-back"
            size={28}
            color="#845ec2"
          />
          <Text style={{ color: "black", fontWeight: "600", fontSize: 17 }}>
            {title}
          </Text>
        </View>

        {/* 
        ChildBox 2 */}
        <Feather name="search" size={26} color="#845ec2" />
      </View>

      <View
        style={{
          height: responsiveHeight(10),

          alignItems: "center",
        }}
      >
        <FlatList
          horizontal
          data={dates}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setisSelected(index);
                setdate(item);
              }}
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingHorizontal: 10,
                marginHorizontal: 10,
                backgroundColor: isSelected == index ? "#845ec2" : null,
              }}
            >
              <Text
                style={{
                  color: isSelected == index ? "white" : "#845ec2",
                  fontWeight: "400",
                  fontSize: 14,
                }}
              >
                {item.day}
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 17,
                  color: isSelected == index ? "white" : "black",
                }}
              >
                {item.dat}
              </Text>
              <Text
                style={{
                  color: isSelected == index ? "white" : "black",
                  fontWeight: "400",
                  fontSize: 14,
                }}
              >
                {item.mon}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 20 }}
        data={Theaters}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: responsiveHeight(19),
              borderWidth: 2,
              marginBottom: 10,
              borderRadius: 12,
              borderColor: "#E3E3E3",
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialIcons name="favorite-border" size={25} color="black" />
              <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>
                {item.name}
              </Text>
            </View>
            <Text style={{ fontWeight: "400", fontSize: 12 }}>
              Non-cancellable
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {item.timings.map((value, index) => (
                <TouchableOpacity
                  onPress={() => {
                    date != null
                      ? nav.navigate("Malls", {
                          title,
                          mall: item.name,
                          date,
                          time: value,
                          img
                        })
                      : Alert.alert("Please select a date");
                     
                  }}
                  key={index}
                  style={{
                    paddingHorizontal: 10,
                    borderWidth: 2,
                    borderColor: "green",
                    marginRight: 5,
                    borderRadius: 10,
                    marginBottom: 7,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "green" }}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Details;
