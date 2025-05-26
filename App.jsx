import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './Src/Navigation/AppStack';
import AuthStack from './Src/Navigation/AuthStack';
import {authcontext, AuthContextProvider} from './Src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from './Src/Redux/Store';
import {Provider} from 'react-redux';

const StarterScreen = () => {
  const {islogin, setislogin} = useContext(authcontext);

  const CheckUserToken = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      setislogin(true);
    } else {
      setislogin(false);
    }
  };

  useEffect(() => {
    CheckUserToken();
  }, []);

  return islogin ? <AppStack /> : <AuthStack />;
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <NavigationContainer>
          <StarterScreen></StarterScreen>
        </NavigationContainer>
      </AuthContextProvider>
    </Provider>
  );
};

export default App;
