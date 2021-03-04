import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

// Screen Stacks
import { AuthScreens, Tabs } from "./ScreenStack";

const AppNavigator = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {!auth.isAuthenticated ? <AuthScreens /> : <Tabs />}
    </NavigationContainer>
  );
};

export default AppNavigator;
