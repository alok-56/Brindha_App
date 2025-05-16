import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";
import React from "react";
import { AuthContextProvider } from "./Src/Context/AuthContext";
import App from "./App";


const Root = () => (
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

AppRegistry.registerComponent(appName, () => Root);
