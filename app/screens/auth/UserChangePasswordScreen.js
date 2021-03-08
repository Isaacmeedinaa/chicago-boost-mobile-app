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
import i18n from "i18n-js";

import { useDispatch, useSelector } from "react-redux";
import { userChangePassword } from "../../store/actions/user";

import { formFields } from "../../constants/formFields";

const UserChangePasswordScreen = (props) => {
  const dispatch = useDispatch();

  const changePasswordLoader = useSelector(
    (state) => state.userLoader.changePasswordLoader
  );
  const changePasswordFormErrors = useSelector(
    (state) => state.changePasswordFormErrors
  );

  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoveryCodeError, setRecoveryCodeError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  useEffect(() => {
    const recoveryCodeError = changePasswordFormErrors.find(
      (formError) => formError.field === formFields.changePasswordRecoveryCode
    );
    if (recoveryCodeError) {
      setRecoveryCodeError(recoveryCodeError);
    } else {
      setRecoveryCodeError(recoveryCodeError);
    }

    const newPasswordError = changePasswordFormErrors.find(
      (formError) => formError.field === formFields.changePasswordPassword
    );

    if (newPasswordError) {
      setNewPasswordError(newPasswordError);
    } else {
      setNewPasswordError(newPasswordError);
    }

    const confirmPasswordError = changePasswordFormErrors.find(
      (formError) =>
        formError.field === formFields.changePasswordConfirmPassword
    );
    if (confirmPasswordError) {
      setConfirmPasswordError(confirmPasswordError);
    } else {
      setConfirmPasswordError(confirmPasswordError);
    }
  }, [changePasswordFormErrors]);

  const onChangePasswordPress = () => {
    dispatch(
      userChangePassword(
        recoveryCode,
        null,
        newPassword,
        confirmPassword,
        "null"
      )
    );
    setRecoveryCode("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.changePasswordSafeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        contentContainerStyle={styles.changePasswordScrollView}
      >
        <View style={styles.screen}>
          <View style={styles.screenContainer}>
            <View style={styles.topTextsContainer}>
              <Text style={styles.title}>{i18n.t("changePasswordTitle")}</Text>
              <Text style={styles.subtitle}>
                {i18n.t("changePasswordSubtitle")}
              </Text>
              <Text
                style={styles.topQuestionButton}
                onPress={() => props.navigation.navigate("Login")}
              >
                {i18n.t("changePasswordSubtitleButtonText")}
              </Text>
            </View>
            <View style={styles.formContainer}>
              {changePasswordFormErrors.length > 0 ? (
                <Text style={styles.errorText}>{i18n.t("errorText")}</Text>
              ) : null}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {i18n.t("recoveryCodeLabel")}
                </Text>
                <TextInput
                  style={
                    recoveryCodeError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={recoveryCode}
                  onChangeText={(text) => setRecoveryCode(text)}
                  keyboardType="number-pad"
                  placeholder={i18n.t("recoveryCodeLabel")}
                  placeholderTextColor="#9E9E9E"
                />
                {recoveryCodeError ? (
                  <Text style={styles.inputErrorText}>
                    {recoveryCodeError.message}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {i18n.t("newPasswordLabel")}
                </Text>
                <TextInput
                  style={
                    newPasswordError || confirmPasswordError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={newPassword}
                  onChangeText={(text) => setNewPassword(text)}
                  keyboardType="default"
                  secureTextEntry={true}
                  placeholder={i18n.t("newPasswordLabel")}
                  placeholderTextColor="#9E9E9E"
                />
                {newPasswordError ? (
                  <Text style={styles.inputErrorText}>
                    {newPasswordError.message}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  {i18n.t("confirmPasswordLabel")}
                </Text>
                <TextInput
                  style={
                    confirmPasswordError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  keyboardType="default"
                  secureTextEntry={true}
                  placeholder={i18n.t("confirmPasswordLabel")}
                  placeholderTextColor="#9E9E9E"
                />
                {confirmPasswordError ? (
                  <Text style={styles.inputErrorText}>
                    {confirmPasswordError.message}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={
                  recoveryCode === "" ||
                  newPassword === "" ||
                  confirmPassword === ""
                    ? styles.disabledChangePasswordButton
                    : styles.changePasswordButton
                }
                activeOpacity={0.8}
                disabled={
                  recoveryCode === "" ||
                  newPassword === "" ||
                  confirmPassword === ""
                    ? true
                    : false
                }
                onPress={onChangePasswordPress}
              >
                {changePasswordLoader ? (
                  <ActivityIndicator color="#ffffff" size={12} />
                ) : (
                  <Text style={styles.changePasswordButtonText}>
                    {i18n.t("changePasswordButtonText")}
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

export default UserChangePasswordScreen;

const styles = StyleSheet.create({
  changePasswordSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  changePasswordScrollView: {
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
  inputErrorText: {
    marginTop: 10,
    fontFamily: "poppins-regular",
    color: "red",
  },
  changePasswordButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledChangePasswordButton: {
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fab67a",
    borderRadius: 5,
  },
  changePasswordButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
});
