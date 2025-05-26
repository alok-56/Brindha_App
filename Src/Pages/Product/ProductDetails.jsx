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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../../Redux/Slices/cartSlice";

const ProductDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const item = route?.params?.item;
    

    const dispatch = useDispatch();

    // Sizes based on measurement unit and specific values
    const sizeValues = [1, 2, 3, 5, 10];
    const unit = item?.Measturments?.measurement || "units";

    // Initialize selectedSize to first size option
    const [selectedSize, setSelectedSize] = useState(`₹{sizeValues[1]} ₹{unit}`); // Default to "2 meters" for example
    const [selectedColor, setSelectedColor] = useState("#FF0000");

    const colorOptions = [
        "#FF0000", "#0000FF", "#00FF00", "#FFA500", "#800080", "#000000",
    ];

    const productImage = item?.Images?.[0] || null;
    const features = item?.Features || [];
    const discount = item?.Discount || "0%";
    const newPrice = item?.SellingPrice || 0;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topSection}>
                    <Header onBack={() => navigation.goBack()}>
                        <TouchableOpacity style={styles.headerButton}>
                            <View style={styles.headerButtonContent}>
                                <Text style={styles.headerButtonText}>
                                    Product Details
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.iconBox, styles.bagIcon]}
                            onPress={() => navigation.navigate(routes.MYBAG_SCREEN)}
                        >
                            <BagIcon name="bag" size={24} color="rgba(51, 51, 51, 1)" />
                        </TouchableOpacity>
                    </Header>
                </View>

                {productImage && (
                    <Image
                        style={styles.productImage}
                        source={{ uri: productImage }}
                    />
                )}

                <View style={styles.titleRow}>
                    <View>
                        <View style={styles.nameDiscountRow}>
                            <Text style={styles.productName}>{item?.Name || "Product Name"}</Text>
                            <Text style={styles.discountTag}>{discount} OFF!</Text>
                        </View>
                    </View>

                    <View style={styles.priceBox}>
                        <Text style={styles.newPrice}>₹{newPrice}</Text>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Product Details</Text>
                    <Text style={styles.description}>
                        {item?.Description || "No description provided."}
                    </Text>
                </View>

                {features.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Features</Text>
                        <View style={styles.flexWrapRow}>
                            {features.map((feature, index) => (
                                <Text key={index} style={styles.optionBox}>
                                    {feature}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <View style={styles.flexWrapRow}>
                        {sizeValues.map((value, index) => {
                            const sizeLabel = `${value} ${unit}`;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedSize(value)}
                                    style={[
                                        styles.optionBox,
                                        selectedSize === value && styles.activeOptionBox,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                             selectedSize === value && styles.activeOptionText,
                                        ]}
                                    >
                                        {sizeLabel}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
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
                        <Text style={styles.priceValue}>₹{newPrice}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addToBagButton}
                        onPress={() => {
                            dispatch(addToCart(item));
                            dispatch(updateQuantity({ _id: item._id, quantity: selectedSize }));
                            Alert.alert("Success", "Product added to cart");
                            navigation.navigate(routes.PRODUCT_SCREEN)
                        }}
                    >
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
