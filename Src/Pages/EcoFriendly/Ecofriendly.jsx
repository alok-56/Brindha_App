import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, routes } from "../../Helper/Contant";
import ProductCard from "../../Components/Main/ProductCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FetchProductApi } from "../../Api/Products";
import Header from "../../Components/Header";
import BagIcon from 'react-native-vector-icons/Ionicons';

const Ecofriendly = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [filters, setFilters] = useState({ Ecofriendly: true });  
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        GetAllProduct(1, { ...filters }, true, searchText);
    }, []);

    useEffect(() => {
        if (route.params?.filters) {
            const newFilters = { ...route.params.filters, Ecofriendly: true };  
            setFilters(newFilters);
            GetAllProduct(1, newFilters, true, searchText);
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
            setData([]);
            setHasMore(true);
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

    const handleFilterChange = (tag) => {
        // You can allow other filters but keep Ecofriendly fixed true
        const newFilters = { ...filters, Ecofriendly: true };

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

            <View style={{ marginTop: 20 }}>
                <Header onBack={() => navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>Eco-Friendly</Text>
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

            <View style={styles.productSection}>
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

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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

export default Ecofriendly;
