import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch, useSelector } from "react-redux";
import { userForgotPassword } from "../../store/actions/user";
import { clearForgotPasswordFormErrors } from "../../store/actions/formErrors/forgotPasswordFormErrors";

const UserForgotPasswordScreen = (props) => {
  const dispatch = useDispatch();

  const forgotPasswordLoader = useSelector(
    (state) => state.userLoader.forgotPasswordLoader
  );
  const forgotPasswordFormErrors = useSelector(
    (state) => state.forgotPasswordFormErrors
  );

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearForgotPasswordFormErrors());
    };
  }, [dispatch]);

  const onSendCodePress = () => {
    dispatch(userForgotPassword(phoneNumber, props.navigation));
    setPhoneNumber("");
  };

  return (
    <SafeAreaView style={styles.forgotPasswordSafeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        contentContainerStyle={styles.forgotPasswordScrollView}
      >
        <View style={styles.screen}>
          <View style={styles.screenContainer}>
            <View style={styles.topTextsContainer}>
              <Text style={styles.title}>Trouble logging in?</Text>
              <Text style={styles.subtitle}>
                Enter your phone number and we will send you a recovery code.
              </Text>
              <Text
                style={styles.topQuestionButton}
                onPress={() => props.navigation.navigate("Login")}
              >
                Back to login
              </Text>
            </View>
            <View style={styles.formContainer}>
              {forgotPasswordFormErrors ? (
                <Text style={styles.errorText}>
                  Phone number does not exist!
                </Text>
              ) : null}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={
                    forgotPasswordFormErrors
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="number-pad"
                  placeholder="Phone Number (e.g 17085552020)"
                  placeholderTextColor="#9E9E9E"
                />
              </View>
              <TouchableOpacity
                style={
                  phoneNumber === ""
                    ? styles.disabledSendCodeButton
                    : styles.sendCodeButton
                }
                activeOpacity={0.8}
                disabled={phoneNumber === "" ? true : false}
                onPress={onSendCodePress}
              >
                {forgotPasswordLoader ? (
                  <ActivityIndicator color="#ffffff" size={12} />
                ) : (
                  <Text style={styles.sendCodeButtonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UserForgotPasswordScreen;

const styles = StyleSheet.create({
  forgotPasswordSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  forgotPasswordScrollView: {
    flex: 1,
    // minHeight: "100%",
    justifyContent: "center",
    alignContent: "center",
    // paddingTop: 50,
    // paddingBottom: 50,
  },
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screenContainer: {
    width: "85%",
  },
  topTextsContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    width: "100%",
    fontFamily: "poppins-semibold",
    fontSize: 26,
    textAlign: "left",
  },
  subtitle: {
    width: "100%",
    fontFamily: "poppins-regular",
    fontSize: 16,
    textAlign: "left",
  },
  topQuestionButton: {
    width: "100%",
    marginTop: 10,
    color: "#F2811D",
    fontSize: 16,
    fontFamily: "poppins-semibold",
    textAlign: "left",
  },
  formContainer: {
    width: "100%",
    marginTop: 45,
  },
  errorText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "red",
  },
  inputContainer: {
    width: "100%",
    marginTop: 25,
  },
  inputLabel: {
    width: "100%",
    fontFamily: "poppins-semibold",
    fontSize: 14,
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 40,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: "#F3F3F3",
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "red",
  },
  sendCodeButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledSendCodeButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fab67a",
    borderRadius: 5,
  },
  sendCodeButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
});
