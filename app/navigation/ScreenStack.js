import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";

// Auth Screens
import UserLoginScreen from "../screens/auth/UserLoginScreen";
import UserRegisterScreen from "../screens/auth/UserRegisterScreen";
import UserForgotPasswordScreen from "../screens/auth/UserForgotPasswordScreen";
import UserChangePasswordScreen from "../screens/auth/UserChangePasswordScreen";

// Tab Screens
import DealsScreen from "../screens/tabs/deals/DealsScreen";
import LocationsScreen from "../screens/tabs/locations/LocationsScreen";
import ProfileScreen from "../screens/tabs/profile/ProfileScreen";
import ContactScreen from "../screens/tabs/contact/ContactScreen";

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
      <AuthStack.Screen
        name="ChangePassword"
        component={UserChangePasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

const DealsStack = createStackNavigator();

const dealsStackOptions = {
  headerStyle: {
    backgroundColor: "#ffffff",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleStyle: {
    fontFamily: "poppins-semibold",
  },
};

const DealsScreens = () => {
  return (
    <DealsStack.Navigator
      initialRouteName="Deals"
      screenOptions={dealsStackOptions}
    >
      <DealsStack.Screen
        name="Deals"
        component={DealsScreen}
        options={{ title: i18n.t("dealsTitle") }}
      />
    </DealsStack.Navigator>
  );
};

const LocationsStack = createStackNavigator();

const locationsStackOptions = {
  headerStyle: {
    backgroundColor: "#ffffff",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleStyle: {
    fontFamily: "poppins-semibold",
  },
};

const LocationsScreens = () => {
  return (
    <LocationsStack.Navigator
      initialRouteName="Locations"
      screenOptions={locationsStackOptions}
    >
      <LocationsStack.Screen
        name="Locations"
        component={LocationsScreen}
        options={{ title: i18n.t("locationsTitle") }}
      />
    </LocationsStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const profileStackOptions = {
  headerStyle: {
    backgroundColor: "#ffffff",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleStyle: {
    fontFamily: "poppins-semibold",
  },
};

const ProfileScreens = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={profileStackOptions}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: i18n.t("profileTitle") }}
      />
    </ProfileStack.Navigator>
  );
};

const ContactStack = createStackNavigator();

const contactStackOptions = {
  headerStyle: {
    backgroundColor: "#ffffff",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleStyle: {
    fontFamily: "poppins-semibold",
  },
};

const ContactScreens = () => {
  return (
    <ContactStack.Navigator
      initialRouteName="Contact"
      screenOptions={contactStackOptions}
    >
      <ContactStack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: i18n.t("contactTitle") }}
      />
    </ContactStack.Navigator>
  );
};

const TabsNavigator = createBottomTabNavigator();

const tabsOptions = {
  style: {
    backgroundColor: "#ffffff",
    borderTopWidth: 0,
  },
  activeTintColor: "#F2811D",
  inactiveTintColor: "gray",
  showLabel: false,
};

export const Tabs = () => {
  return (
    <TabsNavigator.Navigator
      initialRouteName="Deals"
      tabBarOptions={tabsOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Deals") {
            iconName = focused ? "pricetags" : "pricetags-outline";
          } else if (route.name === "Locations") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Contact") {
            iconName = focused ? "mail" : "mail-outline";
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <TabsNavigator.Screen name="Deals" component={DealsScreens} />
      <TabsNavigator.Screen name="Locations" component={LocationsScreens} />
      <TabsNavigator.Screen name="Profile" component={ProfileScreens} />
      <TabsNavigator.Screen name="Contact" component={ContactScreens} />
    </TabsNavigator.Navigator>
  );
};
