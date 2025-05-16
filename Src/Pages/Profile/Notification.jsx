import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../../Helper/Contant";
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";

const notifications = [
    {
        id: "1",
        type: "order",
        icon: "truck",
        title: "Order #1234 has been shipped",
        description: "Your package is on the way and will arrive by tomorrow.",
        time: "2 hrs ago",
    },
    {
        id: "2",
        type: "offer",
        icon: "tag",
        title: "Flat 30% off on Electronics!",
        description: "Limited time offer only for today. Hurry!",
        time: "4 hrs ago",
    },
    {
        id: "3",
        type: "status",
        icon: "check-circle",
        title: "Order #1229 Delivered",
        description: "Your package was delivered successfully.",
        time: "1 day ago",
    },
    {
        id: "4",
        type: "general",
        icon: "bell",
        title: "New Store Added",
        description: "‘SmartWear’ has joined our platform. Check it out!",
        time: "2 days ago",
    },
];

const NotificationCard = ({ item }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={item.icon} size={20} color={colors.PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    );
};

const Notification = () => {

    const navigation=useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={()=>navigation.goBack()} >
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <View />
                </Header>
            </View>


            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {notifications.length === 0 ? (
                    <Text style={styles.noNotification}>No notifications yet</Text>
                ) : (
                    <FlatList
                        data={notifications}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <NotificationCard item={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        backgroundColor: colors.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: "center",
    },
    scrollContainer: {
        padding: 16,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#eef6ff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#222",
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginTop: 2,
    },
    time: {
        fontSize: 12,
        color: "#999",
        marginTop: 4,
    },
    noNotification: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        color: "#777",
    },
});
