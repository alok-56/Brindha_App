
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../Helper/Contant";
import ProductDetails from "../Pages/Product/ProductDetails";
import Bottomtab from "./BottomTab";
import MyBag from "../Pages/Product/MyBag";
import Address from "../Pages/Profile/Address";
import Paymentsuccess from "../Pages/Product/Paymentsuccess";
import SearchCateogry from "../Pages/Home/SearchScreen";
import ProfileDetails from "../Pages/Profile/MyProfile/ProfileDetails";
import ChangePassword from "../Pages/Profile/MyProfile/ChangePassword";
import MyOrder from "../Pages/Profile/MyOrder/MyOrder";
import MyOrderDetails from "../Pages/Profile/MyOrder/MyOrderDetails";
import PrivacyPolicy from "../Pages/Profile/PrivacyPolicy";
import HelpAndSupport from "../Pages/Profile/HelpAndSupport";
import SettingsScreen from "../Pages/Profile/Setting/SettingsScreen";
import Notification from "../Pages/Profile/Notification";
import FilterScreen from "../Pages/Product/Filterscreen";


const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={routes.BOTTOMTAB}
        >
            <Stack.Screen
                name={routes.BOTTOMTAB}
                component={Bottomtab}
            />

            <Stack.Screen
                name={routes.SEARCH_SCREEN}
                component={SearchCateogry}
            />
            <Stack.Screen
                name={routes.PRODUCT_DETAILS_SCREEN}
                component={ProductDetails}
            />

            <Stack.Screen
                name={routes.MYBAG_SCREEN}
                component={MyBag}
            />

            <Stack.Screen
                name={routes.ADDRESS_SCREEN}
                component={Address}
            />
            <Stack.Screen
                name={routes.PAYMENTSUCCESS_SCREEN}
                component={Paymentsuccess}
            />
             <Stack.Screen
                name={routes.PROFILE_DETAILS_SCREEN}
                component={ProfileDetails}
            />
              <Stack.Screen
                name={routes.CHANGEPASSWORD_SCREEN}
                component={ChangePassword}
            />
             <Stack.Screen
                name={routes.MYORDER_SCREEN}
                component={MyOrder}
            />
             <Stack.Screen
                name={routes.MYORDERDETAILS_SCREEN}
                component={MyOrderDetails}
            />
             <Stack.Screen
                name={routes.PRIVACYPOLICY_SCREEN}
                component={PrivacyPolicy}
            />
             <Stack.Screen
                name={routes.HELPSUPPORT}
                component={HelpAndSupport}
            />
            <Stack.Screen
                name={routes.SETTING_SCREEN}
                component={SettingsScreen}
            />
            <Stack.Screen
                name={routes.NOTIFICATION_SCREEN}
                component={Notification}
            />
            <Stack.Screen
                name={routes.FILTER_SCREEN}
                component={FilterScreen}
            />
            


        </Stack.Navigator>
    );
}

export default AppStack;