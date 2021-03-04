import {
  USER_IS_LOGGING_IN,
  USER_IS_NOT_LOGGING_IN,
  USER_IS_REGISTERING,
  USER_IS_NOT_REGISTERING,
  USER_IS_REQUESTING_RECOVERY_CODE,
  USER_IS_NOT_REQUESTING_RECOVERY_CODE,
  USER_IS_CHANGING_PASSWORD,
  USER_IS_NOT_CHANGING_PASSWORD,
} from "../../actions/loaders/userLoader";

const initialState = {
  loginLoader: false,
  registerLoader: false,
  forgotPasswordLoader: false,
  changePasswordLoader: false,
};

const userLoader = (state = initialState, action) => {
  switch (action.type) {
    case USER_IS_LOGGING_IN:
      return {
        ...state,
        loginLoader: true,
      };

    case USER_IS_NOT_LOGGING_IN:
      return {
        ...state,
        loginLoader: false,
      };

    case USER_IS_REGISTERING:
      return {
        ...state,
        registerLoader: true,
      };

    case USER_IS_NOT_REGISTERING:
      return {
        ...state,
        registerLoader: false,
      };

    case USER_IS_REQUESTING_RECOVERY_CODE:
      return {
        ...state,
        forgotPasswordLoader: true,
      };

    case USER_IS_NOT_REQUESTING_RECOVERY_CODE:
      return {
        ...state,
        forgotPasswordLoader: false,
      };

    case USER_IS_CHANGING_PASSWORD:
      return {
        ...state,
        changePasswordLoader: true,
      };

    case USER_IS_NOT_CHANGING_PASSWORD:
      return {
        ...state,
        changePasswordLoader: false,
      };

    default:
      return state;
  }
};

export default userLoader;
