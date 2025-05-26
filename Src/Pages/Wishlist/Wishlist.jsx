import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BagIcon from 'react-native-vector-icons/Ionicons';
import { colors, routes } from "../../Helper/Contant";
import ProductCard from "../../Components/Main/ProductCard";
import Header from "../../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const FAVORITES_KEY = 'FAVORITE_PRODUCTS';

const Wishlist = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);

    // Load favorites from AsyncStorage when screen mounts or focuses
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favData = await AsyncStorage.getItem(FAVORITES_KEY);
                console.log(favData)
                if (favData) {
                    setFavorites(JSON.parse(favData));
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.log("Error loading favorites:", error);
            }
        };

        fetchFavorites();
        const unsubscribe = navigation.addListener('focus', fetchFavorites);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={() => navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Wishlist</Text>
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

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* If no favorites, show message */}
                {favorites.length === 0 ? (
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#777' }}>
                            No favorites yet.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.productSection}>
                        <ProductCard
                            data={favorites} 
                            onProductClick={(item) =>
                               navigation.navigate(routes.PRODUCT_DETAILS_SCREEN, { item })
                            }
                            filter={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Wishlist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingBottom: 100,
        marginTop: 10,
    },
    productSection: {
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
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
});
