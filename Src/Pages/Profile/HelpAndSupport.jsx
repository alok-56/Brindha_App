import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../Components/Header";
import { colors } from "../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";

if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpAndSupport = () => {
     const navigation=useNavigation()
    const [expandedIndex, setExpandedIndex] = useState(null);

    const contactUsInfo = [
        {
            icon: "instagram",
            label: "@yourpage",
            url: "https://instagram.com/yourpage",
            color: "#C13584",
            isLink: true,
        },
        {
            icon: "facebook",
            label: "facebook.com/yourpage",
            url: "https://facebook.com/yourpage",
            color: "#3b5998",
            isLink: true,
        },
        {
            icon: "phone",
            label: "Customer Care: +1 800 123 4567",
            isLink: false,
            color: "#000",
        },
        {
            icon: "envelope",
            label: "Email: support@yourecom.com",
            isLink: false,
            color: "#000",
        },
    ];

    const generalInfo = [
        {
            title: "How do I place an order?",
            content:
                "Browse products, add to cart, and proceed to checkout. Enter your details and complete payment.",
        },
        {
            title: "What is the return policy?",
            content:
                "Returns are accepted within 7 days of delivery for unused and original condition products.",
        },
        {
            title: "How do I track my order?",
            content:
                "Go to the 'My Orders' section in your profile to view tracking status and delivery updates.",
        },
    ];

    const toggleExpand = (index) => {
        LayoutAnimation.easeInEaseOut();
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={()=>navigation.goBack()}>
                    <Text style={styles.headerTitle}>Help & Support</Text>
                    <View></View>
                </Header>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Contact Us Accordion */}
                <TouchableOpacity
                    onPress={() => toggleExpand("contact")}
                    style={styles.accordionHeader}
                >
                    <Text style={styles.accordionTitle}>Contact Us</Text>
                    <FontAwesome
                        name={expandedIndex === "contact" ? "minus" : "plus"}
                        size={18}
                        color="#555"
                    />
                </TouchableOpacity>
                {expandedIndex === "contact" && (
                    <View style={styles.accordionContent}>
                        {/* Social Media Section */}
                        <Text style={styles.subSectionTitle}>Social Media</Text>
                        {contactUsInfo
                            .filter(item => item.icon === "instagram" || item.icon === "facebook")
                            .map((item, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.contactRow}
                                    activeOpacity={0.7}
                                    onPress={() => Linking.openURL(item.url)}
                                >
                                    <FontAwesome
                                        name={item.icon}
                                        size={20}
                                        color={item.color}
                                        style={{ width: 25 }}
                                    />
                                    <Text
                                        style={[styles.text, styles.link]}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                        {/* Customer Support Section */}
                        <Text style={[styles.subSectionTitle, { marginTop: 20 }]}>
                            Customer Support
                        </Text>
                        {contactUsInfo
                            .filter(item => item.icon === "phone" || item.icon === "envelope")
                            .map((item, i) => (
                                <View key={i} style={styles.contactRow}>
                                    <FontAwesome
                                        name={item.icon}
                                        size={20}
                                        color={item.color}
                                        style={{ width: 25 }}
                                    />
                                    <Text style={styles.text}>{item.label}</Text>
                                </View>
                            ))}
                    </View>
                )}

                {/* General Information Accordion */}
                <TouchableOpacity
                    onPress={() => toggleExpand("general")}
                    style={styles.accordionHeader}
                >
                    <Text style={styles.accordionTitle}>General Information</Text>
                    <FontAwesome
                        name={expandedIndex === "general" ? "minus" : "plus"}
                        size={18}
                        color="#555"
                    />
                </TouchableOpacity>
                {expandedIndex === "general" && (
                    <View style={styles.accordionContent}>
                        {generalInfo.map((item, index) => (
                            <View key={index} style={styles.generalItem}>
                                <Text style={styles.generalTitle}>{item.title}</Text>
                                <Text style={styles.generalContent}>{item.content}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 40,
    },
    accordionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fafafa",
        paddingHorizontal: 10,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    accordionTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#222",
    },
    accordionContent: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "#eee",
        gap: 15,
    },
    link: {
        color: colors.PRIMARY,
        fontWeight: "400",
        fontSize: 14,
    },
    text: {
        fontSize: 14,
        fontWeight: "300",
        color: "#444",
        flexShrink: 1,
    },
    subSectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        marginBottom: 10,
    },
    generalItem: {
        marginBottom: 12,
    },
    generalTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#222",
        marginBottom: 4,
    },
    generalContent: {
        fontSize: 14,
        fontWeight: "300",
        color: "#555",
        lineHeight: 20,
    },
});
