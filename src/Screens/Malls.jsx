import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { Seats } from "../Utils/Date";
import Availability from "../Components/Availability";
import { MallSeats } from "../Context/Wrapper";

const Malls = ({ route }) => {
  const { title, mall, date, time ,img} = route.params;
 

  const { seatsArray, setseatsArray } = useContext(MallSeats);
  let amount =0

  if (seatsArray.length>0) {
    amount=100*seatsArray.length
  }

  const nav = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: "white",
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          height: responsiveScreenHeight(6),
          borderBottomColor: "#E3E3E3",
          borderBottomWidth: 3,
        }}
      >
        <Ionicons
          onPress={() => {
            nav.goBack();
          }}
          name="chevron-back"
          size={28}
          color={useColors.primary}
        />
        <Text style={{ fontWeight: "600", color: "black", fontSize: 16 }}>
          {title}
        </Text>
      </View>

      <Text style={{ fontSize: 17, color: "grey", fontWeight: "400" }}>
        {mall} |{date.dat}th Date | {time}
      </Text>

      <View style={{ alignItems: "center" }}>
        <FlatList
          numColumns={6}
          data={Seats}
          renderItem={({ item, index }) =>
            seatsArray.includes(item) ? (
              <TouchableOpacity
                onPress={() => {
                  setseatsArray(seatsArray.filter((remove) => remove != item));
                }}
                style={{
                  backgroundColor: "green",
                  height: 40,
                  width: 40,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  margin: "3%",
                }}
              ></TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setseatsArray([...seatsArray, item]);
                }}
                style={{
                  backgroundColor: "#E3E3E3",
                  height: 40,
                  width: 40,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  margin: "3%",
                }}
              ></TouchableOpacity>
            )
          }
        />
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 10,

          marginTop: 20,
        }}
      >
        <Availability colors={"red"} name={"Unavailable"} />
        <Availability colors={"#E3E3E3"} name={"Available"} />
        <Availability colors={"green"} name={"Selected"} />
      </View>

      <View style={{ flex: 0.8, justifyContent: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
           amount==0?Alert.alert('Please select seats'):nav.navigate('MyTicket',{
             title,
             img,
             mall,
             time,
             date:date.dat
           })
          }}
          activeOpacity={0.9}
          style={{
            height: 50,
            backgroundColor: useColors.primary,
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 10,
            flexDirection: "row",
            paddingHorizontal: 30,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
            Pay Now
          </Text>
          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
            ₹ {amount}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Malls;
