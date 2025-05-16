import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./Src/Navigation/AppStack";
import AuthStack from "./Src/Navigation/AuthStack";
import { authcontext } from "./Src/Context/AuthContext";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const { islogin } = useContext(authcontext);

  if (islogin === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {islogin ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
