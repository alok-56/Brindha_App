import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    TextInput,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native';
import Header from '../../Components/Header';
import { colors, routes } from '../../Helper/Contant';
import MapIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { GetMyShiping, CreateShipingAddress } from '../../Api/Shipingaddress';
import Modal from 'react-native-modal';

const Address = () => {
    const navigation = useNavigation();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState({
        FullAddress: '',
        Country: '',
        State: '',
        City: '',
        Pincode: '',
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        const res = await GetMyShiping();
        if (res?.status === true) {
            setAddresses(res?.data || []);
            setSelectedAddressId(res?.data?.[0]?._id || null);
        } else {
            console.warn('Failed to fetch addresses:', res?.message || res);
        }
        setLoading(false);
    };

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleAddAddress = async () => {
        const { FullAddress, Country, State, City, Pincode } = form;
        if (!FullAddress || !Country || !State || !City || !Pincode) {
            Alert.alert('All fields are required');
            return;
        }
        setModalVisible(false);
        setLoading(true);
        const response = await CreateShipingAddress(form);
        if (response?.status) {
            setModalVisible(false);
            setForm({ FullAddress: '', Country: '', State: '', City: '', Pincode: '' });
            fetchAddresses();
            setLoading(false);
        } else {
            Alert.alert('Failed', response?.message || 'Something went wrong');
            setLoading(false);
        }
    };

    const renderAddressItem = ({ item }) => (
        <TouchableOpacity
            style={styles.addressItem}
            onPress={() => setSelectedAddressId(item._id)}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MapIcon
                        name="map-pin"
                        size={20}
                        color={colors.PRIMARY}
                        style={{ marginRight: 10 }}
                    />
                    <Text style={styles.addressLabel}>Home</Text>
                </View>

                <Text style={styles.addressText}>
                    {item.FullAddress}, {item.City}, {item.State}, {item.Country} -{' '}
                    {item.Pincode}
                </Text>
            </View>

            <View style={styles.checkboxCircle}>
                {selectedAddressId === item._id && <View style={styles.checkedDot} />}
            </View>
        </TouchableOpacity>
    );

    const handleApply = () => {
        navigation.navigate(routes.MYBAG_SCREEN, { selectedAddressId });
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.PRIMARY} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 5 }}>
                <Header onBack={() => navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>Select Address</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>

            <FlatList
                data={addresses}
                keyExtractor={item => item._id.toString()}
                renderItem={renderAddressItem}
                contentContainerStyle={{ padding: 20 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={() => (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.addButtonText}>+ Add Address</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                <View style={styles.applyBtnContent}>
                    <Text style={styles.applyBtnText}>Apply</Text>
                </View>
            </TouchableOpacity>

            {/* Address Modal */}
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Add Address</Text>

                        {['FullAddress', 'Country', 'State', 'City', 'Pincode'].map(
                            field => (
                                <TextInput
                                    key={field}
                                    placeholder={field}
                                    value={form[field]}
                                    onChangeText={text => handleChange(field, text)}
                                    style={styles.input}
                                    keyboardType={field === 'Pincode' ? 'numeric' : 'default'}
                                />
                            ),
                        )}

                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={handleAddAddress}>
                            <Text style={styles.submitBtnText}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default Address;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerButton: {
        height: 30,
        backgroundColor: colors.PRIMARY,
        borderRadius: 8,
        marginTop: 5,
        paddingHorizontal: 15,
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
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
        marginBottom: 3,
    },
    addressText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 25,
        width: '90%',
    },
    checkboxCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    checkedDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.PRIMARY,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 8,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    addButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    applyBtn: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.PRIMARY,
        height: 45,
        borderRadius: 10,
        marginBottom: 5,
    },
    applyBtnContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyBtnText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
    },
    submitBtn: {
        backgroundColor: colors.PRIMARY,
        padding: 12,
        borderRadius: 6,
        marginTop: 5,
    },
    submitBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cancelBtnText: {
        marginTop: 12,
        textAlign: 'center',
        color: 'red',
        fontWeight: '500',
    },
});
