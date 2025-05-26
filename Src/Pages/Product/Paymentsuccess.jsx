import React from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, routes } from "../../Helper/Contant";


const Paymentsuccess = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require("../../Assests/Images/payment.png")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.subtitle}>E-Receipt will be sent to your email</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate(routes.HOME_SCREEN)}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Paymentsuccess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginBottom: 30,
    },
    button: {
        backgroundColor: colors.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
