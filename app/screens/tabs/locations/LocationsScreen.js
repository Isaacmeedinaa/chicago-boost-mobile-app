import React from "react";
import { StyleSheet, View, Text } from "react-native";

const LocationsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>LocationsScreen.js</Text>
    </View>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});
