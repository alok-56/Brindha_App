import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import HeadersAddress from "../../Components/Main/HeadersAddress";
import SearchIcon from "react-native-vector-icons/EvilIcons";
import { colors, routes } from "../../Helper/Contant";
import ProductCard from "../../Components/Main/ProductCard";
import FilterIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";

const Product = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <HeadersAddress onCard={() => navigation.navigate(routes.MYBAG_SCREEN)} onNOtification={() => { }} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Search Bar */}
                <View style={{ flexDirection: "row", width: "90%", alignSelf: "center" }}>
                    <View style={styles.searchContainer}>
                        <SearchIcon name="search" size={24} color="#000" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search (eg: Threads)"
                            style={styles.searchInput}
                            placeholderTextColor="#666"
                        />
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate(routes.FILTER_SCREEN)} style={{ height: 50, width: 50, backgroundColor: colors.PRIMARY, marginTop: 15, marginLeft: 10, borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                        <FilterIcon name="filter" size={30} color="#fff"></FilterIcon>
                    </TouchableOpacity>
                </View>



                {/* Product List */}
                <View style={styles.productSection}>
                    <Text style={styles.productTitle}>Our Products</Text>
                    <ProductCard onProductClick={() => navigation.navigate(routes.PRODUCT_DETAILS_SCREEN)} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingBottom: 100,
    },
    searchContainer: {
        width: "80%",
        height: 50,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(208, 208, 208, 1)",
        paddingHorizontal: 10,
        marginTop: 15
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    bannerWrapper: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    bannerImage: {
        width: "100%",
        height: 170,
        justifyContent: "center",
    },
    bannerContent: {
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
    },
    bannerTextSection: {
        width: "50%",
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    bannerSubtitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000",
        marginTop: 3,
    },
    exploreButton: {
        marginTop: 15,
        width: 100,
        height: 40,
        backgroundColor: colors.PRIMARY,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    exploreText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
    productSection: {
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        marginBottom: 8,
    },
});

