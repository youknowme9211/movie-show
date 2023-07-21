import { View, Text, Image, TouchableOpacity } from "react-native";
import React,{useContext} from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";
import { useColors } from "./../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { MallSeats, Store } from "../Context/Wrapper";

const MyTicket = ({route}) => {
    const { data, setdata } = useContext(Store);
    const {seatsArray, setseatsArray}=useContext(MallSeats)
    const { title, mall, date, time ,img} = route.params;
  const nav = useNavigation();
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          height: responsiveHeight(6),

          borderBottomColor: "#E3E3E3",
          borderBottomWidth: 2,
        }}
      >
        <Ionicons
          onPress={() => {
            nav.goBack();
          }}
          name="chevron-back"
          size={28}
          color="red"
        />
        <Text style={{ color: "black", fontWeight: "600", fontSize: 17 }}>
          My Ticket
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#E3E3E3",
          marginTop: 20,
        }}
      >
        <Image
          style={{
            width: 130,
            height: 150,
            borderRadius: 10,
            resizeMode: "contain",
          }}
          source={{
            uri: img,
          }}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontWeight: "600", color: "black", fontSize: 15 }}>
           {title}
          </Text>
          <Text style={{ fontWeight: "400", color: "grey", fontSize: 14 }}>
            {mall},{data}
          </Text>
          <Text style={{ fontWeight: "400", color: "grey", fontSize: 14 }}>
            {date}th Date,{time}
          </Text>
          <Text style={{ fontWeight: "600", color: "black", fontSize: 16 }}>
           {seatsArray.join(" , ")}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AntDesign name="barcode" size={30} color="black" />
            <Text style={{ fontWeight: "600", color: "black", fontSize: 16 }}>
             {seatsArray}AYAAN
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 0.95,
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            nav.navigate("Home");
            setseatsArray([])
          }}
          style={{
            height: 50,
            backgroundColor: useColors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
            Continue to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyTicket;
