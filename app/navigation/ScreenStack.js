import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Auth Screens
import UserLoginScreen from "../screens/auth/UserLoginScreen";
import UserRegisterScreen from "../screens/auth/UserRegisterScreen";
import UserForgotPasswordScreen from "../screens/auth/UserForgotPasswordScreen";

// Home Screens
import HomeScreen from "../screens/home/HomeScreen";

const AuthStack = createStackNavigator();

const authStackOptions = {
  headerShown: false,
};

export const AuthScreens = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={authStackOptions}
    >
      <AuthStack.Screen name="Login" component={UserLoginScreen} />
      <AuthStack.Screen name="Register" component={UserRegisterScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={UserForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

const HomeStack = createStackNavigator();

const homeStackOptions = {
  headerShown: false,
};

export const HomeScreens = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={homeStackOptions}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};
