import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../Helper/Contant";
import Header from "../../../Components/Header";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
   const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header onBack={()=>navigation.goBack()}>
          <TouchableOpacity style={styles.headerButton}>
            <View style={styles.headerButtonContent}>
              <Text style={styles.headerButtonText}>Change Password</Text>
            </View>
          </TouchableOpacity>
          <View />
        </Header>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Update Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    marginTop: 20,
  },
  headerButton: {
    width: 160,
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
  formContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },
  input: {
    marginTop: 15,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(184, 184, 184, 1)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#000",
  },
  submitButton: {
    marginTop: 30,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
