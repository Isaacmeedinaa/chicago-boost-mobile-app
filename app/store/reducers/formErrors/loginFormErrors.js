import {
  LOGIN_ERRORS,
  NO_LOGIN_ERRORS,
} from "../../actions/formErrors/loginFormErrors";

const loginFormErrors = (state = false, action) => {
  switch (action.type) {
    case LOGIN_ERRORS:
      return true;

    case NO_LOGIN_ERRORS:
      return false;

    default:
      return state;
  }
};

export default loginFormErrors;
