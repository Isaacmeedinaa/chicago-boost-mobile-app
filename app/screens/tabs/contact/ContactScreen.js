import React from "react";
import { StyleSheet, View, Text } from "react-native";

const ContactScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>ContactScreen.js</Text>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});
