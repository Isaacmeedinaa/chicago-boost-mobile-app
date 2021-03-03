import {
  SET_FORGOT_PASSWORD_ERRORS,
  REMOVE_FORGOT_PASSWORD_ERRORS,
} from "../../actions/formErrors/forgotPasswordFormErrors";

const forgotPasswordFormErrors = (state = false, action) => {
  switch (action.type) {
    case SET_FORGOT_PASSWORD_ERRORS:
      return true;

    case REMOVE_FORGOT_PASSWORD_ERRORS:
      return false;

    default:
      return state;
  }
};

export default forgotPasswordFormErrors;
