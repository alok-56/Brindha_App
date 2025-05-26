// ProductCard.js
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../Helper/Contant';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

const FAVORITES_KEY = 'FAVORITE_PRODUCTS';

const SkeletonCard = () => (
  <View style={[styles.card, { backgroundColor: '#eee' }]}>
    <View style={[styles.imageContainer, { backgroundColor: '#ddd' }]} />
    <View style={{ padding: 10 }}>
      <View style={{ height: 15, backgroundColor: '#ccc', borderRadius: 4, marginBottom: 6, width: '70%' }} />
      <View style={{ height: 12, backgroundColor: '#ccc', borderRadius: 4, marginBottom: 6, width: '50%' }} />
      <View style={{ height: 14, backgroundColor: '#ccc', borderRadius: 4, width: '30%' }} />
    </View>
  </View>
);

const ProductCard = ({ onProductClick, data, onEndReached, loading, onFilterChange, filter = true }) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (e) {
        console.error('Failed to save favorites', e);
      }
    })();
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.filter(item => item._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const filterItems = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Trending' },
    { id: 3, title: 'Best Sellers' },
    { id: 4, title: 'Discounts' },
  ];

  const handleFilterPress = (id) => {
    setSelectedFilter(id);
    let filterTag = null;
    if (id === 2) filterTag = 'trending';
    if (id === 3) filterTag = 'bestseller';
    if (id === 4) filterTag = 'discount';
    onFilterChange?.(filterTag);
  };

  return (
    <View style={styles.container}>
      {
        filter && <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterItems}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => {
            const isSelected = selectedFilter === item.id;
            return (
              <TouchableOpacity
                style={[styles.pill, isSelected ? styles.activePill : styles.inactivePill]}
                onPress={() => handleFilterPress(item.id)}
              >
                <Text style={[styles.pillText, isSelected ? styles.activeText : styles.inactiveText]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      }


      {/* Products */}
      {loading && (!data || data.length === 0) ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={item => item.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.productRow}
          renderItem={() => <SkeletonCard />}
          scrollEnabled={false}
        />
      ) : !loading && (!data || data.length === 0) ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Product Found</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={styles.productRow}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loading ? (
              <Text style={{ textAlign: 'center', marginVertical: 10 }}>
                Loading more...
              </Text>
            ) : null
          }
          renderItem={({ item }) => {
            const isFav = favorites.some(fav => fav._id === item._id);
            return (
              <View style={styles.card}>
                <TouchableOpacity style={styles.imageContainer} onPress={() => onProductClick(item)}>
                  <Image source={{ uri: item.Images[0] }} style={styles.productImage} />
                  <View style={{ position: 'absolute', bottom: 5, left: 5, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, height: 20 }}>
                      <FeatherIcon name="box" size={12} color="#000" style={{ marginRight: 4 }} />
                      <Text style={{ fontSize: 12, fontWeight: '400' }}>
                        {Number(item?.Stock) - Number(item?.LockStock || 0)} {item?.Measturments?.measurement}
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
                <View style={styles.details}>
                  <View style={styles.nameRow}>
                    <Text style={styles.productName}>{item.Name}</Text>
                    <TouchableOpacity onPress={() => toggleFavorite(item)}>
                      <HeartIcon
                        name={isFav ? 'heart' : 'hearto'}
                        size={20}
                        color={isFav ? 'red' : 'rgba(174, 174, 174, 1)'}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.supplier}>{item.VendorId.BussinessName}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{item.SellingPrice}</Text>
                    {item.Discount && (
                      <Text style={styles.discount}>{item.Discount} OFF!</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: { width: '100%', alignSelf: 'center', marginTop: 8 },
  noDataContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  noDataText: { fontSize: 18, color: '#000', fontWeight: "400" },
  flatListContent: { paddingHorizontal: 10 },
  separator: { width: 10 },
  pill: {
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: { fontSize: 14, fontWeight: '400' },
  activePill: { backgroundColor: colors.PRIMARY },
  inactivePill: { backgroundColor: '#E0E0E0' },
  activeText: { color: '#fff' },
  inactiveText: { color: '#000' },
  productList: { paddingHorizontal: 10, paddingTop: 20 },
  productRow: { justifyContent: 'space-between', marginBottom: 20 },
  card: { width: '48%', borderRadius: 12, backgroundColor: '#fff' },
  imageContainer: { width: '100%', height: 200, borderRadius: 12, overflow: 'hidden' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  details: { marginTop: 10 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 },
  productName: { fontSize: 15, fontWeight: '700', color: '#000' },
  supplier: { fontSize: 13, fontWeight: '400', color: '#555', marginTop: 4, paddingHorizontal: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, paddingHorizontal: 4 },
  price: { fontSize: 15, fontWeight: '700', color: '#000' },
  discount: {
    marginLeft: 10,
    backgroundColor: 'rgba(237, 197, 197, 1)',
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 9,
    fontWeight: '700',
    color: '#000',
  },
});
