import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/actions/user";
import { clearLoginFormErrors } from "../../store/actions/formErrors/loginFormErrors";

const UserLoginScreen = (props) => {
  const dispatch = useDispatch();

  const loginLoader = useSelector((state) => state.userLoader.loginLoader);
  const loginFormErrors = useSelector((state) => state.loginFormErrors);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearLoginFormErrors());
    };
  }, [dispatch]);

  const onLoginPress = () => {
    dispatch(userLogin(phoneNumber, password));
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.loginSafeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        contentContainerStyle={styles.loginScrollView}
      >
        <View style={styles.screen}>
          <View style={styles.screenContainer}>
            <View style={styles.topTextsContainer}>
              <Text style={styles.title}>Welcome back!</Text>
              <Text style={styles.subtitle}>Please login to continue.</Text>
            </View>
            <View style={styles.formContainer}>
              {loginFormErrors ? (
                <Text style={styles.errorText}>
                  Incorrect phone number or password!
                </Text>
              ) : null}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={
                    loginFormErrors
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="number-pad"
                  placeholder="Phone Number (e.g 17085552020)"
                  placeholderTextColor="#9E9E9E"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={
                    loginFormErrors
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  keyboardType="default"
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#9E9E9E"
                />
              </View>
              <TouchableOpacity
                style={
                  phoneNumber === "" || password === ""
                    ? styles.disabledLoginButton
                    : styles.loginButton
                }
                activeOpacity={0.8}
                disabled={phoneNumber === "" || password === "" ? true : false}
                onPress={onLoginPress}
              >
                {loginLoader ? (
                  <ActivityIndicator color="#ffffff" size={12} />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.bottomTextsContainer}>
              <View style={styles.forgotPasswordTextContainer}>
                <Text
                  style={styles.forgotPasswordButton}
                  onPress={() => props.navigation.navigate("ForgotPassword")}
                >
                  Forgot your password?
                </Text>
              </View>
              <View style={styles.registerTextContainer}>
                <Text style={styles.registerTextQuestion}>
                  New to Chicago Boost?
                </Text>
                <Text
                  style={styles.registerButton}
                  onPress={() => props.navigation.navigate("Register")}
                >
                  Register!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;

const styles = StyleSheet.create({
  loginSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loginScrollView: {
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
    marginTop: 5,
    fontFamily: "poppins-regular",
    fontSize: 16,
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
  loginButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledLoginButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fab67a",
    borderRadius: 5,
  },
  loginButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
  bottomTextsContainer: {
    width: "100%",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordButton: {
    color: "#F2811D",
    fontFamily: "poppins-semibold",
  },
  registerTextContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerTextQuestion: {
    marginRight: 4,
    fontFamily: "poppins-regular",
  },
  registerButton: {
    marginLeft: 4,
    color: "#F2811D",
    fontFamily: "poppins-semibold",
  },
});
