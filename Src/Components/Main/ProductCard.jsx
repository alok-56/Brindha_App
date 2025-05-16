import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {colors} from '../../Helper/Contant';
import HeartIcon from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;

const ProductCard = ({onProductClick}) => {
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const filterItems = [
    {id: 1, title: 'All'},
    {id: 2, title: 'Trending'},
    {id: 3, title: 'Best Sellers'},
    {id: 4, title: 'Discounts'},
  ];

  const productItems = [1, 2, 3, 4]; 

  const toggleFavorite = itemId => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <View style={styles.container}>
      {/* Filter pills */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filterItems}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.flatListContent}
        renderItem={({item}) => {
          const isSelected = selectedFilter === item.id;
          return (
            <TouchableOpacity
              style={[
                styles.pill,
                isSelected ? styles.activePill : styles.inactivePill,
              ]}
              onPress={() => setSelectedFilter(item.id)}>
              <Text
                style={[
                  styles.pillText,
                  isSelected ? styles.activeText : styles.inactiveText,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Product Grid */}
      <FlatList
        data={productItems}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
        renderItem={({item}) => {
          const isFav = favorites.includes(item);
          return (
            <View style={styles.card} >
              <TouchableOpacity style={styles.imageContainer} onPress={onProductClick}>
                <Image
                  source={require('../../Assests/Images/product.png')}
                  style={styles.productImage}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    height: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    left: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      paddingHorizontal: 5,
                    }}>
                    ⭐ 4.0(25)
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.details}>
                <View style={styles.nameRow}>
                  <Text style={styles.productName}>Product Name</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item)}>
                    <HeartIcon
                      name={isFav ? 'heart' : 'hearto'}
                      size={20}
                      color={isFav ? 'red' : 'rgba(174, 174, 174, 1)'}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.supplier}>Supplier Name</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>$80</Text>
                  <Text style={styles.discount}>10% OFF!</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 8,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  separator: {
    width: 10,
  },
  pill: {
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '400',
  },
  activePill: {
    backgroundColor: colors.PRIMARY,
    fontWeight: '700',
  },
  inactivePill: {
    backgroundColor: '#E0E0E0',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
  productList: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    marginTop: 10,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  supplier: {
    fontSize: 13,
    fontWeight: '400',
    color: '#555',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
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
