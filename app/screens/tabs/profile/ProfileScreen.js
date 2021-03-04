import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../store/actions/user";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>ProfileScreen.js</Text>
      <Button title="Log Out" onPress={() => dispatch(userLogout())} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});
