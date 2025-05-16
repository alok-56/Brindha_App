import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../Components/Header";
import { colors, routes } from "../../Helper/Contant";
import CloseIcon from "react-native-vector-icons/AntDesign";
import MapIcon from "react-native-vector-icons/Feather"; // map marker icon
import { useNavigation } from "@react-navigation/native";

const MyBag = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Product A",
            size: "Small",
            color: "Teal",
            price: 60,
            quantity: 2,
            image: require("../../Assests/Images/product.png"),
        },
        {
            id: 2,
            name: "Product B",
            size: "Medium",
            color: "Blue",
            price: 80,
            quantity: 1,
            image: require("../../Assests/Images/product.png"),
        },
    ]);

    const increment = (id) =>
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );

    const decrement = (id) =>
        setProducts((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

    const removeItem = (id) =>
        setProducts((prev) => prev.filter((item) => item.id !== id));

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
                <View style={styles.productInfo}>
                    <Image style={styles.productImage} source={item.image} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productSubText}>Size: {item.size}</Text>
                        <Text style={styles.productSubText}>Color: {item.color}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                    </View>
                </View>

                <View style={styles.controlsColumn}>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <CloseIcon name="closecircleo" size={20} />
                    </TouchableOpacity>

                    <View style={styles.quantityControls}>
                        <TouchableOpacity onPress={() => decrement(item.id)}>
                            <Text style={styles.quantityBtn}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => increment(item.id)}>
                            <Text style={styles.quantityBtn}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    const total = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Header onBack={()=>navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Bag</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
                ListFooterComponent={() => (
                    <>
                        <View style={styles.summaryContainer}>
                            <Text style={styles.summaryTitle}>Order Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text>Subtotal</Text>
                                <Text>${total.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text>Shipping</Text>
                                <Text>$10.00</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text>Discount</Text>
                                <Text>$10.00</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={{ fontWeight: "bold" }}>Total</Text>
                                <Text style={{ fontWeight: "bold" }}>
                                    ${(total + 10).toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.addressContainer}
                            onPress={() => {
                                /* TODO: navigate to map/address picker */
                            }}
                        >
                            <MapIcon
                                name="map-pin"
                                size={20}
                                color={colors.PRIMARY}
                                style={{ marginRight: 8 }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.summaryTitle}>Shipping Address</Text>
                                <Text numberOfLines={2} style={styles.addressText}>
                                    123 Main Street, Springfield, IL, 62704
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate(routes.ADDRESS_SCREEN)}>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </>
                )}
            />

            <View style={styles.footerRow}>
                <View>
                    <Text style={styles.priceLabel}>Total Price</Text>
                    <Text style={styles.priceValue}>$87.77</Text>
                </View>
                <TouchableOpacity style={styles.addToBagButton} onPress={() => navigation.navigate(routes.PAYMENTSUCCESS_SCREEN)}>
                    <View style={styles.addToBagContent}>

                        <Text style={styles.addToBagText}>Pay Now</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MyBag;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    topSection: { marginTop: 20 },
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
    itemContainer: { paddingHorizontal: 20, paddingVertical: 15 },
    itemRow: { flexDirection: "row", justifyContent: "space-between" },
    productInfo: { flexDirection: "row", flex: 1 },
    productImage: { height: 90, width: 100, borderRadius: 10 },
    productDetails: { marginLeft: 10, justifyContent: "center" },
    productName: { fontSize: 16, fontWeight: "700", color: "#000" },
    productSubText: { fontSize: 14, fontWeight: "400", color: "gray" },
    productPrice: { fontSize: 18, fontWeight: "700", color: "#000" },
    controlsColumn: { justifyContent: "space-between", alignItems: "center" },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    quantityBtn: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 18,
        fontWeight: "600",
    },
    quantityText: { fontSize: 16, fontWeight: "600", marginHorizontal: 10 },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 20,
    },
    summaryContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: "#eee",
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4,
        color: "#000",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    addressContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 8,
        backgroundColor: "rgba(232, 242, 244, 1)",
    },
    addressText: {
        fontSize: 14,
        color: "#333",
        marginTop: 4,
    },
    changeText: {
        fontSize: 14,
        color: colors.PRIMARY,
        fontWeight: "600",
        marginLeft: 8,
    },
    footerRow: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    priceLabel: {
        fontSize: 14,
        fontWeight: "500",
        color: "gray",
    },
    priceValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
    },
    addToBagButton: {
        width: 200,
        height: 45,
        backgroundColor: colors.PRIMARY,
        borderRadius: 10,
    },
    addToBagContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    addToBagText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        marginLeft: 10,
    },
});
