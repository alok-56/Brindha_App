import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import HeadersAddress from "../../Components/Main/HeadersAddress";
import SearchIcon from "react-native-vector-icons/EvilIcons";
import { colors, routes } from "../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";
import { GetCategries } from "../../Api/Products";
import LinearGradient from "react-native-linear-gradient";

const SearchCategory = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        const res = await GetCategries();
        if (res.status) {
            setCategories(res.data);
            setAllCategories(res.data);
        } else {
            setCategories([]);
            setAllCategories([]);
        }
        setIsLoading(false);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = allCategories.filter((item) =>
            item.Categoryname.toLowerCase().includes(text.toLowerCase())
        );
        setCategories(filtered);
    };

    const onCategory = (id,name) => {
        const filters = {
            CategoryId: id,
            Name:name
        }
        navigation.navigate(routes.PRODUCT_SCREEN, {
            filters
        })
    }

    const renderSkeletonItem = (_, index) => (
        <View key={index} style={styles.itemContainer}>
            <View style={styles.skeletonCircle} />
            <View style={styles.skeletonText} />
        </View>
    );

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
                <View style={styles.searchContainer}>
                    <SearchIcon name="search" size={24} color="#000" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search Category"
                        value={searchText}
                        onChangeText={handleSearch}
                        style={styles.searchInput}
                        placeholderTextColor="#666"
                    />
                </View>

                {/* Category Grid */}
                <View style={styles.categoryWrapper}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Category</Text>
                    </View>

                    {isLoading ? (
                        <View style={styles.row}>
                            {Array.from({ length: 6 }).map(renderSkeletonItem)}
                        </View>
                    ) : (
                        <FlatList
                            data={categories}
                            numColumns={3}
                            keyExtractor={(item) => item._id.toString()}
                            contentContainerStyle={styles.flatListContainer}
                            columnWrapperStyle={styles.row}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.itemContainer} onPress={() => onCategory(item._id,item.Categoryname)}>
                                    <LinearGradient
                                        colors={['rgba(117, 192, 210, 1)', 'rgba(237, 197, 197, 0.38)']}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                        style={styles.gradientCircle}
                                    >
                                        <Image source={{ uri: item.Image }} style={styles.image} />
                                    </LinearGradient>
                                    <Text style={styles.categoryName}>{item.Categoryname}</Text>
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text style={styles.emptyText}>No categories found.</Text>
                            }
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default SearchCategory;

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
        marginTop: 15,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    categoryWrapper: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    itemContainer: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 15,
    },
    gradientCircle: {
        height: 85,
        width: 85,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    categoryName: {
        marginTop: 2,
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
    // Skeleton loader styles
    skeletonCircle: {
        height: 85,
        width: 85,
        borderRadius: 50,
        backgroundColor: "#eee",
    },
    skeletonText: {
        height: 14,
        width: 60,
        marginTop: 8,
        borderRadius: 4,
        backgroundColor: "#eee",
    },
});
