import React from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../Helper/Contant';

const Cateogery = ({ onSeeAll, data, onSelectcat }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Category</Text>
                <TouchableOpacity onPress={onSeeAll}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={item => item._id.toString()}
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelectcat(item._id, item.Categoryname)}>
                        <LinearGradient
                            colors={['rgba(117, 192, 210, 1)', 'rgba(237, 197, 197, 0.38)']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={styles.gradientCircle}>
                            <Image source={{ uri: `${item.Image}` }} style={styles.image} />
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Cateogery;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    seeAll: {
        fontSize: 14,
        color: colors.PRIMARY,
    },
    itemContainer: {
        marginRight: 15,
        alignItems: 'center',
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
});
