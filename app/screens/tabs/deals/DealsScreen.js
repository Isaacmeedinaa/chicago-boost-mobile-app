import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";

const DealsScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const askForNotificationsPermission = async () => {
      try {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (status !== "granted")
          return Alert.alert(
            "Notifications",
            "Please enable notifications to receive alerts on the newest deals!",
            [{ text: "OK" }]
          );

        let token = await Notifications.getExpoPushTokenAsync();

        if (!user.pushToken || user.pushToken !== token.data) {
          console.log("update user!");
        }
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(() => {
      askForNotificationsPermission();
    }, 1000);
  });

  return (
    <View style={styles.screen}>
      <Text>DealsScreen.js</Text>
    </View>
  );
};

export default DealsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});
