import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import Header from "../../Components/Header";
import { colors, routes } from "../../Helper/Contant";
import MapIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const Address = () => {
    const navigation = useNavigation();

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            address: "123 Main Street, Springfield, IL, 62704",
        },
        {
            id: 2,
            address: "456 Oak Avenue, Chicago, IL, 60601",
        },
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState(1);

    const renderAddressItem = ({ item }) => (
        <TouchableOpacity
            style={styles.addressItem}
            onPress={() => setSelectedAddressId(item.id)}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    <MapIcon name="map-pin" size={20} color={colors.PRIMARY} style={{ marginRight: 10 }} />
                    <Text style={styles.addressLabel}>Home</Text>
                </View>

                <Text style={styles.addressText}>{item.address}</Text>
            </View>

            <View style={styles.checkboxCircle}>
                {selectedAddressId === item.id && <View style={styles.checkedDot} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 5 }}>
                <Header onBack={()=>navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>Select Address</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>


            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAddressItem}
                contentContainerStyle={{ padding: 20 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate(routes.ADDRESS_SCREEN)}
                    >

                        <Text style={styles.addButtonText}>+ Add Address</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={{ width: "90%", alignSelf: "center", backgroundColor: colors.PRIMARY, height: 45, borderRadius: 10, marginBottom: 5 }}
                onPress={() => navigation.navigate(routes.ADDRESS_SCREEN)}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", color: "#fff" }}>Apply</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
};

export default Address;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    headerButton: {
        height: 30,
        backgroundColor: colors.PRIMARY,
        borderRadius: 8,
        marginTop: 5,
        paddingHorizontal: 15,
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
    addressItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    addressLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#000",
        marginBottom: 3,

    },
    addressText: {
        fontSize: 14,
        color: "#333",
        marginLeft: 25,
        width: "90%"
    },
    checkboxCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    checkedDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.PRIMARY,
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 10,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
        borderRadius: 8,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "gray"
    },
    addButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
});
