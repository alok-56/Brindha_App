import React from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RightIcon from "react-native-vector-icons/SimpleLineIcons";
import { colors, routes } from "../../../Helper/Contant";
import Header from "../../../Components/Header";

const ProfileDetails = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Header onBack={()=>navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>Profile Details</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Update Personal Details</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#888"
                    autoCapitalize="words"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email ID"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#888"
                    keyboardType="phone-pad"
                />
                <TouchableOpacity
                    style={styles.addressField}
                    onPress={() => navigation.navigate(routes.CHANGEPASSWORD_SCREEN)}
                >
                    <Text style={styles.addressText}>Change Password</Text>
                    <RightIcon name="arrow-right" size={18} color="#000" />
                </TouchableOpacity>

                {/* Address Field */}
                <TouchableOpacity
                    style={styles.addressField}
                    onPress={() => navigation.navigate(routes.ADDRESS_SCREEN)}
                >
                    <Text style={styles.addressText}>Address</Text>
                    <RightIcon name="arrow-right" size={18} color="#000" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{ width: "90%", alignSelf: "center", backgroundColor: colors.PRIMARY, height: 45, borderRadius: 10, marginBottom: 5,marginTop:20}}

            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff" }}>Apply Changes</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
};

export default ProfileDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerWrapper: {
        marginTop: 20,
    },
    headerButton: {
        width: 130,
        height: 30,
        backgroundColor: colors.PRIMARY,
        borderRadius: 8,
        marginTop: 5,
    },
    headerButtonContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
    formContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 10,
    },
    input: {
        marginTop: 15,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "rgba(184, 184, 184, 1)",
        borderRadius: 10,
        paddingHorizontal: 15,
        color: "#000",
    },
    addressField: {
        marginTop: 15,
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "rgba(184, 184, 184, 1)",
        borderRadius: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    addressText: {
        color: "#000",
        fontSize: 16,
    },
});
