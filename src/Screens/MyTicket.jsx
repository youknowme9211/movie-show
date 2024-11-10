import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { AntDesign } from "@expo/vector-icons";
import { useColors } from "./../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { MallSeats, Store } from "../Context/Wrapper";
import RazorpayCheckout from 'react-native-razorpay';

const MyTicket = ({ route }) => {
 
  const { data, setdata } = useContext(Store);
  const { seatsArray, setseatsArray } = useContext(MallSeats)
  const { title, mall, date, time, img } = route.params;
  const nav = useNavigation();

  const handlePayment = () => {
    if (!RazorpayCheckout) {
      console.log('RazorpayCheckout is null or undefined');
    }
    const options = {
      description: 'Movie Ticket Purchase',
      image: '/adaptive-icon.png',  // Replace with actual image path if necessary
      currency: 'INR',
      key: "rzp_test_PzQcpksMkzcA3S",  // Replace with your Razorpay key
      amount: '50000',  // Amount in paisa, for ₹500.00
      name: 'Your App Name',
      prefill: {
        email: 'user@example.com',
        contact: '9876543210',
        name: 'Your Customer Name'
      },
      theme: { color: '#F37254' }
    };
  
    RazorpayCheckout.open(options)
      .then((data) => {
        // Success: Payment was successful
        alert(`Payment Success: ${data.razorpay_payment_id}`);
        setseatsArray([]);  // Reset seat selection
        // nav.navigate("Home");  // Navigate back to Home
      })
      .catch((error) => {
        // Failure: Something went wrong
        console.error('Payment Failed', error);
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };
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
              {seatsArray}XUNZAK
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
          onPress={handlePayment}
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
