import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert,
} from "react-native";
import Header from "../../Components/Header";
import { colors, routes } from "../../Helper/Contant";
import BagIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState("Medium - 7 KG");
    const [selectedColor, setSelectedColor] = useState("#FF0000");
    const navigation = useNavigation()

    const colorOptions = [
        "#FF0000", // Red
        "#0000FF", // Blue
        "#00FF00", // Green
        "#FFA500", // Orange
        "#800080", // Purple
        "#000000", // Black
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <Header onBack={() => navigation.goBack()}>
                        <TouchableOpacity style={styles.headerButton}>
                            <View style={styles.headerButtonContent}>
                                <Text style={styles.headerButtonText}>Sewing Machines</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.iconBox, styles.bagIcon]} onPress={() => navigation.navigate(routes.MYBAG_SCREEN)}>
                            <BagIcon name="bag" size={24} color="rgba(51, 51, 51, 1)" />
                        </TouchableOpacity>
                    </Header>
                </View>

                <Image
                    style={styles.productImage}
                    source={require("../../Assests/Images/details.png")}
                />

                <View style={styles.titleRow}>
                    <View>
                        <View style={styles.nameDiscountRow}>
                            <Text style={styles.productName}>Product Name</Text>
                            <Text style={styles.discountTag}>10% OFF!</Text>
                        </View>
                        <Text style={styles.rating}>⭐⭐⭐⭐⭐ 4.0(25)</Text>
                    </View>

                    <View style={styles.priceBox}>
                        <Text style={styles.oldPrice}>$80</Text>
                        <Text style={styles.newPrice}>$60</Text>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Product Details</Text>
                    <Text style={styles.description}>
                        Upgrade your stitching with this powerful heavy-duty sewing machine,
                        designed for boutique owners and tailors. It features multiple
                        stitch patterns, an automatic thread cutter, and a durable metal
                        frame for precision and stability.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Features</Text>
                    <View style={styles.flexWrapRow}>
                        {[
                            "12 built-in stitch patterns",
                            "Automatic thread cutter",
                            "Durable metal frame",
                            "LED lighting",
                        ].map((feature, index) => (
                            <Text key={index} style={styles.optionBox}>
                                {feature}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <View style={styles.flexWrapRow}>
                        {["Small - 5 KG", "Medium - 7 KG", "Large - 9 KG"].map(
                            (size, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedSize(size)}
                                    style={[
                                        styles.optionBox,
                                        selectedSize === size && styles.activeOptionBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            selectedSize === size && styles.activeOptionText,
                                        ]}
                                    >
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Color</Text>
                    <View style={styles.flexWrapRow}>
                        {colorOptions.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedColor(color)}
                                style={[
                                    styles.colorCircle,
                                    { backgroundColor: color },
                                    selectedColor === color && styles.activeColorCircle,
                                ]}
                            >
                                {selectedColor === color && (
                                    <BagIcon name="checkmark" size={20} color="#fff" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.footerRow}>
                    <View>
                        <Text style={styles.priceLabel}>Total Price</Text>
                        <Text style={styles.priceValue}>$87.77</Text>
                    </View>
                    <TouchableOpacity style={styles.addToBagButton} onPress={() => Alert.alert("Product Added Successfully")}>
                        <View style={styles.addToBagContent}>
                            <BagIcon name="bag" size={24} color="#fff" />
                            <Text style={styles.addToBagText}>Add to Bag</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topSection: {
        marginTop: 20,
    },
    headerButton: {
        height: 30,
        backgroundColor: colors.PRIMARY,
        borderRadius: 8,
        marginTop: 5,
        paddingHorizontal: 5,
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
    iconBox: {
        height: 40,
        width: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(208, 208, 208, 1)",
        justifyContent: "center",
        alignItems: "center",
    },
    bagIcon: {
        marginLeft: 10,
    },
    productImage: {
        width: "100%",
        height: 200,
        marginTop: 20,
    },
    titleRow: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    nameDiscountRow: {
        flexDirection: "row",
    },
    productName: {
        fontSize: 20,
        fontWeight: "700",
    },
    discountTag: {
        fontSize: 12,
        height: 20,
        fontWeight: "600",
        backgroundColor: "rgba(237, 197, 197, 1)",
        paddingHorizontal: 5,
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 12,
    },
    rating: {
        fontSize: 14,
        fontWeight: "400",
        color: "gray",
        marginTop: 2,
    },
    priceBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -20,
    },
    oldPrice: {
        fontSize: 16,
        fontWeight: "400",
        textDecorationLine: "line-through",
        color: "gray",
    },
    newPrice: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 5,
    },
    sectionCard: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "rgba(232, 242, 244, 1)",
        marginTop: 12,
        padding: 10,
        borderRadius: 8,
    },
    description: {
        fontSize: 14,
        fontWeight: "400",
    },
    section: {
        width: "90%",
        alignSelf: "center",
        marginTop: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },
    flexWrapRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    optionBox: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "rgba(232, 242, 244, 1)",
        borderRadius: 8,
        marginRight: 10,
        marginBottom: 10,
    },
    activeOptionBox: {
        backgroundColor: colors.PRIMARY,
    },
    optionText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
    },
    activeOptionText: {
        color: "#fff",
        fontWeight: "600",
    },
    colorCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    activeColorCircle: {
        borderColor: colors.PRIMARY,
        borderWidth: 2.5,
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
