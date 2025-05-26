import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors, routes } from "../../Helper/Contant";
import Header from "../../Components/Header";

const FilterScreen = ({ navigation }) => {
    const [price, setPrice] = useState(1000);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    const colorOptions = ["#FF6347", "#4169E1", "#32CD32", "#FFD700", "#000"];

    const handleApply = () => {
        const filters = {
            maxPrice: price,
            color: selectedColor,
            rating: selectedRating,
        };
        navigation.navigate(routes.PRODUCT_SCREEN, { filters });
    };

    const handleReset = () => {
        setPrice(1000);
        setSelectedColor(null);
        setSelectedRating(null);
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={() => navigation.goBack()}>
                    <Text style={styles.headerTitle}>Filters</Text>
                    <View />
                </Header>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Price Range */}
                <Text style={styles.label}>Price Range</Text>
                <View style={styles.card}>
                    <Text style={styles.priceText}>₹{price}</Text>
                    <Slider
                        minimumValue={100}
                        maximumValue={5000}
                        step={100}
                        value={price}
                        onValueChange={setPrice}
                        minimumTrackTintColor={colors.PRIMARY}
                        maximumTrackTintColor="#ccc"
                        thumbTintColor={colors.PRIMARY}
                    />
                </View>

                {/* Color Selection */}
                <Text style={styles.label}>Color</Text>
                <View style={[styles.card, { flexDirection: "row", gap: 12 }]}>
                    {colorOptions.map((color, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.colorCircle,
                                { backgroundColor: color },
                                selectedColor === color && styles.selectedColor,
                            ]}
                            onPress={() =>
                                setSelectedColor(selectedColor === color ? null : color)
                            }
                        />
                    ))}
                </View>

                {/* Rating Filter */}
                <Text style={styles.label}>Rating</Text>
                <View style={styles.card}>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <TouchableOpacity
                            key={rating}
                            style={[
                                styles.ratingButton,
                                selectedRating === rating && styles.selectedRating,
                            ]}
                            onPress={() =>
                                setSelectedRating(selectedRating === rating ? null : rating)
                            }
                        >
                            <View style={{ flexDirection: "row" }}>
                                {Array.from({ length: rating }).map((_, i) => (
                                    <FontAwesome
                                        key={i}
                                        name="star"
                                        size={16}
                                        color="#FFD700"
                                    />
                                ))}
                            </View>
                            <Text style={styles.ratingText}> & Up</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.resetButton]}
                        onPress={handleReset}
                    >
                        <Text style={styles.resetText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.applyButton]}
                        onPress={handleApply}
                    >
                        <Text style={styles.applyText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        backgroundColor: colors.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "center",
    },
    content: {
        padding: 20,
        paddingBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginTop: 20,
        marginBottom: 8,
    },
    priceText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.PRIMARY,
        textAlign: "center",
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#eee",
    },
    selectedColor: {
        borderColor: colors.PRIMARY,
        borderWidth: 3,
    },
    ratingButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    selectedRating: {
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    ratingText: {
        fontSize: 13,
        color: "#333",
        marginLeft: 6,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    resetButton: {
        backgroundColor: "#e6e6e6",
        marginRight: 10,
    },
    applyButton: {
        backgroundColor: colors.PRIMARY,
        marginLeft: 10,
    },
    resetText: {
        color: "#555",
        fontWeight: "600",
    },
    applyText: {
        color: "#fff",
        fontWeight: "700",
    },
});
