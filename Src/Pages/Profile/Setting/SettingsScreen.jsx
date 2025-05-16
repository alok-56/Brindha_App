import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../../Components/Header";
import { colors } from "../../../Helper/Contant";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {

  const navigation=useNavigation()
  // Handlers
  const handleReportBug = () => {
    Alert.alert("Report Bug", "Redirecting to bug report form...");
    // Navigate or open URL/form here
  };

  const handleSendFeedback = () => {
    Alert.alert("Send Feedback", "Redirecting to feedback form...");
    // Navigate or open URL/form here
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Call delete account logic here
            Alert.alert("Account Deleted", "Your account has been deleted.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Header onBack={()=>navigation.goBack()}>
          <Text style={styles.headerTitle}>Settings</Text>
          <View></View>
        </Header>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: "#F0F7FF" }]}
          activeOpacity={0.7}
          onPress={handleReportBug}
        >
          <FontAwesome
            name="bug"
            size={24}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Report Bugs</Text>
          <FontAwesome
            name="angle-right"
            size={22}
            color="#999"
            style={styles.chevron}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: "#FFF5F5" }]}
          activeOpacity={0.7}
          onPress={handleDeleteAccount}
        >
          <FontAwesome
            name="trash"
            size={24}
            color="#E53935"
            style={styles.icon}
          />
          <Text style={[styles.optionText, { color: "#E53935" }]}>
            Delete Account
          </Text>
          <FontAwesome
            name="angle-right"
            size={22}
            color="#E53935"
            style={styles.chevron}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: "#F9F9F9" }]}
          activeOpacity={0.7}
          onPress={handleSendFeedback}
        >
          <FontAwesome
            name="envelope"
            size={24}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Send Feedback</Text>
          <FontAwesome
            name="angle-right"
            size={22}
            color="#999"
            style={styles.chevron}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    backgroundColor: colors.PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 30,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginLeft: 12,
  },
  chevron: {
    marginLeft: "auto",
  },
});
