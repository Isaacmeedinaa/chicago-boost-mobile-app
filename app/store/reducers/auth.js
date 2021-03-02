import {
  SET_IS_AUTHENTICATED,
  SET_IS_NOT_AUTHENTICATED,
} from "../actions/auth";

const initialState = {
  isAuthenticated: false,
  hasCheckedAuth: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return {
        isAuthenticated: true,
        hasCheckedAuth: true,
      };

    case SET_IS_NOT_AUTHENTICATED:
      return {
        isAuthenticated: false,
        hasCheckedAuth: true,
      };

    default:
      return state;
  }
};

export default auth;
