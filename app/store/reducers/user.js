import {
  USER_LOGIN,
  USER_REGISTER,
  USER_UPDATE,
  USER_LOGOUT,
} from "../actions/user";

const user = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.user;

    case USER_REGISTER:
      return action.user;

    case USER_UPDATE:
      return action.user;

    case USER_LOGOUT:
      return null;

    default:
      return state;
  }
};

export default user;
