import React, { useContext, useState } from 'react';
import {
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
} from 'react-native';
import { colors, routes } from '../../Helper/Contant';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/FontAwesome';
import GoogleIcon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { LoginApi } from '../../Api/Auth';
import { authcontext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const { islogin, setislogin } = useContext(authcontext);

    const HandleLogin = async () => {
        if (!email) {
            Alert.alert('Email is Required');
            return;
        } else if (!password) {
            Alert.alert('Password is Required');
            return
        }
        setLoading(true)
        try {
            let res = await LoginApi({
                Email: email,
                Password: password,
            });

            if (res.status) {
                Alert.alert("Login Success")
                await AsyncStorage.setItem("token", res.token)
                await AsyncStorage.setItem("userid", res.data._id)
                setislogin(true)
            } else {
                Alert.alert(res.message)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <ImageBackground
                            style={{ flex: 1 }}
                            source={require('../../Assests/Images/headerback.png')}
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={{ marginTop: 30 }}>
                            <Text style={styles.title}>Log in to your account.</Text>

                            <View style={styles.formContainer}>
                                <Text style={styles.label}>Fill your details</Text>

                                <View style={styles.inputWrapper}>
                                    <EmailIcon
                                        style={styles.icon}
                                        name="email"
                                        size={22}
                                        color={colors.PRIMARY}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email Address"
                                        placeholderTextColor="#888"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <PasswordIcon
                                        style={styles.icon}
                                        name="lock"
                                        size={22}
                                        color={colors.PRIMARY}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        onChangeText={text => setPassword(text)}
                                    />
                                </View>
                            </View>

                            <View style={styles.rememberRow}>
                                <Pressable
                                    style={styles.checkboxContainer}
                                    onPress={() => setRememberMe(!rememberMe)}>
                                    <View
                                        style={[styles.checkbox, rememberMe && styles.checkedBox]}
                                    />
                                    <Text style={styles.rememberText}>Remember me</Text>
                                </Pressable>

                                <Text style={[styles.rememberText, { color: colors.PRIMARY }]}>
                                    Forgot Password?
                                </Text>
                            </View>

                            <CustomButton
                                buttonStyle={styles.loginButton}
                                TextStyle={styles.loginButtonText}
                                text="Login"
                                onClick={() => HandleLogin()}
                                loading={loading}
                            />

                            <View style={styles.orContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.orText}>Or</Text>
                                <View style={styles.divider} />
                            </View>

                            <TouchableOpacity style={styles.googleButton}>
                                <GoogleIcon name="google" size={20} color="#000" />
                                <Text style={styles.googleButtonText}>Login with Google</Text>
                            </TouchableOpacity>

                            <View style={styles.signupContainer}>
                                <Text style={styles.signupText}>Are you new here? </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate(routes.SIGNUP_SCREEN)}>
                                    <Text style={[styles.signupText, { color: colors.PRIMARY }]}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    header: {
        height: 220,
        backgroundColor: colors.PRIMARY,
        width: '100%',
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -25,
        overflow: 'hidden',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '400',
        color: 'rgba(51, 51, 51, 1)',
    },
    formContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 10,
    },
    inputWrapper: {
        marginTop: 15,
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'rgba(237, 197, 197, 1)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 20,
    },
    input: {
        marginLeft: 10,
        flex: 1,
        color: '#000',
    },
    rememberRow: {
        width: '88%',
        marginTop: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    checkedBox: {
        backgroundColor: colors.PRIMARY,
    },
    rememberText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    loginButton: {
        width: '90%',
        alignSelf: 'center',
        height: 45,
        backgroundColor: colors.PRIMARY,
        borderRadius: 12,
        marginTop: 25,
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '85%',
        alignSelf: 'center',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#777',
    },
    googleButton: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'rgba(237, 197, 197, 1)',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    googleButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },
    signupText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(110, 110, 110, 1)',
    },
});
