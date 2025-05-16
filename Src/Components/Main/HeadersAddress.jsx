import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapIcon from 'react-native-vector-icons/FontAwesome5';
import BagIcon from 'react-native-vector-icons/Ionicons';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';

const HeadersAddress = ({onCard,onNOtification}) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={styles.locationLabel}>Location</Text>
                    <View style={styles.locationRow}>
                        <MapIcon name="map-marker-alt" size={15} style={styles.mapIcon} />
                        <Text style={styles.locationText}>Hyderabad, India</Text>
                    </View>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.iconBox} onPress={onNOtification}>
                        <NotificationIcon name="notifications-none" size={24} color="rgba(51, 51, 51, 1)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconBox, styles.bagIcon]} onPress={onCard}>
                        <BagIcon name="bag" size={24} color="rgba(51, 51, 51, 1)" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default HeadersAddress;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    innerContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    locationLabel: {
        fontSize: 16,
        fontWeight: "400",
        color: "rgba(51, 51, 51, 1)",
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },
    mapIcon: {
        marginTop: 2,
    },
    locationText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "700",
        color: "rgba(51, 51, 51, 1)",
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
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

