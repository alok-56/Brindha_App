import React from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";

const OrderDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { orderData } = route.params || {};

    if (!orderData) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Order data not available.</Text>
            </View>
        );
    }

    const { subOrder, order } = orderData;
    const products = subOrder.products || [];

    const total = subOrder.total

    const getStepFromStatus = (status) => {
        switch (status?.toLowerCase()) {
            case "processing":
                return 0;
            case "shipped":
                return 1;
            case "delivered":
                return 2;
            default:
                return 0;
        }
    };

    const currentStep = getStepFromStatus(subOrder.status);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
                <View style={styles.productInfo}>
                    <Image
                        style={styles.productImage}
                        source={{ uri: item.image?.[0] }}
                    />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>Product</Text>
                        <Text style={styles.productSubText}>Price: ₹{item.price}</Text>
                        <Text style={styles.productSubText}>Qty: {item.quantity}</Text>
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
                <Header onBack={() => navigation.goBack()}>
                    <Text style={styles.headerTitle}>Order Details</Text>
                    <View />
                </Header>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <FlatList
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
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
                        <Text>₹{subOrder.total - subOrder.deliveryCharge}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text>Delivery Charge</Text>
                        <Text>₹{subOrder.deliveryCharge}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={{ fontWeight: "bold" }}>Total</Text>
                        <Text style={{ fontWeight: "bold" }}>₹{total.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Order Tracking */}
                <View style={styles.trackingContainer}>
                    <Text style={styles.summaryTitle}>Order Tracking</Text>
                    <View style={styles.verticalSteps}>
                        {renderStep(0, "Order Placed", false)}
                        {renderStep(1, "Shipped", false)}
                        {renderStep(2, "Delivered", true)}
                    </View>
                </View>

                <TouchableOpacity style={styles.cancelButton} onPress={() => console.log("Cancel Order Pressed")}>
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
