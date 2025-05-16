import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { routes } from '../Helper/Contant';
import Home from '../Pages/Home/Home';
import Product from '../Pages/Product/Product';
import Wishlist from '../Pages/Wishlist/Wishlist';
import Ecofriendly from '../Pages/EcoFriendly/Ecofriendly';
import Profile from '../Pages/Profile/Profile';
import { View, Animated } from 'react-native';

const Tab = createBottomTabNavigator();

const Bottomtab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarLabelStyle: {
                    marginBottom: 5,
                    fontWeight: '500',
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: 'rgba(212, 212, 212, 1)',
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: '5%',
                    right: '5%',
                    height: 60,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 4 },
                    shadowRadius: 6,
                },
            }}>
            <Tab.Screen
                name={routes.HOME_SCREEN}
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => {
                        const scale = focused ? 1.2 : 1;
                        return (
                            <Animated.View
                                style={{
                                    transform: [{ scale }],
                                    backgroundColor: focused ? 'rgba(237, 197, 197, 1)' : 'transparent',
                                    padding: 10,
                                    borderRadius: 30,
                                }}>
                                <MaterialCommunityIcons
                                    name="home"
                                    color={color}
                                    size={24}
                                />
                            </Animated.View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={routes.PRODUCT_SCREEN}
                component={Product}
                options={{
                    tabBarLabel: 'Product',
                    tabBarIcon: ({ focused, color, size }) => {
                        const scale = focused ? 1.2 : 1;
                        return (
                            <Animated.View
                                style={{
                                    transform: [{ scale }],
                                    backgroundColor: focused ? 'rgba(237, 197, 197, 1)' : 'transparent',
                                    padding: 10,
                                    borderRadius: 30,
                                }}>
                                {/* Different Product Icon */}
                                <MaterialCommunityIcons
                                    name="cube-outline"  // Different icon for Product tab
                                    color={color}
                                    size={24}
                                />
                            </Animated.View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={routes.WISHLIST_SCREEN}
                component={Wishlist}
                options={{
                    tabBarLabel: 'Wishlist',
                    tabBarIcon: ({ focused, color, size }) => {
                        const scale = focused ? 1.2 : 1;
                        return (
                            <Animated.View
                                style={{
                                    transform: [{ scale }],
                                    backgroundColor: focused ? 'rgba(237, 197, 197, 1)' : 'transparent',
                                    padding: 10,
                                    borderRadius: 30,
                                }}>
                                <MaterialCommunityIcons
                                    name="heart-outline"
                                    color={color}
                                    size={24}
                                />
                            </Animated.View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={routes.ECOFRIENDLY_SCREEN}
                component={Ecofriendly}
                options={{
                    tabBarLabel: 'Eco',
                    tabBarIcon: ({ focused, color, size }) => {
                        const scale = focused ? 1.2 : 1;
                        return (
                            <Animated.View
                                style={{
                                    transform: [{ scale }],
                                    backgroundColor: focused ? 'rgba(237, 197, 197, 1)' : 'transparent',
                                    padding: 10,
                                    borderRadius: 30,
                                }}>
                                <MaterialCommunityIcons
                                    name="leaf"
                                    color={color}
                                    size={24}
                                />
                            </Animated.View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={routes.PROFILE_SCREEN}
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, size }) => {
                        const scale = focused ? 1.2 : 1;
                        return (
                            <Animated.View
                                style={{
                                    transform: [{ scale }],
                                    backgroundColor: focused ? 'rgba(237, 197, 197, 1)' : 'transparent',
                                    padding: 10,
                                    borderRadius: 30,
                                }}>
                                <MaterialCommunityIcons
                                    name="account"
                                    color={color}
                                    size={24}
                                />
                            </Animated.View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default Bottomtab;
