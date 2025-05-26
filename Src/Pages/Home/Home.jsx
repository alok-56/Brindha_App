import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import HeadersAddress from "../../Components/Main/HeadersAddress";
import SearchIcon from "react-native-vector-icons/EvilIcons";
import { colors, routes } from "../../Helper/Contant";
import Cateogery from "../../Components/Main/Cateogery";
import ProductCard from "../../Components/Main/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { FetchProductApi, GetCategries } from "../../Api/Products";

const Home = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [categries, setCategries] = useState([])

    useEffect(() => {
        fetchProducts(filters);
    }, [filters]);

    useEffect(() => {
        fetchcategries()
    }, [])

    const fetchProducts = async (appliedFilters = {}) => {
        setLoading(true);
        try {
            const res = await FetchProductApi(1, { ...appliedFilters, limit: 10 });
            if (res.status) {
                setProducts(res.data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("API error:", error);
            setProducts([]);
        }
        setLoading(false);
    };

    const handleFilterChange = (tag) => {
        const newFilters = { ...filters };

        if (tag === "discount") {
            newFilters.discount = true;
            delete newFilters.tag;
        } else if (tag === "trending" || tag === "bestseller") {
            newFilters.tag = tag;
            delete newFilters.discount;
        } else {
            delete newFilters.discount;
            delete newFilters.tag;
        }

        setFilters(newFilters);
    };

    const fetchcategries = async () => {
        let res = await GetCategries()
        if (res.status) {
            setCategries(res.data)
        } else {
            setCategries([])
        }
    }

    const onCategory = (id, name) => {
        const filters = {
            CategoryId: id,
            Name: name
        }
        navigation.navigate(routes.PRODUCT_SCREEN, {
            filters
        })
    }


    return (
        <View style={styles.container}>
            <HeadersAddress
                onCard={() => navigation.navigate(routes.MYBAG_SCREEN)}
                onNOtification={() => navigation.navigate(routes.NOTIFICATION_SCREEN)}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                <TouchableOpacity
                    style={styles.searchContainer}
                    onPress={() => navigation.navigate(routes.SEARCH_SCREEN)}
                >
                    <SearchIcon
                        name="search"
                        size={24}
                        color="#000"
                        style={styles.searchIcon}
                    />
                    <Text style={styles.searchInput}>Search (eg: Threads)</Text>
                </TouchableOpacity>


                <View style={styles.bannerWrapper}>
                    <ImageBackground
                        source={require("../../Assests/Images/bannerbac.png")}
                        style={styles.bannerImage}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        <View style={styles.bannerContent}>
                            <View style={styles.bannerTextSection}>
                                <Text style={styles.bannerTitle}>February Offer!</Text>
                                <Text style={styles.bannerSubtitle}>
                                    Get 10% discount on every purchase!
                                </Text>
                                <TouchableOpacity style={styles.exploreButton}>
                                    <Text style={styles.exploreText}>Explore now</Text>
                                </TouchableOpacity>
                            </View>
                            <Image source={require("../../Assests/Images/banner.png")} />
                        </View>
                    </ImageBackground>
                </View>


                <Cateogery onSelectcat={(id,name) => onCategory(id,name)} onSeeAll={() => navigation.navigate(routes.SEARCH_SCREEN)} data={categries.slice(0, 4)} />


                <View style={styles.productSection}>
                    <Text style={styles.productTitle}>Our Products</Text>
                    <ProductCard
                        data={products}
                        loading={loading}
                        onProductClick={(item) =>
                            navigation.navigate(routes.PRODUCT_DETAILS_SCREEN, { item })
                        }
                        onFilterChange={handleFilterChange}

                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;

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
