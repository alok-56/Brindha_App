import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from '../../Components/Header';
import { colors, routes } from '../../Helper/Contant';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import MapIcon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../../Redux/Slices/cartSlice';
import { GetMyShiping } from '../../Api/Shipingaddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { CreateOrder, VerifyOrderOrder } from '../../Api/Order';

const MyBag = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const cartItems = useSelector(state => state.cart.cartItems);
    const [address, setAddress] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAddresses(route?.params?.selectedAddressId);
    }, [route?.params?.selectedAddressId]);



    const fetchAddresses = async id => {
        const res = await GetMyShiping();
        if (res?.status === true) {
            if (id) {
                let add = await res.data.filter((item, index) => item._id === id);
                setAddress(add[0]);
            } else {
                setAddress(res.data[0]);
            }
        } else {
            console.warn('Failed to fetch addresses:', res?.message || res);
        }
        setLoading(false);
    };

    const increment = id => {
        const item = cartItems.find(i => i._id === id);
        if (item) {
            dispatch(updateQuantity({ _id: id, quantity: item.quantity + 1 }));
        }
    };

    const decrement = id => {
        const item = cartItems.find(i => i._id === id);
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ _id: id, quantity: item.quantity - 1 }));
        }
    };

    const removeItem = id => {
        dispatch(removeFromCart(id));
    };

    const PayNow = async () => {
        let userid = await AsyncStorage.getItem('userid');

        if (!address?._id) {
            Alert.alert('Error', 'Please select a shipping address.');
            return;
        }

        // 1. Group products by vendor
        const groupedByVendor = cartItems.reduce((acc, item) => {
            const vendorId = item?.VendorId?._id || item?.VendorId;
            if (!acc[vendorId]) acc[vendorId] = [];
            acc[vendorId].push(item);
            return acc;
        }, {});

        let subOrders = [];
        let totalAmount = 0;
        let totalDeliveryCharge = 0;

        for (const vendorId in groupedByVendor) {
            const products = groupedByVendor[vendorId];

            const mappedProducts = products.map(p => ({
                productId: p._id,
                price: p.SellingPrice,
                quantity: p.quantity,
                commissionPercent: p.commissionPercent || 10,
            }));

            const subtotal = mappedProducts.reduce(
                (sum, p) => sum + p.price * p.quantity,
                0,
            );

            const deliveryCharge = 100;
            const total = subtotal + deliveryCharge;

            subOrders.push({
                vendorId,
                products: mappedProducts,
                subtotal,
                deliveryCharge,
                total,
            });

            totalAmount += subtotal;
            totalDeliveryCharge += deliveryCharge;
        }

        const taxAmount = 0;
        const grandTotal = totalAmount + taxAmount + totalDeliveryCharge;

        // 3. Final order payload
        const orderPayload = {
            ShipingAddress: address._id,
            userId: userid,
            paymentMode: 'ONLINE',
            subOrders,
            totalAmount,
            taxAmount,
            grandTotal,
        };

        console.log('ORDER PAYLOAD', JSON.stringify(orderPayload, null, 2));
        intialpayment({
            amount: orderPayload.grandTotal,
            subOrders: orderPayload.subOrders,
            orderPayload
        })
    };

    const intialpayment = async ({ amount, subOrders, orderPayload }) => {
        let res = await CreateOrder({ amount, subOrders })
        if (res.status) {
            const options = {
                description: 'Payment for Order',
                image: 'https://your-logo-url.com/logo.png',
                currency: 'INR',
                key: 'rzp_test_MtraH0q566XjUb',
                amount: amount * 100,
                order_id: res.razorpayOrderId,
                name: 'Brindha App',
                prefill: {
                    email: 'user@example.com',
                    contact: '9876543210',
                    name: 'John Doe',
                },
                theme: { color: '#3399cc' },
            };

            RazorpayCheckout.open(options)
                .then(async data => {
                    const {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                    } = data;

                    let verifyRes = await VerifyOrderOrder({
                        razorpayOrderId: razorpay_order_id,
                        razorpayPaymentId: razorpay_payment_id,
                        razorpaySignature: razorpay_signature,
                        orderData: orderPayload,
                    });
                    if (verifyRes.status) {
                        Alert.alert('Success', `Payment Success`);
                        dispatch(clearCart())
                        navigation.navigate(routes.PAYMENTSUCCESS_SCREEN)
                        setLoading(false)

                    } else {
                        Alert.alert('Error', `Payment failed: ${error.message}`);
                        setLoading(false)
                    }
                })
                .catch(error => {
                    Alert.alert('Error', `Payment failed: ${error.description}`);
                    setLoading(false)
                });
        } else {
            Alert.alert(res.message)
            setLoading(false)
        }

    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
                <View style={styles.productInfo}>
                    <Image style={styles.productImage} source={{ uri: item.Images[0] }} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item.Name}</Text>
                        <Text style={styles.productSubText}>
                            Size: {item.quantity} {item?.Measturments?.measurement}
                        </Text>
                        <Text style={styles.productSubText}>Color: {item.color}</Text>
                        <Text style={styles.productPrice}>Rs {item.SellingPrice}</Text>
                    </View>
                </View>

                <View style={styles.controlsColumn}>
                    <TouchableOpacity onPress={() => removeItem(item._id)}>
                        <CloseIcon name="closecircleo" size={20} />
                    </TouchableOpacity>

                    <View style={styles.quantityControls}>
                        <TouchableOpacity onPress={() => decrement(item._id)}>
                            <Text style={styles.quantityBtn}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => increment(item._id)}>
                            <Text style={styles.quantityBtn}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    const total = cartItems.reduce(
        (sum, item) => sum + item.SellingPrice * item.quantity,
        0,
    );

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Header onBack={() => navigation.goBack()}>
                    <TouchableOpacity style={styles.headerButton}>
                        <View style={styles.headerButtonContent}>
                            <Text style={styles.headerButtonText}>My Bag</Text>
                        </View>
                    </TouchableOpacity>
                    <View />
                </Header>
            </View>
            {
                cartItems?.length === 0 ? <Image resizeMode='contain' style={{ height: 500, width: "100%", justifyContent: "center", alignItems: "center", flex: 1 }} source={require('../../Assests/Images/emptycart.png')}></Image> : <FlatList
                    data={cartItems}
                    keyExtractor={item => item._id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
                    ListFooterComponent={() => (
                        <>
                            <View style={styles.summaryContainer}>
                                <Text style={styles.summaryTitle}>Order Summary</Text>
                                <View style={styles.summaryRow}>
                                    <Text>Subtotal</Text>
                                    <Text>Rs {total.toFixed(2)}</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text>Shipping</Text>
                                    <Text>Rs 100.00</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text>Discount</Text>
                                    <Text>Rs 00.00</Text>
                                </View>
                                <View style={styles.summaryRow}>
                                    <Text style={{ fontWeight: 'bold' }}>Total</Text>
                                    <Text style={{ fontWeight: 'bold' }}>
                                        Rs {(total + 100).toFixed(2)}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.addressContainer}
                                onPress={() => { }}>
                                <MapIcon
                                    name="map-pin"
                                    size={20}
                                    color={colors.PRIMARY}
                                    style={{ marginRight: 8 }}
                                />
                                {address ? (
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.summaryTitle}>Shipping Address</Text>
                                        <Text numberOfLines={2} style={styles.addressText}>
                                            {address.FullAddress}, {address.City}, {address.State},{' '}
                                            {address.Country} - {address.Pincode}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.summaryTitle}>Shipping Address</Text>
                                        <Text numberOfLines={2} style={styles.addressText}>
                                            No Address Selected
                                        </Text>
                                    </View>
                                )}

                                <TouchableOpacity
                                    onPress={() => navigation.navigate(routes.ADDRESS_SCREEN)}>
                                    <Text style={styles.changeText}>Change</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </>
                    )}
                />
            }


            {
                cartItems?.length === 0 ? null : <View style={styles.footerRow}>
                    <View>
                        <Text style={styles.priceLabel}>Total Price</Text>
                        <Text style={styles.priceValue}>Rs {(total + 100).toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity
                        disabled={loading}
                        style={styles.addToBagButton}
                        onPress={() => PayNow()}>
                        <View style={styles.addToBagContent}>
                            {
                                loading ? <ActivityIndicator size={20} color="#fff"></ActivityIndicator> : <Text style={styles.addToBagText}>Pay Now</Text>
                            }

                        </View>
                    </TouchableOpacity>
                </View>
            }


        </View>
    );
};

