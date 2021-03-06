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
  USER_IS_CHANGING_PASSWORD,
  USER_IS_NOT_CHANGING_PASSWORD,
  USER_IS_UPDATING,
  USER_IS_NOT_UPDATING,
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
import {
  SET_CHANGE_PASSWORD_ERRORS,
  REMOVE_CHANGE_PASSWORD_ERRORS,
} from "./formErrors/changePasswordFormErrors";
import {
  SET_UPDATE_PERSONAL_INFO_ERRORS,
  REMOVE_UPDATE_PERSONAL_INFO_ERRORS,
} from "./formErrors/updatePersonalInfoFormErrors";

export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";
export const USER_UPDATE = "USER_UPDATE";
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

        dispatch({ type: USER_LOGIN, user: user.user });
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
        dispatch({ type: USER_REGISTER, user: user.user });
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
        navigation.navigate("ChangePassword");
      })
      .catch((err) => {
        dispatch({ type: REMOVE_FORGOT_PASSWORD_ERRORS });
        dispatch({ type: USER_IS_NOT_REQUESTING_RECOVERY_CODE });
      });
  };
};

export const userChangePassword = (
  recoveryCode,
  password,
  confirmPassword,
  userId
) => {
  return (dispatch) => {
    const userChangePasswordData = {
      recoveryCode: recoveryCode,
      newPassword: password,
    };

    const reqObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(userChangePasswordData),
    };

    dispatch({ type: USER_IS_CHANGING_PASSWORD });

    if (password !== confirmPassword) {
      const formErrors = [];
      formErrors.push({
        field: "confirmPassword",
        message: "Passwords do not match!",
      });
      dispatch({ type: SET_CHANGE_PASSWORD_ERRORS, formErrors: formErrors });
      dispatch({ type: USER_IS_NOT_CHANGING_PASSWORD });
      return;
    }

    fetch(`${API_BASE_URL}/users/update-password/${userId}`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        if (user.message) {
          const formErrors = [];
          formErrors.push(user);
          dispatch({
            type: SET_CHANGE_PASSWORD_ERRORS,
            formErrors: formErrors,
          });
          dispatch({ type: USER_IS_NOT_CHANGING_PASSWORD });
          return;
        }

        if (user.validationErrors) {
          const passwordValidationError = user.validationErrors.some(
            (error) => error.field === "password"
          );
          if (passwordValidationError) {
            const formErrors = [];
            formErrors.push({
              field: "password",
              message:
                "Password should at least be 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.",
            });
            dispatch({
              type: SET_CHANGE_PASSWORD_ERRORS,
              formErrors: formErrors,
            });
            dispatch({ type: USER_IS_NOT_CHANGING_PASSWORD });
            return;
          }
        }

        dispatch({ type: REMOVE_CHANGE_PASSWORD_ERRORS });
        dispatch(userLogin(user.phoneNumber, password));
        dispatch({ type: USER_IS_NOT_CHANGING_PASSWORD });
      })
      .catch((err) => {
        dispatch({ type: USER_IS_NOT_CHANGING_PASSWORD });
        console.log(err);
      });
  };
};

export const userUpdatePushToken = (pushToken) => {
  return async (dispatch, getState) => {
    let jwt;
    try {
      const asyncStorageJwt = await AsyncStorage.getItem("@jwt");
      if (asyncStorageJwt) {
        jwt = asyncStorageJwt;
      }
    } catch (err) {
      return console.log(err);
    }

    const user = getState().user;

    const updateUserPushTokenData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      pushToken: pushToken,
      admin: user.admin,
    };

    const reqObj = {
      method: "PUT",
      headers: {
        "x-auth-token": jwt,
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(updateUserPushTokenData),
    };

    fetch(`${API_BASE_URL}/users/${user._id}`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        if (user.message) {
          return;
        }
        if (user.validationErrors) {
          return;
        }

        dispatch({ type: USER_UPDATE, user: user });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const userUpdatePersonalInfo = (
  firstName,
  lastName,
  email,
  phoneNumber,
  userId
) => {
  return async (dispatch, getState) => {
    let jwt;
    try {
      const asyncStorageJwt = await AsyncStorage.getItem("@jwt");
      if (asyncStorageJwt) {
        jwt = asyncStorageJwt;
      }
    } catch (err) {
      return console.log(err);
    }

    const user = getState().user;

    const userUpdatePersonalInfoData = {
      firstName: firstName,
      lastName: lastName,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      admin: user.admin,
    };

    const reqObj = {
      method: "PUT",
      headers: {
        "x-auth-token": jwt,
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify(userUpdatePersonalInfoData),
    };

    dispatch({ type: USER_IS_UPDATING });
    fetch(`${API_BASE_URL}/users/${userId}`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        if (user.message) {
          const formErrors = [];
          formErrors.push(user);
          dispatch({
            type: SET_UPDATE_PERSONAL_INFO_ERRORS,
            formErrors: formErrors,
          });
          dispatch({ type: USER_IS_NOT_UPDATING });
          return;
        }

        if (user.validationErrors) {
          dispatch({
            type: SET_UPDATE_PERSONAL_INFO_ERRORS,
            formErrors: user.validationErrors,
          });
          dispatch({ type: USER_IS_NOT_UPDATING });
          return;
        }

        dispatch({ type: REMOVE_UPDATE_PERSONAL_INFO_ERRORS });
        dispatch({ type: USER_UPDATE, user: user });
        dispatch({ type: USER_IS_NOT_UPDATING });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: REMOVE_UPDATE_PERSONAL_INFO_ERRORS });
        dispatch({ type: USER_IS_NOT_UPDATING });
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
