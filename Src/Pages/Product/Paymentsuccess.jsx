import React from "react";
import { Image, Text, View } from "react-native";


const Paymentsuccess = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
            <Image source={require('../../Assests/Images/payment.png')}></Image>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Payment Successful!</Text>
            <Text style={{ fontSize: 16, fontWeight: "400" }}>E-Receipt will be sent to your email</Text>
        </View>
    )
}

export default Paymentsuccess