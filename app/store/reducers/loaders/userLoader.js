import {
  USER_IS_LOGGING_IN,
  USER_IS_NOT_LOGGING_IN,
  USER_IS_REGISTERING,
  USER_IS_NOT_REGISTERING,
} from "../../actions/loaders/userLoader";

const initialState = {
  loginLoader: false,
  registerLoader: false,
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

    default:
      return state;
  }
};

export default userLoader;
