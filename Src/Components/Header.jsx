import React, { Children } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../Helper/Contant';

const Header = ({ onBack, children }) => {
    return (
        <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        height: 40,
                        width: 40,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: 'rgb(115, 33, 33)',
                    }}>
                    <TouchableOpacity
                        onPress={onBack}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <BackIcon name="chevron-back-outline" size={20} />
                    </TouchableOpacity>
                </View>
                {
                    children
                }
            </View>
        </View>
    );
};

export default Header;
