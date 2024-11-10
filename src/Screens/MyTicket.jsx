import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { useColors } from "./../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { MallSeats, Store } from "../Context/Wrapper";
import { WebView } from "react-native-webview";

const MyTicket = ({ route }) => {
  const { data, setdata } = useContext(Store);
  const { seatsArray, setseatsArray } = useContext(MallSeats);
  const { title, mall, date, time, img } = route.params;
  const nav = useNavigation();

  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setShowWebView(true);
    setLoading(true);
  };

  const razorpayHTML = `
    <!DOCTYPE html>
    <html>
    <body onload="makePayment()">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <script>
        function makePayment() {
          var options = {
            "key": "rzp_test_PzQcpksMkzcA3S", // Replace with your test/live Razorpay key ID
            "amount": "50000", // Amount in paise
            "currency": "INR",
            "name": "Ticket Purchase",
            "description": "Purchase for ${title}",
            "image": "",
            "handler": function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'success', payment_id: response.razorpay_payment_id }));
            },
            "prefill": {
              "email": "user@example.com",
              "contact": "9123456789",
              "name": "Customer Name"
            },
            "theme": {
              "color": "#FF5733"
            }
          };
          var rzp = new Razorpay(options);
          rzp.open();
        }
      </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === "success") {
      setShowWebView(false);
      Alert.alert("Success", `Payment ID: ${data.payment_id}`);
      nav.navigate("Home");
    } else {
      setShowWebView(false);
      Alert.alert("Payment failed", "Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}>
      {showWebView ? (
        <WebView
          originWhitelist={["*"]}
          source={{ html: razorpayHTML }}
          onLoad={() => setLoading(false)}
          onMessage={handleWebViewMessage}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            Alert.alert("WebView error", nativeEvent.description);
            console.error("WebView error:", nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            Alert.alert("HTTP error", `Status code: ${nativeEvent.statusCode}`);
            console.error("HTTP error:", nativeEvent);
          }}
        />
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, height: responsiveHeight(6), borderBottomColor: "#E3E3E3", borderBottomWidth: 2 }}>
            <Ionicons onPress={() => nav.goBack()} name="chevron-back" size={28} color="red" />
            <Text style={{ color: "black", fontWeight: "600", fontSize: 17 }}>My Ticket</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, borderRadius: 10, borderWidth: 2, borderColor: "#E3E3E3", marginTop: 20 }}>
            <Image style={{ width: 130, height: 150, borderRadius: 10, resizeMode: "contain" }} source={{ uri: img }} />
            <View style={{ gap: 5 }}>
              <Text style={{ fontWeight: "600", color: "black", fontSize: 15 }}>{title}</Text>
              <Text style={{ fontWeight: "400", color: "grey", fontSize: 14 }}>{mall},{data}</Text>
              <Text style={{ fontWeight: "400", color: "grey", fontSize: 14 }}>{date}th Date,{time}</Text>
              <Text style={{ fontWeight: "600", color: "black", fontSize: 16 }}>{seatsArray.join(" , ")}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <AntDesign name="barcode" size={30} color="black" />
                <Text style={{ fontWeight: "600", color: "black", fontSize: 16 }}>{seatsArray}XUNZAK</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.95, justifyContent: "flex-end", paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={handlePayment} style={{ height: 50, backgroundColor: useColors.primary, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Continue Payment</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {loading && <ActivityIndicator size="large" color={useColors.primary} style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }} />}
    </SafeAreaView>
  );
};

export default MyTicket;
