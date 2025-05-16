import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import SearchIcon from "react-native-vector-icons/EvilIcons";
import { colors, routes } from "../../Helper/Contant";
import ProductCard from "../../Components/Main/ProductCard";
import FilterIcon from 'react-native-vector-icons/AntDesign'
import Header from "../../Components/Header";
import BagIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const Wishlist = () => {
    const navigation=useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={()=>navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Wishlist</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconBox, styles.bagIcon]} onPress={()=>navigation.navigate(routes.MYBAG_SCREEN)}>
                        <BagIcon name="bag" size={24} color="rgba(51, 51, 51, 1)" />
                    </TouchableOpacity>
                </Header>
            </View>


            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                


                {/* Product List */}
                <View style={styles.productSection}>
                    <ProductCard onProductClick={()=>navigation.navigate(routes.PRODUCT_DETAILS_SCREEN)} />
                </View>
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
        marginTop:10
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


