import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Alert,
} from 'react-native';
import Header from '../../Components/Header';
import { colors, routes } from '../../Helper/Contant';
import RightIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { authcontext } from '../../Context/AuthContext';

const menuItems = [
    'Profile Details',
    'My Orders',
    'Privacy Policy',
    'Settings',
    'Help & Support',
    'Log Out',
];

const Profile = () => {
    const navigation = useNavigation();
     const { islogin, setislogin } = useContext(authcontext);

    const handleNavigation = label => {
        switch (label) {
            case 'Profile Details':
                navigation.navigate(routes.PROFILE_DETAILS_SCREEN);
                break;
            case 'My Orders':
                navigation.navigate(routes.MYORDER_SCREEN);
                break;
            case 'Settings':
                 navigation.navigate(routes.SETTING_SCREEN);
                break;
            case 'Privacy Policy':
                navigation.navigate(routes.PRIVACYPOLICY_SCREEN);
                break;
            case 'Help & Support':
                navigation.navigate(routes.HELPSUPPORT);
                break;
            case 'Log Out':
                Alert.alert('Log Out', 'Are you sure you want to log out?', [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Yes',
                        onPress: () => {
                            // TODO: Clear tokens / user data here
                           setislogin(false)
                        },
                    },
                ]);
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Header onBack={()=>navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>

            <View style={styles.profileWrapper}>
                <View style={styles.avatar}>
                    <Text style={styles.editText}>Edit</Text>
                </View>
                <Text style={styles.profileName}>Anita Sharma</Text>
            </View>

            <ScrollView contentContainerStyle={styles.sectionWrapper}>
                {menuItems.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            style={styles.profileDetailsRow}
                            onPress={() => handleNavigation(item)}>
                            <Text
                                style={[
                                    styles.sectionText,
                                    item === 'Log Out' && styles.logoutText,
                                ]}>
                                {item}
                            </Text>
                            <RightIcon
                                name="arrow-right"
                                size={20}
                                color={item === 'Log Out' ? 'red' : '#000'}
                            />
                        </TouchableOpacity>
                        {index < menuItems.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        marginTop: 20,
    },
    headerButton: {
        width: 100,
        height: 30,
        backgroundColor: colors.PRIMARY,
        borderRadius: 8,
        marginTop: 5,
    },
    headerButtonContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    profileWrapper: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    editText: {
        position: 'absolute',
        bottom: -8,
        backgroundColor: colors.PRIMARY,
        borderRadius: 12,
        paddingHorizontal: 12,
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
    },
    sectionWrapper: {
        marginTop: 60,
        paddingBottom: 30,
    },
    profileDetailsRow: {
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    sectionText: {
        fontSize: 16,
        color: '#000',
    },
    logoutText: {
        color: 'red',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        width: '80%',
        alignSelf: 'center',
    },
    bottomSpacing: {
        height: 30,
    },
});