export default MyBag;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topSection: { marginTop: 20 },
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
    itemContainer: { paddingHorizontal: 20, paddingVertical: 15 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between' },
    productInfo: { flexDirection: 'row', flex: 1 },
    productImage: { height: 90, width: 100, borderRadius: 10 },
    productDetails: { marginLeft: 10, justifyContent: 'center' },
    productName: { fontSize: 16, fontWeight: '700', color: '#000' },
    productSubText: { fontSize: 14, fontWeight: '400', color: 'gray' },
    productPrice: { fontSize: 18, fontWeight: '700', color: '#000' },
    controlsColumn: { justifyContent: 'space-between', alignItems: 'center' },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityBtn: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 18,
        fontWeight: '600',
    },
    quantityText: { fontSize: 16, fontWeight: '600', marginHorizontal: 10 },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 20,
    },
    summaryContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
        color: '#000',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    addressContainer: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(232, 242, 244, 1)',
    },
    addressText: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    changeText: {
        fontSize: 14,
        color: colors.PRIMARY,
        fontWeight: '600',
        marginLeft: 8,
    },
    footerRow: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    priceLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    addToBagButton: {
        width: 200,
        height: 45,
        backgroundColor: colors.PRIMARY,
        borderRadius: 10,
    },
    addToBagContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    addToBagText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 10,
    },
});
