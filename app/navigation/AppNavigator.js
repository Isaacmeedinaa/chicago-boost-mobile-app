import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { useSelector } from "react-redux";

// Screen Stacks
import { AuthScreens, Tabs } from "./ScreenStack";

const AppNavigator = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {!auth.isAuthenticated ? <AuthScreens /> : <Tabs />}
    </NavigationContainer>
  );
};

export default AppNavigator;
