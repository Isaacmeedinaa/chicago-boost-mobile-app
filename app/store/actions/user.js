import AsyncStorage from "@react-native-async-storage/async-storage";

// URL
import { API_BASE_URL } from "../../constants/urls";

// Auth actions
import { SET_IS_AUTHENTICATED, SET_IS_NOT_AUTHENTICATED } from "./auth";

// Loaders
import {
  USER_IS_LOGGING_IN,
  USER_IS_NOT_LOGGING_IN,
} from "./loaders/userLoader";

// Errors
import { LOGIN_ERRORS, NO_LOGIN_ERRORS } from "./formErrors/loginFormErrors";

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

        storeUserData(user.token);
        dispatch({ type: USER_LOGIN, user: user });
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
