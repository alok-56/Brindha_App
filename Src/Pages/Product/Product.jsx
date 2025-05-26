import React, { useEffect, useState } from "react";
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
import FilterIcon from "react-native-vector-icons/AntDesign";
import RefreshIcon from "react-native-vector-icons/AntDesign";
import CloseIcon from "react-native-vector-icons/EvilIcons";
import { colors, routes } from "../../Helper/Contant";
import ProductCard from "../../Components/Main/ProductCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FetchProductApi } from "../../Api/Products";
import Icon from 'react-native-vector-icons/Feather';

const Product = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [filters, setFilters] = useState({});
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        GetAllProduct(1, {}, true, "");
    }, []);

    useEffect(() => {
        if (route.params?.filters) {
            setFilters(route.params.filters);
            GetAllProduct(1, route.params.filters, true, searchText);
        }
    }, [route.params?.filters]);

    const GetAllProduct = async (
        pageNum = 1,
        appliedFilters = {},
        reset = false,
        search = ""
    ) => {
        if (loading || (!hasMore && !reset)) return;

        if (reset) {
            setData([]);          // Clear data to show skeleton loader
            setHasMore(true);     // Reset hasMore for fresh loading
        }

        setLoading(true);

        try {
            const combinedFilters = { ...appliedFilters, search: search.trim() };
            let res = await FetchProductApi(pageNum, combinedFilters);

            if (res.status) {
                setData((prev) => (reset ? res.data : [...prev, ...res.data]));
                setHasMore(res.pagination.currentPage < res.pagination.totalPages);
                setPage(pageNum);
            } else {
                if (reset) setData([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error("API error:", error);
            if (reset) setData([]);
            setHasMore(false);
        }

        setLoading(false);
    };

    const onSearchSubmit = () => {
        GetAllProduct(1, filters, true, searchText);
    };

    // 🔥 Handle pill filter selection
    const handleFilterChange = (tag) => {
        const newFilters = { ...filters };

        if (tag === 'discount') {
            newFilters.discount = true;
            delete newFilters.tag;
        } else if (tag === 'trending' || tag === 'bestseller') {
            newFilters.tag = tag;
            delete newFilters.discount;
        } else {
            delete newFilters.discount;
            delete newFilters.tag;
        }

        setFilters(newFilters);
        GetAllProduct(1, newFilters, true, searchText);
    };

    return (
        <View style={styles.container}>
            <HeadersAddress
                onCard={() => navigation.navigate(routes.MYBAG_SCREEN)}
                onNOtification={() => { }}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Search Bar */}
                <View style={{ flexDirection: "row", width: "90%", alignSelf: "center" }}>
                    <View style={styles.searchContainer}>
                        <SearchIcon
                            name="search"
                            size={24}
                            color="#000"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            placeholder="Search (eg: Threads)"
                            style={styles.searchInput}
                            placeholderTextColor="#666"
                            value={searchText}
                            onChangeText={setSearchText}
                            onSubmitEditing={onSearchSubmit}
                            returnKeyType="search"
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            if (searchText.trim() === "") {
                                navigation.navigate(routes.FILTER_SCREEN, {
                                    currentFilters: filters,
                                });
                            } else {
                                setSearchText("");
                                setFilters({});
                                GetAllProduct(1, {}, true, "");
                            }
                        }}
                        style={styles.filterButton}
                    >

                        {searchText.trim() === "" ? (
                            <FilterIcon name="filter" size={30} color="#fff" />
                        ) : (
                            <CloseIcon name="close" size={30} color="#fff" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Product List */}
                <View style={styles.productSection}>
                    <View style={styles.productsHeader}>
                        <Text style={styles.productTitle}>
                            Our Products{" "}
                            {filters.Name ? (
                                <Text style={styles.categoryNameText}>({filters.Name})</Text>
                            ) : (
                                <Text style={styles.noCategoryText}>(no category)</Text>
                            )}
                        </Text>

                        {filters.Name && (
                            <TouchableOpacity onPress={() => {
                                setFilters({});
                                GetAllProduct(1, {}, true, "");
                            }}>
                                <Icon name="x-circle" size={20} color="#999" style={styles.resetIcon} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <ProductCard
                        onProductClick={(item) =>
                            navigation.navigate(routes.PRODUCT_DETAILS_SCREEN, { item })
                        }
                        data={data}
                        onEndReached={() =>
                            GetAllProduct(page + 1, filters, false, searchText)
                        }
                        loading={loading}
                        onFilterChange={handleFilterChange}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

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
        marginTop: 15,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    filterButton: {
        height: 50,
        width: 50,
        backgroundColor: colors.PRIMARY,
        marginTop: 15,
        marginLeft: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
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
    productsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },

    categoryNameText: {
        fontSize: 16,
        color: colors.PRIMARY, 
        fontWeight: '600',
    },

    noCategoryText: {
        fontSize: 14,
        color: "#999", 
        fontStyle: 'italic',
    },

    resetIcon: {
        marginLeft: 8,
    },

});

export default Product;
