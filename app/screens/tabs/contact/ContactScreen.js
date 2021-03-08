import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import i18n from "i18n-js";
import { useDispatch, useSelector } from "react-redux";
import { userSendMessage } from "../../../store/actions/user";

const ContactScreen = () => {
  const dispatch = useDispatch();

  const messageLoader = useSelector((state) => state.userLoader.messageLoader);

  const [message, setMessage] = useState("");

  const onSendMessageClick = () => {
    dispatch(userSendMessage(message));
    setMessage("");
  };

  const onEmailPress = () => {
    Linking.openURL("mailto:fadi@chicagoboost.com");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contactFormContainer}>
        <Text style={styles.contactFormHeader}>{i18n.t("contactUsTitle")}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{i18n.t("messageLabel")}</Text>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
            keyboardType="default"
            placeholder={i18n.t("messageLabel")}
            placeholderTextColor="#9E9E9E"
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={
            message === ""
              ? styles.disabledSendMessageButton
              : styles.sendMessageButton
          }
          activeOpacity={0.8}
          disabled={message === "" ? true : false}
          onPress={onSendMessageClick}
        >
          {messageLoader ? (
            <ActivityIndicator color="#ffffff" size={12} />
          ) : (
            <Text style={styles.sendMessageButtonText}>
              {i18n.t("contactUsButtonText")}
            </Text>
          )}
        </TouchableOpacity>
        <Text onPress={onEmailPress} style={styles.email}>
          {i18n.t("contactUsOurEmail")}: fadi@chicagoboost.com
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  contactFormContainer: {
    width: Dimensions.get("screen").width - 40,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  contactFormHeader: {
    width: "100%",
    textAlign: "left",
    fontFamily: "poppins-semibold",
    fontSize: 18,
  },
  errorText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "red",
    marginTop: 15,
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
    height: 120,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: "#F3F3F3",
    fontSize: 14,
    fontFamily: "poppins-regular",
    textAlignVertical: "top",
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
  sendMessageButton: {
    width: "100%",
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2811D",
    borderRadius: 5,
  },
  disabledSendMessageButton: {
    width: "100%",
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fab67a",
    borderRadius: 5,
  },
  sendMessageButtonText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#ffffff",
  },
  email: {
    marginTop: 15,
    width: "100%",
    textAlign: "left",
    fontFamily: "poppins-semibold",
    fontSize: 15,
  },
});
