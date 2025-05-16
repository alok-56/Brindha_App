import React from "react";
import {
    Image,
    ImageBackground,
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
import Cateogery from "../../Components/Main/Cateogery";
import ProductCard from "../../Components/Main/ProductCard";
import { useNavigation } from "@react-navigation/native";

const SearchCateogry = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <HeadersAddress onCard={() => navigation.navigate(routes.MYBAG_SCREEN)} onNOtification={()=>{}} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Search Bar */}
                <TouchableOpacity style={styles.searchContainer} >
                    <SearchIcon name="search" size={24} color="#000" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search (eg: Threads)"
                        style={styles.searchInput}
                        placeholderTextColor="#666"
                    />
                   
                </TouchableOpacity>

                {/* Category List */}
                <Cateogery />

               
            </ScrollView>
        </View>
    );
};

export default SearchCateogry;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingBottom: 100,
    },
    searchContainer: {
        width: "90%",
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


