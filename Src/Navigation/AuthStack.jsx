
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../Helper/Contant";
import Login from "../Pages/Onboarding/Login";
import Signup from "../Pages/Onboarding/Signup";
import Slider from "../Pages/Onboarding/Slider";
import Splash from "../Pages/Onboarding/Splash";
import UserType from "../Pages/Onboarding/UserType";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={routes.SPLASH_SCREEN}
                component={Splash}
            />
            <Stack.Screen
                name={routes.SLIDER_SCREEN}
                component={Slider}
            />
            <Stack.Screen
                name={routes.USERTYPE_SCREEN}
                component={UserType}
            />
            <Stack.Screen
                name={routes.LOGIN_SCREEN}
                component={Login}
            />
            <Stack.Screen
                name={routes.SIGNUP_SCREEN}
                component={Signup}
            />

        </Stack.Navigator>
    );
}

export default AuthStack;