import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import i18n from "i18n-js";
import { useDispatch, useSelector } from "react-redux";
import {
  userUpdatePersonalInfo,
  userLogout,
  userChangePassword,
} from "../../../store/actions/user";
import { formFields } from "../../../constants/formFields";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userUpdatingLoader = useSelector(
    (state) => state.userLoader.updatingLoader
  );
  const updatePersonalInfoFormErrors = useSelector(
    (state) => state.updatePersonalInfoFormErrors
  );
  const changePasswordLoader = useSelector(
    (state) => state.userLoader.changePasswordLoader
  );
  const changePasswordFormErrors = useSelector(
    (state) => state.changePasswordFormErrors
  );

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  useEffect(() => {
    const emailError = updatePersonalInfoFormErrors.find(
      (formError) => formError.field === formFields.updatePersonalInfoEmailName
    );
    if (emailError) {
      setEmailError(emailError);
    } else {
      setEmailError(emailError);
    }

    const phoneNumberError = updatePersonalInfoFormErrors.find(
      (formError) =>
        formError.field === formFields.updatePersonalInfoPhoneNumber
    );
    if (phoneNumberError) {
      setPhoneNumberError(phoneNumberError);
    } else {
      setPhoneNumberError(phoneNumberError);
    }
  }, [updatePersonalInfoFormErrors]);

  useEffect(() => {
    const currentPasswordError = changePasswordFormErrors.find(
      (formError) =>
        formError.field === formFields.changePasswordCurrentPassword
    );
    if (currentPasswordError) {
      setCurrentPasswordError(currentPasswordError);
    } else {
      setCurrentPasswordError(currentPasswordError);
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

  const onUpdatePersonalInfoPress = () => {
    dispatch(
      userUpdatePersonalInfo(firstName, lastName, email, phoneNumber, user._id)
    );
  };

  const onChangePasswordPress = () => {
    dispatch(
      userChangePassword(
        null,
        currentPassword,
        newPassword,
        confirmPassword,
        user._id
      )
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.profileSafeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        listViewDisplayed={false}
        contentContainerStyle={styles.profileScrollView}
      >
        <View style={styles.screen}>
          <View style={styles.personalInfoContainer}>
            <View style={styles.personalInfoFormContainer}>
              <Text style={styles.personalInfoHeader}>
                {i18n.t("profilePersonalInfoTitle")}
              </Text>
              {updatePersonalInfoFormErrors.length > 0 ? (
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
              <TouchableOpacity
                style={
                  firstName === "" ||
                  lastName === "" ||
                  email === "" ||
                  phoneNumber === ""
                    ? styles.disabledUpdateUserInfoButton
                    : styles.updateUserInfoButton
                }
                activeOpacity={0.8}
                disabled={
                  firstName === "" ||
                  lastName === "" ||
                  email === "" ||
                  phoneNumber === ""
                    ? true
                    : false
                }
                onPress={onUpdatePersonalInfoPress}
              >
                {userUpdatingLoader ? (
                  <ActivityIndicator size={12} color="#ffffff" />
                ) : (
                  <Text style={styles.updateUserInfoButtonText}>
                    {i18n.t("profilePersonalInfoButtonText")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.changePasswordContainer}>
            <View style={styles.changePasswordFormContainer}>
              <Text style={styles.changePasswordHeader}>
                {i18n.t("changePasswordTitle")}
              </Text>
              <View style={styles.inputContainer}>
                {changePasswordFormErrors.length > 0 ? (
                  <Text style={styles.errorText}>{i18n.t("errorText")}</Text>
                ) : null}
                <Text style={styles.inputLabel}>
                  {i18n.t("currentPasswordLabel")}
                </Text>
                <TextInput
                  style={
                    currentPasswordError
                      ? [styles.input, styles.inputError]
                      : styles.input
                  }
                  value={currentPassword}
                  onChangeText={(text) => setCurrentPassword(text)}
                  keyboardType="default"
                  secureTextEntry={true}
                  placeholder={i18n.t("currentPasswordLabel")}
                  placeholderTextColor="#9E9E9E"
                  returnKeyType="next"
                />
                {currentPasswordError ? (
                  <Text style={styles.inputErrorText}>
                    {currentPasswordError.message}
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
                  returnKeyType="next"
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
                  returnKeyType="next"
                />
                {confirmPasswordError ? (
                  <Text style={styles.inputErrorText}>
                    {confirmPasswordError.message}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={
                  currentPassword === "" ||
                  newPassword === "" ||
                  confirmPassword === ""
                    ? styles.disabledChangePasswordButton
                    : styles.changePasswordButton
                }
                activeOpacity={0.8}
                disabled={
                  currentPassword === "" ||
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
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            onPress={() => dispatch(userLogout())}
          >
            <Text style={styles.logoutButtonText}>
              {i18n.t("logoutButtonText")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileSafeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  profileScrollView: {
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 20,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  personalInfoContainer: {
    marginTop: 20,
    width: Dimensions.get("screen").width - 40,
  },
  personalInfoHeader: {
    width: "100%",
    marginTop: 20,
    fontFamily: "poppins-semibold",
    fontSize: 18,
    textAlign: "left",
  },
  errorText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "red",
    marginTop: 15,
  },
  personalInfoFormContainer: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
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
  updateUserInfoButton: {
    width: "100%",
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledUpdateUserInfoButton: {
    width: "100%",
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fab67a",
    borderRadius: 5,
  },
  updateUserInfoButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
  changePasswordContainer: {
    marginTop: 20,
    width: Dimensions.get("screen").width - 40,
  },
  changePasswordHeader: {
    width: "100%",
    marginTop: 20,
    fontFamily: "poppins-semibold",
    fontSize: 18,
    textAlign: "left",
  },
  changePasswordFormContainer: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  changePasswordButton: {
    width: "100%",
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledChangePasswordButton: {
    width: "100%",
    height: 40,
    marginTop: 20,
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
  logoutButton: {
    width: Dimensions.get("screen").width - 40,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  logoutButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
});
