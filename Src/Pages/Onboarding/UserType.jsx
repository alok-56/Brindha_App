import React, { useContext, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import Header from "../../Components/Header";
import { colors, routes } from "../../Helper/Contant";
import CustomButton from "../../Components/CustomButton";
import { authcontext } from "../../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";


const UserType = () => {
    const [selected, setSelected] = useState(null);
    const navigation = useNavigation()

    const handleSelect = (type) => {
        setSelected(type);
    };

    const renderCheckbox = (type) => (
        <View
            style={[
                styles.checkbox,
                selected === type && styles.checkboxSelected,
            ]}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Header >
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>I am...</Text>
                        </View>
                    </TouchableOpacity>
                    <View>

                    </View>
                </Header>
            </View>

            <View style={styles.optionsWrapper}>
                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => handleSelect("individual")}
                >
                    <Image
                        resizeMode="contain"
                        source={selected === "individual" ? require("../../Assests/Images/men.png") : require("../../Assests/Images/darkmen.png")}
                        style={styles.menImage}
                    />
                    <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionText}>An Individual</Text>
                        {renderCheckbox("individual")}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={() => handleSelect("business")}
                >
                    <Image
                        resizeMode="contain"
                        source={selected === "business" ? require("../../Assests/Images/women.png") : require("../../Assests/Images/darkwomen.png")}

                        style={styles.womenImage}
                    />
                    <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionText}>A Business Owner</Text>
                        {renderCheckbox("business")}
                    </View>
                </TouchableOpacity>
            </View>

            <CustomButton
                buttonStyle={styles.confirmButton}
                TextStyle={styles.confirmButtonText}
                text="Confirm"
                onClick={() => {
                    if(selected){
   navigation.navigate(routes.SIGNUP_SCREEN, {
                        type: selected
                    })
                    }
                 
                }}
            />
        </View>
    );
};

export default UserType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        width: "100%",
        marginTop: 20,
    },
    headerButton: {
        width: 100,
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
    optionsWrapper: {
        flexDirection: "column",
    },
    optionCard: {
        height: 230,
        width: "90%",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "rgba(237, 197, 197, 1)",
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 5,
        justifyContent: "flex-start",
    },
    optionTextWrapper: {
        position: "absolute",
        top: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    optionText: {
        fontSize: 14,
        fontWeight: "700",
        marginRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#999",
    },
    checkboxSelected: {
        backgroundColor: colors.PRIMARY,
        borderColor: colors.PRIMARY,
    },
    menImage: {
        position: "absolute",
        bottom: 0,
        left: 5,
    },
    womenImage: {
        position: "absolute",
        bottom: 0,
        left: 5,
    },
    confirmButton: {
        width: "90%",
        height: 45,
        alignSelf: "center",
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: colors.PRIMARY,
        position: "absolute",
        bottom: 25,
    },
    confirmButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "600",
    },
});
