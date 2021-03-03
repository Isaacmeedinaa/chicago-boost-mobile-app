import AsyncStorage from "@react-native-async-storage/async-storage";

// URL
import { API_BASE_URL } from "../../constants/urls";

// Auth actions
import { SET_IS_AUTHENTICATED, SET_IS_NOT_AUTHENTICATED } from "./auth";

// Loaders
import {
  USER_IS_LOGGING_IN,
  USER_IS_NOT_LOGGING_IN,
  USER_IS_REGISTERING,
  USER_IS_NOT_REGISTERING,
  USER_IS_REQUESTING_RECOVERY_CODE,
  USER_IS_NOT_REQUESTING_RECOVERY_CODE,
} from "./loaders/userLoader";

// Errors
import { LOGIN_ERRORS, NO_LOGIN_ERRORS } from "./formErrors/loginFormErrors";
import {
  SET_REGISTER_FORM_ERRORS,
  REMOVE_REGISTER_FORM_ERRORS,
} from "./formErrors/registerFormErrors";
import {
  SET_FORGOT_PASSWORD_ERRORS,
  REMOVE_FORGOT_PASSWORD_ERRORS,
} from "./formErrors/forgotPasswordFormErrors";

export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";
export const USER_LOGOUT = "USER_LOGOUT";

export const userLogin = (phoneNumber, password) => {
  return (dispatch) => {
    const userLoginData = {
      phoneNumber: phoneNumber,
      password: password,
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(userLoginData),
    };

    dispatch({ type: USER_IS_LOGGING_IN });
    fetch(`${API_BASE_URL}/auth/user-login`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        if (user.message) {
          dispatch({ type: LOGIN_ERRORS });
          dispatch({ type: SET_IS_NOT_AUTHENTICATED });
          dispatch({ type: USER_IS_NOT_LOGGING_IN });
          return;
        }

        dispatch({ type: USER_LOGIN, user: user });
        storeUserData(user.token);
        dispatch({ type: SET_IS_AUTHENTICATED });
        dispatch({ type: NO_LOGIN_ERRORS });
        dispatch({ type: USER_IS_NOT_LOGGING_IN });
      })
      .catch((err) => {
        dispatch({ type: SET_IS_NOT_AUTHENTICATED });
        dispatch({ type: USER_IS_NOT_LOGGING_IN });
      });
  };
};

export const autoUserLogin = (jwt) => {
  return (dispatch) => {
    const reqObj = {
      method: "GET",
      headers: {
        "x-auth-token": jwt,
      },
    };

    fetch(`${API_BASE_URL}/auth/auto-user-login`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        if (user.message) {
          dispatch({ type: SET_IS_NOT_AUTHENTICATED });
          return;
        }

        dispatch({ type: USER_LOGIN, user: user });
        dispatch({ type: SET_IS_AUTHENTICATED });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: SET_IS_NOT_AUTHENTICATED });
      });
  };
};

export const userRegister = (
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) => {
  return (dispatch) => {
    const userRegisterData = {
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      password: password,
      admin: false,
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(userRegisterData),
    };

    dispatch({ type: USER_IS_REGISTERING });
    fetch(`${API_BASE_URL}/users/register`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        if (user.message) {
          const formErrors = [];
          formErrors.push(user);
          dispatch({ type: SET_REGISTER_FORM_ERRORS, formErrors: formErrors });
          dispatch({ type: SET_IS_NOT_AUTHENTICATED });
          dispatch({ type: USER_IS_NOT_REGISTERING });
          return;
        }

        if (user.validationErrors) {
          const firstFormErrors = user.validationErrors.map((error) => error);
          if (firstFormErrors.some((error) => error.field === "password")) {
            const formErrors = firstFormErrors.filter(
              (error) => error.field !== "password"
            );
            formErrors.push({
              field: "password",
              message:
                "Password should at least be 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.",
            });

            dispatch({
              type: SET_REGISTER_FORM_ERRORS,
              formErrors: formErrors,
            });
            dispatch({ type: SET_IS_NOT_AUTHENTICATED });
            dispatch({ type: USER_IS_NOT_REGISTERING });
            return;
          }

          dispatch({
            type: SET_REGISTER_FORM_ERRORS,
            formErrors: firstFormErrors,
          });
          dispatch({ type: SET_IS_NOT_AUTHENTICATED });
          dispatch({ type: USER_IS_NOT_REGISTERING });
          return;
        }

        dispatch({ type: REMOVE_REGISTER_FORM_ERRORS });
        dispatch({ type: USER_REGISTER, user: user });
        storeUserData(user.token);
        dispatch({ type: SET_IS_AUTHENTICATED });
        dispatch({ type: USER_IS_NOT_REGISTERING });
      })
      .catch((err) => {
        dispatch({ type: SET_IS_NOT_AUTHENTICATED });
        dispatch({ type: USER_IS_NOT_REGISTERING });
      });
  };
};

export const userForgotPassword = (phoneNumber, navigation) => {
  return (dispatch) => {
    const userForgotPasswordData = {
      phoneNumber: phoneNumber,
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(userForgotPasswordData),
    };

    dispatch({ type: USER_IS_REQUESTING_RECOVERY_CODE });
    fetch(`${API_BASE_URL}/users/recovery-code`, reqObj)
      .then((resp) => resp.json())
      .then((recoveryCode) => {
        if (recoveryCode.message) {
          dispatch({ type: SET_FORGOT_PASSWORD_ERRORS });
          dispatch({ type: USER_IS_NOT_REQUESTING_RECOVERY_CODE });
          return;
        }

        dispatch({ type: REMOVE_FORGOT_PASSWORD_ERRORS });
        dispatch({ type: USER_IS_NOT_REQUESTING_RECOVERY_CODE });
        navigation.navigate("Login", { phoneNumber: phoneNumber });
      })
      .catch((err) => {
        dispatch({ type: REMOVE_FORGOT_PASSWORD_ERRORS });
        dispatch({ type: USER_IS_NOT_REQUESTING_RECOVERY_CODE });
      });
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("@jwt");
      dispatch({ type: SET_IS_NOT_AUTHENTICATED });
      dispatch({ type: USER_LOGOUT });
    } catch (err) {
      console.log(err);
    }
  };
};

const storeUserData = async (jwt) => {
  try {
    await AsyncStorage.setItem("@jwt", jwt);
  } catch (err) {
    console.log(err);
  }
};
