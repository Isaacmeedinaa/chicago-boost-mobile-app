import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import i18n from "i18n-js";

import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/actions/user";
import { clearRegisterFormErrors } from "../../store/actions/formErrors/registerFormErrors";

import { formFields } from "../../constants/formFields";

const UserRegisterScreen = (props) => {
  const dispatch = useDispatch();

  const registerLoader = useSelector(
    (state) => state.userLoader.registerLoader
  );
  const registerFormErrors = useSelector((state) => state.registerFormErrors);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    const emailError = registerFormErrors.find(
      (formError) => formError.field === formFields.registerEmail
    );
    if (emailError) {
      setEmailError(emailError);
    } else {
      setEmailError(emailError);
    }

    const phoneNumbner = registerFormErrors.find(
      (formError) => formError.field === formFields.registerPhoneNumber
    );
    if (phoneNumbner) {
      setPhoneNumberError(phoneNumbner);
    } else {
      setPhoneNumberError(phoneNumbner);
    }

    const passwordError = registerFormErrors.find(
      (formError) => formError.field === formFields.registerPassword
    );
    if (passwordError) {
      setPasswordError(passwordError);
    } else {
      setPasswordError(passwordError);
    }
  }, [registerFormErrors]);

  useEffect(() => {
    return () => {
      dispatch(clearRegisterFormErrors());
    };
  }, [dispatch]);

  const onRegisterPress = () => {
    dispatch(userRegister(firstName, lastName, email, phoneNumber, password));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <SafeAreaView style={styles.registerSafeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        contentContainerStyle={styles.registerScrollView}
      >
        <View style={styles.screen}>
          <View style={styles.screenContainer}>
            <View style={styles.topTextsContainer}>
              <Text style={styles.title}>{i18n.t("registerTitle")}</Text>
              <View style={styles.topTextQuestionContainer}>
                <Text style={styles.topQuestion}>
                  {i18n.t("registerSubtitleQuestion")}
                </Text>
                <Text
                  style={styles.topQuestionButton}
                  onPress={() => props.navigation.navigate("Login")}
                >
                  {i18n.t("registerSubtitleButtonText")}
                </Text>
              </View>
            </View>
            <View style={styles.formContainer}>
              {registerFormErrors.length > 0 ? (
                <Text style={styles.errorText}>{i18n.t("errorText")}</Text>
              ) : null}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {i18n.t("firstNameLabel")}
                </Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  keyboardType="default"
                  placeholder={i18n.t("firstNameLabel")}
                  placeholderTextColor="#9E9E9E"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{i18n.t("lastNameLabel")}</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  keyboardType="default"
                  placeholder={i18n.t("lastNameLabel")}
                  placeholderTextColor="#9E9E9E"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{i18n.t("emailLabel")}</Text>
                <TextInput
                  style={
                    emailError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
                  placeholder={i18n.t("emailLabel")}
                  placeholderTextColor="#9E9E9E"
                  returnKeyType="next"
                />
                {emailError ? (
                  <Text style={styles.inputErrorText}>
                    {emailError.message}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {i18n.t("phoneNumberLabel")}
                </Text>
                <TextInput
                  style={
                    phoneNumberError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="number-pad"
                  placeholder={`${i18n.t(
                    "phoneNumberLabel"
                  )} (e.g 17085552020)`}
                  placeholderTextColor="#9E9E9E"
                  returnKeyType="next"
                />
                {phoneNumberError ? (
                  <Text style={styles.inputErrorText}>
                    {phoneNumberError.message}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{i18n.t("passwordLabel")}</Text>
                <TextInput
                  style={
                    passwordError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  keyboardType="default"
                  secureTextEntry={true}
                  placeholder={i18n.t("passwordLabel")}
                  placeholderTextColor="#9E9E9E"
                />
                {passwordError ? (
                  <Text style={styles.inputErrorText}>
                    {passwordError.message}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={
                  firstName === "" ||
                  lastName === "" ||
                  email === "" ||
                  phoneNumber === "" ||
                  password === ""
                    ? styles.disabledRegisterButton
                    : styles.registerButton
                }
                activeOpacity={0.8}
                disabled={
                  firstName === "" ||
                  lastName === "" ||
                  email === "" ||
                  phoneNumber === "" ||
                  password === ""
                    ? true
                    : false
                }
                onPress={onRegisterPress}
              >
                {registerLoader ? (
                  <ActivityIndicator color="#ffffff" size={12} />
                ) : (
                  <Text style={styles.registerButtonText}>
                    {i18n.t("registerButtonText")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UserRegisterScreen;

const styles = StyleSheet.create({
  registerSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  registerScrollView: {
    minHeight: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 50,
    paddingBottom: 50,
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
  topTextQuestionContainer: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    alignContent: "center",
  },
  topQuestion: {
    fontFamily: "poppins-regular",
    fontSize: 16,
    textAlign: "left",
  },
  topQuestionButton: {
    marginLeft: 8,
    color: "#F2811D",
    fontSize: 16,
    fontFamily: "poppins-semibold",
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
  inputErrorText: {
    marginTop: 10,
    fontFamily: "poppins-regular",
    color: "red",
  },
  registerButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledRegisterButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fab67a",
    borderRadius: 5,
  },
  registerButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
});
