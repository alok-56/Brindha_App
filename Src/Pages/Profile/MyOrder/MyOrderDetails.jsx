import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import Header from "../../../Components/Header";
import { colors } from "../../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";

const OrderDetailsScreen = () => {
     const navigation=useNavigation()
    const [products] = useState([
        {
            id: 1,
            name: "Product A",
            size: "Small",
            color: "Teal",
            price: 60,
            quantity: 2,
            image: require("../../../Assests/Images/product.png"),
        },
        {
            id: 2,
            name: "Product B",
            size: "Medium",
            color: "Blue",
            price: 80,
            quantity: 1,
            image: require("../../../Assests/Images/product.png"),
        },
    ]);

    const [currentStep] = useState(1); // 0 = placed, 1 = in transit, 2 = delivered

    const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                <View style={styles.quantityWrapper}>
                    <Text style={styles.quantityText}>x{item.quantity}</Text>
                </View>
            </View>
        </View>
    );

    const renderStep = (stepIndex, label, isLastStep) => {
        const isActive = stepIndex <= currentStep;
        return (
            <View style={styles.verticalStepWrapper}>
                <View style={styles.bulletLineWrapper}>
                    <View
                        style={[
                            styles.stepCircle,
                            { backgroundColor: isActive ? colors.PRIMARY : "#ccc" },
                        ]}
                    />
                    {!isLastStep && <View style={styles.verticalLine} />}
                </View>
                <Text style={[styles.stepLabelVertical, { color: isActive ? "#000" : "#999" }]}>
                    {label}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={()=>navigation.goBack()}>
                    <Text style={styles.headerTitle}>Order Details</Text>
                    <View></View>
                </Header>
            </View>


            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Product List */}
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={{ paddingTop: 10 }}
                />

                {/* Order Summary */}
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
                            ${(total + 10 - 10).toFixed(2)}
                        </Text>
                    </View>
                </View>

                {/* Tracking Section */}
                <View style={styles.trackingContainer}>
                    <Text style={styles.summaryTitle}>Order Tracking</Text>
                    <View style={styles.verticalSteps}>
                        {renderStep(0, "Order Placed", false)}
                        {renderStep(1, "In Transit", false)}
                        {renderStep(2, "Delivered", true)}
                    </View>
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={() => console.log("Cancel Pressed")}>
                    <Text style={styles.cancelButtonText}>Cancel Order</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        backgroundColor: colors.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "center",
    },
    itemContainer: { paddingHorizontal: 20, paddingVertical: 15 },
    itemRow: { flexDirection: "row", justifyContent: "space-between" },
    productInfo: { flexDirection: "row", flex: 1 },
    productImage: { height: 90, width: 100, borderRadius: 10 },
    productDetails: { marginLeft: 10, justifyContent: "center" },
    productName: { fontSize: 16, fontWeight: "700", color: "#000" },
    productSubText: { fontSize: 14, fontWeight: "400", color: "gray" },
    productPrice: { fontSize: 18, fontWeight: "700", color: "#000" },
    quantityWrapper: { justifyContent: "center", alignItems: "center" },
    quantityText: { fontSize: 16, fontWeight: "600" },
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
        marginBottom: 8,
        color: "#000",
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },
    trackingContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 30,
    },
    verticalSteps: {
        flexDirection: "column",
        marginTop: 15,
        marginLeft: 10,
    },
    verticalStepWrapper: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    bulletLineWrapper: {
        alignItems: "center",
        marginRight: 10,
    },
    stepCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    verticalLine: {
        width: 2,
        height: 30,
        backgroundColor: "#ccc",
        marginTop: 2,
    },
    stepLabelVertical: {
        fontSize: 14,
        marginTop: -2,
        lineHeight: 18,
        flex: 1,
    },
    cancelButton: {
        backgroundColor: "red",
        marginTop: 30,
        width: "90%",
        alignSelf: "center",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

});
