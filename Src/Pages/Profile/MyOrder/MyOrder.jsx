import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../../Components/Header";
import { colors, routes } from "../../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";

const MyOrder = () => {
    const navigation = useNavigation()
    const [products, setProducts] = useState([
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

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate(routes.MYORDERDETAILS_SCREEN)}>
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
                    <TouchableOpacity>
                        <Text style={styles.deliveryTag}>Delivery Today</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Header onBack={()=>navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Order</Text>
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
            />
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
    itemContainer: { paddingHorizontal: 20, paddingVertical: 15 },
    itemRow: { flexDirection: "row", justifyContent: "space-between" },
    productInfo: { flexDirection: "row", flex: 1 },
    productImage: { height: 90, width: 100, borderRadius: 10 },
    productDetails: { marginLeft: 10, justifyContent: "center" },
    productName: { fontSize: 16, fontWeight: "700", color: "#000" },
    productSubText: { fontSize: 14, fontWeight: "400", color: "gray" },
    productPrice: { fontSize: 18, fontWeight: "700", color: "#000" },
    controlsColumn: { justifyContent: "center", alignItems: "center" },
    deliveryTag: {
        fontSize: 12,
        fontWeight: "700",
        backgroundColor: "green",
        color: "#fff",
        padding: 5,
        borderRadius: 5,
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginHorizontal: 20,
    },
});
