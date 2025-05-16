import React, { useEffect, useRef } from "react";
import { Animated, Image, View, StyleSheet, Text } from "react-native";
import { colors, routes } from "../../Helper/Contant";
import CustomButton from "../../Components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
    const logoTranslateY = useRef(new Animated.Value(-200)).current;
    const textTranslateY = useRef(new Animated.Value(200)).current;
    const bottomTranslateY = useRef(new Animated.Value(100)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const bottomOpacity = useRef(new Animated.Value(0)).current;

    const navigation=useNavigation()

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.spring(logoTranslateY, {
                    toValue: 0,
                    friction: 5,
                    tension: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(300),
            Animated.parallel([
                Animated.spring(textTranslateY, {
                    toValue: 0,
                    friction: 5,
                    tension: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(300),
            Animated.parallel([
                Animated.spring(bottomTranslateY, {
                    toValue: 0,
                    friction: 6,
                    tension: 60,
                    useNativeDriver: true,
                }),
                Animated.timing(bottomOpacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Animated.Image
                    source={require("../../Assests/Images/logo.png")}
                    style={[
                        styles.logo,
                        {
                            opacity: logoOpacity,
                            transform: [{ translateY: logoTranslateY }],
                        },
                    ]}
                    resizeMode="contain"
                />
                <Animated.Image
                    source={require("../../Assests/Images/logotext.png")}
                    style={[
                        styles.logoText,
                        {
                            opacity: textOpacity,
                            transform: [{ translateY: textTranslateY }],
                        },
                    ]}
                    resizeMode="contain"
                />
            </View>

            {/* Bottom Red Bar with Animation */}
            <Animated.View
                style={[
                    styles.bottomBar,
                    {
                        opacity: bottomOpacity,
                        transform: [{ translateY: bottomTranslateY }],
                    },
                ]}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ width: "85%", alignSelf: "center" }}>
                        <Text style={{ fontSize: 32, fontWeight: "400", color: "#fff" }}>
                            Welcome!
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#fff" }}>
                            Login or Sign up to start exploring our application.
                        </Text>
                        <CustomButton
                            buttonStyle={{
                                width: "100%",
                                height: 55,
                                backgroundColor: "#fff",
                                borderRadius: 15,
                                marginTop: 15,
                            }}
                            TextStyle={{
                                fontSize: 18,
                                color: colors.PRIMARY,
                                fontWeight: "600",
                            }}
                            text="Login to my account"
                            onClick={()=>navigation.navigate(routes.LOGIN_SCREEN)}
                        />
                        <CustomButton
                            buttonStyle={{
                                width: "100%",
                                height: 55,
                                borderWidth: 1,
                                borderColor: "#fff",
                                borderRadius: 15,
                                marginTop: 10,
                            }}
                            TextStyle={{
                                fontSize: 18,
                                color: "#fff",
                                fontWeight: "600",
                            }}
                            text="I’m New here!"
                            onClick={()=>navigation.navigate(routes.SLIDER_SCREEN)}
                        />
                    </View>
                </View>
            </Animated.View>

        </View>

    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 100,
        paddingBottom: 100,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",

    },
    logo: {
        width: 250,
        height: 150,
    },
    logoText: {
        marginTop: 6,
        width: 250,
        height: 50,
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 350,
        backgroundColor: colors.PRIMARY,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

});
