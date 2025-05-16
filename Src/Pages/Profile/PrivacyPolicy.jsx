import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../Components/Header";
import { colors } from "../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";


const PrivacyPolicy = () => {
     const navigation=useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Header onBack={()=>navigation.goBack()}>
                    <Text style={styles.headerTitle}>Privacy Policy</Text>
                    <View></View>
                </Header>
            </View>


            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>1. Introduction</Text>
                <Text style={styles.text}>
                    We respect your privacy and are committed to protecting your personal information.
                    This Privacy Policy explains how we collect, use, and share data when you use our multi-vendor e-commerce application.
                </Text>

                <Text style={styles.sectionTitle}>2. Information We Collect</Text>
                <Text style={styles.text}>
                    - Personal Information (name, email, phone, address){"\n"}
                    - Payment details (processed securely via Razorpay or your selected gateway){"\n"}
                    - Device and usage data{"\n"}
                    - Vendor-provided product and business details
                </Text>

                <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
                <Text style={styles.text}>
                    - To process orders and transactions{"\n"}
                    - To communicate order updates and offers{"\n"}
                    - For fraud detection and app improvement{"\n"}
                    - To help vendors fulfill orders and improve services
                </Text>

                <Text style={styles.sectionTitle}>4. Data Sharing</Text>
                <Text style={styles.text}>
                    We only share your data with:{"\n"}
                    - Vendors to fulfill your orders{"\n"}
                    - Payment gateways like Razorpay for secure processing{"\n"}
                    - Delivery partners to ship products{"\n"}
                    - Authorities, if required by law
                </Text>

                <Text style={styles.sectionTitle}>5. Data Security</Text>
                <Text style={styles.text}>
                    We use encryption and secure servers to protect your information. However, no method is 100% secure, and we cannot guarantee absolute security.
                </Text>

                <Text style={styles.sectionTitle}>6. Your Rights</Text>
                <Text style={styles.text}>
                    - You can view, edit, or delete your data in your account settings{"\n"}
                    - You can opt out of promotional messages anytime
                </Text>

                <Text style={styles.sectionTitle}>7. Vendor Responsibilities</Text>
                <Text style={styles.text}>
                    Vendors must ensure customer data is handled responsibly and not misused, shared, or sold.
                </Text>

                <Text style={styles.sectionTitle}>8. Changes to this Policy</Text>
                <Text style={styles.text}>
                    We may update this policy. Any changes will be posted here with an updated date.
                </Text>

                <Text style={styles.sectionTitle}>9. Contact Us</Text>
                <Text style={styles.text}>
                    If you have questions or concerns, contact our support at support@yourapp.com.
                </Text>
            </ScrollView>
        </View>
    );
};

export default PrivacyPolicy;

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
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 20,
        color: "#000",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 5,
        color: "#000",
    },
    text: {
        fontSize: 14,
        color: "#555",
        lineHeight: 22,
    },
});
