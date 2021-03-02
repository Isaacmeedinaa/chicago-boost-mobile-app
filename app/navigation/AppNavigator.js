import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

// Screen Stacks
import { AuthScreens, HomeScreens } from "./ScreenStack";

const AppNavigator = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {!user && !auth.isAuthenticated ? <AuthScreens /> : <HomeScreens />}
    </NavigationContainer>
  );
};

export default AppNavigator;
