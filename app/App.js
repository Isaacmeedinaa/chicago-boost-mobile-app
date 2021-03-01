import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import fonts from "./constants/fonts";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  const [loaded] = useFonts(fonts);

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>hustlr.cards</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "poppins-regular",
    fontSize: 22,
  },
});
