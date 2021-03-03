import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import fonts from "./constants/fonts";
import AppNavigator from "./navigation/AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { autoUserLogin } from "./store/actions/user";
import { setIsNotAuthenticated } from "./store/actions/auth";

const App = () => {
  const [loaded] = useFonts(fonts);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const getJWT = async () => {
      try {
        const jwt = await AsyncStorage.getItem("@jwt");
        if (!jwt) {
          dispatch(setIsNotAuthenticated());
        } else if (jwt) {
          dispatch(autoUserLogin(jwt));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getJWT();
  }, [dispatch]);

  if (!loaded) {
    return <AppLoading />;
  }

  if (!auth.hasCheckedAuth) {
    return <AppLoading />;
  }

  return <AppNavigator />;
};

export default App;
