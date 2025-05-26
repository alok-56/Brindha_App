import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import Header from "../../../Components/Header";
import { colors, routes } from "../../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";
import { GetMyOrder } from "../../../Api/Order";

const MyOrder = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await GetMyOrder();
                if (res.status) {
                    setOrders(res?.data?.reverse());
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "processing":
                return "orange";
            case "delivered":
                return "green";
            case "cancelled":
            case "rejected":
                return "red";
            case "shipped":
                return "#1E90FF";
            default:
                return "#000";
        }
    };

    const renderItem = ({ item }) => {
        const { vendor, order, subOrder, transaction } = item;
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                    navigation.navigate(routes.MYORDERDETAILS_SCREEN, {
                        orderData: item
                    })
                }
            >
                <View style={styles.itemRow}>
                    <Image
                        style={styles.productImage}
                        source={{
                            uri: subOrder.products[0]?.image[0],
                        }}
                    />
                    <View style={styles.productDetails}>
                        <Text
                            style={[
                                styles.productName,
                                { color: getStatusColor(subOrder.status) },
                            ]}
                        >
                            Status: {subOrder.status}
                        </Text>
                        <Text style={styles.productSubText}>
                            Payment: {order.paymentStatus} ({order.paymentMode})
                        </Text>
                        <Text style={styles.productPrice}>
                            ₹{subOrder.total - subOrder.deliveryCharge} + ₹{subOrder.deliveryCharge} Delivery
                        </Text>
                        <Text style={styles.productSubText}>
                            Placed: {new Date(order.createdAt).toDateString()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Header onBack={() => navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Order</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={colors.PRIMARY}
                    style={{ marginTop: 50 }}
                />
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item, index) => item.order.orderId + index}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
                />
            )}
        </View>
    );
};

export default MyOrder;

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
    itemContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    productImage: {
        height: 90,
        width: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: "center",
    },
    productName: {
        fontSize: 16,
        fontWeight: "700",
    },
    productSubText: {
        fontSize: 14,
        fontWeight: "400",
        color: "gray",
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginTop: 4,
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 20,
    },
});
